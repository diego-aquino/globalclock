import { ButtonHTMLAttributes, FC, ReactElement } from 'react';

import {
  Container,
  IconWrapper,
  SelectWithEnterHint,
  StyledReturnKeyIcon,
  SuggestionContent,
} from 'styles/components/common/smartInput/Suggestion';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: HTMLElement | ReactElement;
  title: string;
  subtitle?: string;
  highlighted?: boolean;
}

const Suggestion: FC<Props> = ({
  icon,
  title,
  subtitle,
  highlighted = false,
  ...rest
}) => (
  <Container highlighted={highlighted} {...rest}>
    <IconWrapper highlighted={highlighted}>{icon}</IconWrapper>
    <SuggestionContent>
      <h4>{title}</h4>
      <p>{subtitle}</p>
    </SuggestionContent>
    <SelectWithEnterHint active={highlighted}>
      Select
      <StyledReturnKeyIcon />
    </SelectWithEnterHint>
  </Container>
);

export default Suggestion;
