import {Component} from 'react';
import {Switch,Router, Route} from 'react-router';
import Header from '../components/container/header';
import Home from '../views/home';
import history from '../utils/history';
import Browse from '../views/browse';

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
                    </Switch>
                 </div>
               </Router>
            </div>
        )}
}

export default Routes;