import React, { useContext } from 'react';
import { VideoContext } from '../contexts/VideoContext';

const Navbar = () => {
  const { videos } = useContext(VideoContext);
  return (
    <div className="navbar">
      <h1>Video</h1>
      <p>Currently you have {videos.length} videos</p>
    </div>
  );
}
 
export default Navbar;