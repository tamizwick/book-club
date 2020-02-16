import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './Layout.module.css';
import Login from '../Login/Login';
import Homepage from '../../components/Homepage/Homepage';

class Layout extends Component {
    render() {
        let routes = (
            <Switch>
                <Route path='/login' component={Login} />
                <Redirect to='/login' />
            </Switch>
        );
        if (this.props.token !== null) {
            routes = (
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/' exact component={Homepage} />
                    <Redirect to='/' />
                </Switch>
            );
        }

        return (
            <div className={classes.layout}>
                {routes}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    };
};

export default connect(mapStateToProps)(Layout);