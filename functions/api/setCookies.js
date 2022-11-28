export async function onRequestGet(context) {
  try {
    const res = await fetch('https://identity.aludev.io/register_anonymous', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: 'platform_device_id=web01&device_name=alulu-main-website',
    }).then((data) => data.json());
    await fetch('http://165.227.181.143:8000/api/v1/user/@me/initialize', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + res.access_token,
      },
      body: JSON.stringify({
        display_name: null,
      }),
    });
    return new Response(JSON.stringify(res), { status: res.status });
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

export async function onRequestPost(context) {
  try {
    const { request, cookies } = context;
    const refresh_token = await request.json();
    const response = await fetch('https://identity.aludev.io/token', {
      method: 'post',
      body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    }).then((data) => data.json());
    cookies.set('access_token', response.access_token, {
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
