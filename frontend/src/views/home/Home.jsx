import React, {useEffect, useState} from 'react'
import { Navbar } from '../../utils/components'
import style from './Home.module.css'
import Articles from '../articles/Articles'
import { uiStore } from '../../utils/stores/uiStore'
import Landing from '../landing/Landing'

const Home = () => {
const [showLanding, setShowLanding] = useState(true)


const currentCategory = uiStore((state)=>state.currentCategory)


  return (
    <div className={style.home}>
        {showLanding && <Landing setShowLanding={setShowLanding}/>}

          <>
          <Navbar />
          <Articles category={currentCategory}/>
          </>
        
    </div>
  )
}

export default Home