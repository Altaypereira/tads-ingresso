<?php

namespace AltayPereira\Ingresso\Database;

use mysqli;

class IngressoMigration
{

    //"event_id", "client_id", "token"
    public function migrate(){
        $mysqli = new mysqli("localhost", "root", "123", "ingresso");
        $mysqli->query("
            CREATE TABLE IF NOT EXISTS `tickets` (
                id INT(11) NOT NULL AUTO_INCREMENT,
                event_id INT(11) NOT NULL,
                client_id INT(11) NOT NULL,
                spec_name VARCHAR(255),
                spec_doc VARCHAR(255),
                token VARCHAR(255) NOT NULL,
                type VARCHAR(1) NOT NULL,
                booking_expiration_time DATETIME,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE ON UPDATE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        ");
    }
}