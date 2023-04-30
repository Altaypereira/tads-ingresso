<?php

namespace AltayPereira\Ingresso\Models;

use CoffeeCode\DataLayer\DataLayer;

class Cliente extends DataLayer
{

    public function __construct()
    {
        parent::__construct("clients", ["nome", "email", "senha", "perfil"], "id", true);
    }
}