import { html } from "../vendor/lit-html/index.js";

export function header() {
  const goToList = (e) => {
    window.location.hash = "#/main";
  };

  const goToCart = (e) => {
    window.location.hash = "#/carro";
  };

  const goToHistorial = (e) => {
    window.location.hash = "#/historial";
  };

  return html`
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">CharLyst</span>
        <div class="mdl-layout-spacer"></div>
        <div class="header-buttons">
          <button
            id="btn-lista"
            @click=${goToList}
            class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
          >
            <i class="material-icons">storage</i>
          </button>
          <button
            id="btn-carro"
            @click=${goToCart}
            class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
          >
            <i class="material-icons">shopping_cart_checkout</i>
          </button>
          <button
            id="btn-histo"
            @click=${goToHistorial}
            class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
          >
            <i class="material-icons">schedule</i>
          </button>
        </div>
      </div>
    </header>

    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">Charly´s List</span>
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="#/vaciarlista">Vaciar Lista</a>
        <a class="mdl-navigation__link" href="#/vaciarcarro">Vaciar Carro</a>
        <a class="mdl-navigation__link" href="#/vaciarhisto"
          >Vaciar Historial</a
        >
        <a class="mdl-navigation__link" href="#/anularcompra"
          >Anular Compra</a
        >
      </nav>
    </div>
  `;
}
