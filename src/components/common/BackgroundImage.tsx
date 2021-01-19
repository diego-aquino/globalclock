import React, { FC, useMemo } from 'react';
import Image, { ImageProps } from 'next/image';

import { RemoveFrom } from 'typings';
import { useNextImageLoad } from 'hooks';
import {
  Container,
  Overlay,
  StyledBlurhash,
} from 'styles/components/common/BackgroundImage';

const isClient = typeof window !== 'undefined';

export type Props = RemoveFrom<
  ImageProps,
  'layout' | 'width' | 'height' | 'objectFit'
> & {
  blurHash?: string;
};

const BackgroundImage: FC<Props> = ({ blurHash, ...rest }) => {
  const [imageIsFullyLoaded, onLoad] = useNextImageLoad();

  const showOriginalImage = useMemo(() => imageIsFullyLoaded || !blurHash, [
    imageIsFullyLoaded,
    blurHash,
  ]);

  return (
    <Container>
      <Overlay />
      <Image layout="fill" objectFit="cover" onLoad={onLoad} alt="" {...rest} />
      {blurHash && isClient && (
        <StyledBlurhash
          hash={blurHash}
          width={window.innerWidth}
          height={window.innerHeight}
          $visible={showOriginalImage}
        />
      )}
    </Container>
  );
};

export default BackgroundImage;
