import fetchImages from '../../api/imagesFetch.js';
import Searchbar from '../Searchbar/Searchbar.jsx';
import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import Button from '../Button/Button.jsx';
import Loader from '../Loader/Loader.jsx';
import Modal from '../Modal/Modal.jsx';
import css from './style.module.css';
import { useEffect, useState } from 'react';



const App = () => {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [bigImage, setBigImage] = useState({ url: '', tags: '' });


  const getImages = async (query, page) => {
    try {
      setIsLoading(true);
      const gallery = await fetchImages(query, page);
      const totalPages = Math.ceil(gallery.totalHits / 12);
      if (gallery.hits.length === 0) {
        alert('No images were found for your request');
        return;
      };
      setImages(prevImages => [...prevImages, ...gallery.hits]);
      setTotalPages(totalPages);
    } catch (error) {
      setError(error.message);
      console.log('Something went wrong: ', error.message);
    } finally {
      setIsLoading(false);
    };
  };

  const handlerSubmit = (evt) => {
    evt.preventDefault();
    const query = evt.currentTarget.elements.input.value.trim().toLowerCase();
    if (query === '') {
      return alert('Please, enter your request');
    }
    setImages([]);
    setPage(1);
    setQuery(query);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    getImages(query, page);
  }, [query, page]);


  const modalIsOpen = (bigImageURL, tags) => {
    setModalOpen(true);
    setBigImage({ url: bigImageURL, tags });
  };

  const modalIsClose = () => {
    setModalOpen(false);
    setBigImage({ url: '', tags: '' });
  };

  return (
    <div className={css.app}>
      <Searchbar handlerSubmit={handlerSubmit} query={query} />
      {modalOpen && <Modal bigImage={bigImage} modalIsClose={modalIsClose} />}
      {error && <h2 style={{ textAlign: 'center', color: 'red' }}>{error}</h2>}
      {isLoading && <Loader isLoading={isLoading} />}
      {images.length > 0 && <ImageGallery data={images} openModal={modalIsOpen} />}
      {images.length > 0 && page < totalPages && <Button handlerClick={loadMore}>Load More</Button>}
    </div>
  );
};

export default App;
