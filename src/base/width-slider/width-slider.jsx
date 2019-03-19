import React from 'react'
import { CSSTransition } from 'react-transition-group'
import './style.styl'

export const WidthSliderTransition = ({ children }) => {
  console.log(children)
  return (
    <CSSTransition timeout={300} classNames="slider">
      <div></div>
    </CSSTransition>
    // <div>{children}</div>
  )
}