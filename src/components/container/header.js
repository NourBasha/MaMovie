
import {Link} from 'react-router-dom';

const Header = () => {

    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand mr-3" href='/' >Navbar</a>
                    <div  className="expand navbar-expand mr-auto">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                            <li className="nav-item">
                                <Link to={{pathname:'/'}}  className="nav-link active home-item" >                                         
                                                Home 
                                 </Link>   
                            </li>      
                            <li className="nav-item">
                                <Link to={{pathname:'/browse'}}  className="nav-link browse-item" >                                         
                                                Browse 
                                 </Link>   
                            </li>      
                        </ul>
                    
                    </div>
                </div>
            </nav>    
        </div>
    )
}

export default Header;