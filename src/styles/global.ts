import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    ::selection {
      background-color: ${({ theme }) => theme.colors.detail}
    }
  }

  :root {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 62.5%;
  }

  body {
    width: 100vw;
    min-height: 100vh;

    font-size: 1.6rem;
  }

  input, textarea, select, button {
    font-family: 'Source Sans Pro', sans-serif;
    color: ${({ theme }) => theme.colors.secondaryText};
    background-color: ${({ theme }) => theme.colors.primary};
  }

  .antDesign__messageContainer {
    .anticon {
      top: 0;
    }

    .anticon svg {
      width: 1.9rem;
      height: 1.9rem;
    }
  }
`;

export default GlobalStyle;
