import React, { useEffect, useState } from 'react';
import Backdrop from './Backdrop';
import style from './ImageModal.module.css';
import { uiStore } from '../../stores/uiStore';
import { BackArrow } from '../../icons';
import { useSwipeable } from 'react-swipeable';

const ImageModal = ({ images, openingImage }) => {
  const [currentImage, setCurrentImage] = useState(openingImage);

  const setOpenModal = uiStore((state) => state.setOpenModal);

  useEffect(() => {
    console.log(images);
  }, [currentImage, images]);

  const handleNextImage = () => {
    setCurrentImage((prevIndex) => 
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    ); // Loop back to the first image
  };

  const handlePreviousImage = () => {
    setCurrentImage((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    ); // Loop back to the last image
  };


  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextImage, // Swipe left to go to the next image
    onSwipedRight: handlePreviousImage, // Swipe right to go to the previous image
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Enables swipe detection with a mouse for desktop users
  });
  
  return (
    <Backdrop>
      <div className={style.container}>
      <button onClick={()=>setOpenModal(false)} className={style.closeButton}>x</button>
        {images.length > 0 && (
          <img
            src={`http://localhost:3001${images[currentImage]?.file}`}
            className={style.picture}
            alt="Modal"
          />
        )}
            <div className={style.buttonContainer}>
            <button onClick={handlePreviousImage} className={style.arrow}><BackArrow/></button>
            <button onClick={handleNextImage} style={{transform: 'rotate(180deg)'}} className={style.arrow}><BackArrow/></button>
            </div>
           
      </div>
    </Backdrop>
  );
};

export default ImageModal;
