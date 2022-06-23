export class State {
  #productos;
  #carro; 
  #historial;

  constructor(productos, carro, historial) {
    this.#productos = productos;
    this.#carro = carro;
    this.#historial = historial;
  }

  get productos() {
    return this.#productos;
  }

  set productos(nuevoValor) {
    this.#productos = nuevoValor;

    const eventoHash = new Event("hashchange");
    window.dispatchEvent(eventoHash);

    this.#save('productos');
  }

  get carro() {
    return this.#carro;
  }

  set carro(nuevoValor) {
    this.#carro = nuevoValor;

    const eventoHash = new Event("hashchange");
    window.dispatchEvent(eventoHash); 

    this.#save('carro');
  }

  get historial() {
    return this.#historial;
  }

  set historial(nuevoValor) {
    this.#historial = nuevoValor;

    const eventoHash = new Event("hashchange");
    window.dispatchEvent(eventoHash);

    this.#save('historial');
  }

  #save(prop){
   let json = JSON.stringify(this[prop]);
   localStorage.setItem(prop,json);
  }
}
