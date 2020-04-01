import React, { createContext, useReducer, useEffect } from 'react';
import { videoReducer } from '../reducers/videoReducer';

export const VideoContext = createContext();

const VideoContextProvider = (props) => {
  const [videos, dispatch] = useReducer(videoReducer, [],() => {
    const localData = localStorage.getItem('videos');
    return localData ? JSON.parse(localData) : [];
} );

  useEffect(() => {
    localStorage.setItem('videos', JSON.stringify(videos));
  }, [videos]);

  return (
    <VideoContext.Provider value={{ videos, dispatch }}>
      {props.children}
    </VideoContext.Provider>
  );
}
 
export default VideoContextProvider;