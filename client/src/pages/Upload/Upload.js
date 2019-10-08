import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import uploadIconBig from '../../assets/images/upload-photo.png';
import uploadIconSmall from '../../assets/images/upload-photo-small.png';
import css from './Upload.module.css';

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

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      URL.revokeObjectURL(file && file.preview);
    },
    [file]
  );

  // Redirect the user if not logged in
  if (!props.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <section className={css.Container}>
      <div
        {...getRootProps({
          className: file ? css.Dropzone : `${css.Dropzone} ${css.FullDropzone}`
        })}>
        <input {...getInputProps()} />
        {/* bottom data will be provided by parent */}
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
        {/* click handler will be provied by parent */}
        <button
          className={css.UploadBtn}
          disabled={file ? false : true}
          style={file ? {} : { cursor: 'not-allowed' }}>
          Upload
        </button>
      </footer>
    </section>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps)(Upload);
