import { html } from "../vendor/lit-html/index.js";
import { header } from "../components/header.js";
import { deshabilitarLista, habilitarLista } from "../utils/varios.js";

export function view() {
  let { productos } = window.state;
  let { carro } = window.state;

  const totalCarro = () => {
    let total = 0;
    if (carro.length > 0) {
      carro.map((p) => {
        total += p.cantidad * p.precio;
      });
      total= total % 1 == 0? total : total.toFixed(2);
    };
    return total;
  };
  const goToEdit = e=>{
    let prodId=e.target.closest('li').dataset.id;
    let producto = carro.filter((prod) => prod.id == prodId);
    let formuEdit = document.querySelector(".edit-buy-item-form");
    formuEdit.style.display = "flex";
    formuEdit.precio.value = producto[0].precio;
    formuEdit.cantidad.value = producto[0].cantidad;
    formuEdit.dataset.id = prodId;
    deshabilitarLista();
    formuEdit.precio.focus();

  }
  const editCompra = (e)=>{

    if (e.submitter.dataset.tipo == "ok") {
      if(e.target.precio.value !=0 && e.target.cantidad.value !=0){
        carro.map((prod) => {
          if (prod.id == e.target.dataset.id) {
            prod.precio = e.target.precio.value;
            prod.cantidad = e.target.cantidad.value;
          }
        });
        window.state.carro = [...carro];
      }
    }
    let formuAdd = document.querySelector(".edit-buy-item-form");
    habilitarLista();
    formuAdd.style.display = "none";

  }

  const deleteProduct = e=>{
    let prodId = e.target.closest("li").dataset.id;
    let producto = carro.filter((prod) => prod.id == prodId);
    let aux = carro.filter((prod) => prod.id != prodId);
    window.state.carro = [...aux];
    window.state.productos = [producto[0], ...productos];
  };

  return html`
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      ${header()}
      
      <div class="totales">Total: $ ${totalCarro()}</div>
      <main id="lista" class="mdl-layout__content">
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
            ${carro.map((prod) => 
              html `
              <li class="mdl-list__item" data-id=${prod.id}>
               <span class="cant-prod">${prod.cantidad}</span>
               <span class="mdl-list__item-primary-content">
                ${prod.descripcion} - Precio: $ ${(prod.cantidad * prod.precio).toFixed(2)}
               </span>
              <button @click=${deleteProduct}
                 class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
              >
                <i class="material-icons">delete</i>
              </button>
              <button @click=${goToEdit}
                class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
              >
                <i class="material-icons">edit</i>
              </button>
            </li>
              `
            )}
            
          </ul>
        </div>
        </main>
        <form autocomplete="off" @submit=${editCompra} class="edit-buy-item-form">
          <span class="buy-text">$</span>
          <div
            class="buy-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
          >
            <input
              class="mdl-textfield__input"
              type="text"
              pattern="-?[0-9]*(.[0-9]+)?"
              id="precio"
              inputmode="numeric"
            />
            <label class="mdl-textfield__label" for="precio"
              >Precio unit/kg</label
            >
            <span class="mdl-textfield__error">Error en ingreso</span>
          </div>
          <div
            class="buy-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
          >
            <input
              class="mdl-textfield__input"
              type="text"
              pattern="-?[0-9]*(.[0-9]+)?"
              id="cantidad"
              inputmode="numeric"
            />
            <label class="mdl-textfield__label" for="cantidad"
              >Cantidad...</label
            >
            <span class="mdl-textfield__error">Ingreso erróneo</span>
          </div>
          <span class="buy-text">un/kg</span>
          <button
            class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-js-ripple-effect btn-ok"
            data-tipo="ok"
          >
            <i class="material-icons">check</i>
          </button>
          <button
            class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-js-ripple-effect btn-cancel"
            data-tipo="cancel"
          >
            <i class="material-icons">cancel</i>
          </button>
        </form>
      
    </div>
  `;
}

export function init() {
  const div = document.getElementById("app");
  componentHandler.upgradeElements(div);
}
