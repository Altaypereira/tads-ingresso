<?php
use AltayPereira\Ingresso\Database\ClienteMigration;
use AltayPereira\Ingresso\Database\EventoMigration;
use AltayPereira\Ingresso\Database\IngressoMigration;

date_default_timezone_set("America/Fortaleza");



define("SECRET_KEY_JWT", hash("sha512", "^My_SUPER.Secret-Key/$^"));
define("DB_USER", "root");
define("DB_PWD", "123");

const DATA_LAYER_CONFIG = [
    "driver" => "mysql",
    "host" => "127.0.0.1",
    "port" => "3306",
    "dbname" => "ingresso",
    "username" => DB_USER,
    "passwd" => DB_PWD,
    "options" => [
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
        PDO::ATTR_CASE => PDO::CASE_NATURAL
    ]
];

// Migrate
$clienteMigration = new ClienteMigration();
$ingressoMigration = new IngressoMigration();
$eventoMigration = new EventoMigration();
$clienteMigration->migrate();
$eventoMigration->migrate();
$ingressoMigration->migrate();




