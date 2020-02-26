import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import * as actionTypes from '../../store/actions/actionTypes';
import Form from '../../components/UI/Form/Form';

class SignIn extends Component {
    state = {
        signInForm: {
            email: {
                value: '',
                type: 'email'
            },
            password: {
                value: '',
                type: 'password'
            }
        }
    }

    inputHandler = (event, inputElement) => {
        const signInForm = {
            ...this.state.signInForm,
            [inputElement.key]: {
                ...inputElement,
                value: event.target.value
            }
        };
        this.setState({
            signInForm: signInForm
        });
    }

    submitHandler = (event) => {
        event.preventDefault();

        const authData = {
            email: this.state.signInForm.email.value,
            password: this.state.signInForm.password.value,
            returnSecureToken: true
        };
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API}`, authData)
            .then((res) => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                this.props.onSignIn(res.data.idToken, expirationDate, res.data.email);
            })
            .catch((err) => {
                console.log(err)
            });
    }

    render() {
        const formElements = [];
        for (let key in this.state.signInForm) {
            formElements.push({
                key: key,
                value: this.state.signInForm[key].value,
                type: this.state.signInForm[key].type
            });
        }

        let form = (
            <Form
                submitHandler={this.submitHandler}
                formElements={formElements}
                inputHandler={this.inputHandler} />
        );
        if (this.props.token !== null) {
            form = <Redirect to='/' />;
        }

        return (
            <main className="main">
                <h2>Sign In</h2>
                {form}
            </main>
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
        onSignIn: (idToken, expirationDate, emailAddress) => dispatch({
            type: actionTypes.STORE_TOKEN,
            idToken: idToken,
            expirationDate: expirationDate,
            emailAddress: emailAddress
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);