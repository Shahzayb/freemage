import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '../../components/UI/Button';
import Thumb from '../../components/UI/Thumb/Thumb';
import uploadIconBig from '../../assets/images/upload-photo.png';
import uploadIconSmall from '../../assets/images/upload-photo-small.png';
import './upload.css';

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

  const thumb = file ? <Thumb className="thumb" src={file.preview} /> : null;

  const uploadIcon = file ? (
    <i className="upload-icon upload-icon-small">
      <img src={uploadIconSmall} alt="Upload" />
    </i>
  ) : (
    <i className="upload-icon upload-icon-big">
      <img src={uploadIconBig} alt="Upload" />
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
    <section className="container">
      <div
        {...getRootProps({
          className: file ? 'dropzone' : 'dropzone full-dropzone'
        })}>
        <input {...getInputProps()} />
        <div className="command">
          {uploadIcon}

          <p className="command-text small-screen">Add your photo here</p>
          <p className="command-text big-screen">
            Drop your image here or <span className="underline">Browse</span>
          </p>
        </div>
        {!file ? (
          <ul className="big-screen policies">
            <li>High quality photos</li>
            <li>Photos are clear and original</li>
            <li>Only upload photos you own the rights to</li>
            <li>Zero tolerance for nudity, violence or hate</li>
            <li>Respect the intellectual property of others</li>
          </ul>
        ) : null}
      </div>
      <aside>{thumb}</aside>
      <footer className="footer">
        <Button
          disabled={file ? false : true}
          style={file ? {} : { cursor: 'not-allowed' }}>
          Upload
        </Button>
      </footer>
    </section>
  );
}

export default Upload;
