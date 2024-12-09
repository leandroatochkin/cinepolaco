import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/articles')
      .then(response => setArticles(response.data))
      .catch(error => console.error('Error fetching articles:', error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Articles</h1>
      {articles.map(article => (
        <div key={article.id} style={{ marginBottom: '20px' }}>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
          {article.image && <img src={`http://localhost:3001${article.image}`} alt={article.title} style={{ maxWidth: '100%' }} />}
        </div>
      ))}
    </div>
  );
};

export default Articles;
