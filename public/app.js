import "./vendor/mdl/material.min.js"; 
import { router } from "./utils/router.js";
import { State } from "./models/state.js";


window.state = new State(
  JSON.parse(localStorage.getItem("productos")) || [],
  JSON.parse(localStorage.getItem("carro")) || [],
  JSON.parse(localStorage.getItem("historial")) || []
);


window.addEventListener("load", e=>{
  registrarSW();
  router();
});

window.addEventListener("hashchange", router);



async function registrarSW(){
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.register("sw.js");
    await navigator.serviceWorker.ready; 

  
    registration.addEventListener("updatefound", (e) => { //este evento en desarrollo hay que comentarlo
      if (registration.installing) {
        registration.installing.addEventListener("statechange", (e) => {
          if (navigator.serviceWorker.controller) {
            console.log("Nueva versión del SW detectada!");
            if (registration.waiting) {
              updateSW(registration);
            }
          } else {
            console.log("Primera instalación del SW");
          }
        });
      }
    });
  }
}


function updateSW(registration) {
  if (confirm("¿Desea instalar una actualización?")) {
    registration.waiting.postMessage("SKIP_WAITING"); //el mensaje puede ser cualquier texto
  }
}
