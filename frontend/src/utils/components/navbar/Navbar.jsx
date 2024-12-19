import React, { useState } from 'react'
import { uiStore } from '../../stores/uiStore'
import style from './Navbar.module.css'
import { Menu, Close } from '../../icons'

const Navbar = () => {
  const [expandNavbar, setExpandNavbar] = useState(false)
  const [backgroundWhite, setBackgroundWhite] = useState(null)

const language = uiStore((state)=>state.language)
const setCurrentCategory = uiStore((state)=>state.setCurrentCategory)
console.log(language)


const handleClick = (category, number) =>{
  setCurrentCategory(category)
  setBackgroundWhite(number)
}

  return (
    <div className={!expandNavbar ? style.navbar : style.navbarOpen}>
      
        <div className={style.topContainer}>
            <h1 className={style.title}>CINE POLACO</h1>
        <button className={style.openMenuButton} onClick={()=>setExpandNavbar(!expandNavbar)}>{!expandNavbar ? <Menu height={'1.5rem'} width={'1.5rem'}/> : <Close height={'1.5rem'} width={'1.5rem'}/>}</button>
      </div>

      <div className={  expandNavbar ? style.buttonsContainerVisible : style.buttonsContainerHidden}>

      <button className={style.navbarLink} onClick={()=>handleClick('cinema', 1)} style={backgroundWhite === 1 ? {backgroundColor: 'white', color: '#212427'} : null}>{language.ui.categories.cinema}</button>
      <button className={style.navbarLink} onClick={()=>handleClick('community', 2)} style={backgroundWhite === 2 ? {backgroundColor: 'white', color: '#212427'} : null}>{language.ui.categories.community}</button>
      <button className={style.navbarLink} onClick={()=>handleClick('contests', 3)} style={backgroundWhite === 3 ? {backgroundColor: 'white', color: '#212427'} : null}>{language.ui.categories.contests}</button>
      <button className={style.navbarLink} onClick={()=>handleClick('country', 4)} style={backgroundWhite === 4 ? {backgroundColor: 'white', color: '#212427'} : null}>{language.ui.categories.country}</button>
      <button className={style.navbarLink} onClick={()=>handleClick('displays', 5)} style={backgroundWhite === 5 ? {backgroundColor: 'white', color: '#212427'} : null}>{language.ui.categories.displays}</button>
      <button className={style.navbarLink} onClick={()=>handleClick('news', 6)} style={backgroundWhite === 6 ? {backgroundColor: 'white', color: '#212427'} : null}>{language.ui.categories.news}</button>
      <button className={style.navbarLink} onClick={()=>handleClick('people', 7)} style={backgroundWhite === 7 ? {backgroundColor: 'white', color: '#212427'} : null}>{language.ui.categories.people}</button>
      <button className={style.navbarLink} onClick={()=>handleClick('workshops', 8)} style={backgroundWhite === 8 ? {backgroundColor: 'white', color: '#212427'} : null}>{language.ui.categories.workshops}</button>
      <button className={style.navbarLink} onClick={()=>handleClick('contact', 9)} style={backgroundWhite === 9 ? {backgroundColor: 'white', color: '#212427'} : null}>{language.ui.contact}</button>
      </div>

    </div>
  )
}

export default Navbar