import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import classes from './Layout.module.css';
import * as actionTypes from '../../store/actions/actionTypes';
import SignIn from '../SignIn/SignIn';
import Logout from '../Logout/Logout';
import Homepage from '../../components/Homepage/Homepage';
import AllBooks from '../AllBooks/AllBooks';
import Admin from '../../components/Admin/Admin';
import NewUser from '../../containers/Admin/NewUser/NewUser';
import ChangePassword from '../Admin/ChangePassword/ChangePassword';
import AddBook from '../Admin/AddBook/AddBook';

class Layout extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem('token');
        const expirationDate = new Date(localStorage.getItem('expDate'));
        const emailAddress = localStorage.getItem('emailAddress');
        if (expirationDate <= new Date()) {
            this.props.onLogout();
        } else if (token && token.length) {
            this.props.onSignIn(token, expirationDate, emailAddress);
        }

        if (!this.props.allBooks.length) {
            axios.get(`https://fd-book-club.firebaseio.com/books.json?auth=${this.props.token}`)
                .then((res) => {
                    this.props.fetchBooks(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
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
                    <Route path='/all-books' component={AllBooks} />
                    <Route path='/admin/new-user' component={NewUser} />
                    <Route path='/admin/change-password' component={ChangePassword} />
                    <Route path='/admin/add-book' component={AddBook} />
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
        token: state.auth.token,
        allBooks: state.books.allBooks
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSignIn: (idToken, expirationDate, emailAddress) => dispatch({
            type: actionTypes.STORE_TOKEN,
            idToken: idToken,
            expirationDate: expirationDate,
            emailAddress: emailAddress
        }),
        onLogout: () => dispatch({ type: actionTypes.LOGOUT }),
        fetchBooks: (allBooks) => dispatch({ type: actionTypes.FETCH_BOOKS, allBooks: allBooks })
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));