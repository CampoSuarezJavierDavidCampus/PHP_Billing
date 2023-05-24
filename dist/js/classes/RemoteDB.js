export class RemoteDB {
  #_URL = "scripts/db.php";
  #_CONFIG = {
    method: "POST",
  };
  constructor(data) {
    this.#_CONFIG.body = data;
  }

  async peticion() {
    console.log(this.#_CONFIG);
    const RESPONSE = await (await fetch(this.#_URL, this.#_CONFIG)).text();
    console.log(RESPONSE);
    return RESPONSE;
  }
}
