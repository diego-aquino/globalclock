import { FC, HTMLAttributes } from 'react';
import Head from 'next/head';

import { Container } from 'styles/components/common/Layout';

interface Props extends HTMLAttributes<HTMLDivElement> {
  pageTitle: string;
}

const Layout: FC<Props> = ({ pageTitle, children, ...rest }) => (
  <Container {...rest}>
    <Head>
      <title>{pageTitle}</title>
    </Head>

    {children}
  </Container>
);

export default Layout;
