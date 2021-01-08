import React, { FC } from 'react';
import Image, { ImageProps } from 'next/image';

import { RemoveFrom } from 'typings';
import { Container, Overlay } from 'styles/components/common/BackgroundImage';

type Props = RemoveFrom<
  ImageProps,
  'layout' | 'width' | 'height' | 'objectFit'
>;

const BackgroundImage: FC<Props> = (props) => (
  <Container>
    <Overlay />
    <Image layout="fill" objectFit="cover" {...props} />
  </Container>
);

export default BackgroundImage;
