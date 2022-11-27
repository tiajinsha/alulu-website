import type { APIContext } from 'astro';
import { defaultVideoType, getVideoType } from 'src/modules/module';

export const post = async ({ request, cookies }: APIContext) => {
  /* try {
    const responseVideo = await httpGet<any>(
      responseData.data[0].remote_files[defaultVideoType].url,
      {},
      {
        responseType: 'stream',
        headers: {
          'x-url-signature':
            responseData.data[0].remote_files[defaultVideoType].headers['x-url-signature'],
        },
      },
    );
    return new Response(responseVideo.data, {
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify(error), {
      status: error.code,
    });
  } */
};
