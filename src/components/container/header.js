import { Link ,NavLink} from "react-router-dom";
//import './header.scss';
import Context from "../../utils/context";
import { useContext, useState } from "react";
import Toggle from "../../utils/theme/toggler";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = (props) => {
  const context = useContext(Context);

  //    const [isNavCollapsed, setMenuCollpapes] = useState(true);

  //   const handleNavCollapse = () => setMenuCollpapes(!isNavCollapsed);

  const listItemClicked = (event) => {
    let home = document.getElementsByClassName("home-item")[0];
    let browse = document.getElementsByClassName("browse-item")[0];
    let login = document.getElementsByClassName("login-item")[0];
    let signup = document.getElementsByClassName("signup-item")[0];

    switch (event.target.parentElement) {
      case home:
        if (!home.classList.contains("active")) {
          home.classList.add("active");
        }
        browse.classList.remove("active");
        login.classList.remove("active");
        signup.classList.remove("active");
        break;
      case browse:
        if (!browse.classList.contains("active")) {
          browse.classList.add("active");
        }
        home.classList.remove("active");
        login.classList.remove("active");
        signup.classList.remove("active");
        break;
      case login:
        if (!login.classList.contains("active")) {
          login.classList.add("active");
        }
        home.classList.remove("active");
        browse.classList.remove("active");
        signup.classList.remove("active");

        break;
      case signup:
        if (!signup.classList.contains("active")) {
          signup.classList.add("active");
        }
        home.classList.remove("active");
        login.classList.remove("active");
        login.classList.remove("active");
        break;

      default:
        break;
    }
  };

  return (
    <div className="header">
      <Navbar expand="lg">
        <Navbar.Brand className="navbar-brand  ma" href="/">
          Ma
          <span>Movies</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="header-links-container" />
        <Navbar.Collapse id="header-links-container" className="d-inline-block">
          <Nav className="mx-auto header-links">
               
            <NavLink to="/" exact className="nav-link home-item justify-self-center">
              Home
            </NavLink>
            <NavLink to="/browse" className="nav-link browse-item">
              Browse
            </NavLink>

          </Nav>

          
          <NavDropdown  drop='left'  
            title={<span style={{display:'inline-block'}}>
                     <FontAwesomeIcon icon='user-cog' size='lg' color='gray'>
                     </FontAwesomeIcon>
                     </span>
                     }
             id="basic-nav-dropdown "
             className='header-dropdown'
                    style={{  color:'#00dbdb' }}
            >
              <NavDropdown.Item className="login-item" href="/">
                Login
              </NavDropdown.Item>
              <NavDropdown.Item className="signup-item" href="/">
                Sign Up
              </NavDropdown.Item>
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
    // <div className="header">
    //     <nav className="navbar navbar-expand-lg navbar-dark ">
    //         <div className="container-fluid">
    //         <a className="navbar-brand  ma" href='/' >Ma
    //             <span >Movies</span>
    //              </a>
    //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#headerList"
    //                 aria-controls="navbarSupportedContent" aria-expanded={`${isNavCollapsed?false:true}`}
    //                 onClick={handleNavCollapse} aria-label="Toggle navigation">
    //             <span className="navbar-toggler-icon"></span>
    //         </button>

    //             <div  className={`${isNavCollapsed?'collapse':''} navbar-collapse`} id="headerList">
    //                 <ul className="navbar-nav ml-auto me-auto mb-lg-0 navbar-ul ">
    //                     <li className="nav-item pl-1 pr-1 active home-item" onClick={listItemClicked}>
    //                         <Link to={{pathname:'/'}}  className="nav-link  home-item" >
    //                                 Home
    //                          </Link>
    //                     </li>
    //                     <li className="nav-item pl-1 pr-1 browse-item" onClick={listItemClicked}>
    //                         <Link to={{pathname:'/browse'}}  className="nav-link browse-item" >
    //                                         Browse
    //                          </Link>
    //                     </li>

    //                 </ul>

    //             </div>

    //               <div className="navbar-collapse collapse" >
    //                 <ul className="nav navbar-nav ml-auto navbar-ul" >

    //                 <li className="nav-item login-item" onClick={listItemClicked}>
    //                         <a className="nav-link" href="/">Login</a>
    //                     </li>
    //                     <li className="nav-item signup-item">
    //                         <a className="nav-link" href="/" onClick={listItemClicked}>Sign Up</a>
    //                     </li>

    //                     <li className="nav-item theme-item">
    //                          <Toggle  theme={context.appTheme} toggleTheme={context.toggleAppTheme} />
    //                     </li>

    //                 </ul>
    //             </div>

    //         </div>
    //     </nav>
    // </div>
  );
};

export default Header;
