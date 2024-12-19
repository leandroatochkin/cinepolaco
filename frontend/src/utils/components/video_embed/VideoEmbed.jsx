import React from 'react';

const VideoEmbed = ({ iframe }) => {


  return (
    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
      {iframe}
    </div>
  );
};

export default VideoEmbed;
