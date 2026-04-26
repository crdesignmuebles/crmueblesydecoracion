// CR Muebles - Service Worker
const CACHE_NAME = 'cr-muebles-v1';
const urlsToCache = [
  '/crmueblesydecoracion/',
  '/crmueblesydecoracion/configurador-3d.html',
  '/crmueblesydecoracion/offline.html',
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap',
  'https://unpkg.com/three@0.128.0/build/three.module.js'
];

// Instalación
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activación
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

// Fetch - estrategia: network first
self.addEventListener('fetch', event => {
  if (event.request.url.includes('formsubmit.co')) return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
