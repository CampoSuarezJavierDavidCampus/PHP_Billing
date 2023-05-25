import { RemoteDB } from "./classes/RemoteDB.js";
import { LocalDB } from "./classes/LocalDB.js";
import { NewProduct } from "./components/new-product.js";
import { ReceiptOfPayment } from "./components/receipt-of-payment.js";

customElements.define("new-product", NewProduct);
customElements.define("receipt-of-payment", ReceiptOfPayment);

document.querySelector("#products_add").addEventListener("click", (e) => {
  const newProduct = document.createElement("new-product");

  document.querySelector("#products_list").append(newProduct);
});

document.addEventListener("db:change", (e) => {  
  let { change } = e.detail;
  switch (change) {
    case "add":
      LocalDB.add(e.detail);
      break;
    case "delete":
      LocalDB.delete(e.detail);
      break;
  }
});

document
  .querySelector(".facturacion__form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    let { cliente, documento } = e.target;     
    cliente = cliente.value;
    documento = documento.value;    
    try {
      validarDatos({cliente,documento})
      let res = await conectionDB({cliente,documento});       
      if(res)mostrarFacturacion();    
    }catch (err){
      console.error(err)
      alert('Ups hemos tenido un error')
    }

  });

  async function conectionDB({ cliente, documento } = datos){    
    let 
    fecha = document.querySelector('.facturacion__form').fecha.value,
    data = new FormData();;    
    data.append(
      "cliente",
      JSON.stringify({
        fecha,
        cliente: cliente,
        documento: documento,
        productos: Object.values(LocalDB.db),
      })
    );
    let res = new RemoteDB(data);
    res = await res.peticion();    
    if(res.error){
      console.error(res.error)
      throw Error('HA OCURRIDO UN ERROR')
    };
    return res.result
  }

  function validarDatos({ cliente, documento } = datos){    
    if(cliente.trim()=='' || isNaN(parseInt(documento)))
      throw Error('LOS DATOS NO SON VALIDOS');        
  }

  function mostrarFacturacion(){    
    
    const recibo = document.createElement('receipt-of-payment');    
    document.querySelector(".principal").append(recibo);
  }