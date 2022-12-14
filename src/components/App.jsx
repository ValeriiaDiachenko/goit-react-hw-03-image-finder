import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import styles from 'components/App.module.css';
import Button from 'components/Button/Button';
import pixabayApi from 'components/API/API';
import Modal from 'components/Modal/Modal';
import Spinner from 'components/Loader/Loader';

export default class App extends Component {
  state = {
    status: 'idle',
    query: [],
    page: 1,
    name: '',
    showModal: false,
    modalImg: null,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.name !== this.state.name) {
      this.setState({ status: 'pending' });

      pixabayApi(this.state.name, this.state.page)
        .then(query => query.hits)
        .then(query => this.setState({ query: query, status: 'resolved' }));
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.setState({ status: 'pending' });

      pixabayApi(this.state.name, this.state.page)
        .then(query => query.hits)
        .then(query =>
          this.setState(prevState => ({
            query: [...prevState.query, ...query],
            status: 'resolved',
          }))
      );
    
    }
    if (prevState.query !== this.state.query) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  handleSubmitForm = value => {
    this.setState({ name: value, page: 1 });
  };

  LoadBtn = () => {
    this.setState({ page: this.state.page + 1 });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  FindmodalImg = (id, img, tags) => {
    this.setState({ modalImg: { id: id, img: img, tags: tags } });
  };

  render() {
    const { query, status, showModal, modalImg } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSubmitForm} />
        {status === 'pending' && <Spinner />}
        <ImageGallery query={query} toggleModal={this.toggleModal} bigImg={this.FindmodalImg} />
        {status === 'resolved' && <Button onClick={this.LoadBtn} />}
        {showModal && <Modal closeModal={this.toggleModal} modalImg={modalImg} />}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    );
  }
}