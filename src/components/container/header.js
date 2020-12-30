
import {Link} from 'react-router-dom';
import './header.scss';

const Header = () => {

    return(
        <div className="header">
            <nav className="navbar navbar-expand-lg navbar-dark ">
                <div className="container-fluid">
                   
                    <div  className="expand navbar-expand  ">
                        <ul className="navbar-nav  me-auto mb-lg-0 ">
                            <li className="nav-item pl-1 pr-1">
                                <Link to={{pathname:'/'}}  className="nav-link active home-item" >                                         
                                                Home 
                                 </Link>   
                            </li>      
                            <li className="nav-item pl-1 pr-1">
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
                        <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Profile</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>    
        </div>
    )
}

export default Header;