import { FC } from 'react';
import { DateTime } from 'luxon';

import { Address, TimeOfDay } from 'typings';
import { BackgroundImage } from 'components/common';

const placeholderThemeImageSrc = // TEMPORARY
  'https://images.unsplash.com/photo-1498855926480-d98e83099315?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2500&q=80';

// Props are unused temporarily
type Props = { address: Address } & (
  | { timeOfDay: TimeOfDay; dateTime?: undefined }
  | { timeOfDay?: undefined; dateTime: DateTime }
);

const CityThemeImage: FC<Props> = (props) => (
  <BackgroundImage src={placeholderThemeImageSrc} />
);

export default CityThemeImage;
