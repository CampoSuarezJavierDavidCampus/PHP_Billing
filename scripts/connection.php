<?php
include_once('config.php');
class Connection extends Config{
    public function __construct($sql,){
        $this->SQL = $sql;        
    }

    private function connection(){        
        $mysql =  "mysql:host=". parent::$_HOST .";dbname=". parent::$_DB_NAME;
        $db = new PDO($mysql,parent::$_USER,parent::$_PASSWORD);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $dbh;
    }
}