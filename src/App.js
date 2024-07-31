import { createGlobalStyle } from "styled-components";
import React from "react";
import AllColumn from "./components/AllColumn";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
body{
  font-family: "Nanum Gothic", sans-serif;
  font-weight: 400;
  font-style: normal;
  background-color: ${({ theme }) => theme.bodyBgColor};
}
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <AllColumn />
    </>
  );
}
