const CACHE='financeiro-pwa-v3';
const ASSETS=['./','./index.html','./manifest.json','./config.js'];

self.addEventListener('install',event=>{
  event.waitUntil(
    caches.open(CACHE)
      .then(cache=>cache.addAll(ASSETS))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(
        keys.filter(key=>key.startsWith('financeiro-pwa-')&&key!==CACHE)
            .map(key=>caches.delete(key))
      ))
      .then(()=>self.clients.claim())
  );
});

// Prioriza a versão publicada na rede. O cache é apenas um plano B
// quando o dispositivo estiver sem conexão.
self.addEventListener('fetch',event=>{
  const request=event.request;
  const url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==self.location.origin)return;
  if(request.mode==='navigate'||url.pathname.endsWith('.html')||url.pathname.endsWith('/config.js')){
    event.respondWith(
      fetch(request).then(response=>{
        if(response&&response.ok){
          const copy=response.clone();
          caches.open(CACHE).then(cache=>cache.put(request,copy));
        }
        return response;
      }).catch(()=>caches.match(request).then(cached=>cached||Response.error()))
    );
  }
});
