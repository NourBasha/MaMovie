import { NavLink, useHistory} from "react-router-dom";
//import './header.scss';
import Context from "../../utils/context";
import { useContext } from "react";
import Toggle from "../../utils/theme/toggler";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {connect} from 'react-redux';
import * as ACTIONS from '../../store/actions/actions';

const Header = (props) => {

  const context = useContext(Context);
  const history = useHistory();

  const setUserAuthenticated = () => {
    props.setAuthenticated();
    window.localStorage.setItem('authState',true);
    console.log('current url is : ' +window.location.href);
    if(window.location.href.slice(21,window.location.href.length)==='/notAuthorised'){
        history.push('/browse');
    }
  }

  const setUserNotAuthenticated = () => {
    props.setNotAuthenticated();
    window.localStorage.setItem('authState',false);
    console.log('current url is : ' +window.location.href);

  }
  
 
  return (
    <div className="header ">
      <Navbar expand="lg">
        
        <Navbar.Brand className="navbar-brand  ma" href="/">
          Ma
          <span>Movies</span>
        </Navbar.Brand>

      <Navbar.Toggle  id='toggleButton' aria-controls="#header-links-container" >
      <FontAwesomeIcon
        icon="bars" color="#FFF" size="1x"
      />
        </Navbar.Toggle>
      
       
       <Navbar.Collapse id="header-links-container" >
          
          <Nav className=" header-links mx-auto">       
             
              
                <NavLink to="/" exact className="nav-link home-item  d-flex justify-self-end justify-content-end">
                  Home
                </NavLink>

                <NavLink to="/browse" exact className="nav-link browse-item  d-flex justify-self-end justify-content-end">
                  Browse
                </NavLink>

          </Nav>
  

          <NavDropdown drop='left'
            title={<span style={{display:'inline-block'}}>
                     <FontAwesomeIcon  className='drop-icon' 
                     icon='user-cog' size='lg' 
                     color='#00dbdb'
                     style={{}}>
                     </FontAwesomeIcon>
                     </span>
                     }
             id="basic-nav-dropdown "
             className='header-dropdown d-flex justify-self-end justify-content-end justify-items-end'
                    style={{  color:'#00dbdb' }}
            >
              {
                props.userAuth
                ? [<NavDropdown.Item key={'profile'} className='profile-item'>Profile</NavDropdown.Item>,
                <NavDropdown.Item  key={'watchlist'} className='watchlist-item'>Watchlist</NavDropdown.Item>,
                <NavDropdown.Item key={'logout'} className='logout-item' onClick={setUserNotAuthenticated}>Logout</NavDropdown.Item>]
                : 
                [ <NavDropdown.Item key={'login'} className="login-item" onClick={setUserAuthenticated}>
                    Login
                  </NavDropdown.Item>
                  ,
                  <NavDropdown.Item key={'signup'} className="signup-item"onClick={setUserAuthenticated}>
                  Sign Up
                </NavDropdown.Item>
                ]
              }

              <NavDropdown.Divider />
                <Toggle
                  theme={context.appTheme}
                  toggleTheme={context.toggleAppTheme}
                  className="theme-item"
                />
            
            </NavDropdown>

        
            
        </Navbar.Collapse>
      

      </Navbar>
      
       
       
      
    </div>


  );

}

function mapStateToProps (state)  {
    return{
      userAuth: state.userAuth.userAuthenticated,
     
    }
}

function mapDispatchToProps  (dispatch){
      return {
        setAuthenticated : () => dispatch(ACTIONS.setUserAuthenticated()),
        setNotAuthenticated : () => dispatch(ACTIONS.setUserNotAuthenticated()),
      }
}
export default connect(mapStateToProps,mapDispatchToProps) (Header);
