export class LocalDB {
  static db = {};

  static delete(detail) {
    let { id } = detail;
    console.log(id);
    if (id in LocalDB.db) delete LocalDB.db[id];
    LocalDB.notification("EL ELEMENTO HA SIDO ELIMINADO CON EXITO");
  }
  static add(detail) {
    let { id, nombre, precio, cantidad } = detail;
    LocalDB.db[id] = { nombre, precio, cantidad };
    LocalDB.notification("EL ELEMENTO HA SIDO ACTUALIZADO CON EXITO");
  }

  static notification(message, type) {
    let notification = document.querySelector("#notification");
    notification.textContent = message;
  }
}
