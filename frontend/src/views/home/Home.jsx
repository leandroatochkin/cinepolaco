import React from 'react'
import { Navbar } from '../../utils/components'
import style from './Home.module.css'
import Articles from '../articles/Articles'
import { uiStore } from '../../utils/stores/uiStore'

const Home = () => {
const currentCategory = uiStore((state)=>state.currentCategory)

  return (
    <div className={style.home}>
        <Navbar />
        <div>
        <Articles category={currentCategory}/>
        </div>
    </div>
  )
}

export default Home