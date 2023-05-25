import { LocalDB } from "../classes/LocalDB.js";

export class ReceiptOfPayment extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  handleEvent(Event) {
    if (Event.type === "click") this.close();
  }

  close() {
    let form = document.querySelector(".facturacion__form"),
      producto = document.createElement("new-product");
    form.cliente.value = "";
    form.documento.value = "";
    document.querySelector("#products_list").innerHTML = "";
    document.querySelector("#products_list").append(producto);
    LocalDB.clear();
    this.remove();
  }

  async getStyles() {
    return await (await fetch("dist/css/receipt-of-payment.css")).text();
  }

  async getHTML() {
    let html = /* html */ `<style>${await this.getStyles()}</style>`;
    html += await (
      await fetch("dist/templates/receipt-of-payment.html")
    ).text();
    return html;
  }

  getData() {
    let { fecha, cliente, documento } =
      document.querySelector(".facturacion__form");
    this.shadowRoot.querySelector("#fecha").textContent = fecha.value;
    this.shadowRoot.querySelector("#cliente").textContent = cliente.value;
    this.shadowRoot.querySelector("#documento").textContent = documento.value;
    this.createRows();
  }

  createRows() {
    let products = Object.values(LocalDB.db),
      html = "",
      total = 0;

    products.forEach((product, i) => {
      const VALOR = parseFloat(product.precio) * parseInt(product.cantidad);
      total += VALOR;
      html += /* html */ `
        <tr class="recibo__table-row">
          <td class="recibo__table-cell">${i + 1}</td>
          <td class="recibo__table-cell">${product.nombre}</td>
          <td class="recibo__table-cell">${product.precio}COP</td>
          <td class="recibo__table-cell">${product.cantidad}</td>
          <td class="recibo__table-cell">${VALOR}COP</td>
        </tr>
      `;
    });
    this.shadowRoot.querySelector(".recibo__table-body").innerHTML = html;
    this.shadowRoot.querySelector("#subtotal").textContent = total;
    this.shadowRoot.querySelector("#iva").textContent = total * 1.21;
    this.shadowRoot.querySelector("#total").textContent = total + total * 1.21;
  }

  async connectedCallback() {
    this.shadowRoot.innerHTML = await this.getHTML();
    this.getData();
    this.shadowRoot
      .querySelector(".recibo__close")
      .addEventListener("click", this);
  }
}
