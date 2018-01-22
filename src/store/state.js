import { playMode } from 'common/js/config'

export const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  currentSong: {},
  topList: {}
}