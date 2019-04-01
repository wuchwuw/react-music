import React, { useState } from 'react'

const imageCache = []

export default function ImageDefault (props) {
  if (imageCache.indexOf(props.src) > -1) {
    return (
      <img height={60} width={60} src={props.src} alt=""/>
    )
  }
  let [loaded, setLoaded] = useState(false)
  const Placeholder = () => props.placeholder
  load(props.src, setLoaded)
  return (
    loaded ?
      <img height={60} width={60} src={props.src} alt=""/>
    :
     <Placeholder></Placeholder>
  )
}

function load (src, setLoaded) {
  let image = new Image()
  image.src = src
  image.onload = () => {
    setLoaded(true)
    imageCache.push(src)
  }
}