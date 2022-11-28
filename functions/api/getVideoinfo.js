export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const video_ids = url.searchParams.get('video_ids');

  return new Response(JSON.stringify({ data: video_ids }), {
    status: 200,
  });
}
