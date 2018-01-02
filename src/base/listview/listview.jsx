import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Scroll from 'base/scroll/scroll'
import './listview.less'

export default class ListView extends Component {
  constructor () {
    super()
    // this.selectItem = this.selectItem.bind(this)
  }
  static propTypes = {
    data: PropTypes.array.isRequired
  }
  selectItem (e, item) {
    e.preventDefault()
    this.props.history.push(`/singer/${item.id}`)
  }
  render () {
    return (
      <div className="listview">
        <Scroll data={this.props.data}>
          <ul>
            {
              this.props.data.map((group, index) => (
                <li key={group.title} className="list-group">
                  <h2 className="list-group-title">{group.title}</h2>
                  <ul>
                    {
                      group.item.map((item, index) => (
                        <li onClick={e => { this.selectItem(e, item) }} key={item.id} className="list-group-item">
                          <img className="avatar" src={item.avatar} alt=""/>
                          <span className="name">{item.name}</span>
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
    )
  }
}