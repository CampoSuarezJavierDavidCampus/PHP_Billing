export class NewProduct extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  handleEvent(e){          
      e.preventDefault();
      if(e.type === 'submit') this.acciones(e);
  }

  async acciones(e){
    let type = e.submitter.dataset.type;
    type == 'delete'
      ? this.delete(this)
      : this.add();     
  }

  delete(){
    this.remove();
  }

  async add(){    
    let {nombre,precio,cantidad,error} = this.validarsDatos();
    if(error)this.mostrarMensaje(error,"error");    
  }

  validarsDatos(){ 
    let {nombre,precio,cantidad} = this.shadowRoot.querySelector('FORM');
    nombre = nombre.value
    precio = precio.value
    cantidad = cantidad.value

    if(
      (precio == '' || isNaN(parseFloat(precio))) || 
      (cantidad == '' || isNaN(parseInt(precio))) ||
      nombre == ''
    ){
      return {error:'DATOS NO VALIDOS'}
    }

    precio = parseFloat(precio).toFixed(2);
    cantidad = parseInt(cantidad);
          
    return {
      nombre,
      precio,
      cantidad
    }
  }

  mostrarMensaje(text,estado){
    let mensaje = this.shadowRoot.querySelector('#message');

    mensaje.textContent = text;
    mensaje.setAttribute('data-show','true');
    mensaje.setAttribute('data-state',estado);

    setTimeout(()=>{
      mensaje.setAttribute('data-show','false');
      mensaje.setAttribute('data-state','');
    },4000)

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
