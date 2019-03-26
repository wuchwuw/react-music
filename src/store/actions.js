export const SET_SINGER = 'SET_SINGER'
export const SELECT_PLAY = 'SELECT_PLAY'
export const SET_SQUENCE_LIST = 'SET_SQUENCE_LIST'
export const SET_FULL_SCREEN = 'SET_FULL_SCREEN'
export const SET_PLAYING_STATE = 'SET_PLAYING_STATE'
export const SET_CURRENT_INDEX = 'SET_CURRENT_INDEX'
export const SET_PLAYLIST = 'SET_PLAYLIST'
export const SET_CURRENT_SONG = 'SET_CURRENT_SONG'
export const SET_TOP_LIST = 'SET_TOP_LIST'
export const SET_QUERY = 'SET_QUERY'
export const SET_DISC = 'SET_DISC'

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
  song && (document.title = `[正在播放]${song.name}-${song.singer}`)
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

export function setDisc (disc) {
  return {
    type: SET_DISC,
    disc: disc
  }
}

export function setQuery (query) {
  return {
    type: SET_QUERY,
    query
  }
}

export function insertSong (song) {
  return (dispatch, getState) => {
    let state = getState()
    let playlist = state.playlist.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    // 记录当前歌曲
    let currentSong = playlist[currentIndex]
    // 查找当前列表中是否有待插入的歌曲并返回其索引
    let fpIndex = findIndex(playlist, song)
    // 因为是插入歌曲，所以索引+1
    currentIndex++
    // 插入这首歌到当前索引位置
    playlist.splice(currentIndex, 0, song)
    // 如果已经包含了这首歌
    if (fpIndex > -1) {
      // 如果当前插入的序号大于列表中的序号
      if (currentIndex > fpIndex) {
        playlist.splice(fpIndex, 1)
        currentIndex--
      } else {
        playlist.splice(fpIndex + 1, 1)
      }
    }

    let currentSIndex = findIndex(sequenceList, currentSong) + 1

    let fsIndex = findIndex(sequenceList, song)

    sequenceList.splice(currentSIndex, 0, song)

    if (fsIndex > -1) {
      if (currentSIndex > fsIndex) {
        sequenceList.splice(fsIndex, 1)
      } else {
        sequenceList.splice(fsIndex + 1, 1)
      }
    }
    dispatch(setSquenceList(sequenceList))
    dispatch(setPlayList(playlist))
    dispatch(setCurrentIndex(currentIndex))
    dispatch(setFullScreen(true))
    dispatch(setPlayingState(true))
    dispatch(setCurrentSong(playlist[currentIndex]))
  }
}

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
