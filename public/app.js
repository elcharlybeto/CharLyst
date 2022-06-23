// import "./vendor/mdl/material.min.js"; // <script src="./vendor/mdl/material.min.js"></script> en index.html
// import "./vendor/sortable/sortable.js"; // <script src="./vendor/sortable/sortable.js"></script> en index.html
import { router } from "./utils/router.js";
import { State } from "./models/state.js";
// import {VAPID_PUBLIC_KEY} from "./config.js";


window.state = new State(
  JSON.parse(localStorage.getItem("productos")) || [],
  JSON.parse(localStorage.getItem("carro")) || [],
  JSON.parse(localStorage.getItem("historial")) || []
);


window.addEventListener("load", e=>{
  // registrarSW();
  router();
});

window.addEventListener("hashchange", router);

// const channel = new BroadcastChannel("sw-messages"); //me conecto al canal de mensajes del sw

// channel.addEventListener("message", e=>{
//   const {data} = e;
//   window.state.notifications = [...window.state.notifications, data];
// });

// async function registrarSW(){
//   if ("serviceWorker" in navigator) {
//     //si el navegador es compatible con service workers
//     const registration = await navigator.serviceWorker.register("sw.js"); //lo registramos (lo vinculamos a nuestra app)

//     await navigator.serviceWorker.ready; //espera a que el sw esté activo

//     const subscripcion = await registration.pushManager.subscribe({
//       userVisibleOnly: true,
//       applicationServerKey: VAPID_PUBLIC_KEY
//     });

//     fetch('/subscribe',{
//       method: 'post',
//       headers: {'Content-Type':'application/jason'},
//       body: JSON.stringify(subscripcion)
//     })
//     .then(r=>r.json())
//     .then(console.log); //cuando la promesa devuelve un único valor y queremos usarlo en una función, podemos
//                        //poner únicamente el nombre de la función (se asume la respuesta del then como parámetro).
    
  
//     registration.addEventListener("updatefound", (e) => { //este evento en desarrollo hay que comentarlo
//       if (registration.installing) {
//         registration.installing.addEventListener("statechange", (e) => {
//           if (navigator.serviceWorker.controller) {
//             console.log("Nueva versión del SW detectada!");
//             if (registration.waiting) {
//               updateSW(registration);
//             }
//           } else {
//             console.log("Primera instalación del SW");
//           }
//         });
//       }
//     });
//   }
//}


// function updateSW(registration) {
//   if (confirm("¿Desea instalar una actualización?")) {
//     registration.waiting.postMessage("SKIP_WAITING"); //el mensaje puede ser cualquier texto
//   }
// }
