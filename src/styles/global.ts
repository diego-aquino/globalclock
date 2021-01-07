import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
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
    width: 100vw;
    min-height: 100vh;

    font-size: 1.6rem;
  }

  input, textarea, select, button {
    font-family: 'Source Sans Pro', sans-serif;
    color: ${({ theme }) => theme.colors.primary};

    background-color: ${({ theme }) => theme.colors.secondaryWhite};
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
