<?php
    // DROP TABLE tickets, events, clients;
    
    namespace AltayPereira\Ingresso\Database;

    require_once __DIR__ . "/../../vendor/autoload.php";

    use AltayPereira\Ingresso\Database\ClienteMigration;
    use AltayPereira\Ingresso\Database\EventoMigration;
    use AltayPereira\Ingresso\Database\IngressoMigration;
    
    use AltayPereira\Ingresso\Database\ClienteFactory;
    use AltayPereira\Ingresso\Database\EventoFactory;
    use AltayPereira\Ingresso\Database\IngressoFactory;

class Seeder 
{

    public static function run()
    {

        // Migrate
        $clienteMigration = new ClienteMigration();
        $ingressoMigration = new IngressoMigration();
        $eventoMigration = new EventoMigration();
        $clienteMigration->migrate();
        $eventoMigration->migrate();
        $ingressoMigration->migrate();
        // Seed
        $clienteFactory = new ClienteFactory();
        $eventoFactory = new EventoFactory();
        $ingressoFactory = new IngressoFactory();
        $clienteFactory->populate();
        $eventoFactory->populate();
        $ingressoFactory->populate();
    }
}


Seeder::run();