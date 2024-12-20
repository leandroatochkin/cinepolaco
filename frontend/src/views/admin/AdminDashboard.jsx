import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { uiStore } from '../../utils/stores/uiStore';
import { userStore } from '../../utils/stores/userStore';
import { TextEditor, ButtonSmall, Button, InputBubble } from '../../utils/components'; // Ensure ButtonSmall is correctly imported
import { fetchArticles } from '../../utils/helpers/async';
import { Trashcan, Comment } from '../../utils/icons';
import style from './AdminDashboard.module.css';
import LayoutDesigner from '../../utils/components/layout_designer/LayoutDesigner';

const AdminDashboard = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [articles, setArticles] = useState([]);
  const [video, setVideo] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    date: '',
    images: [],
    videos: [],
    layout: 1,
    articleImages: []
  });
  const [openComments, setOpenComments] = useState(null)
  const [expandText, setExpandText] = useState(null)
  const [highlight, setHighlight] = useState(null)
  const [showInputs, setShowInputs] = useState(0);
  const [articleImage, setArticleImage] = useState(0)

  const colors = ["red", "blue", "green", "yellow", "purple"];

  const language = uiStore((state) => state.language);
  const loggedIn = userStore((state) => state.loggedIn)
  const setLoggedIn = userStore((state) => state.setLoggedIn)

  const navigate = useNavigate()

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    fetchArticles(setArticles);
  }, []);


  const handleEditorChange = (newState) => {
    setEditorState(newState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVideoChange = (e) => {
    const value = e.target.value;
    setVideo(value)
  };

  const handleAddVideo = () => {
    if (video) {
      setFormData((prev) => ({ ...prev, videos: [...prev.videos, video] }));
      setVideo('')
    }
    
  }

  const handleArticleImageChange = (e) => {
    const value = e.target.value;
    setArticleImage(value - 1)
  };

  const handleAddArticleImage = () => {
    if (articleImage) {
      setFormData((prev) => ({ ...prev, articleImages: [...prev.articleImages, articleImage] }));
      setArticleImage(0)
    }
    
  }


  const handleRemoveVideo = (index) => {
    setFormData((prev) => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index), // Remove the video at the specified index
    }));
  }

  const handleFileChange = (e) => { 
    const files = Array.from(e.target.files);
    const imagesWithComments = files.map((file) => ({ file, comment: '' }));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...imagesWithComments], // Append new files to existing images
    }));
  };

  const handleCommentChange = (index, comment) => {
    setFormData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages[index].comment = comment;
      return { ...prev, images: updatedImages };
    });
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index), // Remove image at index
    }));
  };

  const handleSelectLayout = (layout) => {
    setFormData((prev) => ({ ...prev, layout }));
    setHighlight(layout)
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('date', formData.date);
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append(
      'content',
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    ); // Convert editor content to HTML
  
    // Append each image
    formData.images.forEach((imageObj) => {
      data.append('images', imageObj.file); // Use 'images' field for all files
    });
  
    // Append each comment
    formData.images.forEach((imageObj) => {
      data.append('comments', imageObj.comment); // Use 'comments' field for all comments
    });
  
    try {
      const response = await axios.post(`http://localhost:3001/articles`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      alert('Article added successfully!');
      setFormData({ title: '', category: '', date: '', images: [] }); // Clear form
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
      fetchArticles(setArticles);
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const handleExit = () => {
    confirm(language.ui.exit_prompt) ? navigate('/login') : null
  }

  return (
    <div className={style.container}>
{loggedIn ? (
  <>
  <div className={style.titleContainer}>
          <img src='/public/coat.png' className={style.coat}/>
          <h1>{language.ui.admin_dashboard}</h1>
          <img src='/public/coat.png' className={style.coat}/>
          <Button handler={handleExit} text={language.ui.exit} />
        </div>
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }} className={style.form}>
          <div className={style.formTop}>
            <div className={style.topInputContainer}>
              <div style={{display: 'flex', gap: '5%'}}>
              <label>{language.ui.article_date}:</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                placeholder="DD-MM-AAAA"
                style={{ width: '25%' }}
                className={style.input}
              />
              <div>
            <label>{language.ui.article_category}:</label>
            <select
              name="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={style.select}
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
              </div>
              <label>{language.ui.article_title}:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className={style.input}
              />
            </div>
            <div className={style.editor}>
              <label>{language.ui.article_text}:</label>
              <TextEditor editorState={editorState} handleEditorChange={handleEditorChange} />
            </div>
          </div>
          <div  className={style.formBottom}>
            <label>{language.ui.article_image}: </label>
            <input type="file" name="images" multiple onChange={handleFileChange} />
            {formData.images.length > 0 && (
              <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'row', gap: '10px', flexWrap: 'wrap' }}>
                {formData.images.map((imageObj, index) => (
                  <div key={index} style={{position: 'relative', width: 'fit-content'}}>
                    <img
                      src={URL.createObjectURL(imageObj.file)}
                      alt={`Preview ${index}`}
                      style={{ maxWidth: '150px', maxHeight: '150px', border: '1px solid #ddd' }}
                    />
  
                    <ButtonSmall
                      handler={() => handleRemoveImage(index)}
                      text={<Trashcan width={'20px'} height={'20px'} />}
                      color={'red'}
                      top={'2%'}
                      right={'2%'}
                    />
                    <ButtonSmall
                      handler={() => setOpenComments(index)}
                      text={<Comment width={'20px'} height={'20px'} />}
                      color={'green'}
                      top={'30%'}
                      right={'2%'}
                    />
                    {openComments === index && 
                    <InputBubble
                    name={'comments'} 
                    type={'text'} 
                    placeholder={''} 
                    value={imageObj.comment} 
                    onChange={(e) => handleCommentChange(index, e.target.value)} 
                    state={openComments === index} 
                    setState={setOpenComments}/>}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/*---------------------------------------VIDEO--------------------------------------*/}
      <div className={style.formAddVideo}>
            <div className={style.formAddInput}>
            <input
                type="text"
                name="videos"
                onChange={handleVideoChange}
                value={video}
                placeholder="insertar iframe"
                style={{ width: '25%' }}
                className={style.input}
              />
            <button onClick={handleAddVideo}>{language.ui.add_video}</button>
            <div>
        <h3>{language.ui.added_videos}</h3>
        <ul>
          {formData.videos.map((vid, index) => (
            <li key={index}><a href={vid.slice(38, vid.length - 229)} target='_blank' rel='noopener noreferrer'>{vid.slice(38, vid.length - 229)}</a>
            <button onClick={()=>handleRemoveVideo(index)}>{language.ui.delete}</button>
            </li>
            
          ))}
        </ul>
      </div>
            </div>
            <div className={style.formAddInstructions}>
              <h3>{language.ui.embed_video_title}</h3>
              {language.ui.embed_video_text.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
              ))}
            </div>
      </div>
          
          {/*-----------------------------------------------------------------------------*/}

          <div  className={style.formAddVideo}>
                {/* <LayoutDesigner rows={6} cols={6} colors={colors}/> */}
                <div className={style.formAddInstructions}>
                  <div>
                    <h3>{language.ui.references}</h3>
                    <div className={style.referenceLine}>
                    <div style={{backgroundColor: '#d24d5dff'}} className={style.layoutReference}></div><p>{language.ui.text}</p>
                    </div>
                   <div className={style.referenceLine}>
                   <div style={{backgroundColor: '#4d4dd2ff'}} className={style.layoutReference}></div><p>{language.ui.article_images}</p>
                   </div>
                   <div className={style.referenceLine}>
                   <div style={{backgroundColor: '#d2c74dff'}} className={style.layoutReference}></div><p>{language.ui.carousel}</p>
                   </div>
                  <div className={style.referenceLine}>
                  <div style={{backgroundColor: '#4dd263ff'}} className={style.layoutReference}></div><p>{language.ui.videos}</p>
                  </div>
                  </div>
                   {/* <h3>{language.ui.embed_video_title}</h3>
                    {language.ui.embed_video_text.split('\n').map((line, index) => (
                          <p key={index}>{line}</p>
                     ))} */}
            </div>
                <div style={{display: 'flex', flexDirection: 'column', width: '65%'}}>
                <div className={style.layoutButtonContainer}>
                <button onClick={()=>{
                  handleSelectLayout(0)
                  setShowInputs(1)
                }} style={highlight === 0 ? {border: '2px solid red'} : {}}><img src='/public/g5.png'/></button>
                <button onClick={()=>{
                  handleSelectLayout(1)
                  setShowInputs(2)
                  }} style={highlight === 1 ? {border: '2px solid red'} : {}}><img src='/public/g6.png'/></button>
                <button onClick={()=>{
                  handleSelectLayout(2)
                  setShowInputs(0)
                  }} style={highlight === 2 ? {border: '2px solid red'} : {}}><img src='/public/g7.png'/></button>
                <button onClick={()=>{
                  handleSelectLayout(3)
                  setShowInputs(0)
                  }} style={highlight === 3 ? {border: '2px solid red'} : {}}><img src='/public/g8.png'/></button>
                <button onClick={()=>{
                  handleSelectLayout(4)
                  setShowInputs(0)
                  }} style={highlight === 4 ? {border: '2px solid red'} : {}}><img src='/public/g9.png'/></button>
                </div>
                {showInputs !== 0 && 
                <div className={style.formAddInputs}>
                  {showInputs === 1 ? (
                    <>
                    <input type="text" placeholder={language.ui.text} onChange={handleArticleImageChange}/> <button onClick={handleAddArticleImage}>{language.ui.select}</button>
                    </>
                  )
                :

                (
                  <>
                  <input type="text" placeholder={language.ui.text} onChange={handleArticleImageChange}/><button onClick={handleAddArticleImage}>{language.ui.select}</button>
                  <input type="text" placeholder={language.ui.text} onChange={handleArticleImageChange}/><button onClick={handleAddArticleImage}>{language.ui.select}</button>
                  </>
                )
                }
                  </div>}
                </div>
            </div>



          <button type="submit" className={style.submitButton}>{language.ui.add_article}</button>
        </form>
            <div className={style.existingArticle}>
        <h2>{language.ui.existing_articles}</h2>
        {articles.map((article, index) => (
          
          <div key={article.id} >
              
            <h3>{article.title}</h3>
          <div className={style.existingArticleTextContainer}>
          <div
              className={style.p}
              dangerouslySetInnerHTML={{ __html: expandText === index ? article.content : article.content.slice(0,40) + '...' }}
            >
          </div>
          <button onClick={expandText === null ? ()=>{setExpandText(index)} : ()=>{setExpandText(null)}} className={style.expandButton}>
              {expandText === null ? language.ui.see_more : language.ui.see_less}
          </button>
          </div>
            <div  className={style.existingArticleImagesContainer}>
            {article.images &&
              article.images.map((image, index) => (
                <div key={index}  className={style.existingArticleImageContent}style={{ marginTop: '10px' }}>
                  <img
                    src={`http://localhost:3001${image.file}`} // Ensure `image.file` contains the correct path
                    alt={`${article.title} - ${index}`}
                    className={style.existingArticleImage}
                  />
                  <p className={style.existingArticleImageComment}>{image.comment}</p>
                </div>
              ))}
            </div>
            <Button handler={() => handleDelete(article.id)} text={language.ui.delete} />
          </div>
        ))}
      </div>
  </>
) : (
  <div>
    please log in
  </div>
)}
    </div>
  );
  
};

export default AdminDashboard;
