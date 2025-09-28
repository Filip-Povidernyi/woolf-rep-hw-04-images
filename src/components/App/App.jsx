import React, { Component } from 'react';
import fetchImages from '../../api/imagesFetch.js';
import Searchbar from '../Searchbar/Searchbar.jsx';
import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import Button from '../Button/Button.jsx';
import Loader from '../Loader/Loader.jsx';
import Modal from '../Modal/Modal.jsx';
import css from './style.module.css';



class App extends Component {

  state = {
    images: [],
    isLoading: false,
    error: null,
    page: 1,
    totalPages: 0,
    query: '',
    modalOpen: false,
    bigImage: {url: '', tags: ''},
  };

  getImages = async (query, page) => {
    try {
      this.setState({ isLoading: true });
      const gallery = await fetchImages(query, page);
      const totalPages = Math.ceil(gallery.totalHits / 12);
      this.setState((prevState) => ({ images: [...prevState.images, ...gallery.hits], totalPages }));
    } catch (error) {
      this.setState({ error: error.message });
      console.log('Something went wrong: ', error.message);
    } finally {
      this.setState({ isLoading: false });
    };
  }

  handlerSubmit = (evt) => {
    evt.preventDefault();
    const query = evt.currentTarget.elements.input.value.trim().toLowerCase();
    if (query === '') {
      return alert('Please, enter your request');
    }
    this.setState({ images: [], page: 1, query });
  };

  loadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(_, prevState) {
    const { query, page} = this.state;
    if (prevState.query !== query || page !== prevState.page) {
      this.getImages(query, page);
    }
  };

  modalIsOpen = (bigImageURL, tags) => {
    this.setState({ modalOpen: true, bigImage: { url: bigImageURL, tags } });
  };

  modalIsClose = () => {
    this.setState({ modalOpen: false, bigImage: { url: '', tags: '' } });
  }

  render() {
    const { query, isLoading, images, page, totalPages, error, bigImage, modalOpen } = this.state;
    return (
      <div className={css.app}>
        <Searchbar handlerSubmit={this.handlerSubmit} query={query} />
        {modalOpen && <Modal bigImage={bigImage} modalIsClose={this.modalIsClose} />}
        {error && <h2 style={{ textAlign: 'center', color: 'red' }}>{error}</h2>}
        {isLoading && <Loader isLoading={isLoading} />}
        {images.length > 0 && <ImageGallery data={images} openModal={this.modalIsOpen} />}
        {images.length > 0 && page < totalPages && <Button handlerClick={this.loadMore}>Load More</Button>}
      </div>
    );
  }
}

export default App;
