var cacheName = 'petstore-v1'
var cacheFiles = [
    'index.html',
    'items.js',
    'index.webmanifest',
    'assets/art.jpg',
    'assets/cookinng.png',
    'assets/english.jpg',
    'assets/football.png',
    'assets/french.jpg',
    'assets/german.jpg',
    'assets/math symbol.png',
    'assets/robot.png',
    'assets/swimming.jpg',
    'assets/tailoring.jpg'
]

self.addEventListener('install',(e) => {
    console.log('[Service worker] Installing');
    e.waitUntil(
        caches.open(cacheName).then((cache)=>{
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles)
        })
    )
})

self.addEventListener('fetch',(e) => {
    e.respondWith(
        caches.match(e.request).then((r)=>{
            console.log(`[Service Worker] Fetching resources: ${e.request.url}`);
            return r || fetch(e.request).then((res)=>{
                return caches.open(cacheName).then((cache)=>{
                    cache.put(e.request,res.clone());
                    return res
                })
            })
        })
    )
})