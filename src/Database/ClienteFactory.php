<?php

namespace AltayPereira\Ingresso\Database;

use AltayPereira\Ingresso\Models\Cliente;
use AltayPereira\Ingresso\Utils\Password;
class ClienteFactory
{

    public function populate(){

        $cliente = new Cliente();
        $cliente->nome = "Altay Pereira";
        $cliente->email = "altay@gmail.com";
        $cliente->senha = Password::hash("123");
        $cliente->perfil = "D";
        $cliente->save();


        $cliente = new Cliente();
        $cliente->nome = "Admin";
        $cliente->email = "admin@gmail.com";
        $cliente->senha = Password::hash("admin");
        $cliente->perfil = "A"; 
        $cliente->save();

    }

}