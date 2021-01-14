import {Switch,Router, Route, Redirect} from 'react-router';
import Header from '../components/container/header';
import Home from '../views/home';
import history from '../utils/history';
import Browse from '../views/browse';
import MovieDetails from '../views/movie_details';
import NotAuthorised from '../views/notAuthorised';
import {connect} from 'react-redux';
import Signup from '../views/signup';
import Profile from '../views/profile';
import Login from '../views/login';
import PageNotFound from '../views/page-not-found';


const Routes = (props) =>{


    
        return(
            <div>
               <Router history={history}>
                 <div>
                 <Header  />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact  path='/browse'>
                            {window.localStorage.getItem('authState') === 'true'? <Browse /> : <Redirect to={{pathname:'/notAuthorised'}}/> }
                             </Route>
                        <Route exact path='/movie/:id' render={(data)=> <MovieDetails  data={data} /> } />               
                        <Route exact path='/notAuthorised' component={NotAuthorised} />
                        <Route exact path='/signup' component={Signup} />
                        <Route exact path='/profile' component={Profile} />
                        <Route exact path='/login' component={Login} />
                        <Route component={PageNotFound} />

                    </Switch>
                 </div>
               </Router>    
            </div>
        )
   
}
 
function mapStateToProps  (state)  {
return{
    userAuth : state.userAuth.userAuthenticated
}
}
export default connect(mapStateToProps) (Routes);