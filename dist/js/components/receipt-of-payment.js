export class ReceiptOfPayment extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
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

  async connectedCallback() {
    this.shadowRoot.innerHTML = await this.getHTML();
  }
}
