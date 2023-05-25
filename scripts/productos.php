<?php

require_once('connection.php');

class Productos{    
    private $_DATA;
    public function __construct($data){
        $this->_DATA = $data;
    }

    public function add(){
        $sql = "INSERT INTO Productos (cliente,documento,productos,fecha) VALUES (:cliente,:documento,:productos,:fecha)";
        $connection = new Connection($sql,$this->_DATA);
        $res = $connection->peticion();
        return $res;
    }
}

try {    
    $cliente = json_decode($_POST['cliente'],true);
    $cliente['productos']= json_encode($cliente['productos']);    
    $product = new Productos($cliente);
    $res = [];
    $res['result']= $product->add(); 
    echo json_encode($res);  

    
} catch (Exception $e) {
    $error = [];
    $error['error']= $e->getMessage();
    echo  json_encode($error);
}

 