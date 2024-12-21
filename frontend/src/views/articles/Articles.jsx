import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { uiStore } from '../../utils/stores/uiStore';
import style from './Articles.module.css';
import DOMPurify from 'dompurify';
import { Carousel, Gallery, VideoEmbed } from '../../utils/components';
import ImageModal from '../../utils/components/modals/ImageModal';
import { host } from '../../utils/api_index';
import { splitTextAtClosestParagraph } from '../../utils/helpers/functions';


const Articles = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [images, setImages] = useState([]);
  const language = uiStore((state) => state.language);
  const openModal = uiStore((state) => state.openModal);
  const setOpenModal = uiStore((state) => state.setOpenModal);


  useEffect(() => {
    axios
      .get('http://localhost:3001/articles')
      .then((response) => setArticles(response.data))
      .catch((error) => console.error('Error fetching articles:', error));
  }, []);




  return (
    <div className={style.container}>
      {openModal && <ImageModal setImages={setImages} images={images} openingImage={images[0]} />}
      {articles
        .filter((article) => article.category === category)
        .map((article) => (
          <div key={article.id} style={{ marginBottom: '20px' }}>
            {article.layout === '1' && (
              <>
              <Header article={article}/>
              <Carousel setImages={setImages} images={article.images} screen='mobile'/>
              <Layout1 content={article.content} imageRight={article.images[0]} imageLeft={article.images[1]} videos={article.videoArr} images={article.images} setImages={setImages} language={language}/>
              </>
            )}
          </div>
        ))}
    </div>
  );
};


const Header = ({article}) => {
  return (
    <div className={style.titleContainer}>
        <h2 className={style.h2}>{article.title}</h2>
          <h3 className={style.date}>
                    {article.date.split('-')[0]}/{article.date.split('-')[1]}/
                    {article.date.split('-')[2]}
          </h3>
    </div>
  )
}

const Layout1 = ({content, imageRight, imageLeft, videos, images, setImages, language}) => {

const [firstColumn, secondColumn] = splitTextAtClosestParagraph(content)


  return(
    <>
  
    <div style={{
      position: 'relative',
      margin: '20px'
    }} aria-label="Article Content Container">
            <div style={{
              position: 'relative'
            }} aria-label="Dynamic Article Content">
              <aside style={{
                float: 'right',
                top: '0',
                right: '0',
                width: '200px',
                textAlign: 'center',
                padding: '0.5%'
              }}>
                <img src={`${host}${imageRight.file}`} alt="Image 1 description" style={{width: '100%', height: 'auto', borderRadius: '4px'}}/>
                <p style={{
                  color: '#212427',
                  fontSize: '0.8rem',
                  marginTop: '0'
                }}>{imageRight.comment}</p>
              </aside>
              <p style={{
                lineHeight: '1.6',
                clear: '',
                color: '#212427'
              }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(firstColumn),
              }}
              ></p>
              
              

              <aside style={{
                float: 'left',
                bottom: '0',
                left: '0',
                width: '200px',
                textAlign: 'center',
                padding: '0.5%'
              }}>
                <img src={`${host}${imageLeft.file}`} alt="Image 2 description" style={{width: '100%', height: 'auto', borderRadius: '4px'}}/>
                <p style={{
                  color: '#212427',
                  fontSize: '0.8rem',
                  marginTop: '0'

                }}>{imageLeft.comment}</p>
              </aside>
                
              <p style={{
                lineHeight: '1.6',
                clear: '',
                color: '#212427'
              }}
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

export default Articles;
