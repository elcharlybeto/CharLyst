export function goToMain () {
    window.location.hash = "#/main";
  };

  export function generateId(){
    return Math.ceil(Math.random() * 100000); // también se puede usar Math.round() o Math.floor()
}

export function deshabilitarLista(){
  let lista = document.getElementById("lista");
  lista.classList.add("disabledDiv");
};

  
export function habilitarLista(){
  let lista = document.getElementById("lista");
  lista.classList.remove("disabledDiv");
};