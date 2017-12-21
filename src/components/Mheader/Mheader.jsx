import React from 'react'
import './mHeader.less'
import { Link } from 'react-router-dom'

const Mheader = () => (
  <div className="m-header">
    <div className="icon"></div>
    <h1 className="text">hahaha</h1>
    <Link to="/user" className="mine">
      <i className="icon-mine"></i>
    </Link>
  </div>
)

export default Mheader