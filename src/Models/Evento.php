<?php

namespace AltayPereira\Ingresso\Models;

use CoffeeCode\DataLayer\DataLayer;

class Evento extends DataLayer
{

    public function __construct()
    {
        parent::__construct("events", ["nome", "data", "horario", "inicio_venda", "termino_venda","banner" ,"lugares", "valor", "logradouro", "numero", "bairro", "cidade", "uf"], "id", true);
    }
}



