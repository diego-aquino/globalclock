import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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
`;

export default GlobalStyle;
