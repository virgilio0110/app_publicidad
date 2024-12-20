const CACHE_NAME = 'pwa-publicidad-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/app.js',
    '/estilo.css',
    '/icon-192x192.png',
    '/manifest.json'
];

// Evento de instalación: almacena los archivos en caché
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Archivos en caché');
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting(); // Forzar que este Service Worker se active inmediatamente
});

// Activar el nuevo Service Worker y eliminar cachés antiguos
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Eliminando caché viejo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim(); // Forzar que este Service Worker tome control
});

// Interceptar solicitudes y servir desde el caché
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            const fetchPromise = fetch(event.request).then(networkResponse => {
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, networkResponse.clone());
                });
                return networkResponse;
            });
            return response || fetchPromise;
        })
    );
});

