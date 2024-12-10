import React from 'react'
import style from './Button.module.css'

const Button = ({text, handler}) => {
  return (
    <div onClick={handler} className={style.button}>{text}</div>
  )
}

export default Button