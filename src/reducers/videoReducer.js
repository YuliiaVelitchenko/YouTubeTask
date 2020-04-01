export const videoReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_VIDEO': {
            if(state.filter(e => e.id === action.video.id).length > 0){
                return state
            }else{
              return [{ 
                        id: action.video.id,
                        thumbnail: action.video.thumbnail,
                        title: action.video.title,
                        link: action.video.link,
                        date: action.video.date,
                        channel: action.video.channel,
                        description: action.video.description,
                      }, ...state ]
            }
        }
        case 'PLAY_VIDEO':
            // console.log('PLAY_VIDEO');
            const newList = [
                action.video,
                ...state.filter(video => video.id !== action.video.id)
            ]
            return newList
        case 'REMOVE_VIDEO':
            // console.log('REMOVE_VIDEO',action.id)
            return state.filter(video => video.id !== action.id)
        default: 
            return state
    }
}