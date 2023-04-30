<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__ . "/vendor/autoload.php";

use CoffeeCode\Router\Router;
use AltayPereira\Ingresso\Middleware\Auth;
use AltayPereira\Ingresso\Controllers\IngressoController;

IngressoController::removeBookings();

$router = new Router("http://127.0.0.1/ingresso/");
$router->get("/", function (){
    require_once "./src/Database/Seeder.php";
});
$router->namespace("AltayPereira\Ingresso\Controllers")->group("/events", Auth::class);
$router->get("/", "EventoController:index");
$router->get("/{id}", "EventoController:show");
$router->post("/", "EventoController:store");
$router->put("/{id}", "EventoController:update");
$router->delete("/{id}", "EventoController:destroy");

$router->namespace("AltayPereira\Ingresso\Controllers")->group("/clients");
$router->post("/", "ClienteController:store");
$router->post("/auth", "ClienteController:login");


$router->namespace("AltayPereira\Ingresso\Controllers")->group("/clients", Auth::class);
$router->get("/", "ClienteController:index");
$router->get("/{id}", "ClienteController:show");
$router->put("/", "ClienteController:update");
$router->delete("/{id}", "ClienteController:destroy");

$router->namespace("AltayPereira\Ingresso\Controllers")->group("/tickets");
$router->get("/{token}/validate", "IngressoController:validate");

$router->namespace("AltayPereira\Ingresso\Controllers")->group("/tickets", Auth::class);
$router->get("/", "IngressoController:index");
$router->get("/{id}", "IngressoController:show");
$router->get("/client/{id}", "IngressoController:ticketsByClient");
$router->post("/", "IngressoController:store");
$router->put("/{id}", "IngressoController:update");
$router->delete("/{id}", "IngressoController:destroy");




$router->dispatch();

if ($router->error()) {

}