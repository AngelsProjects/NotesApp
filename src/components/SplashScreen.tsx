import '@styles/SplashScreen.scss';
import React, { memo } from 'react';

export default memo(function SplashScreen() {
  return (
    <div id='splash-screen'>
      <div className='center'>
        <div className='logo'>
          <img width='128' src={require('../assets/images/loadingImg.png')} alt='logo' />
        </div>
        <div className='spinner-wrapper'>
          <div className='spinner'>
            <div className='inner'>
              <div className='gap' />
              <div className='left'>
                <div className='half-circle' />
              </div>
              <div className='right'>
                <div className='half-circle' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
