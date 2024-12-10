import React from 'react'
import style from './ButtonSmall.module.css'

const ButtonSmall = ({text, handler, color, top, right}) => {
  return (
    <div onClick={handler} className={style.button} style={{backgroundColor: `${color}`, top: `${top}`, right: `${right}`}}>{text}</div>
  )
}

export default ButtonSmall