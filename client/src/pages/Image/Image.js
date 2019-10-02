import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button';
import ImageZoomer from '../../UI/ImageZoomer/ImageZoomer';
import arrow from '../../assets/images/arrow-down.svg';
import styles from './Image.module.css';

// url is /images/:id
// retieve image data from :id param through dispatching
const Image = props => {
  // Sample image downloader
  // const onDownload = () => {
  //   axios({
  //     // url value will be in state -- retrieve through :id param
  //     url: 'http://localhost:5000/static/example.pdf',
  //     method: 'GET',
  //     responseType: 'blob' // important
  //   }).then(response => {
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     // File name will simply be image id
  //     link.setAttribute('download', 'file.pdf');
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   });
  // };

  // call when Like button is clicked -- will probably dispatch an action
  // const onLike = () => {};

  return (
    <>
      <header className={styles['header']}>
        {/* future refector : to will refer to /:firstName/:id */}
        <Link to="/users/someid" className={styles['nav-link']}>
          <div className={styles['profile']}>
            <img
              // Will recieve src from parent
              src="https://source.unsplash.com/random/200x200?profile"
              // add first name here
              alt="shahzaib"
              className={styles['rounded-thumb']}
            />
            {/* Add username here : first name */}
            <div className={styles['username']}>Shahzaib</div>
          </div>
        </Link>

        {/* Add image like button here */}

        {/* download original image when clicked */}
        <Button title="Download" className={styles['download-btn']}>
          <span id={styles['text']}>Download free</span>
          <i id={styles['symbol']} className={styles['arrow-down']}>
            <img src={arrow} alt="Download symbol" />
          </i>
        </Button>
      </header>
      <ImageZoomer />
    </>
  );
};

export default Image;
