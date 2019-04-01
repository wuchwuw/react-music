import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Scroll from 'base/scroll/scroll'
import { getTopList } from 'api/rank'
import { ERR_OK } from 'api/config'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { findRoute } from 'common/js/util'
import { connect } from 'react-redux'
import { setTopList } from 'store/actions'
import styled from 'styled-components'

let rankCaches = []

class Rank extends Component {
  constructor () {
    super()
    this.state = {
      topList: []
    }
    this.selectItem = this.selectItem.bind(this)
  }
  componentDidMount () {
    this._getTopList()
  }

  getSnapshotBeforeUpdate () {
    return this.props.playlist.length > 0
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      this.rank.style.bottom = '60px'
      this.scroll.refresh()
    }
  }

  _getTopList() {
    if (rankCaches.length) {
      this.setState({
        topList: rankCaches
      })
      return
    }
    getTopList().then((res) => {
      if (res.code === ERR_OK) {
        this.setState({
          topList: res.data.topList
        })
        rankCaches = res.data.topList.slice()
      }
    })
  }
  selectItem(item) {
    this.props.history.push(`/rank/${item.id}`)
    this.props.setTopList(item)
  }
  render () {
    const { topList } = this.state
    const { match, history, routes, location } = this.props
    const route = findRoute(routes, 'rankDetail')
    return (
      <RankWrap ref={(rank) => {this.rank = rank}}>
        <div className="toplist">
          <Scroll data={topList} ref={(scroll) => {this.scroll = scroll}}>
            <ul>
              {
                topList.map((top, i) => (
                  <li key={i} className="item" onClick={e => this.selectItem(top)}>
                    <div className="icon">
                      <img width="100" height="100" src={top.picUrl} alt=""/>
                    </div>
                    <ul className="songlist">
                      {
                        top.songList.map((song, index) => (
                          <li key={index} className="song">
                            <span>{index + 1}. </span>
                            <span>{song.songname}-{song.singername}</span>
                          </li>
                        ))
                      }
                    </ul>
                  </li>
                ))
              }
            </ul>
          </Scroll>
        </div>
        <TransitionGroup>
          <CSSTransition key={location.pathname} timeout={300} classNames="slider">
            <Route history={history} location={location} key={location.key} path={route.path} component={route.component}></Route>
         </CSSTransition>
        </TransitionGroup>
      </RankWrap>
    )
  }
}

function mapStateToProps (state) {
  return {
    playlist: state.playlist
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setTopList: (topList) => {
      dispatch(setTopList(topList))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rank)

const RankWrap = styled.div`
  position: fixed;
  width: 100%;
  top: 84px;
  bottom: 0;
  .toplist {
    height: 100%;
    overflow: hidden;
  }
  .item {
    display: flex;
    margin: 0 20px;
    padding-top: 20px;
    height: 100px;
  }
  .item:last-child {
    padding-bottom: 20px;
  }
  .icon {
    flex: 0 0 100px;
    width: 100px;
    height: 100px;
  }
  .icon > img {
    border-radius: 5px;
  }
  .songlist {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px;
    height: 100px;
    overflow: hidden;
    background: #fff;
    color: #333333;
    font-size: 14px;
  }
  .song {
    no-wrap();
    line-height 28px;
  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
`