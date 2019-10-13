import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PrivateRoute from './auth'

import Logout from './Pages/Logout'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'

const Routes = () =>(
    <Router>
        <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute  path="/admin" component={Dashboard} />    
            <Route exact path="/logout" component={Logout} />
        
        </Switch>
    </Router>
)
export default Routes;