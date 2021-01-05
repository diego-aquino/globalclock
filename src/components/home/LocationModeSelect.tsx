import React, {
  FC,
  HTMLAttributes,
  ReactElement,
  useCallback,
  useMemo,
} from 'react';

import { Merge } from 'typings';
import { RichSelect } from 'components/common';
import { Option } from 'components/common/RichSelect';
import { getTypedObjectKeys } from 'utils/general';
import {
  Container,
  StyledMapIcon,
  StyledMapMarkerIcon,
} from 'styles/components/home/LocationModeSelect';

export type LocationMode = 'city' | 'userLocation';

type LocationModeOption = Merge<Option, { value: LocationMode }>;

const optionIcons: {
  [key in LocationMode]: HTMLElement | ReactElement;
} = {
  city: <StyledMapIcon />,
  userLocation: <StyledMapMarkerIcon />,
};

const locationModeLabels: {
  [key in LocationMode]: string;
} = {
  city: 'City',
  userLocation: 'Use my location',
};

interface PartialProps {
  onChange(newLocationMode: LocationMode): void;
}

type Props = Merge<HTMLAttributes<HTMLDivElement>, PartialProps>;

const LocationModeSelect: FC<Props> = ({ onChange, ...rest }) => {
  const handleSelectChange = useCallback(
    (option: LocationModeOption) => {
      onChange(option.value);
    },
    [onChange],
  );

  const options = useMemo<LocationModeOption[]>(() => {
    const locationModes = getTypedObjectKeys(locationModeLabels);

    return locationModes.map((mode) => ({
      label: locationModeLabels[mode],
      value: mode,
      icon: optionIcons[mode],
    }));
  }, []);

  return (
    <Container {...rest}>
      <RichSelect options={options} onChange={handleSelectChange} />
    </Container>
  );
};

export default LocationModeSelect;
