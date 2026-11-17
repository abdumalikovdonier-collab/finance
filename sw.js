// Keeps the app shell available without a connection. Network first, so an update is picked up on the next online start.
const C = 'fin-6569dc72e6';
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(['./', 'app.js?v=6569dc72e6', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png'])).catch(() => {})); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== self.location.origin) return;
  e.respondWith(fetch(e.request).then(r => { if (r.ok) { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); } return r; })
    .catch(() => caches.match(e.request).then(r => r || (e.request.mode === 'navigate' ? caches.match('./') : Response.error()))));
});
