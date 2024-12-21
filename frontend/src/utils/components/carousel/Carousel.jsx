import React, { useEffect, useState } from 'react';
import style from './Carousel.module.css';
import ImageModal from '../modals/ImageModal';
import { uiStore } from '../../stores/uiStore';



const Carousel = ({ setImages, screen, images, text, link, disabled }) => {
  const [currentPic, setCurrentPic] = useState(0);
  const [isSliding, setIsSliding] = useState(false); // Controls the sliding animation
  const [displayPic, setDisplayPic] = useState(0); // The image to be displayed

  const setOpenModal = uiStore((state)=>state.setOpenModal)
  const openModal = uiStore((state)=>state.openModal)


  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true); // Start sliding animation
      setTimeout(() => {
        setCurrentPic((prevPic) => (prevPic + 1) % images.length); // Update to the next picture
        setIsSliding(false); // End sliding animation
      }, 500); // Match the animation duration
    }, 10000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  useEffect(()=>{console.log(images[0].file)},[])


  return (

    <div className={style.container}>
    {openModal && <ImageModal setImages={setImages} images={images} openingImage={displayPic}/>}
        <div className={screen === 'mobile' ? style.mobileCard : style.desktopCard}>
      <div
        className={`${style.imageContainer} ${isSliding ? style.sliding : ''}`}
        style={{ transform: `translateX(-${currentPic * 100}%)` }}
      >
        {images.map((image, index) => (
          <div 
            key={index}
            className={style.image}
            style={{ backgroundImage: `url('http://localhost:3001${image.file}')`}}
          >
            {image.comment !== '' ? (
              <div className={style.overlay}>
              <p>{image.comment}</p>
          </div>
            )
          :
          null
          }
          </div>
        ))}
      </div>
      <div className={style.info}>
        <p>{text}</p>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        </div>
      </div>

    </div>

        <div className={style.sideSelector}>
            {images.map((image, index)=>(
                <div key={index} style={{width: '100px', height: '80px'}}>
                    <img  src={`http://localhost:3001${image.file}`} className={style.thumbNail} onClick={()=>{
                        setOpenModal(true)
                        setDisplayPic(index)
                        }}/>
                </div>
            ))}
        </div>

    </div>
    
        
  );
};

export default Carousel;