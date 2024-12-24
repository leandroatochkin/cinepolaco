import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import style from './Landing.module.css'
import { SlidingText } from '../../utils/components';
import { uiStore } from '../../utils/stores/uiStore';
import { MoonLoader } from 'react-spinners';

const Landing = ({setShowLanding}) => {
    const [showParagraph, setShowParagraph] = useState(false)
    const [showAuthor, setShowAuthor] = useState(false)
    const [isVisible, setIsVisible] = useState(false);

    const language = uiStore((state)=>state.language)

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowParagraph(true);
        }, 3000);
        return () => clearTimeout(timer);
      }, []);


      useEffect(() => {
        const timer = setTimeout(() => {
            setShowAuthor(true);
        }, 5000);
        return () => clearTimeout(timer);
      }, []);

      useEffect(() => {
        // Trigger the slide-in effect after a small delay
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 10000); // Adjust delay as needed (in milliseconds)
        return () => clearTimeout(timer); // Cleanup timer
      }, []);

      useEffect(() => {
        // Trigger the slide-in effect after a small delay
        const timer = setTimeout(() => {
          setShowLanding(false);
        }, 11000); // Adjust delay as needed (in milliseconds)
        return () => clearTimeout(timer); // Cleanup timer
      }, []);

  return (
    <div className={`${style.container} ${isVisible ? style.active : ''}`}>
        <SlidingText word1={'CINE'} word2={'POLACO'}/>
        <div>
        <p className={showParagraph ? style.paragraphVisible : style.paragraphHidden}>{language.ui.landing_paragraph}</p>
        <p className={showAuthor ? style.authorVisible : style.authorHidden} style={{textAlign: 'end', marginRight: '2%' }}>{'-'}{language.people.jose}</p>
        </div>
        <div className={style.loaderContainer}>
        <MoonLoader color='white'/>
        <p>{language.ui.loading}</p>
        </div>
    </div>
  )
}

export default Landing