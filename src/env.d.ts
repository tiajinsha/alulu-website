/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly ALULU_BASE_URL: string;
  readonly REF_TOKEN_URL: string;
  readonly ALULU_REGISTER_URL: string;
  readonly TOKEN_JSON_PATH_URL: string;
  readonly TOKEN_NAME: string;
  // 更多环境变量…
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
