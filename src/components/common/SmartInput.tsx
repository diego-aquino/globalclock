import React, { FC } from 'react';

import Input, { InputComponentProps } from './Input';

type Props = InputComponentProps;

const SmartInput: FC<Props> = ({ ...rest }) => <Input {...rest} />;

export default SmartInput;
