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
    let { nombre, cedula } = e.target,
      data = new FormData();
    nombre = nombre.value;
    cedula = cedula.value;
    data.append(
      "cliente",
      JSON.stringify({
        cliente: nombre,
        documento: cedula,
        productos: Object.values(LocalDB.db),
      })
    );
    let res = new RemoteDB(data);
    res = await res.peticion();
    //console.log(res);
  });
