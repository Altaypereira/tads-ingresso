<?php

namespace AltayPereira\Ingresso\Database;

use mysqli;

class ClienteMigration
{
    public function migrate(){
        $mysqli = new mysqli("localhost", "root", "123", "ingresso");
        $mysqli->query("
            CREATE TABLE IF NOT EXISTS `clients` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `nome` varchar(255) NOT NULL,
                `email` varchar(255) NOT NULL,
                `senha` varchar(255) NOT NULL,
                `perfil` varchar(1) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (`id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        ");
    }
}