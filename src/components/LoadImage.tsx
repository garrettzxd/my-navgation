import React, { ReactElement, useState } from 'react';
import loadingImage from '@/static/image/loading.gif';

export interface LoadImageProps {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

const LoadImage = (props: LoadImageProps): ReactElement => {
  const {
    url, alt, width = 100, height = 100,
  } = props;
  const [imageUlr, setImageUrl] = useState(loadingImage);

  const realImage = new Image();
  realImage.src = url;
  realImage.onload = () => {
    setImageUrl(url);
  };

  return (
    <img src={imageUlr} alt={alt || '图片'} width={width} height={height} />
  );
};

export default LoadImage;
