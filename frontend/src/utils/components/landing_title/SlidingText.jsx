import React from "react";
import style from './SlidingText.module.css'

const SlidingText = ({word1, word2}) => {
  return (
    <div className={style.titleContainer}>
      {/* "CINE" slides in */}
      <h1 className={`${style.title} ${style.titleWord1}`}>{word1}</h1>
      {/* "POLACO" slides in afterward */}
      <h1 className={`${style.title} ${style.titleWord2}`}>{word2}</h1>
    </div>
  );
};

export default SlidingText;
