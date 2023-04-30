<?php

namespace AltayPereira\Ingresso\Models;

use CoffeeCode\DataLayer\DataLayer;

class Ingresso extends DataLayer
{

    public function __construct()
    {
        parent::__construct("tickets", ["event_id", "client_id", "token", 'type'], "id", true);
    }
}