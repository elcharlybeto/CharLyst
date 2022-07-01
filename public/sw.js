const SW_VERSION = 'v2'; 
const CACHE_SHELL_NAME = "cache-v1";
const CACHE_SHELL_FILES = [
  "/",
  "/index.html",
  "/sw.js",
  "/style.css",
  "/app.js",
  "/manifest.json",
  "/views/404.js",
  "/views/main.js",
  "/views/carro.js",
  "/views/historial.js",
  "/views/vaciarlista.js",
  "/views/vaciarcarro.js",
  "/views/vaciarhisto.js",
  "/utils/varios.js",
  "/utils/router.js",
  "/components/header.js",
  "/models/Product.js",
  "/models/state.js",
  "/images/oops.jpg",
  "/favicon.png"
];
const CACHE_VENDOR_NAME = "vendor-v1";
const CACHE_VENDOR_FILES = [
  "/vendor/lit-html/csstag.js",
  "/vendor/lit-html/html.js",
  "/vendor/lit-html/index.js",
  "/vendor/lit-html/reactive.js",
  "/vendor/mdl/icons.css",
  "/vendor/mdl/icons.woff2",
  "/vendor/mdl/material.min.css",
  "/vendor/mdl/material.min.js",
  "/vendor/sortable/sortable.js",
];

self.addEventListener("install", (e) => {
  const promCacheShell = caches
    .open(CACHE_SHELL_NAME)
    .then((cache) => cache.addAll(CACHE_SHELL_FILES));

  const promCacheVendor = caches
    .open(CACHE_VENDOR_NAME)
    .then((cache) => cache.addAll(CACHE_VENDOR_FILES));

  const promTodoInstalado = Promise.all([promCacheShell, promCacheVendor]);
  e.waitUntil(promTodoInstalado);
});

self.addEventListener("activate", (e) => {
  const whiteList = [CACHE_SHELL_NAME, CACHE_VENDOR_NAME];
  caches.keys().then((cacheNames) => {
    return Promise.all(
      cacheNames.map((cacheName) => {
        if (whiteList.indexOf(cacheName) == -1) {
          return caches.delete(cacheName);
        }
      })
    );
  });
});

self.addEventListener("fetch", (e) => {
  if(e.request.method != "GET") return; 
  if(e.request.url.indexOf('http')!=0) return;
  const respuestaFinal = caches.match(e.request).then((res) => {
    if (res) {
      return res;
    } else {
      return fetch(e.request).then((serverRes) => {
        caches
          .open(CACHE_SHELL_NAME)
          .then((cache) => cache.put(e.request, serverRes));
        return serverRes.clone();
      });
    }
  });
  e.respondWith(respuestaFinal);
});

 self.addEventListener('message', e => {
    if(e.data == 'SKIP_WAITING'){
        self.skipWaiting();
    }
}); 

