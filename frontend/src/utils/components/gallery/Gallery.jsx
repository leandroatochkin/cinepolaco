import React, { useState, useEffect } from 'react';
import { host } from '../../api_index';
import { MagnifyingGlass } from '../../icons';
import style from './Gallery.module.css'
import { uiStore } from '../../stores/uiStore';

const Gallery = ({images, setImages}) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const language = uiStore((state)=>state.language)
    const setOpenModal = uiStore((state)=>state.setOpenModal)

  return (
    <>
    <h2 style={{color: '#212427'}}>{language.ui.gallery}</h2>
    <div className={style.bottomImagesContainer}>
              {images &&
                images.map((image, index) => (
                  <div
                    key={index}
                    className={`${style.gridItemContainer} ${
                      index === 0 ? style.largeItem : ''
                    }`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => {
                        setOpenModal(true);
                        setImages(images);
                      }}
                  >
                    {hoveredIndex === index && (
                      <div
                        className={style.overlay}
                       
                      >
                        <MagnifyingGlass />
                        <p>{language.ui.expand}</p>
                      </div>
                    )}
                    <img
                      src={`${host}${image.file}`}
                      alt={`image - ${index}`}
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
                      className={style.gridItem}
                    />
                  </div>
                ))}
            </div>
    </>
  )
}

export default Gallery