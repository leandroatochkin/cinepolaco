import React, { useEffect } from 'react';

const VideoEmbed = ({ iframe }) => {

useEffect(()=>{console.log(iframe)},[iframe])
  return (
    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', color: 'black' }} >
      {iframe}
    </div>
  );
};

export default VideoEmbed;
