import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

const Temp = props => {
  return (
    <Image
      style={{ width: '100%' }}
      cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
      publicId={props.publicId}
      responsive
      responsiveUseBreakpoints="true"
      alt={props.alt}
    >
      <Transformation
        crop="scale"
        width="auto"
        dpr="auto"
        quality="auto"
        fetchFormat="auto"
      />
    </Image>
  );
};

Temp.displayName = 'Image';

export default Temp;
