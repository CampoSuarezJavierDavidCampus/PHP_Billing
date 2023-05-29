<?php
namespace App\Facturacion;
use App\Connection\MySQL;
class Cliente{    
    public function __construct(
        private readonly string $nombre,
        private readonly int $documento
    ){}
}
class Producto{
    public function __construct(
        public readonly string $nombre,
        public readonly int|float $precio,
        public readonly int $cantidad
    ){}
}
class Factura{    
    private array $productos;
    public function __construct(
        private Cliente $cliente
    ){}
    public function set_productos(Producto ...$productos){
        $this->productos = $productos;
    }
    public function get_productos(){
        $json = array_map(function(Producto $producto){
            return [
                "nombre"=>$producto->nombre,
                "precio"=>$producto->precio,
                "cantidad"=>$producto->cantidad
            ];
        },$this->productos); 
        $json = json_encode($json);
        return $json;
    }
}