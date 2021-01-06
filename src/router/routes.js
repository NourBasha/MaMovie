import {Component} from 'react';
import {Switch,Router, Route} from 'react-router';
import Header from '../components/container/header';
import Home from '../views/home';
import history from '../utils/history';
import Browse from '../views/browse';
import MovieDetails from '../views/movie_details';

class Routes extends Component{

    render() {

     
        return(
            <div>
               <Router history={history}>
                 <div>
                 <Header />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/browse' component={Browse} />
                        <Route exact path='/movie/:id' render={(data)=> <MovieDetails  data={data} /> } />               
                    </Switch>
                 </div>
               </Router>    
            </div>
        )}
}

export default Routes;