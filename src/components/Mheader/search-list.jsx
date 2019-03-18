import React, { Component } from 'react'
import './search-list.styl'
import { getHotKey, search } from 'api/search'
import { is } from 'immutable'
import { ERR_OK } from 'api/config'
import { createSong, isValidMusic, processSongsUrl } from 'common/js/song'
import Scroll from 'base/scroll/scroll'
import { setSinger } from 'store/actions'
import { connect } from 'react-redux'

const TYPE_SINGER = 'singer'
const perpage = 20

class SearchList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hotKey: [],
      result: []
    }
    this.hasMore = true
    this.page = 1
    this.pullup = true
    this.beforeScroll = true
    this.getIconCls = this.getIconCls.bind(this)
    this.getDisplayName = this.getDisplayName.bind(this)
    this.searchMore = this.searchMore.bind(this)
    this.selectItem = this.selectItem.bind(this)
  }

  componentDidMount () {
    this.getHotKey()
  }

  componentWillReceiveProps(nextProps) {
    if (!is(nextProps.query, this.props.query)) {
      setTimeout(() => {
        this.search()
      }, 20)
    }
  }

  _genResult(data) {
    let ret = []
    if (data.zhida && data.zhida.singerid && this.page === 1) {
      ret.push({...data.zhida, ...{type: TYPE_SINGER}})
    }
    ret = ret.concat(this._normalizeSongs(data.song.list))
    // return processSongsUrl(this._normalizeSongs(data.song.list)).then((songs) => {
    //   console.log(songs)
    //   ret = ret.concat(songs)
    //   console.log(ret)
    //   return ret
    // })
    return Promise.resolve(ret)
  }

  _checkMore(data) {
    const song = data.song
    if (!song.list.length || (song.curnum + (song.curpage - 1) * perpage) >= song.totalnum) {
      this.hasMore = false
    }
  }

  getHotKey () {
    getHotKey().then(res => {
      this.setState({
        hotKey: res.data.hotkey.slice(0, 10)
      })
    })
  }

  _normalizeSongs(list) {
    let ret = []
    list.forEach((musicData) => {
      if (isValidMusic(musicData)) {
        ret.push(createSong(musicData))
      }
    })
    return ret
  }

  getIconCls(item) {
    let s
    if (item.type === TYPE_SINGER) {
      s = 'icon-mine'
    } else {
      s = 'icon-music'
    }
    return (
      <i className={s}></i>
    )
  }

  getDisplayName(item) {
    let s
    if (item.type === TYPE_SINGER) {
      s = item.singername
    } else {
      s = `${item.name}-${item.singer}`
    }
    return (
      <p className="search-text" dangerouslySetInnerHTML={{__html:s}}></p>
    )
  }

  search() {
    let { query } =  this.props
    this.page = 1
    this.hasMore = true
    // this.$refs.suggest.scrollTo(0, 0)
    search(query, this.page, true /** showsinger */, perpage).then((res) => {
      console.log(res)
      if (res.code === ERR_OK) {
        this._genResult(res.data).then((result) => {
          this.setState({
            result
          })
        })
        this._checkMore(res.data)
      }
    })
  }

  searchMore() {
    if (!this.hasMore) {
      return
    }
    this.page++
    let { query } =  this.props
    search(query, this.page, true, perpage).then((res) => {
      if (res.code === ERR_OK) {
        this._genResult(res.data).then((result) => {
          let more = this.state.result.concat(result)
          this.setState({
            result: more
          })
        })
        this._checkMore(res.data)
      }
    })
  }

  listScroll () {}

  selectItem(item) {
    if (item.type === TYPE_SINGER) {
      let singer = {
        id: item.singermid,
        name: item.singername
      }
      this.props.history.push(`/search/${singer.id}`)
      this.props.dispatch(setSinger(singer))
    } else {
      this.insertSong(item)
    }
    // this.$emit('select', item)
  }

  render () {
    let { hotKey, result } = this.state
    let { query } = this.props
    return (
      <div className="wrap">
        {
          !query ?
          <div className="hot-key">
            <h1 className="title">热门搜索</h1>
            <ul>
              {
                hotKey.map((item) => (
                  <li key={item.k} className="item">
                    <span>{item.k}</span>
                  </li>
                ))
              }
            </ul>
          </div>
          :
          <div className="suggest">
            <Scroll
              data={result}
              pullup={this.pullup}
              beforeScroll={this.beforeScroll}
              scrollToEnd={this.searchMore}
              beforeScroll={this.listScroll}
            >
              <ul className="suggest-list">
                {
                  result.map((item, index) => (
                    <li key={index} className="suggest-item" onClick={() => this.selectItem(item)}>
                      <div className="search-icon">
                        {this.getIconCls(item)}
                      </div>
                      <div className="name">
                        {this.getDisplayName(item)}
                      </div>
                    </li>
                  ))
                }
                {/* <loading v-show="hasMore" title=""></loading> */}
              </ul>
              {/* <div v-show="!hasMore && !result.length" className="no-result-wrapper">
                <no-result title="抱歉，暂无搜索结果"></no-result>
              </div> */}
            </Scroll>
          </div>
        }
      </div>
    )
  }
}

export default connect()(SearchList)