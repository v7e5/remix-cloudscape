import {useEffect, useState} from 'react'
import {calculateOnce} from './calculate-once'

const browserScrollbarSize = calculateOnce(() => {
  if (typeof document === 'undefined') {
    return {width: 0, height: 0}
  }
  const scrollDiv = document.createElement('div')
  scrollDiv.style.overflow = 'scroll'
  scrollDiv.style.height = '100px'
  scrollDiv.style.width = '100px'
  scrollDiv.style.position = 'absolute'
  scrollDiv.style.top = '-9999px'
  scrollDiv.style.left = '-9999px'
  document.body.appendChild(scrollDiv)
  const width = scrollDiv.offsetWidth - scrollDiv.clientWidth
  const height = scrollDiv.offsetHeight - scrollDiv.clientHeight
  document.body.removeChild(scrollDiv)
  return {width, height}
})

const useBrowserScrollbarSize = () => {
  const [size, setSize] = useState({width: 0, height: 0})

  useEffect(() => {
    setSize(browserScrollbarSize())
  }, [])

  return size
}

export {
  browserScrollbarSize,
  useBrowserScrollbarSize
}
