export class NewProduct extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  handleEvent(e){    
      e.preventDefault();
      if(e.type === 'submit') this.actions(e);
  }

  async actions(e){
    let type = e.submitter.dataset.type;
    type == 'delete'
      ? this.delete(this)
      : this.add();     
  }

  add(){    
    console.log(this.validarsDatos())  
  }

  validarsDatos(){
    console.log(new FormData())
    const 
      FORM = this.shadowRoot.querySelector('FORM'),
      DATAFORM = new FormData(FORM),
      DATA = DATAFORM;
    console.log(DATA)
    
    return DATA
  }

  delete(){
    this.remove();
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
    return html;
  }
  async connectedCallback() {
    this.shadowRoot.innerHTML = await this.getTemplate();    
    this.shadowRoot.querySelector('FORM').addEventListener('submit',this)
  }
}
