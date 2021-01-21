import { FC, ReactNode } from 'react';
import { TooltipProps } from 'react-tooltip';

import { Tooltip } from 'styles/components/common/WithTooltip';

interface ElementProps {
  'data-tip': true;
  'data-for': string;
}

interface Props extends TooltipProps {
  id: string;
  render: (elementProps: ElementProps) => JSX.Element;
  tooltip: ReactNode;
}

const WithTooltip: FC<Props> = ({
  id,
  render,
  tooltip,
  type = 'light',
  effect = 'solid',
  ...rest
}) => (
  <>
    {render({ 'data-tip': true, 'data-for': id })}
    <Tooltip id={id} type={type} effect={effect} {...rest}>
      {tooltip}
    </Tooltip>
  </>
);

export default WithTooltip;
