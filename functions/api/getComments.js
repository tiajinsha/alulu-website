export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const video_ids = url.searchParams.get('video_ids');
  const response = await fetch(
    `http://165.227.181.143:8000/api/v1/comment?comment_type=Video&limit=200&subject_id=${video_ids}`,
    {
      method: 'get',
      headers: request.headers,
    },
  ).then((res) => res.json());
  return new Response(JSON.stringify(response), {
    status: response.status,
  });
}
