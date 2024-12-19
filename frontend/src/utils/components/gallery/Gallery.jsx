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
                  >
                    {hoveredIndex === index && (
                      <div
                        className={style.overlay}
                        onClick={() => {
                          setOpenModal(true);
                          setImages(images);
                        }}
                      >
                        <MagnifyingGlass />
                        <p>{language.ui.expand}</p>
                      </div>
                    )}
                    <img
                      src={`${host}${image.file}`}
                      alt={`image - ${index}`}
                      style={{ maxWidth: '100%' }}
                      className={style.gridItem}
                    />
                  </div>
                ))}
            </div>
  )
}

export default Gallery