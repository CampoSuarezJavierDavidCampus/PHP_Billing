<section class='facturacion'>
    <form class='facturacion__form'>
        <?php 
            include_once('inputs.php');
            include_once('products.php');
        ?>
        <button class='facturacion__form-submit' type='submit'>generar factura</button>
        <div class="facturacion__notification" id="notification"></div>
    </form>  
</section>