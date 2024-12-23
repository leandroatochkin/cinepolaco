import React from 'react'
import DOMPurify from 'dompurify';
import style from './Layout_3.module.css'
import { uiStore } from '../../../stores/uiStore';


const Layout_3 = ({content, videos}) => {

    const language = uiStore((state)=>state.language)

  return (
    <>
    <div 
    className={style.container}
    aria-label="Article Content Container">
    <div className={style.videoContainer}>
            
            {videos && videos.map((video,index)=>(
              <div 
              key={index} 
              dangerouslySetInnerHTML={{__html: video[index]}}>
                
              </div>
            ))}
            </div>
              <div 
              className={style.content}
              aria-label="Dynamic Article Content">
           
                <p className={style.text}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(content),
                }}
                ></p>

              </div>
            </div>
            <div style={{marginTop: '10%'}}>
            {videos && <h3 style={{color: '#212427'}}>{language.ui.related_videos}</h3>}
            
            </div>
            
            <div style={{
              marginTop: '10%'
            }}>
            </div>
    </>
  )
}

export default Layout_3