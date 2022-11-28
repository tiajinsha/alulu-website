import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import SvgIcon from '@mui/icons-material/VolumeOff';
import React, { useMemo, useRef, useState } from 'react';
import { defaultVideoType, getVideoType } from 'src/modules/module';
import btnPase from '@/assets/images/play4vidoePase.svg';
import LoadingSvg from '@/assets/images/loadingSvg/tail-spin.svg';
import AluluButtonaluluImg from '@/assets/images/AluluButtonaluluImg.svg';
export interface PlayerProps {
  VideoInfo: getVideoType[];
}

const Player: React.FC<PlayerProps> = ({ VideoInfo }) => {
  const videoPlayer = useRef<HTMLVideoElement | any>(null);
  const [playerInfo, setPlayerInfo] = useState({
    isPaused: false,
    isLoading: true,
    isMuted: false,
  });

  // 播放暂停
  const handlePlay = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!playerInfo.isLoading) {
      playerInfo.isPaused ? videoPlayer.current.play() : videoPlayer.current.pause();
      setPlayerInfo((prev) => ({ ...prev, isPaused: !prev.isPaused }));
    }
  };

  // 设置静音
  const setMuted = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setPlayerInfo((prev) => ({ ...prev, isMuted: !prev.isMuted }));
    videoPlayer.current.muted = playerInfo.isMuted;
  };
  const initPlay = (data?: Blob) => {
    const videoPlayerRef = videoPlayer.current as any;
    videoPlayerRef.src =
      videoObj.VideoUrl.url + '?x-url-signature=' + videoObj.VideoUrl.headers['x-url-signature'];
    // videoPlayerRef.src = URL.createObjectURL(data);
    videoPlayerRef.addEventListener('loadedmetadata', function () {
      setPlayerInfo((prev) => ({ ...prev, isLoading: false }));
    });
    videoPlayerRef.addEventListener('playing', function () {
      setPlayerInfo((prev) => ({ ...prev, isLoading: false, isPaused: false }));
    });
    videoPlayerRef.addEventListener('waiting', function () {
      setPlayerInfo((prev) => ({ ...prev, isPaused: true }));
    });
  };

  const videoObj = useMemo(() => {
    return {
      VideoUrl: VideoInfo[0].remote_files[defaultVideoType],
    };
  }, [VideoInfo]);

  React.useEffect(() => {
    initPlay();
    /*    fetch('/api/getVideo', {
         method: 'post',
         body: JSON.stringify({ video_ids: videoObj.vidoeIds }),
         credentials: 'include',
       })
         .then((data) => {
           return data.blob();
         })
         .then((res) => {
           initPlay(res);
         }); */
  }, [videoObj]);

  return (
    <div className="ShareVideoPlayer">
      <video id="vidoePlayer" ref={videoPlayer} muted loop autoPlay playsInline></video>
      <div className="player-control-wrap">
        {!playerInfo.isMuted ? (
          <div
            className="voice-btn-wrapper"
            onClick={(e) => {
              setMuted(e);
            }}
          >
            <SvgIcon sx={{ fontSize: 22, color: '#000' }} component={VolumeOffIcon}></SvgIcon>
          </div>
        ) : null}
        {playerInfo.isPaused && !playerInfo.isLoading ? (
          <div
            className="videoindicator"
            onClick={(e) => {
              handlePlay(e);
            }}
          >
            <img src={btnPase} alt="" />
          </div>
        ) : playerInfo.isLoading ? (
          <div className="videoindicator">
            <img src={LoadingSvg} alt="" />
          </div>
        ) : null}
      </div>
      <div className="player-layer-wrap" onClick={handlePlay}>
        <div className="videoInformation">
          <div className="videoInformation-left">
            <span className="vidoeName">@ {VideoInfo[0].uploader.display_name}</span>
            <span className="vidoediscription">{VideoInfo[0].description}</span>
          </div>
          <div className="videoInformation-right">
            <img src={AluluButtonaluluImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Player;
