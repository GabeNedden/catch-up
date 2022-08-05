import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

  *, *:before, *:after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    border: 0;
    outline: 0;
    background-color: inherit;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    box-shadow: none;
    box-sizing: border-box;
  }

  html, body {
        height: 100%;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    scroll-behavior: smooth;
    line-height: 1.5;
    background: var(--clr-bg);
    color: var(--clr-primary);
}

h1,
h2,
h3,
h4 {
  line-height: 1.2;
  color: var(--clr-fg-alt);
}

h1 {
  font-size: 4rem;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-size: 1.5rem;
}

h4 {
  font-size: 1.3rem;
}

ul {
  list-style-type: none;
}

a {
  text-decoration: none;
}

button {
  cursor: pointer;
}

@media (max-width: 970px) {
  h1 {
    font-size: 2.6rem;
  }
}

`;
