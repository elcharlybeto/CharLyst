import { html } from "../vendor/lit-html/index.js";
import { header } from "../components/header.js";
import { Product } from "../models/Product.js";
import { generateId } from "../utils/varios.js";
import { deshabilitarLista, habilitarLista } from "../utils/varios.js";
import '../vendor/sortable/sortable.js'

export function view() {
  let { productos } = window.state;
  let { carro } = window.state;
  let { historial } = window.state;

  const addProducto = (e) => {
    e.preventDefault();
    let desc = e.target.producto.value;
    if (desc) {
      let nuevo = new Product(generateId(), desc, 0, 1);
      window.state.productos = [ nuevo, ...productos];
      e.target.reset();
    }
    habilitarLista();
  };

  const editProduct = (e) => {
    let prodId = e.target.closest("li").dataset.id;
    let producto = productos.filter((prod) => prod.id == prodId);
    let formuAdd = document.querySelector(".add-item-form");
    let formuEdit = document.querySelector(".edit-item-form");
    formuEdit.style.display = "flex";
    formuAdd.style.display = "none";
    formuEdit.producto.value = producto[0].descripcion;
    formuEdit.dataset.id = prodId;
    deshabilitarLista();
    formuEdit.producto.focus();
  };

  const editar = (e) => {
    if (e.submitter.dataset.tipo == "ok") {
      productos.map((prod) => {
        if (prod.id == e.target.dataset.id) {
          prod.descripcion = e.target.producto.value;
        }
      });
      window.state.productos = [...window.state.productos];
    }
    habilitarLista();
    let formuEdit = document.querySelector(".edit-item-form");
    formuEdit.style.display = "none";
    let formuAdd = document.querySelector(".add-item-form");
    formuAdd.style.display = "flex";
  };

  const deleteProduct = (e) => {
    let prodId = e.target.closest("li").dataset.id;
    let producto = productos.filter((prod) => prod.id == prodId);
    let aux = productos.filter((prod) => prod.id != prodId);
    window.state.productos = [...aux];
    window.state.historial = [producto[0], ...historial];
  };

  const buyProduct = (e) => {
    let prodId = e.target.closest("li").dataset.id;
    let producto = productos.filter((p) => p.id == prodId);
    let formuAdd = document.querySelector(".add-item-form");
    let formuBuy = document.querySelector(".buy-item-form");
    formuAdd.style.display = "none";
    formuBuy.style.display = "flex";
    formuBuy.dataset.id = prodId;
    formuBuy.cantidad.value = producto[0].cantidad;
    formuBuy.precio.value = producto[0].precio != 0 ? producto[0].precio : "";
    deshabilitarLista();
    formuBuy.precio.focus();
  };
  const comprar = (e) => {
    if (e.submitter.dataset.tipo == "ok") {
      if (e.target.precio.value != 0 && e.target.cantidad.value != 0) {
        let comprado = productos.filter(
          (prod) => prod.id == e.target.dataset.id
        );
        comprado[0].precio = e.target.precio.value;
        comprado[0].cantidad = e.target.cantidad.value;
        let aux = productos.filter((prod) => prod.id != e.target.dataset.id);
        window.state.productos = [...aux];
        window.state.carro = [comprado[0], ...carro];
      }
    }
    e.target.style.display = "none";
    e.target.reset();
    let formuAdd = document.querySelector(".add-item-form");
    formuAdd.style.display= "flex";
    habilitarLista();
  };
   


  return html`
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      ${header()}
      
      
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
          <ul class="products-list demo-list-control mdl-list">
            ${window.state.productos.map(
              (prod) =>
                html`
                  <li class="mdl-list__item" data-id=${prod.id}>
                    <button 
                      class="dnd-handler mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
                    >
                      <i class="material-icons">drag_indicator</i>
                    </button>
                    <span class="mdl-list__item-primary-content">
                      ${prod.descripcion}
                    </span>
                    <div class="btn-li-lista">
                      <button
                        @click=${editProduct}
                        class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
                      >
                        <i class="material-icons">edit</i>
                      </button>
                      <button
                        @click=${deleteProduct}
                        class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
                      >
                        <i class="material-icons">delete</i>
                      </button>
                      <button
                        @click=${buyProduct}
                        class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
                      >
                        <i class="material-icons">check</i>
                      </button>
                    </div>
                  </li>
                `
            )}
          </ul>
        </div>
      </main>
        <form autocomplete="off" @submit=${addProducto} class="add-item-form">
          <div 
            class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
          >
            <input @focus=${deshabilitarLista} class="mdl-textfield__input" type="text" id="producto" />
            <label class="mdl-textfield__label" for="producto"
              >Producto...</label
            >
          </div>
          <button 
            class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-js-ripple-effect"
          >
            <i class="material-icons">add</i>
          </button>
        </form>

        <form autocomplete="off" @submit=${editar} class="edit-item-form">
          <div 
            class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
          >
            <input class="mdl-textfield__input" type="text" id="producto" />
            <label class="mdl-textfield__label" for="producto"></label>
          </div>
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

        <form autocomplete="off" @submit=${comprar} class="buy-item-form">
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

  const moveArrayItem = (array, from, to)=> {
    const item = array[from];
    array.splice(from,1);
    array.splice(to,0,item);
    };
    
  const el = document.querySelector(".products-list");
  Sortable.create(el,{
    handle: ".dnd-handler",
   // ghostClass: "ghost",
    onEnd: e=>{
      moveArrayItem(window.state.productos, e.oldIndex, e.newIndex);
      localStorage.setItem('productos',JSON.stringify(window.state.productos));
  
    }
    
  });
  

}
