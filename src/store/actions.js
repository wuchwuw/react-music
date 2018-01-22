export const SET_SINGER = 'SET_SINGER'
export const SELECT_PLAY = 'SELECT_PLAY'
export const SET_SQUENCE_LIST = 'SET_SQUENCE_LIST'
export const SET_FULL_SCREEN = 'SET_FULL_SCREEN'
export const SET_PLAYING_STATE = 'SET_PLAYING_STATE'
export const SET_CURRENT_INDEX = 'SET_CURRENT_INDEX'
export const SET_PLAYLIST = 'SET_PLAYLIST'
export const SET_CURRENT_SONG = 'SET_CURRENT_SONG'
export const SET_TOP_LIST = 'SET_TOP_LIST'

export function setSinger (singer) {
  return {
    type: SET_SINGER,
    singer: singer
  }
}

export function selectPlay (list, index) {
  return (dispatch, getState) => {
    dispatch(setSquenceList(list))
    dispatch(setPlayList(list))
    dispatch(setCurrentIndex(index))
    dispatch(setFullScreen(true))
    dispatch(setPlayingState(true))
    dispatch(setCurrentSong(list[index]))
  }
}

export function setCurrentSong (song) {
  return {
    type: SET_CURRENT_SONG,
    currentSong: song
  }
}

export function setSquenceList (sequenceList) {
  return {
    type: SET_SQUENCE_LIST,
    sequenceList: sequenceList
  }
}

export function setFullScreen (fullScreen) {
  return {
    type: SET_FULL_SCREEN,
    fullScreen: fullScreen
  }
}

export function setPlayingState (playing) {
  return {
    type: SET_PLAYING_STATE,
    playing: playing
  }
}

export function setCurrentIndex (currentIndex) {
  return {
    type: SET_CURRENT_INDEX,
    currentIndex: currentIndex
  }
}

export function setPlayList (playlist) {
  return {
    type: SET_PLAYLIST,
    playlist: playlist
  }
}

export function setTopList (topList) {
  return {
    type: SET_TOP_LIST,
    topList: topList
  }
}