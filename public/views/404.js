import {html} from '../vendor/lit-html/index.js';
import { header } from "../components/header.js";

export function view() {
  return html`
  ${header()}
  <main class="main404">
        <div class="oops">
        <img id="oops" src="images/oops.jpg" alt="oops">
        <p>Página no encontrada!!!</p>
        <a href="#/main">Volver a la Lista... <i class="material-icons"> storage </i></a>
        </div>
    </main>
    `
  }

export function init() {
  const div = document.getElementById("app");
  componentHandler.upgradeElements(div);
}
