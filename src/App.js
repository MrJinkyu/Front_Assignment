import { createGlobalStyle } from "styled-components";
import Columns from "./components/Columns";
import React from "react";

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
      <Columns />
    </>
  );
}
