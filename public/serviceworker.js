
const CACHE_NAME = 'alulu-website';
const urlsToCache = [  // The list of resources to cache
  '/',
  "./android-chrome-512x512.png"
];
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
});


self.addEventListener('fetch', event => {
  if(event.request.url.includes("/picture/download/")){
    event.respondWith(customHeaderRequestFetch(event,'img'))
  }
  if(event.request.url.includes("/video-file.workers.aludev.io/video/")){
    event.respondWith(customHeaderRequestFetch(event,'video'))
  }
})

function customHeaderRequestFetch(event,type) {
  const urlList=event.request.url.split("?")
  console.log(event.request.url)
  const newRequest = new Request(urlList[0], {
    mode: 'cors',
    method: 'GET', 
    headers: {
      'x-url-signature': urlList[1].split("=")[1]
    }
  })
  return fetch(newRequest).catch(()=> {
    if(type==="img"){
      return  caches.match("./android-chrome-512x512.png")
    }
  })
}



