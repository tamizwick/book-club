import React, { Component } from 'react';
import axios from 'axios';
import classes from './NewUser.module.css';
import * as utility from '../../../utility/utility';
import Form from '../../../components/UI/Form/Form';

class NewUser extends Component {
    state = {
        newUserForm: {
            email: {
                value: '',
                type: 'email',
                validationRules: {}
            },
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
        const newUserForm = {
            ...this.state.newUserForm,
            [inputElement.key]: {
                ...inputElement,
                value: event.target.value,
            }
        };
        this.setState({
            newUserForm: newUserForm,
            validationErrors: utility.checkValidity(event, inputElement, valErrors)
        }, () => {
            if (inputElement.type === 'password') {
                this.setState({
                    validationErrors: utility.matchPasswords('inputHandler', this.state.newUserForm.password.value, this.state.newUserForm.confirm_Password.value, this.state.validationErrors)
                });
            }
        });
    }

    submitHandler = (event) => {
        event.preventDefault();

        if (!utility.matchPasswords('submitHandler', this.state.newUserForm.password.value, this.state.newUserForm.confirm_Password.value)) {
            return null;
        }
        const signInData = {
            email: this.state.newUserForm.email.value,
            password: this.state.newUserForm.password.value,
            returnSecureToken: true
        };
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API}`, signInData)
            .then((res) => {
                this.setState({
                    message: `User ${res.data.email} has been created.`
                });
            })
            .catch((error) => {
                console.log(error)
                this.setState({
                    message: `${error}`
                });
            });
    }

    render() {
        const formElements = [];
        const errorsArray = [];
        for (let key in this.state.newUserForm) {
            formElements.push({
                key: key,
                value: this.state.newUserForm[key].value,
                type: this.state.newUserForm[key].type,
                validationRules: this.state.newUserForm[key].validationRules
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
                <h2>Create New User</h2>
                {form}
                {errors}
                <p>{this.state.message}</p>
            </main>
        );
    }
}

export default NewUser;