import React from 'react'
import ButtonSmall from '../buttons/ButtonSmall'
import style from './InputBubble.module.css'
import { Cross, CircleCheck } from '../../icons'

const InputBubble = ({value, onChange, placeholder, type, name, state, setState}) => {

const closeComment = () => {
    setState(null)
}

  return (
    <div className={style.container}>
        <div className={style.arrow}></div>
        <div className={style.bubble}>
            <ButtonSmall handler={closeComment} text={<Cross/>} right={'-1%'} top={'20%'}/>
            <textarea value={value} onChange={onChange} placeholder={placeholder} type={type} name={name} className={style.input}/>
        </div>
    </div>
  )
}

export default InputBubble