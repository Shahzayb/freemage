import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export class ImageViewer extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    srcset: PropTypes.string,
    sizes: PropTypes.string,
    alt: PropTypes.string.isRequired
  };

  static defaultProps = {
    src: 'https://source.unsplash.com/random',
    alt: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      zoomedIn: false
    };

    this.toggleZoom = this.toggleZoom.bind(this);
  }

  toggleZoom() {
    this.setState(state => ({
      zoomedIn: !state.zoomedIn
    }));
  }

  render() {
    return (
      <ImageContainer zoomedIn={this.state.zoomedIn}>
        <Image
          zoomedIn={this.state.zoomedIn}
          src={this.props.src}
          srcset={this.props.srcset}
          sizes={this.props.sizes}
          alt={this.props.alt}
          onClick={this.toggleZoom}
        />
      </ImageContainer>
    );
  }
}

const ImageContainer = styled.div`
  ${props =>
    props.zoomedIn
      ? `
      min-width: 100%;
      `
      : `
      margin: 0 auto;
      min-height: 400px;
      height: 85vh;
      max-height: 90vh;
      max-width: 700px;
        `}
  @media screen and (max-width: 767px) {
    height: auto;
    min-height: auto;
    max-height: auto;
    max-width: auto;
    min-width: 100%;
  }
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  object-fit: contain;
  cursor: ${props => (props.zoomedIn ? 'zoom-out' : 'zoom-in')};
  @media screen and (max-width: 767px) {
    cursor: default;
    pointer-events: none;
  }
`;

export default ImageViewer;
