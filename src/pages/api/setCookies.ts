import type { APIContext } from 'astro';

const ENV = {
  ALULU_REGISTER_URL: import.meta.env.ALULU_REGISTER_URL,
  ALULU_BASE_URL: import.meta.env.ALULU_BASE_URL,
  REF_TOKEN_URL: import.meta.env.REF_TOKEN_URL,
  TOKEN_NAME: import.meta.env.TOKEN_NAME,
};

export async function get({ cookies, request }: APIContext) {
  const res = await fetch('https://identity.aludev.io/register_anonymous', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: 'platform_device_id=web01&device_name=alulu-main-website',
  }).then((data) => data.json());
  await fetch(ENV.ALULU_BASE_URL + '/api/v1/user/@me/initialize', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + res.access_token,
    },
    body: JSON.stringify({
      display_name: null,
    }),
  });
  return new Response(JSON.stringify(res), {
    status: 200,
  });
}
export async function post({ cookies, request }: APIContext) {
  try {
    const refresh_token = await request.json();
    const response = await fetch('https://identity.aludev.io/token', {
      method: 'post',
      body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    }).then((data) => data.json());
    cookies.set(ENV.TOKEN_NAME, response.access_token, {
      path: '/',
    });
    return new Response(JSON.stringify(response.refresh_token), {
      status: 200,
    });
  } catch (error) {
    return new Response(null, {
      status: 500,
    });
  }
}
