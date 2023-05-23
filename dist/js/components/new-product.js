export default class newProduct extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  async getStyles() {
    return await (await fetch("dist/css/new-product.css")).text();
  }
  async getTemplate() {
    let hrml = /* html */ `
        <style>
            ${this.getStyles()}
        </style>
    `;
    html += await (await fetch("dist/templates/new-product.html")).text();
    return html;
  }
  connectedCallback() {}
}
