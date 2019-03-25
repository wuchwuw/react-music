import React, { Component } from 'react'
import { connect } from 'react-redux'
import './player-icon.styl'
import { setFullScreen } from 'store/actions'

class PlayerIcon extends Component {
  constructor () {
    super()
  }

  renderItem () {
    let { playing } = this.props
    return [1, 2, 3, 4].map(item => (
      <div key={item} className={playing ? `item item-${item}` : `item item-${item} paused`}></div>
    ))
  }

  render () {
    return (
      <div onClick={() => { this.props.setFullScreen(true)}} className="player-icon paused">
        { this.renderItem() }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { playing } = state
  return {
    playing
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPlayingState: (state) => {
      dispatch(setPlayingState(state))
    },
    setFullScreen: (state) => {
      dispatch(setFullScreen(state))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerIcon)