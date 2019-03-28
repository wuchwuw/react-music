import React, { PureComponent } from 'react'
import { getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import { findRoute } from 'common/js/util'
import './recommend.styl'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { setDisc } from 'store/actions'

let discListCaches = []

class Recommend extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      discList: []
    }
    this.selectItem = this.selectItem.bind(this)
    this.handlePlaylist = this.handlePlaylist.bind(this)
  }

  componentDidMount () {
    this._getDiscList()
  }

  getSnapshotBeforeUpdate () {
    return this.props.playlist.length > 0
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      this.recommend.style.bottom = '60px'
      this.scroll.refresh()
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
      this.recommend.style.bottom = '60px'
      this.scroll.refresh()
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
      <div className="recommend" ref={(recommend) => { this.recommend = recommend }}>
        <div className="recommend-content">
          <Scroll data={this.state.discList} ref={(scroll) => { this.scroll = scroll }}>
            <div>
              <div className="slider-wrapper">
                <Slider></Slider>
              </div>
              <div className="recommend-list">
                <h1 className="list-title">推荐歌单</h1>
                <ul>
                  {
                    this.state.discList.map((item, index) => (
                      <li onClick={() => { this.selectItem(item)}} key={item.dissid} className="item">
                        <div className="icon">
                          <img width="60" height="60" src={item.imgurl} alt=""/>
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
      </div>
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