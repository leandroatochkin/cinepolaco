import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { uiStore } from '../../utils/stores/uiStore';
import style from './Articles.module.css';
import { Carousel } from '../../utils/components';
import ImageModal from '../../utils/components/modals/ImageModal';
import { api } from '../../utils/api_index';
import { Layout_0, Layout_1, Layout_2, Layout_3 } from '../../utils/components/layouts';
import { MoonLoader } from 'react-spinners';


const Articles = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)


  const language = uiStore((state) => state.language);
  const openModal = uiStore((state) => state.openModal);
  const setOpenModal = uiStore((state) => state.setOpenModal);
  const loading = uiStore((state) => state.loading);
  const setLoading = uiStore((state) => state.setLoading);


  // useEffect(() => {
  //   setLoading(true)
  //   axios
  //     .get(api.get_articles)
  //     .then((response) => {
  //       setArticles(...prev, ...response)
  //       setHasMore(response.length > 0)
  //     })
  //     .finally(setLoading(false))
  //     .catch((error) => console.error('Error fetching articles:', error));
  // }, []);

  const fetchArticles = async () => {
    setLoading(true)
     axios
       .get(api.get_articles)
       .then((response) => {
         setArticles((prev) => [...prev, ...response.data])
         setHasMore(response.length > 0)
       })
       .finally(setLoading(false))
       .catch((error) => console.error('Error fetching articles:', error));
  }

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !loading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    // Add event listener for scrolling
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  useEffect(() => {
    fetchArticles(page); // Fetch articles when the page changes
  }, [page]);

  if (loading) {
    return (
      <div className={style.loaderContainer}>
        <MoonLoader color="rgb(220,20,60)" size={50} aria-label="Loading spinner" />
      </div>
    );
  }


  return (
    <div className={style.container}>
      {openModal && <ImageModal setImages={setImages} images={images} openingImage={images[0]} />}
      {articles
        .filter((article) => article.category === category)
        .map((article) => (
          <div key={article.id} style={{ marginBottom: '20px' }}>
            {article.layout === '0' && (
              <>
              <Header article={article}/>
              <Carousel setImages={setImages} images={article.images} screen='mobile'/>
              <Layout_0 content={article.content} imageRight={article.images[0]} imageLeft={article.images[1]} videos={article.videoArr} images={article.images} setImages={setImages} />
              </>
            )}
            {article.layout === '1' && (
              <>
              <Header article={article}/>
              <Carousel setImages={setImages} images={article.images} screen='mobile'/>
              <Layout_1 content={article.content} imageRight={article.images[0]} imageLeft={article.images[1]} videos={article.videoArr} images={article.images} setImages={setImages} />
              </>
            )}
            {article.layout === '2' && (
              <>
              <Header article={article}/>
              <Layout_2 content={article.content}  videos={article.videoArr}/>
              </>
            )}
            {article.layout === '3' && (
              <>
              <Header article={article}/>
              <Layout_2 content={article.content}  videos={article.videoArr}/>
              <Carousel setImages={setImages} images={article.images} screen='mobile'/>
              </>
            )}
            {article.layout === '4' && (
              <>
              <Header article={article}/>
              <Layout_3 content={article.content}  videos={article.videoArr}/>
              <Carousel setImages={setImages} images={article.images} screen='mobile'/>
              </>
            )}
            

          </div>
        ))}
        {loading && <p>Loading...</p>}
        {!hasMore && <p style={{color: '#212427', marginTop: '10%'}}>{language.ui.no_more_articles}</p>}
    </div>
  );
};


const Header = ({article}) => {
  return (
    <div className={style.titleContainer}>
        <h2 className={style.h2}>{article.title}</h2>
          <h3 className={style.date}>
                    {article.date.split('-')[0]}/{article.date.split('-')[1]}/
                    {article.date.split('-')[2]}
          </h3>
    </div>
  )
}



export default Articles;
