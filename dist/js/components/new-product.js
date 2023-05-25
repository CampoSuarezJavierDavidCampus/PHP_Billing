export class NewProduct extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  handleEvent(e) {
    e.preventDefault();
    if (e.type === "submit") this.acciones(e);
  }

  async connectedCallback() {
    this.shadowRoot.innerHTML = await this.getTemplate();
    this.shadowRoot.querySelector("FORM").addEventListener("submit", this);
  }

  async getStyles() {
    return await (await fetch("dist/css/new-product.css")).text();
  }

  async getTemplate() {
    let html = /* html */ `
        <style>
            ${await this.getStyles()}
        </style>
    `;
    html += await (await fetch("dist/templates/new-product.html")).text();
    let date = new Date();
    this.id = date.getTime();
    return html;
  }

  acciones(e) {
    let type = e.submitter.dataset.type;
    type == "delete" ? this.delete(this) : this.add();
  }

  delete() {
    this.crearEvento({ change: "delete", id: this.id });
    this.remove();
  }

  add() {
    let { nombre, precio, cantidad, error } = this.validarsDatos();
    if (error) {
      this.mostrarMensaje(error, "error");
    } else {
      this.crearEvento({
        change: "add",
        id: this.id,
        nombre,
        precio,
        cantidad
      });
    }
  }

  crearEvento(detail) {
    const EVENT = new CustomEvent("db:change", {
      detail: detail,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(EVENT);
  }

  validarsDatos() {
    let { nombre, precio, cantidad } = this.shadowRoot.querySelector("FORM");
    nombre = nombre.value;
    precio = precio.value;
    cantidad = cantidad.value;

    if (
      precio == "" ||
      isNaN(parseFloat(precio)) ||
      cantidad == "" ||
      isNaN(parseInt(precio)) ||
      nombre == ""
    ) {
      return { error: "DATOS NO VALIDOS" };
    }

    precio = parseFloat(precio).toFixed(2);
    cantidad = parseInt(cantidad);

    return {
      nombre,
      precio,
      cantidad,
    };
  }

  mostrarMensaje(text, estado) {
    let mensaje = this.shadowRoot.querySelector("#message");

    mensaje.textContent = text;
    mensaje.setAttribute("data-show", "true");
    mensaje.setAttribute("data-state", estado);

    setTimeout(() => {
      mensaje.setAttribute("data-show", "false");
      mensaje.setAttribute("data-state", "");
    }, 4000);
  }
}
