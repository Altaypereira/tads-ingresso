<?php

namespace AltayPereira\Ingresso\Database;

use mysqli;
use AltayPereira\Ingresso\Utils\Token;

class IngressoFactory
{
    public function populate(){
        $mysqli = new mysqli("127.0.0.1", "root", "123", "ingresso");
        $tk = Token::generate([
            "event_id" => 1,
            "client_id" => 1,
            "spec_name" => "Altay Pereira",
            "spec_doc" => "123.456.789-00",
            "type" => "B"
        ]);

        $mysqli->query("INSERT INTO `tickets`(`event_id`, `client_id`, `token`, `type`, `spec_name`, `spec_doc`) VALUES (1, 1, '$tk', 'B', 'Altay Pereira', '123.456.789-00')");
        
    }
}