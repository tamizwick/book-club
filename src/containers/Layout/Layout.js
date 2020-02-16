import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './Layout.module.css';
import * as actionTypes from '../../store/actions/actionTypes';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import Homepage from '../../components/Homepage/Homepage';

class Layout extends Component {
    componentDidMount() {
        const token = localStorage.getItem('token');
        const expirationDate = new Date(localStorage.getItem('expDate'));
        if (expirationDate <= new Date()) {
            this.props.onLogout();
        } else if (token && token.length) {
            this.props.onLogin(token, expirationDate);
        }
    }

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
                    <Route path='/logout' component={Logout} />
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

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (idToken, expirationDate) => dispatch({
            type: actionTypes.STORE_TOKEN,
            idToken: idToken,
            expirationDate: expirationDate
        }),
        onLogout: () => dispatch({ type: actionTypes.LOGOUT })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);