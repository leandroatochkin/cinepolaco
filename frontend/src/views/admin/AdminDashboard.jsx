import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { uiStore } from '../../utils/stores/uiStore';
import { TextEditor } from '../../utils/components'; // Assuming this is where your TextEditor is defined
import { fetchArticles } from '../../utils/helpers/async';

const AdminDashboard = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    date: '',
    image: null,
  });

    


  const language = uiStore((state) => state.language);

  useEffect(() => {
    fetchArticles(setArticles);
  }, []);

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
    data.append('category', formData.category);
    data.append('content', draftToHtml(convertToRaw(editorState.getCurrentContent()))); // Convert editor content to HTML

    // Debugging: Log the content of the editor
    const editorContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log('Editor content:', editorContent);

    if (formData.image) {
        data.append('image', formData.image); // Append image if selected
    }

    try {
        const response = await axios.post(`http://localhost:3001/articles`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log(response.data); // Log response
        alert('Article added successfully!');
        setFormData({ title: '', category: '', image: null }); // Clear form
        setEditorState(EditorState.createEmpty()); // Reset editor content
        fetchArticles(setArticles); // Refresh articles list
    } catch (error) {
        console.error('Error adding article:', error);
        alert('Failed to add article');
    }
};


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/articles/${id}`);
      alert('Article deleted successfully!');
      fetchArticles(setArticles); // Refresh articles list
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>{language.ui.admin_dashboard}</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <label>{language.ui.article_date}:</label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            placeholder="DD-MM-AAAA"
          />
          <label>{language.ui.article_title}:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>{language.ui.article_text}:</label>
          {/* TextEditor component to handle editor state */}
            <TextEditor />
        </div>
        <div>
          <label>{language.ui.article_image}:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div>
          <label>{language.ui.article_category}:</label>
          <select
            name="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="cinema">{language.ui.categories.cinema}</option>
            <option value="community">{language.ui.categories.community}</option>
            <option value="contests">{language.ui.categories.contests}</option>
            <option value="country">{language.ui.categories.country}</option>
            <option value="displays">{language.ui.categories.displays}</option>
            <option value="news">{language.ui.categories.news}</option>
            <option value="people">{language.ui.categories.people}</option>
            <option value="workshops">{language.ui.categories.workshops}</option>
          </select>
        </div>
        <button type="submit">{language.ui.add_article}</button>
      </form>

      <h2>{language.ui.existing_articles}</h2>
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
