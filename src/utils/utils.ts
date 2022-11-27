export function px2rem(px: number) {
  const ratio = 375 / 10;
  return px / ratio;
}
export function realPx(px: number) {
  const maxWidth = window.innerWidth > 500 ? 500 : window.innerWidth;
  return px * (maxWidth / 375);
}

export function isiOS() {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    return false;
  } else {
    return false;
  }
}

export function setAuthorization(access_token: string) {
  return 'Bearer ' + access_token;
}

export function parse_url(url: any) {
  const pattern = /(\w+)=(\w+)/gi;
  const parames: any = {};
  url.replace(pattern, function (a: any, b: string | number, c: any) {
    parames[b] = c;
  });
  return parames;
}
