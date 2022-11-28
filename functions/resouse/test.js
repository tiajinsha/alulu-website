addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

/** * Fetch and log a request * @param {Request} request */
function handleRequest(request) {
  return new Response('Hello worker!');
}
