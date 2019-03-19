import React from 'react'
import { CSSTransition } from 'react-transition-group'
import './style.styl'

export const WidthSliderTransition = ({ children, ...props }) => {
  console.log(children)
  console.log(props)
  return (
    <CSSTransition key={props.location.pathname} timeout={300} classNames="fade">
      <div className="a">{children}</div>
    </CSSTransition>
    // <div>{children}</div>
  )
}