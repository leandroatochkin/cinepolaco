import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:3001/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      await axios.post('http://localhost:3001/articles', data);
      alert('Article added successfully!');
      setFormData({ title: '', content: '', image: null });
      fetchArticles();
    } catch (error) {
      console.error('Error adding article:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/articles/${id}`);
      alert('Article deleted successfully!');
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Add Article</button>
      </form>

      <h2>Existing Articles</h2>
      {articles.map((article) => (
        <div key={article.id} style={{ marginBottom: '20px' }}>
          <h3>{article.title}</h3>
          <p>{article.content}</p>
          {article.image && (
            <img
              src={`http://localhost:3001${article.image}`}
              alt={article.title}
              style={{ maxWidth: '100%' }}
            />
          )}
          <button onClick={() => handleDelete(article.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
