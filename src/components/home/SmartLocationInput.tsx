import React, { FC } from 'react';

import { Location, Merge } from 'typings';
import { SearchIcon } from 'assets';
import { SmartInput } from 'components/common';
import { InputComponentProps } from 'components/common/Input';

interface PartialProps {
  onSubmit(selectedLocation: Location): void;
}

type Props = Merge<InputComponentProps, PartialProps>;

const SmartLocationInput: FC<Props> = ({ onSubmit, ...rest }) => (
  <SmartInput
    icon={<SearchIcon />}
    placeholder="Search for a city (available soon...)"
    disabled
    {...rest}
  />
);

export default SmartLocationInput;
