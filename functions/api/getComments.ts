import type { APIContext } from 'astro';
import { getComments } from 'src/utils/api';
export const get = async ({ request }: APIContext) => {
  const response = await getComments(request);
  return new Response(JSON.stringify(response), {
    status: response.status,
  });
};
