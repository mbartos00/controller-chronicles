import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
    scrollbar-width: thin;         
  }
  
  body {
    line-height: 1;
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    background: linear-gradient(234.73deg, rgba(60, 112, 85, 0.6) 12.85%, #221738 61.83%), #221475;
    color: white;
    scroll-behavior:smooth;
    scrollbar-color: rgba(255, 255, 255, 0.2) linear-gradient(180deg, rgba(60, 112, 85, 0.6) 12.85%, rgba(60, 112, 85, 0.35) 61.83%);
    &::-webkit-scrollbar {
    width: 8px;               
    }

  &::-webkit-scrollbar-track {
    background: linear-gradient(180deg, rgba(60, 112, 85, 0.6) 12.85%, rgba(60, 112, 85, 0.35) 61.83%);
          
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 20px;       
  }
  }
  ol, ul {
    list-style: none;
  }
  a {
    text-decoration: none;
  }

`;
