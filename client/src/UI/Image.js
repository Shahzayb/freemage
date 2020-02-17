import React from 'react';
import { Image } from 'cloudinary-react';

const Temp = props => {
  return (
    <Image
      style={{ width: '100%' }}
      cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
      publicId={props.publicId}
      responsive
      responsiveUseBreakpoints="true"
      client_hints="true"
      alt={props.alt}
      flags="progressive"
      crop="scale"
      width="auto"
      dpr="auto"
      quality="auto"
      fetchFormat="auto"
    ></Image>
  );
};

Temp.displayName = 'Image';

export default Temp;
