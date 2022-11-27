import type { APIContext } from 'astro';
import { getVideoinfo } from 'src/utils/api';

export const get = async ({ request }: APIContext) => {
  const response = await getVideoinfo(request);
  return new Response(JSON.stringify(response), {
    status: response.status,
  });
};
