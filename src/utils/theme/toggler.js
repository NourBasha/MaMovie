import React from 'react'
import { func, string } from 'prop-types';
import styled from "styled-components"
const Button = styled.a`
 // background: ${({ theme }) => theme.background};
 // border: 2px solid ${({ theme }) => theme.toggleBorder};
  color: ${({ theme }) => theme.text};
//   border-radius: 30px;
  cursor: pointer;
//   font-size:0.8rem  ;
//   padding: 0.6rem;
    // position: absolute;
    // bottom:10px;
    // right:10px;
    // z-index:3;
  }
`;

const Toggle = ({theme,  toggleTheme }) => {
    return (
        <div>
            <Button onClick={toggleTheme} >
            Switch Theme
            </Button>
        </div>
      
    );
};

Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}

export default Toggle;