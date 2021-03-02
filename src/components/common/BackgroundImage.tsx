import React, {
  FC,
  ImgHTMLAttributes,
  SyntheticEvent,
  useCallback,
  useState,
} from 'react';

import { useWindowSize } from 'hooks';
import {
  Container,
  Overlay,
  StyledBlurhash,
} from 'styles/components/common/BackgroundImage';

export interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  blurHash?: string;
}

const BackgroundImage: FC<Props> = ({ blurHash, alt, onLoad, ...rest }) => {
  const [showOriginalImage, setShowOriginalImage] = useState(!blurHash);
  const windowSize = useWindowSize();

  const onImageLoad = useCallback(
    (event: SyntheticEvent<HTMLImageElement, Event>) => {
      setShowOriginalImage(true);
      onLoad?.(event);
    },
    [onLoad],
  );

  return (
    <Container>
      <Overlay />
      <img alt={alt} onLoad={onImageLoad} {...rest} />
      {blurHash && (
        <StyledBlurhash
          hash={blurHash}
          width={windowSize.innerWidth}
          height={windowSize.innerHeight}
          $visible={!showOriginalImage}
        />
      )}
    </Container>
  );
};

export default BackgroundImage;
