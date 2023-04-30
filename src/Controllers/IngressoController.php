<?php

    namespace AltayPereira\Ingresso\Controllers;

    use AltayPereira\Ingresso\Models\Ingresso;
    use AltayPereira\Ingresso\Utils\Token;
    use mysqli;
    use Endroid\QrCode\Builder\Builder;
    use Endroid\QrCode\Encoding\Encoding;
    use Endroid\QrCode\ErrorCorrectionLevel\ErrorCorrectionLevelHigh;
    use Endroid\QrCode\Label\Alignment\LabelAlignmentCenter;
    use Endroid\QrCode\Label\Font\NotoSans;
    use Endroid\QrCode\RoundBlockSizeMode\RoundBlockSizeModeMargin;
    use Endroid\QrCode\Writer\PngWriter;
    class IngressoController
    {
        public function index()
        {
            $ingresso = new Ingresso();
            $ingressos = $ingresso->find()->fetch(true);
            echo json_encode($ingressos);
        }

        public function show($data)
        {
            $ingresso = new Ingresso();
            $ingresso = $ingresso->findById($data["id"]);
            echo json_encode($ingresso);
        }

        public function ticketsByClient($data)
        {
            $ingresso = new Ingresso();
            $ingressos = $ingresso->find("client_id = :client_id", "client_id={$data["id"]}")->order("created_at DESC")->fetch(true);
            $data = [];
            if(!$ingressos){
                echo json_encode($data);
                return;
            }

            foreach($ingressos as $ingresso){
                $qrcode = Builder::create()
                ->writer(new PngWriter())
                ->writerOptions([])
                ->data("http://127.0.0.1/tickets/{$ingresso->token}/validate")
                ->encoding(new Encoding('UTF-8'))
                ->errorCorrectionLevel(new ErrorCorrectionLevelHigh())
                ->size(400)
                ->margin(10)
                ->roundBlockSizeMode(new RoundBlockSizeModeMargin())
                ->logoPath(__DIR__.'/../../assets/logo.png')
                ->validateResult(false)
                ->build();
            
                $mysqli = new mysqli('127.0.0.1', DB_USER, DB_PWD, 'ingresso');
                $result = $mysqli->query("SELECT * from events WHERE id = {$ingresso->event_id}");
                $evento = (object) $result->fetch_assoc();
                $mysqli->close();
                $data[] = [
                    "id" => $ingresso->id,
                    "event_id" => $ingresso->event_id,
                    "client_id" => $ingresso->client_id,
                    "spec_name" => $ingresso->spec_name,
                    "spec_doc" => $ingresso->spec_doc,
                    "token" => $ingresso->token,
                    "type" => $ingresso->type == "R" ? "Reserva" : "Compra",
                    "booking_expiration_time" => $ingresso->booking_expiration_time ? date("d/m/Y H:i:s", strtotime($ingresso->booking_expiration_time)) : null,
                    "created_at" => $ingresso->created_at,
                    "fcreated_at" => date("d/m/Y H:i:s", strtotime($ingresso->created_at)),
                    "event_name" => $evento->nome,
                    "event_local" => $evento->logradouro . ", " . $evento->numero . " - " . $evento->bairro . ", " . $evento->cidade . " - " . $evento->uf,
                    "event_date" => date("d/m/Y", strtotime($evento->data)),
                    "event_time" => date("H:i", strtotime($evento->horario)),
                    "event_price" => "R$ " . number_format($evento->valor, 2, ",", "."),
                    "qr_code" => $qrcode    ->getDataUri()
                ];

                
            }
            echo json_encode($data);
        }

        public function store()
        {
            $data = json_decode(file_get_contents("php://input"), true);
            if($data["type"] == "R"){
                $data["booking_expiration_time"] = date("Y-m-d H:i:s", strtotime("+3 day"));
            }
            $ingresso = new Ingresso();
            $ingresso->event_id = $data["event_id"];
            $ingresso->client_id = $data["client_id"];
            $ingresso->spec_name = $data["spec_name"];
            $ingresso->spec_doc = $data["spec_doc"];
            $ingresso->token = Token::generate($data);
            $ingresso->type = $data["type"];
            $ingresso->booking_expiration_time = isset($data["booking_expiration_time"]) ? $data["booking_expiration_time"] : null;
            $ingresso->save();
            http_response_code(201);
            if($data["type"] == "R") return;
                
            // Remove the reserved ticket by this client from the event
            $reserved_tickets = (new Ingresso())->find("client_id = :client_id AND event_id = :event_id AND type = 'R'", "client_id={$data["client_id"]}&event_id={$data["event_id"]}")->fetch(true);
            foreach($reserved_tickets as $reserved_ticket){
                $reserved_ticket->destroy();
            }

            
        }

        public function update($data)
        {
            $ingresso = (new Ingresso())->findById($data["id"]);
            $ingresso->event_id = $data["event_id"];
            $ingresso->client_id = $data["client_id"];
            $ingresso->token = $data["token"];
            $ingresso->save();
            echo json_encode($ingresso);
        }

        public function destroy($data)
        {
            $ingresso = (new Ingresso())->findById($data["id"]);
            $ingresso->destroy();
            echo json_encode($ingresso);
        }

        public function hasBookingOrBought($client_id, $event_id){
            $ingresso = new Ingresso();
            $ingresso = $ingresso->find("client_id = :client_id AND event_id = :event_id AND (type = 'B' OR type = 'R')", "client_id={$client_id}&event_id={$event_id}")->fetch();

            if($ingresso){
                @ $ingresso->data()->booking_expiration_time = strtotime($ingresso->data()->booking_expiration_time);
                return base64_encode(json_encode($ingresso->data()));
            }else{
                return false;
            }

        }

        public static function removeBookings(){
            $ingresso = new Ingresso();
            $ingressos = $ingresso->find("type = 'R'")->fetch(true);
            if(!$ingressos) return;
            foreach($ingressos as $ingresso){
                if(strtotime($ingresso->booking_expiration_time) < time()){
                    $ingresso->destroy();
                }
            }
        }

        public function validate($data)
        {
            $mysqli = new mysqli('127.0.0.1', DB_USER, DB_PWD, 'ingresso');
            $result = $mysqli->query("SELECT * FROM tickets WHERE token = '{$data["token"]}'");
            $ingresso = $result->fetch_assoc();

            
            if(!$ingresso){
                http_response_code(404);
                $template = file_get_contents(__DIR__ . "/../../assets/template-invalid.html");
                $template = str_replace("{{ token }}", $data['token'], $template);
                echo $template;
                return;
            }

            $ingresso = (object) $ingresso;
            $evento = $mysqli->query("SELECT * FROM events WHERE id = {$ingresso->event_id}");
            $evento = (object) $evento->fetch_assoc();
            $evento->local = $evento->logradouro . ", " . $evento->numero . " - " . $evento->bairro . ", " . $evento->cidade . " - " . $evento->uf;
            $evento->data = date("d/m/Y", strtotime($evento->data));
            $evento->horario = date("H:i", strtotime($evento->horario));
            $evento->valor = "R$ " . number_format($evento->valor, 2, ",", ".");
            $mysqli->close();

            $ingresso->spec_doc = preg_replace("/\.[0-9]{3}\.[0-9]{3}\-/", ".***.***-", $ingresso->spec_doc);
            
            $template = file_get_contents(__DIR__ . "/../../assets/template.html");
            $template = str_replace("{{ token }}", $ingresso->token, $template);
            $template = str_replace("{{ NOME_TITULAR }}", $ingresso->spec_name, $template);
            $template = str_replace("{{ CPF }}", $ingresso->spec_doc, $template);
            $template = str_replace("{{ CPF }}", $ingresso->spec_doc, $template);
            $template = str_replace("{{ NOME_EVENTO }}", $evento->nome, $template);
            $template = str_replace("{{ END_EVENTO }}", $evento->local, $template);
            $template = str_replace("{{ DATA_EVENTO }}", $evento->data . " às " . $evento->horario, $template);
            http_response_code(200);
            echo $template;
        }

    }