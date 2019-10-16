import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../lib/axios';
import { fetchImageById } from '../../actions/image';
import ImageZoomer from '../../UI/ImageZoomer/ImageZoomer';
import { ReactComponent as ArrowDown } from '../../assets/images/arrow-down.svg';
import css from './Image.module.css';

class Image extends React.Component {
  onDownload() {
    const id = this.props.match.params.id;
    if (this.props.images[id].image) {
      axios({
        url: this.props.images[id].image.src,
        method: 'GET',
        responseType: 'blob',
        transformRequest: [
          (data, headers) => {
            // deletes authorization default header only for this request
            delete headers.common.Authorization;
            return data;
          }
        ]
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', this.props.images[id].image.filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    }
  }

  // call when Like button is clicked -- will probably dispatch an action
  // const onLike = () => {};

  componentDidMount() {
    if (!this.props.images[this.props.match.params.id]) {
      this.props.fetchImageById(this.props.match.params.id);
    }
  }

  render() {
    const headerStyle = this.props.modal ? {} : { marginTop: '8rem' };
    const id = this.props.match.params.id;
    return this.props.images[id] ? (
      <>
        <header style={headerStyle} className={css.Header}>
          <Link
            to={`/users/${this.props.images[id].user &&
              this.props.images[id].user._id}`}
            className={css.NavLink}>
            <div className={css.Profile}>
              <img
                src={
                  this.props.images[id].user &&
                  this.props.images[id].user.profilePic
                }
                alt={
                  this.props.images[id].user &&
                  this.props.images[id].user.firstName
                }
                className={css.RoundedThumb}
              />
              <div className={css.Username}>
                {this.props.images[id].user &&
                  this.props.images[id].user.firstName}
              </div>
            </div>
          </Link>
          {/* Add image like button here */}
          <button
            title="Download"
            className={css.DownloadBtn}
            onClick={this.onDownload.bind(this)}>
            <span id={css.Text}>Download free</span>
            <ArrowDown
              id={css.Symbol}
              title="Download"
              className={css.ArrowDown}
            />
          </button>
        </header>
        <ImageZoomer src={this.props.images[id].image.src} />
      </>
    ) : null;
  }
}

const mapStateToProps = state => ({ images: state.images });

const mapDispatchToProps = { fetchImageById };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Image);
