import React from 'react'
import { splitTextAtClosestParagraph } from '../../../helpers/functions'
import { host } from '../../../api_index'
import DOMPurify from 'dompurify';
import Gallery from '../../gallery/Gallery';
import style from './Layout_0.module.css'
import { uiStore } from '../../../stores/uiStore';


const Layout_0 = ({content, imageRight, videos, images, setImages}) => {
    const [firstColumn, secondColumn] = splitTextAtClosestParagraph(content)

    const language = uiStore((state)=>state.language)

  return (
    <>
    <div 
    className={style.container}
    aria-label="Article Content Container">
              <div 
              className={style.content}
              aria-label="Dynamic Article Content">
                <aside 
                className={style.asideRight}
                >
                  <img src={`${host}${imageRight.file}`} alt="Image 1 description" className={style.image}/>
                  <p 
                  className={style.imageComment}
                  >{imageRight.comment}</p>
                </aside>
                <p className={style.text}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(firstColumn),
                }}
                ></p>
                
              
                  
                <p 
                className={style.text}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(secondColumn),
                }}
                ></p>
  
                
  
  
  
              </div>
            </div>
            <div style={{marginTop: '10%'}}>
            {videos && <h3 style={{color: '#212427'}}>{language.ui.related_videos}</h3>}
            <div className={style.videoContainer}>
            
            {videos && videos.map((video,index)=>(
              <div 
              key={index} 
              dangerouslySetInnerHTML={{__html: video[index]}}>
                
              </div>
            ))}
            </div>
            </div>
            
            <div style={{
              marginTop: '10%'
            }}>
            <Gallery images={images} setImages={setImages}/>
            </div>
    </>
  )
}

export default Layout_0