import React, { PureComponent } from 'react'
import { getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import { findRoute } from 'common/js/util'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { setDisc } from 'store/actions'
import styled from 'styled-components'
import ImageDefault from 'base/image-default/image-default'

let discListCaches = []

class Recommend extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      discList: []
    }
    this.selectItem = this.selectItem.bind(this)
    this.handlePlaylist = this.handlePlaylist.bind(this)
    this.recommendRef = React.createRef()
    this.scrollRef = React.createRef()
  }

  componentDidMount () {
    this._getDiscList()
  }

  getSnapshotBeforeUpdate () {
    return this.props.playlist.length > 0
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      this.recommendRef.current.style.bottom = '60px'
      this.scrollRef.current.refresh()
    }
  }

  _getDiscList () {
    if (discListCaches.length) {
      this.setState({
        discList: discListCaches
      })
      return
    }
    getDiscList()
      .then((res) => {
        if (res.code === ERR_OK) {
          discListCaches = res.data.list.slice()
          this.setState({
            discList: res.data.list
          })
        }
      })
  }

  handlePlaylist () {
    if (this.props.playlist.length > 0) {
      this.recommendRef.current.style.bottom = '60px'
      this.scrollRef.current.refresh()
    }
  }

  selectItem (item) {
    this.props.history.push(`/recommend/${item.dissid}`)
    this.props.setDisc(item)
  }

  render () {
    const { history, routes, location } = this.props
    const route = findRoute(routes, 'disc')

    return (
      <RecommendWrap ref={this.recommendRef}>
        <div className="recommend-content">
          <Scroll data={this.state.discList} ref={this.scrollRef}>
            <div>
              <div className="slider-wrapper">
                <Slider></Slider>
              </div>
              <div className="recommend-list">
                <h1 className="list-title">推荐歌单</h1>
                <ul>
                  {
                    this.state.discList.map((item) => (
                      <li onClick={() => { this.selectItem(item)}} key={item.dissid} className="item">
                        <div className="icon">
                        <ImageDefault
                          src={item.imgurl}
                          height={60}
                          width={60}
                          placeholder={<div style={{height: '60px',width: '60px',background: '#ededed'}}></div>}
                        ></ImageDefault>
                        </div>
                        <div className="text">
                          <h2 className="name">{item.creator.name}</h2>
                          <p className="desc">{item.dissname}</p>
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </Scroll>
        </div>
        <TransitionGroup>
          <CSSTransition key={location.pathname} timeout={300} classNames="slider">
            <Route history={history} location={location} key={location.key} path={route.path} component={route.component}></Route>
         </CSSTransition>
        </TransitionGroup>
      </RecommendWrap>
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
    setDisc: (disc) => {
      dispatch(setDisc(disc))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recommend)

const RecommendWrap = styled.div`
  position: fixed;
  width: 100%;
  top: 84px;
  bottom: 0;
  background: #fff;
  .recommend-content {
    height: 100%;
    overflow: hidden;
  }
  .slider-wrapper {
    position: relative;
    padding: 0 20px;
    overflow: hidden;
  }
  .list-title {
    height: 55px;
    padding-left: 18px;
    line-height: 55px;
    font-size: 16px;
    font-size: 800;
  }
  .item {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 0 20px 20px 20px;
  }
  .icon {
    flex: 0 0 60px;
    width: 60px;
    padding-right: 20px;
    font-size: 0;
  }
  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    font-size: 14px;
  }
  .name {
    font-size: 16px;
    margin-bottom: 10px;
  }
`