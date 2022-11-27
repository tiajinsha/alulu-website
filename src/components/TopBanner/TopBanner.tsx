import useDebounce from '../../utils/hooks/useDebounce';
import React, { useEffect } from 'react';
//import { CSSTransition } from 'react-transition-group';
import { Button, Slide, styled } from '@mui/material';
import { isiOS } from 'src/utils/utils';
/* import defaultImg from '@/assets/images/apple-touch-icon.png';
import Alulu from '@/assets/images/apple-touch-icon.png'; */
const BootstrapButton = styled(Button)({
  backgroundColor: '#FF0000',
  '&:hover': {
    backgroundColor: '#FF0000',
  },
  '&:active': {
    backgroundColor: '#FF0000',
  },
});

const TopBanner: React.FC<any> = (props) => {
  const [checked, setChecked] = React.useState(true);
  const debouncedValue = useDebounce(checked, 300);
  useEffect(() => {
    document.addEventListener('scroll', () => {
      const html = document.querySelector('html');
      if (html && html.scrollTop > 100) {
        setChecked(false);
      } else {
        setChecked(true);
      }
    });
    return () =>
      document.removeEventListener('scroll', () => {
        /*  */
      });
  }, []);
  const openAlulu = async () => {
    if (isiOS()) {
      window.open('https://apps.apple.com/us/app/alulu/id1621856020');
    } else {
      window.open('https://play.google.com/store/apps/details?id=com.alulu.app');
    }
  };

  return (
    <>
      <Slide direction="down" in={debouncedValue} timeout={300}>
        <div className="TopBanner">
          <div className="left">
            {/*  <div className="headportrait notanonymous">
              <img
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = defaultImg;
                }}
                loading="lazy"
                src={Alulu}
                alt="img"
              />
            </div>
            <div className="content">
              <span className="top">Shawnhguru The Mighty</span>
              <span className="bottom">Let’s meet in alulu! </span>
            </div> */}
            <div className="anonymous">Your friend shared a video to you</div>
          </div>
          <BootstrapButton href="" className="openAlulu" variant="contained" onClick={openAlulu}>
            Open alulu
          </BootstrapButton>
        </div>
      </Slide>
    </>
  );
};

export default TopBanner;
