import React, { useEffect, useState } from 'react';
import style from './Carousel.module.css';



const Carousel = ({ screen, images, text, link, disabled }) => {
  const [currentPic, setCurrentPic] = useState(0);
  const [isSliding, setIsSliding] = useState(false); // Controls the sliding animation


  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true); // Start sliding animation
      setTimeout(() => {
        setCurrentPic((prevPic) => (prevPic + 1) % images.length); // Update to the next picture
        setIsSliding(false); // End sliding animation
      }, 500); // Match the animation duration
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  useEffect(()=>{console.log(images)},[])


  return (
    <div className={screen === 'mobile' ? style.mobileCard : style.desktopCard}>
      <div
        className={`${style.imageContainer} ${isSliding ? style.sliding : ''}`}
        style={{ transform: `translateX(-${currentPic * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={style.image}
            style={{ backgroundImage: `url(${image.file})` }}
          >
            <div className={style.overlay}>
                <p>{image.comment}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={style.info}>
        <p>{text}</p>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        </div>
      </div>

    </div>
  );
};

export default Carousel;