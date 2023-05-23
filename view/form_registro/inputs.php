<?php
    date_default_timezone_set('America/Bogota');
    $date = date('Y-m-d H:i');    
    $id = (int) date('YmdHi');
    $id *= round(rand(1,7));    
?>

<article class='facturacion__encabezado'>                
    <label class='facturacion__encabezado-label'>
        <span class='facturacion__encabezado-label-description'>N°</span>
        <input class="facturacion__encabezado-label-input" type="text" name='id' value='<?= $id ?>' disabled>
    </label>
    <label class='facturacion__encabezado-label'>
        <span class='facturacion__encabezado-label-description'>fecha de creacion</span>
        <input class="facturacion__encabezado-label-input" type="text" name="fecha" value = '<?= $date?>' disabled>
    </label>
    <label class='facturacion__encabezado-label'>
        <span class='facturacion__encabezado-label-description'>nombre del cliente</span>
        <input class="facturacion__encabezado-label-input" type="text" name='nombre' required pattern="[A-Za-z0-9]+" placeholder='Nombre'>
    </label>
    <label class='facturacion__encabezado-label'>
        <span class='facturacion__encabezado-label-description'>N° Documento</span>
        <input class="facturacion__encabezado-label-input" type="text" name='cedula' require="[0-9]" placeholder='xxxxxxxxxxxx' pattern>
    </label>                              
</article>