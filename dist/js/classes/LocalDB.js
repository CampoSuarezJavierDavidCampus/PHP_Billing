export class LocalDB {
  static db = {};

  static delete(detail) {
    let { id } = detail;    
    if (id in LocalDB.db) delete LocalDB.db[id];
  }
  static add(detail) {
    let { id, nombre, precio, cantidad,fecha } = detail;    
    LocalDB.db[id] = { nombre, precio, cantidad, fecha };    
    LocalDB.save("CAMBIO GUARDADO",id);
  }

  static save(message, id ) {            
      let mensaje = document.querySelector(`[id="${id}"]`).shadowRoot.querySelector("#message");
      mensaje.textContent = message;
      mensaje.setAttribute("data-show", "true");
      mensaje.setAttribute("data-state", 'save');

      setTimeout(() => {
        mensaje.setAttribute("data-show", "false");
        mensaje.setAttribute("data-state", "");
      }, 4000);    
  }
}
