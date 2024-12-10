import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { uiStore } from '../../utils/stores/uiStore';
import style from './Articles.module.css'

const Articles = ({category}) => {
  const [articles, setArticles] = useState([]);

  const language = uiStore((state)=>state.language)

  useEffect(() => {
    axios.get('http://localhost:3001/articles')
      .then(response => setArticles(response.data))
      .catch(error => console.error('Error fetching articles:', error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      {articles.filter((article)=>article.category === category).map(article => (
        <div key={article.id} style={{ marginBottom: '20px' }}>
          <h2 className={style.h2}>{article.title}</h2>
          <p className={style.p}>{article.content}</p>
          {article.image && <img src={`http://localhost:3001${article.image}`} alt={article.title} style={{ maxWidth: '100%' }} />}
        </div>
      ))}
    </div>
  );
};

export default Articles;
