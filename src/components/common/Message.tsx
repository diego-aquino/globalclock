import { XIcon } from 'assets';
import React, { FC, HTMLAttributes } from 'react';

import {
  Container,
  ChildrenWrapper,
  CloseButton,
} from 'styles/components/common/Message';

interface Props extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

const Message: FC<Props> = ({ onClose, children, ...rest }) => (
  <Container {...rest}>
    <ChildrenWrapper>{children}</ChildrenWrapper>

    <CloseButton onClick={onClose}>
      <XIcon />
    </CloseButton>
  </Container>
);

export default Message;
