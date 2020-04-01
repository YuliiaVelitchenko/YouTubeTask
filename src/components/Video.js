import React, { useContext } from 'react';
import { VideoContext } from '../contexts/VideoContext';

let selected = null;

const Video = () => {
  const { videos } = useContext(VideoContext);
  const video = videos.length ? videos[0] : selected;  

  if( selected !== video ) { selected = video; }; 

  const url = selected ? `https://www.youtube.com/embed/${selected.id}?autoplay=1&mute=1` : ``;
    
  return selected ? (
      <div  className="main video-block">
        <div className="videoWrapper">
            <iframe className="embed-responsive-item" width="560" height="315" src={url} title="YouTube"></iframe>
        </div>
    </div>
  ) : (
    <div className="main video-block empty">
        <h2>No video to play.</h2>
    </div>
  );
}

export default Video;