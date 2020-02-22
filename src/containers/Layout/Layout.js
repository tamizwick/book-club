import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './Layout.module.css';
import * as actionTypes from '../../store/actions/actionTypes';
import SignIn from '../SignIn/SignIn';
import Logout from '../Logout/Logout';
import Homepage from '../../components/Homepage/Homepage';
import Admin from '../../components/Admin/Admin';
import NewUser from '../NewUser/NewUser';

class Layout extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem('token');
        const expirationDate = new Date(localStorage.getItem('expDate'));
        if (expirationDate <= new Date()) {
            this.props.onLogout();
        } else if (token && token.length) {
            this.props.onSignIn(token, expirationDate);
        }
    }

    render() {
        let routes = (
            <Switch>
                <Route path='/signin' component={SignIn} />
                <Redirect to='/signin' />
            </Switch>
        );
        if (this.props.token !== null) {
            routes = (
                <Switch>
                    <Route path='/admin/new-user' component={NewUser} />
                    <Route path='/admin/change-password' component={Homepage} />
                    <Route path='/admin' component={Admin} />
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
        onSignIn: (idToken, expirationDate) => dispatch({
            type: actionTypes.STORE_TOKEN,
            idToken: idToken,
            expirationDate: expirationDate
        }),
        onLogout: () => dispatch({ type: actionTypes.LOGOUT })
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));