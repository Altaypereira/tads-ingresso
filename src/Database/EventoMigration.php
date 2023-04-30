<?php

namespace AltayPereira\Ingresso\Database;

use mysqli;

class EventoMigration
{
    public function migrate(){
        $mysqli = new mysqli("localhost", "root", "123", "ingresso");
        $mysqli->query("
            CREATE TABLE IF NOT EXISTS `events` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `nome` varchar(255) NOT NULL,
                `data` DATE NOT NULL,
                `banner` LONGTEXT NOT NULL,
                `horario` TIME NOT NULL,
                `inicio_venda` DATETIME NOT NULL,
                `termino_venda` DATETIME NOT NULL,
                `lugares` int(11) NOT NULL,
                `valor` DOUBLE NOT NULL,
                `logradouro` varchar(255) NOT NULL,
                `numero` varchar(255) NOT NULL,
                `bairro` varchar(255) NOT NULL,
                `cidade` varchar(255) NOT NULL,
                `uf` varchar(2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (`id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        ");
    }
}