import React from 'react'
import { NavLink } from 'react-router-dom'
// import './tab.styl'
import styled from 'styled-components'

const TabPathNameMap = {
  '/recommend': '推荐',
  '/singer': '歌手',
  '/rank': '排行'
}

const Tab = () => {
  return (
    <TabWrap>
      {
        Object.keys(TabPathNameMap).map((path) => (
          <TabItem activeClassName="link-active" to={path} key={path}>
            <span className="tab-link">{TabPathNameMap[path]}</span>
          </TabItem>
        ))
      }
    </TabWrap>
  )
}

export default Tab

const TabWrap = styled.div`
  display: flex
  align-items: center
  height: 35px
  font-size: 14px
`
const TabItem = styled(NavLink)`
  flex: 1
  text-align: center
  .tab-link {
    padding-bottom: 5px
    color: #333333
  }
  &.${(props) => props.activeClassName} {
    .tab-link {
      border-bottom: 2px solid #d43c33
      color: #d43c33
    }
  }
`