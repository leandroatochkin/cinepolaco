import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { uiStore } from '../../utils/stores/uiStore';
import style from './Articles.module.css';
import DOMPurify from 'dompurify';
import { Carousel, Gallery } from '../../utils/components';
import { MagnifyingGlass } from '../../utils/icons';
import ImageModal from '../../utils/components/modals/ImageModal';

const Articles = ({ category }) => {
  const [articles, setArticles] = useState([]);
  // const [hoveredIndex, setHoveredIndex] = useState(null);
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
            <div className={style.titleContainer}>
              <h2 className={style.h2}>{article.title}</h2>
              <h3 className={style.date}>
                {article.date.split('-')[0]}/{article.date.split('-')[1]}/
                {article.date.split('-')[2]}
              </h3>
            </div>
            <Carousel setImages={setImages} images={article.images} screen="mobile" />
            <div
              className={style.p}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(article.content),
              }}
            />
            {/* <div className={style.bottomImagesContainer}>
              {article.images &&
                article.images.map((image, index) => (
                  <div
                    key={index}
                    className={`${style.gridItemContainer} ${
                      index === 0 ? style.largeItem : ''
                    }`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {hoveredIndex === index && (
                      <div
                        className={style.overlay}
                        onClick={() => {
                          setOpenModal(true);
                          setImages(article.images);
                        }}
                      >
                        <MagnifyingGlass />
                        <p>{language.ui.expand}</p>
                      </div>
                    )}
                    <img
                      src={`http://localhost:3001${image.file}`}
                      alt={`${article.title} - ${index}`}
                      style={{ maxWidth: '100%' }}
                      className={style.gridItem}
                    />
                  </div>
                ))}
            </div> */}
            <Gallery images={article.images} setImages={setImages}/>
          </div>
        ))}
    </div>
  );
};

export default Articles;
