import { FC } from 'react';
import Image from 'next/image';

import { Address, TimeOfDay } from 'typings';
import { Container, Overlay } from 'styles/components/clock/ClockThemeImage';

const placeholderThemeImageSrc = // TEMPORARY
  'https://images.unsplash.com/photo-1498855926480-d98e83099315?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2500&q=80';

// Props are unused temporarily
interface Props {
  address: Address;
  timeOfDay: TimeOfDay;
}

const ClockThemeImage: FC<Props> = ({ address, timeOfDay }) => (
  <Container>
    <Overlay />
    <Image
      src={placeholderThemeImageSrc}
      alt=""
      layout="fill"
      objectFit="cover"
    />
  </Container>
);

export default ClockThemeImage;
