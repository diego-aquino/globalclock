import React, { FC, useMemo } from 'react';
import Image, { ImageProps } from 'next/image';

import { RemoveFrom } from 'typings';
import { useNextImageLoad, useWindowSize } from 'hooks';
import {
  Container,
  Overlay,
  StyledBlurhash,
} from 'styles/components/common/BackgroundImage';

export type Props = RemoveFrom<
  ImageProps,
  'layout' | 'width' | 'height' | 'objectFit'
> & {
  blurHash?: string;
};

const BackgroundImage: FC<Props> = ({ blurHash, ...rest }) => {
  const windowSize = useWindowSize();
  const [imageIsFullyLoaded, onLoad] = useNextImageLoad();

  const showOriginalImage = useMemo(() => imageIsFullyLoaded || !blurHash, [
    imageIsFullyLoaded,
    blurHash,
  ]);

  return (
    <Container>
      <Overlay />
      <Image alt="" layout="fill" objectFit="cover" onLoad={onLoad} {...rest} />
      {blurHash && (
        <StyledBlurhash
          hash={blurHash}
          width={windowSize.width}
          height={windowSize.height}
          $visible={!showOriginalImage}
        />
      )}
    </Container>
  );
};

export default BackgroundImage;
