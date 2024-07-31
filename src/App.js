import { createGlobalStyle } from "styled-components";
import React from "react";
import AllColumn from "./components/AllColumn";

const GlobalStyle = createGlobalStyle`
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
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
