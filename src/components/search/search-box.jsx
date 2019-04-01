import React, { Component } from 'react'
import styled from 'styled-components'

export default class SearchBox extends Component {
  constructor (props) {
    super(props)
    this.inputRef = React.createRef()
    this.setQuery = this.setQuery.bind(this)
    this.goSearch = this.goSearch.bind(this)
    this.isSearch = this.props.history.location.pathname === '/search'
  }

  componentDidMount () {
    this.isSearch && this.inputRef.current.focus()
  }

  setQuery (e) {
    this.isSearch && this.props.setQuery(e)
  }

  goSearch () {
    console.log(this.isSearch)
    !this.isSearch && this.props.history.push('/search')
  }

  render () {
    return (
      <BoxWrap>
        <Box onClick={this.goSearch}>
          <IconSearch className="iconfont icon-search"></IconSearch>
          <SearchInput
            ref={this.inputRef}
            placeholder='搜索歌曲、歌手'
            onChange={this.props.setQuery}
          >
          </SearchInput>
        </Box>
        {
          this.isSearch && <Cancel onClick={() => this.props.history.go(-1)}>取消</Cancel>
        }
      </BoxWrap>
    )
  }
}

const BoxWrap = styled.div`
  height: 44px;
  text-align: center;
  font-size: 0;
  display: flex;
  align-items: center;
  padding: 0 20px;
`
const Box = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 6px;
  height: 30px;
  background: #ededed;
  border-radius: 30px;
`
const SearchInput = styled.input`
  flex: 1;
  height: 30px;
  outline: 0;
  background: #ededed;
  font-size: 14px;
  margin-left: 5px;
  &:placeholder {
    color: #999999;
  }
`

const IconSearch = styled.i`
  font-size: 24px;
  color: #999999;
  margin-left: 5px;
`

const Cancel = styled.div`
  display: block;
  font-size: 16px;
  margin-left: 10px;
`