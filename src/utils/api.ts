import type { getCommentType, getVideoType } from 'src/modules/module';

const ENV = {
  ALULU_BASE_URL: import.meta.env.ALULU_BASE_URL,
};

export interface ErrorType {
  status: number;
  statusText: string;
}

export async function get<T>(
  incomingReq: Request,
  endpoint: string,
  cb: (response: Response) => Promise<T>,
): Promise<T> {
  const response = await fetch(`${ENV.ALULU_BASE_URL}${endpoint}`, {
    method: 'get',
    headers: incomingReq.headers,
  });
  // eslint-disable-next-line no-console
  console.log(response.status);
  if (!response.ok) {
    // TODO make this better...
    return cb(response);
  }
  return cb(response);
}

export async function post<T>(
  incomingReq: Request,
  endpoint: string,
  cb: (response: Response) => Promise<T>,
): Promise<T> {
  const response = await fetch(`${ENV.ALULU_BASE_URL}${endpoint}`, {
    method: 'post',
    headers: incomingReq.headers,
  });
  if (!response.ok) {
    return Promise.reject(response);
  }
  return cb(response);
}

export interface getVideoinfoType {
  status: number;
  statusText: string;
  data: getVideoType[];
}

export async function getVideoinfo(incomingReq: Request): Promise<getVideoinfoType> {
  const url = new URL(incomingReq.url);
  const video_ids = url.searchParams.get('video_ids');
  return get<getVideoinfoType>(
    incomingReq,
    `/api/v1/video?video_ids=01GH57C05CRNT6V1Z0VNGS13D5`,
    async (response) => {
      const Videoinfo: getVideoType[] = response.status === 200 ? await response.json() : null;
      return { data: Videoinfo, status: response.status, statusText: response.statusText };
    },
  );
}

export interface getCommentsType {
  status: number;
  statusText: string;
  data: getCommentType;
}

export async function getComments(incomingReq: Request): Promise<getCommentsType> {
  const url = new URL(incomingReq.url);
  const video_ids = url.searchParams.get('video_ids');
  return get<getCommentsType>(
    incomingReq,
    `/api/v1/comment?comment_type=Video&limit=200&subject_id=01GH57C05CRNT6V1Z0VNGS13D5`,
    async (response) => {
      const Videoinfo = response.status === 200 ? await response.json() : null;
      return { data: Videoinfo, status: response.status, statusText: response.statusText };
    },
  );
}
