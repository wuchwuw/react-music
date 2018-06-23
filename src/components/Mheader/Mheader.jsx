import React from 'react'
import './mHeader.styl'
import { Link } from 'react-router-dom'

const Mheader = () => (
  <div className="m-header">
    <Link to="/user" className="mine">
      <i className="icon-mine"></i>
    </Link>
  </div>
)

export default Mheader