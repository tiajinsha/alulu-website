export default {
  async fetch(request, env) {
    return await handleRequest(request);
  },
};

async function handleRequest(request) {
  return new Response('Hello world');
}
