<?php
require_once('config.php');
class Connection extends Config{
    private string $_SQL;
    private $_DATA;
    public function __construct($sql,$data){
        $this->_SQL = $sql;        
        $this->_DATA = (array) $data;        
    }

    public function peticion(){
        return $this->prepare();        
    }
    private function connection(){        
        $mysql =  "mysql:host=". $this->_HOST .";dbname=". $this->_DB_NAME;
        $dbh = new PDO($mysql,$this->_USER,$this->_PASSWORD);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $dbh;
    }

    private function prepare(){
        $dbh = $this->connection();
        $stmt = $dbh->prepare($this->_SQL);
        return $stmt->execute($this->_DATA);
    }
}