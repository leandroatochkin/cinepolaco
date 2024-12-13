import React from 'react'
import style from './Backdrop.module.css'

const Backdrop = ({children}) => {
  return (
    <div className={style.backdrop}>{children}</div>
  )
}

export default Backdrop