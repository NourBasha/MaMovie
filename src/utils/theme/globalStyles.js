import { createGlobalStyle} from "styled-components";
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background};
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }

  //browse head
  #root > div > div > div.browse > div.browse-container > div.filter > h3{
    background : ${({theme}) => theme.filterBackground};
    color: ${({theme}) => theme.appText}; 
    transition: all 0.50s linear;

  }
  // browse filter selec
  #root > div > div > div.browse > div.browse-container > div.filter > div > div.filter-col > select{
    background : ${({theme}) => theme.filterBackground};
    color: ${({theme}) => theme.appText}; 
    transition: all 0.50s linear;
  }

  #root > div > div > div.browse > div.browse-container > div.filter > div > div.filter-col > select > option{
    background : ${({theme}) => theme.filterBackground};
    color: ${({theme}) => theme.appText}; 
    transition: all 0.50s linear;
  }
  // browse filter button
  #root > div > div > div.browse > div.browse-container > div.filter > div > div.form-col> form > button{
    background : ${({theme}) => theme.filterBackground};
    color: ${({theme}) => theme.appText}; 
    transition: all 0.50s linear;
  }
  // home browse link
  #header-links-container > .header-links> .browse-item{
    color: ${({theme}) => theme.text}; 
    transition: all 0.30s linear;

  }

  // home home link
  #header-links-container > .header-links> .home-item{
    color: ${({theme}) => theme.text};
    transition: all 0.30s linear;
 
  }

  #header-links-container > div.header-dropdown.show.nav-item > div{
    background : ${({theme}) => theme.filterBackground};
    color: ${({theme}) => theme.text}; 
    transition: all 0.50s linear;
    position: absolute;
    right: 60px;
  }
 

  #root > div > div > div.not-auth.container > div > div > div > h4 {
    background : ${({theme}) => theme.filterBackground};
    color: ${({theme}) => theme.text}; 
    transition: all 0.50s linear;
  }

  .mamovie-button{
    background : ${({theme}) => theme.filterBackground};
    color: ${({theme}) => theme.appText}; 
    transition: all 0.50s linear;
  }
 .appText {
  color: ${({theme}) => theme.appText}; 
  transition: all 0.50s linear;
 }

  `