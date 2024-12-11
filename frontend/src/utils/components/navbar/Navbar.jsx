import React, { useState } from 'react'
import { uiStore } from '../../stores/uiStore'
import style from './Navbar.module.css'
import { Menu, Close } from '../../icons'

const Navbar = () => {
  const [expandNavbar, setExpandNavbar] = useState(false)

const language = uiStore((state)=>state.language)
const setCurrentCategory = uiStore((state)=>state.setCurrentCategory)
console.log(language)


const handleClick = (category) =>{
  setCurrentCategory(category)
}

  return (
    <div className={!expandNavbar ? style.navbar : style.navbarOpen}>
      
        <div className={style.topContainer}>
            <h1 className={style.title}>CINE POLACO</h1>
        <button className={style.openMenuButton} onClick={()=>setExpandNavbar(!expandNavbar)}>{!expandNavbar ? <Menu height={'1.5rem'} width={'1.5rem'}/> : <Close height={'1.5rem'} width={'1.5rem'}/>}</button>
      </div>
      <div className={style.buttonsContainer} style={ expandNavbar ? {display: 'flex'} : {display: 'none'}}>
      <button className={style.navbarLink} onClick={()=>handleClick('cinema')}>{language.ui.categories.cinema}</button>
      <button className={style.navbarLink} onClick={()=>handleClick('community')}>{language.ui.categories.community}</button>
      <button className={style.navbarLink} onClick={()=>handleClick('contests')}>{language.ui.categories.contests}</button>
      <button className={style.navbarLink} onClick={()=>handleClick('country')}>{language.ui.categories.country}</button>
      <button className={style.navbarLink} onClick={()=>handleClick('displays')}>{language.ui.categories.displays}</button>
      <button className={style.navbarLink} onClick={()=>handleClick('news')}>{language.ui.categories.news}</button>
      <button className={style.navbarLink} onClick={()=>handleClick('people')}>{language.ui.categories.people}</button>
      <button className={style.navbarLink} onClick={()=>handleClick('workshops')}>{language.ui.categories.workshops}</button>
      <button className={style.navbarLink} onClick={()=>handleClick('contact')}>{language.ui.contact}</button>
      </div>

    </div>
  )
}

export default Navbar