import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '../../UI/Button';
import uploadIconBig from '../../assets/images/upload-photo.png';
import uploadIconSmall from '../../assets/images/upload-photo-small.png';
import styles from './Upload.module.css';

function Upload(props) {
  const [file, setFile] = useState();

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpg, image/jpeg',
    minSize: 1024, // 1kb min size
    multiple: false,
    onDrop: acceptedFiles => {
      if (acceptedFiles.length) {
        const acceptedFile = acceptedFiles[acceptedFiles.length - 1];
        acceptedFile.preview = URL.createObjectURL(acceptedFile);
        setFile(acceptedFile);
      } else {
        setFile();
      }
    },
    onDropRejected: () => console.log('rejected')
  });

  const thumb = file ? (
    <div className={styles['preview-container']}>
      <img
        src={file.preview}
        alt="preview"
        className={styles['image-preview']}
      />
    </div>
  ) : null;

  const uploadIcon = (
    <i
      className={`${styles['upload-icon']} ${
        styles['upload-icon-' + (file ? 'small' : 'big')]
      }`}>
      <img src={file ? uploadIconSmall : uploadIconBig} alt="Upload" />
    </i>
  );

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      URL.revokeObjectURL(file && file.preview);
    },
    [file]
  );

  return (
    <section className={styles['container']}>
      <div
        {...getRootProps({
          className: file
            ? styles['dropzone']
            : `${styles['dropzone']} ${styles['full-dropzone']}`
        })}>
        <input {...getInputProps()} />
        {/* bottom data will be provided by parent */}
        <div className={styles['command']}>
          {uploadIcon}

          <p className={`${styles['command-text']} ${styles['small-screen']}`}>
            Add your photo here
          </p>
          <p className={`${styles['command-text']} ${styles['big-screen']}`}>
            Drop your image here or{' '}
            <span className={styles['underline']}>Browse</span>
          </p>
        </div>
        {!file ? (
          <ul className={`${styles['big-screen']} ${styles['policies']}`}>
            <li>High quality photos</li>
            <li>Photos are clear and original</li>
            <li>Only upload photos you own the rights to</li>
            <li>Zero tolerance for nudity, violence or hate</li>
            <li>Respect the intellectual property of others</li>
          </ul>
        ) : null}
      </div>
      <div>{thumb}</div>
      <footer className={styles['footer']}>
        {/* click handler will be provied by parent */}
        <Button
          className={styles['upload-btn']}
          disabled={file ? false : true}
          style={file ? {} : { cursor: 'not-allowed' }}>
          Upload
        </Button>
      </footer>
    </section>
  );
}

export default Upload;
