import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as utility from '../../../utility/utility';
import * as actionTypes from '../../../store/actions/actionTypes';
import classes from './ChangePassword.module.css';
import Form from '../../../components/UI/Form/Form';

class ChangePassword extends Component {
    state = {
        changePasswordForm: {
            password: {
                value: '',
                type: 'password',
                validationRules: {
                    minLength: 6
                },
            },
            confirm_Password: {
                value: '',
                type: 'password',
                validationRules: {}
            }
        },
        validationErrors: {},
        message: ''
    }

    inputHandler = (event, inputElement, valErrors) => {
        const changePasswordForm = {
            ...this.state.changePasswordForm,
            [inputElement.key]: {
                ...inputElement,
                value: event.target.value,
            }
        };
        this.setState({
            changePasswordForm: changePasswordForm,
            validationErrors: utility.checkValidity(event, inputElement, valErrors)
        }, () => {
            if (inputElement.type === 'password') {
                this.setState({
                    validationErrors: utility.matchPasswords('inputHandler', this.state.changePasswordForm.password.value, this.state.changePasswordForm.confirm_Password.value, this.state.validationErrors)
                });
            }
        });
    }

    submitHandler = (event) => {
        event.preventDefault();

        if (!utility.matchPasswords('submitHandler', this.state.changePasswordForm.password.value, this.state.changePasswordForm.confirm_Password.value)) {
            return null;
        }

        const authData = {
            idToken: this.props.token,
            password: this.state.changePasswordForm.password.value,
            returnSecureToken: true
        };
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIREBASE_API}`, authData)
            .then((res) => {
                this.setState({
                    message: `The password for ${res.data.email} has been changed.`
                });
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                this.props.onSignIn(res.data.idToken, expirationDate, res.data.email);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        const formElements = [];
        const errorsArray = [];
        for (let key in this.state.changePasswordForm) {
            formElements.push({
                key: key,
                value: this.state.changePasswordForm[key].value,
                type: this.state.changePasswordForm[key].type,
                validationRules: this.state.changePasswordForm[key].validationRules
            });
        }

        let form = (
            <Form
                submitHandler={this.submitHandler}
                formElements={formElements}
                inputHandler={this.inputHandler}
                validationErrors={this.state.validationErrors} />
        );

        for (let key in this.state.validationErrors) {
            errorsArray.push(...this.state.validationErrors[key]);
        }
        const errors = errorsArray.map((error, n) => {
            return <p className={classes.error} key={n}>{error}</p>
        });

        return (
            <main className="main">
                <h2>Change Password</h2>
                <p>Username: {this.props.email}</p>
                {form}
                {errors}
                <p>{this.state.message}</p>
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        email: state.emailAddress
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);