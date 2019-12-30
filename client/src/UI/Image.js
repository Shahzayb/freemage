import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

const Temp = props => {
  return (
    <Image
      style={{ width: '100%' }}
      cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
      publicId={props.publicId}
      dpr="auto"
      responsive
      width="auto"
      crop="scale"
      responsiveUseBreakpoints="true"
      alt={props.alt}
    >
      <Transformation quality="auto" fetchFormat="auto" />
    </Image>
  );
};

Temp.displayName = 'Image';

export default Temp;
