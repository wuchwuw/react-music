import {
  SET_SINGER,
  SET_PLAYLIST,
  SET_CURRENT_INDEX,
  SET_SQUENCE_LIST,
  SET_FULL_SCREEN,
  SET_PLAYING_STATE,
  SET_CURRENT_SONG,
  SET_TOP_LIST
} from './actions'
import { combineReducers } from 'redux'

function setSinger (state={}, action) {
  switch (action.type) {
    case SET_SINGER:
      return action.singer
    default:
      return state
  }
}
function setPlaylist (state=[], action) {
  switch (action.type) {
    case SET_PLAYLIST:
      return action.playlist
    default:
      return state
  }
}
function setSequenceList (state=[], action) {
  switch (action.type) {
    case SET_SQUENCE_LIST:
      return action.sequenceList
    default:
      return state
  }
}
function setFullScreen (state=false, action) {
  switch (action.type) {
    case SET_FULL_SCREEN:
      return action.fullScreen
    default:
      return state
  }
}
function setPlaying (state=false, action) {
  switch (action.type) {
    case SET_PLAYING_STATE:
      return action.playing
    default:
      return state
  }
}
function setCurrentIndex (state=-1, action) {
  switch (action.type) {
    case SET_CURRENT_INDEX:
      return action.currentIndex
    default:
      return state
  }
}
function setCurrentSong (state={}, action) {
  switch (action.type) {
    case SET_CURRENT_SONG:
      return action.currentSong
    default:
      return state
  }
}
function setTopList (state={}, action) {
  switch (action.type) {
    case SET_TOP_LIST:
      return action.topList
    default:
      return state
  }
}
const rootReducer = combineReducers({
  singer: setSinger,
  playlist: setPlaylist,
  sequenceList: setSequenceList,
  currentIndex: setCurrentIndex,
  playing: setPlaying,
  fullScreen: setFullScreen,
  currentSong: setCurrentSong,
  topList: setTopList
})

export default rootReducer