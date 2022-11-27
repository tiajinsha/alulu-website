export interface getCommentType {
  code: number | undefined;
  items: any;
  prev_cursor: [];
  next_cursor: [];
}

export type VideoType =
  | '720p.mp4'
  | '720p_hevc.mp4'
  | '1080p.mp4'
  | '1080p_hevc.mp4'
  | 'watermark.mp4';
export const defaultVideoType: VideoType = '720p.mp4';

export type vidoeItemType = {
  expiration_time: any;
  headers: {
    'x-url-signature': string;
  };
  metadata: {
    height: number;
    width: number;
  };
  url: string;
};

export interface getVideoType {
  uploader: {
    display_name: string;
  };
  preview?: vidoeItemType;
  remote_files: Record<VideoType, vidoeItemType>;
  thumbnail?: vidoeItemType;
  bookmark_count: number;
  comment_count: number;
  description: number;
  like_count: number;
  share_count: number;
}
