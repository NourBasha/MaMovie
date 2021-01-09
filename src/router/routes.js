import {Component} from 'react';
import {Switch,Router, Route, Redirect} from 'react-router';
import Header from '../components/container/header';
import Home from '../views/home';
import history from '../utils/history';
import Browse from '../views/browse';
import MovieDetails from '../views/movie_details';
import NotAuthorised from '../views/notAuthorised';
import {connect} from 'react-redux';


class Routes extends Component{


    render() {
    
        return(
            <div>
               <Router history={history}>
                 <div>
                 <Header />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact  path='/browse'>
                            {this.props.userAuth? <Browse /> : <Redirect to={{pathname:'/notAuthorised'}}/> }
                             </Route>
                        <Route exact path='/movie/:id' render={(data)=> <MovieDetails  data={data} /> } />               
                        <Route exact path='/notAuthorised' component={NotAuthorised} />
                    </Switch>
                 </div>
               </Router>    
            </div>
        )}
}
 
function mapStateToProps  (state)  {
return{
    userAuth : state.userAuth.userAuthenticated
}
}
export default connect(mapStateToProps)(Routes);