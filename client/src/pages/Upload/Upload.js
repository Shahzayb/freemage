import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '../../UI/Spinner';
import axios from '../../lib/axios';
import uploadIconBig from '../../assets/images/upload-photo.png';
import uploadIconSmall from '../../assets/images/upload-photo-small.png';
import css from './Upload.module.css';

function Upload(props) {
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);

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
    <div className={css.PreviewContainer}>
      <img src={file.preview} alt="preview" className={css.ImagePreview} />
    </div>
  ) : null;

  const uploadIcon = (
    <div
      className={`${css.UploadIcon} ${
        file ? css.UploadIconSmall : css.UploadIconBig
      }`}>
      <img src={file ? uploadIconSmall : uploadIconBig} alt="Upload" />
    </div>
  );

  const uploadHandler = e => {
    e.preventDefault();
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('image', file);
      axios
        .post('/api/images', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          toast.success(
            'Server accepted your photo. You will get notified of approval'
          );
        })
        .catch(error => {
          console.error(error);

          if (error.response) {
            if (error.response.status === 401) {
              toast.error('You are not authorized to upload');
            } else {
              toast.error('Upload service is not available right now');
            }
          } else if (error.request) {
            toast.error('REQUEST TIMEOUT: Your connection is slow');
          } else {
            // Something happened in setting up the request that triggered an Error
            toast.error('Failed to upload an image');
          }
        })
        .finally(() => {
          setIsUploading(false);
          setFile(null);
        });
    }
  };

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      URL.revokeObjectURL(file && file.preview);
    },
    [file]
  );

  // Redirect the user if not logged in
  if (!props.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <section className={css.Container}>
      <div
        {...getRootProps({
          className: file ? css.Dropzone : `${css.Dropzone} ${css.FullDropzone}`
        })}>
        <input {...getInputProps()} />
        <div className={css.Command}>
          {uploadIcon}

          <p className={css.SmallScreen}>Add your photo here</p>
          <p className={css.BigScreen}>
            Drop your image here or{' '}
            <span className={css.Underline}>Browse</span>
          </p>
        </div>
        {!file ? (
          <ul className={`${css.BigScreen} ${css.Policies}`}>
            <li>High quality photos</li>
            <li>Photos are clear and original</li>
            <li>Only upload photos you own the rights to</li>
            <li>Zero tolerance for nudity, violence or hate</li>
            <li>Respect the intellectual property of others</li>
          </ul>
        ) : null}
      </div>
      <div>{thumb}</div>
      <footer className={css.Footer}>
        <button
          onClick={uploadHandler}
          className={css.UploadBtn}
          disabled={file && !isUploading ? false : true}
          style={file && !isUploading ? {} : { cursor: 'not-allowed' }}>
          {!isUploading ? (
            'Upload'
          ) : (
            <Spinner width={16} height={16} type="Oval" color="#ffffff" />
          )}
        </button>
      </footer>
    </section>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps)(Upload);
