import React, { useState } from 'react'
import { uiStore } from '../../stores/uiStore'
import style from './Navbar.module.css'

const Navbar = () => {
  const [expandNavbar, setExpandNavbar] = useState(false)

const language = uiStore((state)=>state.language)
const setCurrentCategory = uiStore((state)=>state.setCurrentCategory)
console.log(language)


const handleClick = (category) =>{
  setCurrentCategory(category)
}

  return (
    <div className={style.navbar}>
      <div className={style.buttonsContainer} style={ expandNavbar ? {display: 'flex'} : {display: 'none'}}>
      <button onClick={()=>handleClick('cinema')}>{language.ui.categories.cinema}</button>
      <button onClick={()=>handleClick('community')}>{language.ui.categories.community}</button>
      <button onClick={()=>handleClick('contests')}>{language.ui.categories.contests}</button>
      <button onClick={()=>handleClick('country')}>{language.ui.categories.country}</button>
      <button onClick={()=>handleClick('displays')}>{language.ui.categories.displays}</button>
      <button onClick={()=>handleClick('news')}>{language.ui.categories.news}</button>
      <button onClick={()=>handleClick('people')}>{language.ui.categories.people}</button>
      <button onClick={()=>handleClick('workshops')}>{language.ui.categories.workshops}</button>
      <button onClick={()=>handleClick('contact')}>{language.ui.contact}</button>
      </div>
      <div>
        <button onClick={()=>setExpandNavbar(!expandNavbar)}>nav</button>
      </div>
    </div>
  )
}

export default Navbar