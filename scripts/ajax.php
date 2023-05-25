<?php

if (isset($_POST) && isset($_POST['cliente'])){
    include_once('productos.php');
    $cliente = json_decode($_POST['cliente'],true);
    $cliente['productos']= json_encode($cliente['productos']);
    $product = new Productos($cliente);
    $res = $product->add();
    echo var_dump($res);
}