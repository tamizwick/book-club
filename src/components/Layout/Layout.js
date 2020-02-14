import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import classes from './Layout.module.css';
import Login from '../../containers/Login/Login';
import Homepage from '../Homepage/Homepage';

const layout = (props) => {
    return (
        <div className={classes.layout}>
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/' exact component={Homepage} />
                <Redirect to='/' />
            </Switch>
        </div>
    );
}

export default layout;