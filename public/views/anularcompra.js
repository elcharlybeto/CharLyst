import { html } from "../vendor/lit-html/index.js";
import { header } from "../components/header.js";
import { goToMain } from "../utils/varios.js";

export function view() {
  let { productos } = window.state;
  let { carro } = window.state;

  const anularCompra = () => {
    window.state.productos = [...carro, ...productos];
    window.state.carro = [];
    goToMain();
  };

  

  return html`
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      ${header()}
      <main class="contenedor">
        <div class="confirm">
          <div class="pregunta">¿Desea vaciar el carro de compras?</br>TODOS los productos volverán a la LISTA <i class="material-icons"> storage </i> </div>
          <div class="respuestas">
            <button @click=${anularCompra}
              class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored btn-ok"
            >
              <i class="material-icons">check</i>
            </button>
            <button @click=${goToMain}
              class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored btn-cancel"
            >
              <i class="material-icons">cancel</i>
            </button>
          </div>
        </div>
      </main>
    </div>
  `;
}

export function init() {
  const div = document.getElementById("app");
  componentHandler.upgradeElements(div);
}
