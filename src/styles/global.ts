import { createGlobalStyle } from 'styled-components';
import { toRGBA } from 'utils/general';

interface GlobalStyleProps {
  minBodyHeight?: number;
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: 'Source Sans Pro', sans-serif;
  }

  :root {
    font-size: 62.5%;
  }

  body {
    width: 100%;
    min-height: ${({ minBodyHeight }) =>
      minBodyHeight ? `${minBodyHeight}px` : '100vh'};

    font-size: 1.6rem;

    display: flex;
    flex-direction: column;

    background-color: ${({ theme }) => toRGBA(theme.colors.primary, 0.3)};
  }

  body > #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  input, textarea, select, button {
    font-family: 'Source Sans Pro', sans-serif;
    color: ${({ theme }) => theme.colors.primary};

    background-color: ${({ theme }) => theme.colors.secondaryWhite};
  }
`;

export default GlobalStyle;
