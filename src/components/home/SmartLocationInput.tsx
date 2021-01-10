import React, { FC } from 'react';

import { Merge } from 'typings';
import { SearchIcon } from 'assets';
import { SmartInput } from 'components/common';
import { InputComponentProps } from 'components/common/Input';

interface PartialProps {
  onSubmit(selectedLocation: any): void;
}

type Props = Merge<InputComponentProps, PartialProps>;

const SmartLocationInput: FC<Props> = ({ onSubmit, ...rest }) => (
  <SmartInput
    icon={<SearchIcon />}
    placeholder="Search for a city..."
    {...rest}
  />
);

export default SmartLocationInput;
