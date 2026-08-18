const CACHE="zhuoxin-v1";
const CORE=["/","/manifest.json","/icon-192.png","/icon-512.png","/apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil((async()=>{try{const c=await caches.open(CACHE);await Promise.allSettled(CORE.map(u=>c.add(u)));}catch(_){}
  self.skipWaiting();})());});
self.addEventListener("activate",e=>{e.waitUntil((async()=>{const ks=await caches.keys();await Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim();})());});
self.addEventListener("fetch",e=>{const req=e.request;if(req.method!=="GET")return;const url=new URL(req.url);
  if(url.origin!==location.origin)return; // Supabase/CDN 交給網路,離線時App自動降級
  e.respondWith((async()=>{try{const res=await fetch(req);const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{});return res;}
    catch(_){const cached=await caches.match(req);return cached||caches.match("/")||new Response("離線中",{status:503});}})());});
