import { html } from "../vendor/lit-html/index.js";
import { header } from "../components/header.js";

export function view() {

  let { productos } = window.state;
  let { historial } = window.state;

  const deleteProduct = e=>{
    let prodId=e.target.closest('li').dataset.id;
    let aux = historial.filter(prod => prod.id != prodId );
    window.state.historial = [...aux];
  };

  const addProduct = e=>{
    let prodId=e.target.closest('li').dataset.id;
    let producto = historial.filter(prod => prod.id == prodId );
    let aux = historial.filter(prod => prod.id != prodId );
    window.state.historial = [...aux];
    window.state.productos = [producto[0], ...productos];
  };

  return html`
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
     ${header()}
      
      <main class="mdl-layout__content">
        <div class="page-content">
          <style>
            .demo-list-control {
              width: 300px;
            }
            .demo-list-radio {
              display: inline;
            }
          </style>
          <ul class="demo-list-control mdl-list">
           ${historial.map(h => html`
           <li class="mdl-list__item" data-id=${h.id}>
              <button @click=${deleteProduct}
                class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
              >
                <i class="material-icons">delete</i>
              </button>
              <span class="mdl-list__item-primary-content">
                ${h.descripcion}
              </span>
              <button @click=${addProduct}
                class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
              >
                <i class="material-icons">check</i>
              </button>
            </li>
           `)}
            

          </ul>
        </div>
      </main>
    </div>
  `;
}

export function init() {
  const div = document.getElementById("app");
  componentHandler.upgradeElements(div);
}
