<?php

namespace AltayPereira\Ingresso\Database;


use mysqli;

class EventoFactory
{
    
    public function populate(){
        
        $mysqli = new mysqli("localhost", 'root', '123', "ingresso");

        $mysqli->query("INSERT INTO `events`(`nome`, `data`, `banner`, `horario`, `inicio_venda`, `termino_venda`, `lugares`, `valor`, `logradouro`, `numero`, `bairro`, `cidade`, `uf`) VALUES ('Festa do Pijama', '2023-04-28', 'https://i0.wp.com/www.lunicomemoracoes.com.br/wp-content/uploads/2019/11/tenda-gigante-pink-neon.jpg?fit=1140%2C760&ssl=1', '22:00', '2023-03-01 00:00:00', '2023-04-22 23:59:59', 70, 60, 'Rua das Flores', '135', 'Centro', 'Salvador', 'BA')");
        $mysqli->query("INSERT INTO `events`(`nome`, `data`, `banner`, `horario`, `inicio_venda`, `termino_venda`, `lugares`, `valor`, `logradouro`, `numero`, `bairro`, `cidade`, `uf`) VALUES ('Chico Buarque', '2023-06-14', 'https://www.bilheteriavirtual.com.br/images/imagens-site/new_Chico_Buarque_Sexta_BA_site_oficial_bilheteriavirtual.jpg', '20:00', '2023-02-01 00:00:00', '2023-06-10 23:59:59', 100, 110, 'Teatro Castro Alves Salvador', '1390', 'Centro', 'Recife', 'PE')");



    }
}