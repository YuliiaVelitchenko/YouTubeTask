import React, { useContext } from 'react';
import VideoDetails from './VideoDetails';
import { VideoContext } from '../contexts/VideoContext';

const VideoList = () => {
  const { videos } = useContext(VideoContext);
  return videos.length ? (
    <div className="video-list sidebar">
      <h2>Watch History</h2>
      <ul>
        {videos.map(video => {
          return ( <VideoDetails video={video} key={video.id} /> );
        })}
      </ul>
    </div>
  ) : (
    <div className="empty sidebar">
      <h2>Empty History</h2>        
      </div>
  );
}

export default VideoList;