<?php

require_once('connection.php');

class Productos{    
    private $_DATA;
    public function __construct($data){
        $this->_DATA = $data;
    }

    public function add(){
        $sql = "INSERT INTO Productos (cliente,documento,productos) VALUES (:cliente,:documento,:productos)";
        $connection = new Connection($sql,$this->_DATA);
        $res = $connection->peticion();
        return $res;
    }
}

 