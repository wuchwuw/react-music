import React from 'react'
import { NavLink } from 'react-router-dom'
import './tab.less'

const Tab = () => {
  return (
    <div className="tab">
      <NavLink activeClassName="link-active" className="tab-item" to="/recommend">
        <span className="tab-link">推荐</span>
      </NavLink>
      <NavLink activeClassName="link-active" className="tab-item" to="/singer">
        <span className="tab-link">歌手</span>
      </NavLink>
      <NavLink activeClassName="link-active" className="tab-item" to="/rank">
        <span className="tab-link">排行</span>
      </NavLink>
      <NavLink activeClassName="link-active" className="tab-item" to="/search">
        <span className="tab-link">搜索</span>
      </NavLink>
    </div>
  )
}

export default Tab