import React, { Component } from 'react';
import axios from 'axios';
import classes from './NewUser.module.css';
import * as utility from '../../utility/utility';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

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
        signInMessage: ''
    }

    inputHandler = (event, inputElement) => {
        this.checkValidity(event, inputElement);
        const newUserForm = {
            ...this.state.newUserForm,
            [inputElement.key]: {
                ...inputElement,
                value: event.target.value,
            }
        };
        this.setState({
            newUserForm: newUserForm
        }, () => {
            if (inputElement.type === 'password') {
                this.matchPasswords('inputHandler');
            }
        });
    }

    checkValidity = (event, inputElement) => {
        let isValid = true;
        const fieldName = utility.capitalizeString(inputElement.key.replace('_', ' '));
        const validationErrors = {
            ...this.state.validationErrors,
            [inputElement.key]: []
        };
        if (inputElement.validationRules.minLength) {
            isValid = event.target.value.length >= inputElement.validationRules.minLength;
            if (!isValid) {
                validationErrors[inputElement.key].push(`${fieldName} must be ${inputElement.validationRules.minLength} characters.`)
            }
        }
        this.setState({
            validationErrors: validationErrors
        })
    }

    matchPasswords = (method) => {
        if (method === 'inputHandler') {
            const validationErrors = {
                ...this.state.validationErrors,
                passwordMatch: []
            };
            if (this.state.newUserForm.password.value !== this.state.newUserForm.confirm_Password.value) {
                validationErrors.passwordMatch.push(`Passwords must match.`);
            }
            this.setState({
                validationErrors: validationErrors
            })
        } else if (method === 'submitHandler') {
            return this.state.newUserForm.password.value === this.state.newUserForm.confirm_Password.value;
        }
    }

    submitHandler = (event) => {
        event.preventDefault();

        if (!this.matchPasswords('submitHandler')) {
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
                    signInMessage: `User ${res.data.email} has been created.`
                });
            })
            .catch((error) => {
                console.log(error)
                this.setState({
                    signInMessage: `${error}`
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
            <form onSubmit={this.submitHandler}>
                {formElements.map((el) => {
                    return (
                        <Input
                            key={el.key}
                            type={el.type}
                            changed={(event) => this.inputHandler(event, el)}>
                            {el.key.replace('_', ' ')}
                        </Input>
                    );
                })}
                <Button btnClass='btn-primary'>Submit</Button>
            </form>
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
                <p>{this.state.signInMessage}</p>
            </main>
        );
    }
}

export default NewUser;