export class RemoteDB {
  #_URL = "scripts/ajax.php";
  #_CONFIG = {
    method: "POST",
  };
  constructor(data) {
    this.#_CONFIG.body = data;
  }

  async peticion() {
    const RESPONSE = await (await fetch(this.#_URL, this.#_CONFIG)).text();
    console.log(RESPONSE);
    return true;
  }
}
