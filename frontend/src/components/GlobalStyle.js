import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.colors.bg};
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
`