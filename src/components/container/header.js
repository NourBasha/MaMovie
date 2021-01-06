
import {Link} from 'react-router-dom';
import './header.scss';
import Context from '../../utils/context';
import {useContext} from 'react';
import Toggle from '../../utils/theme/toggler';

const Header = (props) => {

    const context = useContext(Context);
    
    const listItemClicked = (event) =>{
       
        let home = document.getElementsByClassName('home-item')[0];
        let browse = document.getElementsByClassName('browse-item')[0]
         let login = document.getElementsByClassName('login-item')[0]
           let signup = document.getElementsByClassName('signup-item')[0]

        switch (event.target.parentElement) {
            case home:
                if(!home.classList.contains('active')){
                   home.classList.add('active');
                }
                browse.classList.remove('active');
                login.classList.remove('active');
                signup.classList.remove('active');
                break;
                case browse:
                    if(!browse.classList.contains('active')){
                        browse.classList.add('active');
                     }
                     home.classList.remove('active');
                     login.classList.remove('active');
                     signup.classList.remove('active');
                    break;
                    case login:
                        if(!login.classList.contains('active')){
                            login.classList.add('active');
                         }
                         home.classList.remove('active');
                         browse.classList.remove('active');
                         signup.classList.remove('active');
                
                        break;
                        case signup:
                            if(!signup.classList.contains('active')){
                                signup.classList.add('active');
                             }
                             home.classList.remove('active');
                             login.classList.remove('active');
                             login.classList.remove('active');
                            break;
                                
            default:
                break;
        }

       
    }
   

    return(
        <div className="header">
            <nav className="navbar navbar-expand-lg navbar-dark ">
                <div className="container-fluid">
                   
                    <div  className="expand navbar-expand  ">
                        <ul className="navbar-nav  me-auto mb-lg-0 navbar-ul ">
                            <li className="nav-item pl-1 pr-1 active home-item" onClick={listItemClicked}>
                                <Link to={{pathname:'/'}}  className="nav-link  home-item" >                                         
                                        Home 
                                 </Link>   
                            </li>      
                            <li className="nav-item pl-1 pr-1 browse-item" onClick={listItemClicked}>
                                <Link to={{pathname:'/browse'}}  className="nav-link browse-item" >                                         
                                                Browse 
                                 </Link>   
                            </li>      
                        </ul>
                    </div>

                    <a className="navbar-brand mx-auto ma" href='/' >Ma
                    <span >Movies</span>
                     </a>
                     
                     <div className="navbar-expand expand">
                        <ul className="nav navbar-nav ml-auto navbar-ul" >
                            <li className="nav-item login-item" onClick={listItemClicked}>
                                <a className="nav-link" href="/">Login</a>
                            </li>
                            <li className="nav-item signup-item">
                                <a className="nav-link" href="/" onClick={listItemClicked}>Sign Up</a>
                            </li>
                            <li className="nav-item theme-item">
                                 <Toggle  theme={context.appTheme} toggleTheme={context.toggleAppTheme} />
                            </li>

                        </ul>
                    </div>

                </div>
            </nav>    
        </div>
    )
}

export default Header;