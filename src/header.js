import React, { useContext, useState } from 'react';
import { VideoContext } from './contexts/VideoContext';
import useTheme from './theme';

import AsyncSelect from 'react-select/async';
import Select, { components } from "react-select";
import YTSearch from 'youtube-api-search';
const API_KEY = 'AIzaSyCT5YNj0WpEUrt_4K8b3GZ6NoBZTOImXMA';


const CustomOption = ({ children, ...props }) => {
  return (
    <components.Option {...props}>
      <div className="search-item">
        <div className="search-item-thumbnail">
          <img src={props.data.thumbnail.url} alt="preview"/>
          </div>
          <div className="search-item-text">
            <div className="search-item-title">{children}</div>
            <div className="search-item-description">{props.data.description}</div>
          </div>
      </div>
    </components.Option>
  );
};

const CustomTemplateOption = ({ children, ...props }) => {
  return (
    <components.Option {...props}>
      <div className={`template-item template-${props.data.value}`} >
      </div>
    </components.Option>
  );
};

const CustomThemeOption = ({ children, ...props }) => {
  return (
    <components.Option {...props}>
      <div className={`theme-item ${children}`} >
        {children}
      </div>
    </components.Option>
  );
};

const templates = [
  { label: "A", value: 0, data: `"header header header header" "sidebar main main main"` },
  { label: "B", value: 1, data: `"header header header header" "sidebar sidebar main main"`},
  { label: "C", value: 2, data: `"header header header header" "main main sidebar sidebar "`},
  { label: "D", value: 3, data: `". header header ." "main main main main" "sidebar sidebar sidebar sidebar"`},
  { label: "E", value: 4, data: `". header header ." "sidebar sidebar sidebar sidebar" "main main main main"`}
];

const themes = [
  { label: "dark", value: 0 },
  { label: "light", value: 1 }
];

export function Header() {
  const { dispatch } = useContext(VideoContext);
  const [themeIndex, setThemeIndex] = useState(themes[0]);

  useTheme(themeIndex);


const handleAddrTypeChange = (event) => { 
  if(event){
    const data = event.value;  
    const video = {
      id: data.id,
      thumbnail: data.thumbnails.medium,
      title: data.title,
      link: `https://youtu.be/${data.id}`,
      date: data.publishedAt,
      channel: {id: data.channelId,title: data.channelTitle},
      description: data.description
    };
    
    dispatch({ type: 'ADD_VIDEO', video});
  }
}

const handleTemplateChange = (event) => { 
  document.documentElement.style.setProperty('--template', `${event.data}`);
}


const handleThemeChange = (event) => { 
  setThemeIndex(event)
}

  const promiseOptions = inputValue =>
    new Promise(resolve => {
      YTSearch({ key: API_KEY, term: inputValue }, videos => {
        console.log(videos)
        resolve(videos.map( v => {
          const value = {
            id: v.id.videoId,
            ...v.snippet
          }
          return { value, label: v.snippet.title, thumbnail: v.snippet.thumbnails.default , description: v.snippet.description }
        }));
      } )
    });

	return (
		<div  className="header header-box">
          <AsyncSelect 
          className="search-box"
          noOptionsMessage = {() => "No search results"} 
          cacheOptions defaultOptions isClearable 
          loadOptions={promiseOptions} 
          components={{Option: CustomOption}} 
          onChange={e => handleAddrTypeChange(e)}/>
          <Select
          className="template-select"
          defaultValue={templates[0]}
          options={ templates } 
          isSearchable={false} 
          components={{Option: CustomTemplateOption}} 
          onChange={e => handleTemplateChange(e)}
          />
          <Select
          className="theme-select"
          defaultValue={themes[0]}
          options={ themes } 
          isSearchable={false} 
          hideSelectedOptions
          components={{ DropdownIndicator:() => null , Option:CustomThemeOption}}
          onChange={e => handleThemeChange(e)}
          />

		</div>
	);
}