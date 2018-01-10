import {
  SET_SINGER
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

const rootReducer = combineReducers({
  singer: setSinger
})

export default rootReducer