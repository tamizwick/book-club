import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import * as actionTypes from '../../store/actions/actionTypes';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class Login extends Component {
    state = {
        loginForm: {
            email: {
                value: ''
            },
            password: {
                value: ''
            }
        }
    }

    inputHandler = (event, inputElement) => {
        this.setState({
            loginForm: {
                ...this.state.loginForm,
                [inputElement.key]: {
                    ...inputElement,
                    value: event.target.value
                }
            }
        });
    }

    submitHandler = (event) => {
        event.preventDefault();

        const authData = {
            email: this.state.loginForm.email.value,
            password: this.state.loginForm.password.value,
            returnSecureToken: true
        };
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API}`, authData)
            .then((res) => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                this.props.onLogin(res.data.idToken, expirationDate);
            })
            .catch((err) => {
                console.log(err)
            });
    }

    render() {
        const formElements = [];
        for (let key in this.state.loginForm) {
            formElements.push({
                key: key,
                value: this.state.loginForm[key].value
            });
        }

        let form = (
            <form onSubmit={this.submitHandler}>
                {formElements.map((el) => {
                    return (
                        <Input
                            key={el.key}
                            type={el.key}
                            changed={(event) => this.inputHandler(event, el)}>
                            {el.key}
                        </Input>
                    );
                })}
                <Button btnClass='btn-primary'>Submit</Button>
            </form>
        );
        if (this.props.token !== null) {
            form = <Redirect to='/' />;
        }

        return (
            <main className="main">
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
        onLogin: (idToken, expirationDate) => dispatch({
            type: actionTypes.STORE_TOKEN,
            idToken: idToken,
            expirationDate: expirationDate
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);