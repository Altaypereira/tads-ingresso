<?php

    namespace AltayPereira\Ingresso\Controllers;

    use AltayPereira\Ingresso\Models\Evento;
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;
    use AltayPereira\Ingresso\Controllers\IngressoController;

    class EventoController
    {
        public function index()
        {   
            $client_id = json_decode(base64_decode(explode(".", getallheaders()["Authorization"])[1]))->data->id;
            $mysqli = new \mysqli("localhost", DB_USER, DB_PWD, "ingresso");
            $today = date("Y-m-d H:i:s");
            $query = "SELECT * FROM events WHERE '$today' BETWEEN inicio_venda AND termino_venda ORDER BY data ASC";
            $result = $mysqli->query($query);
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $evento = $row;
                $evento["f_data"] = date("d/m/Y", strtotime($evento["data"]));
                $evento["f_inicio_venda"] = date("d/m/Y", strtotime($evento["inicio_venda"]));
                $evento["f_termino_venda"] = date("d/m/Y", strtotime($evento["termino_venda"]));
                $evento["f_horario"] = date("H:i", strtotime($evento["horario"]));
                $evento["f_valor"] = 'R$ ' . number_format($evento["valor"], 2, ",", ".");
                $evento["lugares"] = intval($evento["lugares"]);
                $evento["lugares_disponiveis"] = $this->getFreeTickets($evento["id"]);
                $evento["status"] = $this->getStatusTicket($client_id, $evento["id"]);
                
                if($evento['lugares_disponiveis'] > 0){
                    $data[] = $evento;
                }
            }
            echo json_encode($data);
        }

        private function getTotalTickets($id){
            $mysqli = new \mysqli("localhost", "root", "123", "ingresso");
            $query = "SELECT * FROM events WHERE id='$id'";
            $result = $mysqli->query($query);
            $row = $result->fetch_assoc();
            return $row["lugares"];
        }
        private function getFreeTickets($id){
            $mysqli = new \mysqli("localhost", "root", "123", "ingresso");
            $query = "SELECT * FROM tickets WHERE event_id='$id'";
            $result = $mysqli->query($query);
            $sold = $result->num_rows;
            $total = $this->getTotalTickets($id);
            return $total - $sold;
        }

        private function getStatusTicket($client_id, $event_id){
            $ticket =  (new IngressoController())->hasBookingOrBought($client_id, $event_id);
            if($ticket){
                return $ticket;
            }else{
                return false;
            }
        }

        public function show($data)
        {
            $mysqli = new \mysqli("localhost", "root", "123", "ingresso");
            $query = "SELECT * FROM events WHERE id={$data["id"]}";
            $result = $mysqli->query($query);
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $evento = $row;
                $evento["f_data"] = date("d/m/Y", strtotime($evento["data"]));
                $evento["f_inicio_venda"] = date("d/m/Y", strtotime($evento["inicio_venda"]));
                $evento["f_termino_venda"] = date("d/m/Y", strtotime($evento["termino_venda"]));
                $evento["f_horario"] = date("H:i", strtotime($evento["horario"]));
                $evento["f_valor"] = 'R$ ' . number_format($evento["valor"], 2, ",", ".");
                $evento["lugares"] = intval($evento["lugares"]);
                $evento["lugares_disponiveis"] = $this->getFreeTickets($evento["id"]);
                $data[] = $evento;
            }
            echo json_encode($data);
        }

        public function store()
        {
            $mysqli = new \mysqli("localhost", "root", "123", "ingresso");
            $data = json_decode(file_get_contents("php://input"));
            $token = getallheaders()["Authorization"];
            $token = str_replace("Bearer ", "", $token);
            $result = JWT::decode($token, new Key(SECRET_KEY_JWT, 'HS256'));
            if($result->data->perfil != 'A'){
                http_response_code(403);
                echo json_encode(["error" => "Forbidden"]);
                return false;
            }

            $payload = base64_decode(explode(".", $token)[1]);
            $payload = json_decode($payload);
            if($payload->data->perfil != 'A'){
                http_response_code(403);
                echo json_encode(["error" => "Forbidden"]);
                return false;
            }

            // Verifica se os dados estão preenchidos
            if (
                empty($data->nome) ||
                empty($data->data) ||
                empty($data->horario) ||
                empty($data->inicio_venda) ||
                empty($data->termino_venda) ||
                empty($data->lugares) ||
                empty($data->banner) ||
                empty($data->valor) ||
                empty($data->logradouro) ||
                empty($data->numero) ||
                empty($data->bairro) ||
                empty($data->cidade) ||
                empty($data->uf)
            ) {
                http_response_code(400);
                echo json_encode(["error" => "Bad Request"]);
                return false;
            }
            
            $data->valor = (float)$data->valor; 
            $result = $mysqli->query("
                INSERT INTO events (
                    nome,
                    data,
                    horario,
                    inicio_venda,
                    termino_venda,
                    lugares,
                    banner,
                    valor,
                    logradouro,
                    numero,
                    bairro,
                    cidade,
                    uf
                ) VALUES (
                    '$data->nome',
                    '$data->data',
                    '$data->horario',
                    '$data->inicio_venda',
                    '$data->termino_venda',
                    '$data->lugares',
                    '$data->banner',
                     $data->valor,
                    '$data->logradouro',
                    '$data->numero',
                    '$data->bairro',
                    '$data->cidade',
                    '$data->uf'
                )
            ");

            if(!$result){
                http_response_code(500);
                echo json_encode(["error" => "Internal Server Error"]);
                return false;
            }

            
            http_response_code(201);
            echo "ok";
        }

        public function update($data)
        {
            $evento = (new Evento())->findById($data["id"]);
            $evento->nome = $data["nome"];
            $evento->data = $data["data"];
            $evento->horario = $data["horario"];
            $evento->inicio_venda = $data["inicio_venda"];
            $evento->termino_venda = $data["termino_venda"];
            $evento->lugares = $data["lugares"];
            $evento->valor = $data["valor"];
            $evento->logradouro = $data["logradouro"];
            $evento->numero = $data["numero"];
            $evento->bairro = $data["bairro"];
            $evento->cidade = $data["cidade"];
            $evento->uf = $data["uf"];
            $evento->save();
            echo json_encode($evento);
        }

        public function destroy($data)
        {
            $evento = (new Evento())->findById($data["id"]);
            $evento->destroy();
            echo json_encode($evento);
        }

    }