import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';

import RequireAuth from '../components/auth/require_auth';
import Home from '../components/pages/Home';
import Login from '../components/pages/Login';
import Register from '../components/pages/Register';
import NoMatch from '../components/pages/NoMatch';
import Request from '../components/pages/Register/request';


const history = createBrowserHistory();
const Routes = () => (
    <div>
        <BrowserRouter hisotry={history}>
            <Switch>
                <Route exact path="/" render={() => (<Redirect to="/home" />)} />   
                <Route path="/home" component={RequireAuth(Home)} />
                <Route path="/login" component= {Login} />
                <Route path="/register" component= {Register} />
                <Route path="/request" component= {Request} />
                <Route component={NoMatch} />
            </Switch>
        </BrowserRouter>
    </div>
);

export default Routes

  