<?php

    namespace AltayPereira\Ingresso\Controllers;

    use AltayPereira\Ingresso\Models\Cliente;
    use Firebase\JWT\JWT;
    use AltayPereira\Ingresso\Utils\Password;

    class ClienteController
    {
        public function index()
        {
            $data = [];
            $cliente = new Cliente();
            $clientes = $cliente->find()->fetch(true);
            foreach ($clientes as $cliente) {
                $cliente = $cliente->data();
                unset($cliente->senha);
                $data[] = $cliente;

            }

            echo json_encode($data);
        }

        public function show($data)
        {
            $cliente = new Cliente();
            $cliente = $cliente->findById($data["id"]);
            echo json_encode($cliente->data());
        }

        public function store($data = null)
        {   
            if(!$data)
                $data = json_decode(file_get_contents("php://input"));    
            

            if (!$data) {
                http_response_code(400);
                echo json_encode(["error" => "Algo deu errado"]);
                return;
            }

            if (!isset($data->nome) || !isset($data->email) || !isset($data->senha) || $data->nome == "" || $data->email == "" || $data->senha == "") {
                http_response_code(400);
                echo json_encode(["error" => "Campos obrigatórios não preenchidos"]);
                return;
            }

            $email = filter_var($data->email, FILTER_VALIDATE_EMAIL);
            if (!$email) {
                http_response_code(400);
                echo json_encode(["error" => "E-mail inválido"]);
                return;
            }

            // Search for email in database
            $client_exists = (new Cliente())->find("email = :email", "email={$email}")->fetch();
            if ($client_exists) {
                http_response_code(400);
                echo json_encode(["error" => "E-mail já cadastrado"]);
                return;
            }

            if(!$data->perfil){

                $data->perfil = "D";
                
            }else{
                $token = getallheaders()["Authorization"];
                $payload = base64_decode(explode(".", $token)[1]);
                $payload = json_decode($payload);

                if($payload->data->perfil != "A"){
                    http_response_code(401);
                    echo json_encode(["error" => "Você não tem permissão para criar um usuário com perfil de administrador"]);
                    return;
                }
            }




            $cliente = new Cliente();
            $cliente->nome = $data->nome;
            $cliente->email = $email;
            $cliente->senha = Password::hash($data->senha);
            $cliente->perfil = $data->perfil;
           

            if ($cliente->save()) {
                http_response_code(201);
                echo json_encode($data);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Internal server error"]);
            }
            
        }

        public function update()
        {
            $data = json_decode(file_get_contents("php://input"), true);
            // echo "<pre>";
            // var_dump($data);
            // exit;
            $information = json_decode(base64_decode(explode('.', explode(' ', getallheaders()['Authorization'])[1])[1]), true);
            $id = $information['data']['id'];
            $cliente = (new Cliente())->findById($id);
            if (isset($data['email'])) $cliente->email = $data['email'];
            if (isset($data['senha'])) $cliente->senha = Password::hash($data['senha']);
            
            $cliente->save();
            
            http_response_code(201);
        }

        public function destroy($data)
        {
            $cliente = (new Cliente())->findById($data["id"]);
            $cliente->destroy();
            echo json_encode($cliente);
        }

        public function login()
        {   
            $data = (object) json_decode(file_get_contents("php://input"), true);

    

            if(empty($data->email) || empty($data->senha)) {
                http_response_code(400);
                echo json_encode(["error" => "Invalid data"]);
                return;
            }

            $email = filter_var($data->email, FILTER_VALIDATE_EMAIL);
            if (!$email) {
                http_response_code(400);
                echo json_encode(["error" => "Invalid email"]);
                return;
            }

            $senha = Password::hash($data->senha);


            $cliente = new Cliente();
            $cliente = $cliente->find("email = :email AND senha = :senha", "email={$data->email}&senha={$senha}")->fetch();

            if ($cliente) {
                $token = [
                    "iss" => "http://localhost:8080",
                    "aud" => "http://localhost:8080",
                    "iat" => time(),
                    "exp" => time() + 3600 * 2,
                    "data" => [
                        "id" => $cliente->id,
                        "nome" => $cliente->nome,
                        "email" => $cliente->email,
                        "perfil" => $cliente->perfil
                    ]
                ];
                $jwt = JWT::encode($token, SECRET_KEY_JWT, 'HS256');
                http_response_code(201);
                echo json_encode(["token" => $jwt]);
            } else {
                http_response_code(401);
                echo json_encode(["error" => "Not authorized"]);
            }
        }
        

    }