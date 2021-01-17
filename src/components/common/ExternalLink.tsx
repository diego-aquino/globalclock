import { AnchorHTMLAttributes, FC } from 'react';
import { RemoveFrom } from 'typings';
import InlineLink, {
  InlineLinkStyleMode,
} from 'styles/components/common/InlineLink';

type Props = RemoveFrom<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'target' | 'rel'
> & {
  href: string;
  styleMode: InlineLinkStyleMode;
};

const ExternalLink: FC<Props> = ({ styleMode, children, ...rest }) => (
  <InlineLink
    styleMode={styleMode}
    target="_blank"
    rel="noopener noreferrer"
    {...rest}
  >
    {children}
  </InlineLink>
);

export default ExternalLink;
