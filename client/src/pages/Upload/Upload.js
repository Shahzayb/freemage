import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import GoogleAnalytics from 'react-ga';
import { toast } from 'react-toastify';
import history from '../../lib/history';

export class Upload extends Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      const generateSignature = (callback, params_to_sign) => {
        window.$.ajax({
          url:
            (process.env.NODE_ENV === 'development'
              ? 'http://localhost:5000/'
              : '/') + 'api/cloudinary/signature',
          type: 'GET',
          dataType: 'text',
          data: { data: params_to_sign },
          headers: {
            Authorization: 'Bearer ' + this.props.token
          },
          complete: function() {},
          success: function(signature, textStatus, xhr) {
            callback(signature);
          },
          error: function(xhr, status, error) {}
        });
      };

      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
          apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
          uploadPreset: 'freemage',
          uploadSignature: generateSignature,
          folder: 'freemage/' + this.props.userId,
          resourceType: 'image',
          sources: ['camera', 'local'],
          clientAllowedFormats: ['jpeg'],
          maxImageFileSize: 3.145728e7, // 30mb
          secure: true,
          showAdvancedOptions: false,
          cropping: false,
          multiple: false,
          maxFiles: 1,
          defaultSource: 'local',
          singleUploadAutoClose: false,
          showUploadMoreButton: true,
          styles: {
            palette: {
              window: '#ffffff',
              sourceBg: '#f4f4f5',
              windowBorder: '#90a0b3',
              tabIcon: '#000000',
              inactiveTabIcon: '#555a5f',
              menuIcons: '#555a5f',
              link: '#3cb46e',
              action: '#339933',
              inProgress: '#0433ff',
              complete: '#339933',
              error: '#cc0000',
              textDark: '#000000',
              textLight: '#fcfffd'
            },
            fonts: {
              default: null,
              Poppins: {
                url: null,
                active: true
              }
            }
          },
          language: 'en',
          text: {
            en: {
              queue: {
                title: 'File uploaded',
                title_uploading_with_counter: 'Uploading file'
              }
            }
          },
          inlineContainer: null
        },
        (err, info) => {
          if (!err) {
            console.log('Upload Widget event - ', info);
            if (info.event === 'close') {
              history.push('/');
            }
            if (info.event === 'success') {
              if (info.info.moderation[0].status === 'rejected') {
                toast.error('Your image is rejected.');
              } else {
                toast.success('Image is successfuly uploaded.');
                toast.info('Please refresh your browser to view image.');
              }
              GoogleAnalytics.event({
                category: 'User',
                action: 'Image upload'
              });
            }
          } else {
            console.error(err);
          }
        }
      );
      widget.open();
    }
  }

  render() {
    return this.props.isLoggedIn ? null : <Redirect to="/" />;
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  userId: state.auth.userId,
  token: state.auth.token
});

export default connect(mapStateToProps)(Upload);
