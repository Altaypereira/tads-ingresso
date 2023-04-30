<?php

namespace AltayPereira\Ingresso\Middleware;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use CoffeeCode\Router\Router;

class Auth
{

    public function handle(Router $router): bool
    {

        $data = json_decode(file_get_contents("php://input"));

        if (!isset(getallheaders()["Authorization"])) {
            http_response_code(401);
            echo json_encode(["error" => "Not authorized"]);
            return false;
        }else{
            $token = getallheaders()["Authorization"];
            $token = str_replace("Bearer ", "", $token);
        }

        try
        {
            $result = JWT::decode($token, new Key(SECRET_KEY_JWT, 'HS256'));
        }
        catch(\Exception $e){
            http_response_code(401);
            echo json_encode(["error" => "Not authorized"]);
            return false;
        }

        
        
        return true;
    }
}
