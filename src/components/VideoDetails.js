import React, { useContext } from 'react';
import { VideoContext } from '../contexts/VideoContext';

const timeSince = (value) => {
  if (!value) return 'long time';
  const date = new Date(value);
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

const VideoDetails = ({ video }) => {
  const { dispatch } = useContext(VideoContext);
  return (
    <li className="video-item">
      <div className="video-thumbnail" onClick={() => dispatch({ type: 'PLAY_VIDEO', video })}>
          <img src={video.thumbnail.url} alt={video.title} />
          <div className="play"></div>
      </div>
      <div className="video-body">      
        <div className="title" ><a target="blank" href={video.link}>{video.title}</a></div>
        <div className="channel" ><a target="blank" href={`https://www.youtube.com/channel/${video.channel.id}`}>{video.channel.title}</a></div>
        <div className="time">published {timeSince(video.date)} ago</div>        
      </div>    
      <div className="remove" onClick={() => dispatch({ type: 'REMOVE_VIDEO', id: video.id })}>✕</div>
    </li>
  );
}

export default VideoDetails;