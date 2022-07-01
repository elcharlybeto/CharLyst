import { html } from "../vendor/lit-html/index.js";
import { header } from "../components/header.js";
import { goToMain } from "../utils/varios.js";

export function view() {
  let { productos } = window.state;
  let { historial } = window.state;

  const vaciarLista = () => {
    window.state.historial = [...productos, ...historial];
    window.state.productos = [];
    goToMain();
  };

  

  return html`
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      ${header()}
      <main class="contenedor">
        <div class="confirm">
          <div class="pregunta">¿Desea vaciar la lista?</br>TODOS los productos pasarán al HISTORIAL <i class="material-icons">schedule</i> </div>
          <div class="respuestas">
            <button @click=${vaciarLista}
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
