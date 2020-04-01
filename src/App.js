
import React, { Component } from 'react';
import './App.css';

import { Header } from "./header";

import VideoContextProvider from './contexts/VideoContext';
import VideoList from './components/VideoList';
import Video from './components/Video';

class App extends Component {
  
	render() {
    
		return (
			<div className="App container">
          <VideoContextProvider>
            <Header /> 
            <Video/>
            <VideoList />
          </VideoContextProvider>
			</div>
		);
  }
  
}

export default App;