import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GoogleAnalytics from 'react-ga';
import { Helmet } from 'react-helmet';
import axios from '../../lib/axios';
import history from '../../lib/history';
import {
  fetchImageById,
  toggleImageLike,
  deleteImage
} from '../../actions/images';
import Image from '../../UI/Image';
import { ReactComponent as ArrowDownIcon } from '../../assets/images/arrow-down.svg';
import { ReactComponent as TrashcanIcon } from '../../assets/images/trashcan.svg';
import Heart from '../../UI/Heart/Heart';
import Spinner from '../../UI/Spinner';
import css from './Image.module.css';

class ImagePage extends React.Component {
  onDownload() {
    const image = this.props.image;
    if (image) {
      axios({
        url: image.src,
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
        link.setAttribute('download', image.filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    }
    GoogleAnalytics.event({
      category: 'User',
      action: 'Image download'
    });
  }

  async onDelete() {
    const result = window.confirm('Do you want to delete this image?');
    if (result) {
      this.props.deleteImage(this.props.match.params.id);
    }
  }

  // call when Like button is clicked -- will probably dispatch an action
  onLike(e) {
    e.preventDefault();
    if (!this.props.loggedUserId) {
      history.push('/login');
    } else {
      const { isLikedByMe, loggedUserId } = this.props;
      const { _id: imageId } = this.props.image;
      this.props.toggleImageLike(imageId, isLikedByMe, loggedUserId);
      GoogleAnalytics.event({
        category: 'User',
        action: isLikedByMe ? 'Unliked the image' : 'Liked the image'
      });
    }
  }

  componentDidMount() {
    if (!this.props.image) {
      this.props.fetchImageById(this.props.match.params.id);
    }
  }

  render() {
    const { image, isLoading } = this.props;
    const head = <Helmet>
        <title>Freemage - Image viewer</title>
        <meta name="description" content="View image in more details" />
      </Helmet>

    return isLoading ? (
      <>
      {head}
      <div className={css.SpinnerContainer}>
        <Spinner type="TailSpin" color="#111" />
      </div>
      </>
    ) : (
      <>
      {head}
        <header className={css.Header}>
          <Link to={`/users/${image.user._id}`} className={css.NavLink}>
            <div className={css.Profile}>
              <img
                src={image.user.profilePic}
                alt={image.user.firstName}
                className={css.RoundedThumb}
              />
              <div className={css.Username}>{image.user.firstName}</div>
            </div>
          </Link>
          <div className={css.Heart}>
            <Heart
              onClick={this.onLike.bind(this)}
              like={this.props.isLikedByMe}
            />
          </div>

          {this.props.isMine ? (
            <button
              title="Delete"
              className={css.DeleteBtn}
              onClick={this.onDelete.bind(this)}
            >
              <span id={css.Text}>Delete image</span>
              <TrashcanIcon
                id={css.Symbol}
                title="Delete"
                className={css.Trashcan}
              />
            </button>
          ) : null}

          <button
            title="Download"
            className={css.DownloadBtn}
            onClick={this.onDownload.bind(this)}
          >
            <span id={css.Text}>Download free</span>
            <ArrowDownIcon
              id={css.Symbol}
              title="Download"
              className={css.ArrowDown}
            />
          </button>
        </header>
        <Image publicId={image.publicId} alt={image.tags.join(' ')} />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const image = state.images[id];
  let isLikedByMe = false;
  const loggedUserId = state.auth.userId;
  let isMine = false;
  const isLoading = !image || (image && image.loading);

  if (!isLoading && loggedUserId) {
    isLikedByMe =
      image.likedBy.findIndex(userId => loggedUserId === userId) !== -1;
    isMine = loggedUserId === image.user._id;
  }

  return { image, loggedUserId, isLikedByMe, isMine, isLoading };
};

const mapDispatchToProps = { fetchImageById, toggleImageLike, deleteImage };

export default connect(mapStateToProps, mapDispatchToProps)(ImagePage);
