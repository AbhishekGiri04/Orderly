import React from 'react';

const LoadingScreen = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#ffffff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <img 
        src="https://img.etimg.com/thumb/msid-90803659,width-1200,height-900,imgsize-1044249,overlay-ettech/editionshow-m.jpg"
        alt="Loading..."
        style={{
          width: '60vw',
          height: '60vh',
          objectFit: 'contain'
        }}
      />
    </div>
  );
};

export default LoadingScreen;