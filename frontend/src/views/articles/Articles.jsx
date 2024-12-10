import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { uiStore } from '../../utils/stores/uiStore';
import style from './Articles.module.css';
import DOMPurify from 'dompurify'; // Install DOMPurify for sanitizing HTML

const Articles = ({ category }) => {
  const [articles, setArticles] = useState([]);

  const language = uiStore((state) => state.language);

  useEffect(() => {
    axios
      .get('http://localhost:3001/articles')
      .then((response) => setArticles(response.data))
      .catch((error) => console.error('Error fetching articles:', error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      {articles
        .filter((article) => article.category === category)
        .map((article) => (
          <div key={article.id} style={{ marginBottom: '20px' }}>
            <h2 className={style.h2}>{article.title}</h2>
            <div
              className={style.p}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }} // Render enriched text safely
            />
            {article.images &&
              article.images.map((image, index) => (
                <div key={index} style={{ marginTop: '10px' }}>
                  <img
                    src={`http://localhost:3001${image.file}`}
                    alt={`${article.title} - ${index}`}
                    style={{ maxWidth: '100%' }}
                  />
                  <p>{image.comment}</p>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default Articles;
