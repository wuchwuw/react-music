import React, { Component } from 'react'
import { getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import './recommend.styl'

export default class Recommend extends Component {
  constructor (props) {
    super(props)
    this.state = {
      discList: []
    }
  }
  componentDidMount () {
    this._getDiscList()
  }
  _getDiscList () {
    getDiscList()
      .then((res) => {
        if (res.code === ERR_OK) {
          this.setState({
            discList: res.data.list
          })
        }
      })
  }
  render () {
    return (
      <div className="recommend">
        <div className="recommend-content">
          <Scroll data={this.state.discList}>
            <div>
              <div className="slider-wrapper">
                <Slider></Slider>
              </div>
              <div className="recommend-list">
                <h1 className="list-title">热门歌单推荐</h1>
                <ul>
                  {
                    this.state.discList.map((item, index) => (
                      <li key={item.dissid} className="item">
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
      </div>
    )
  }
}
