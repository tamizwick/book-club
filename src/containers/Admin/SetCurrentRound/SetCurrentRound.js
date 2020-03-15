import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Form from '../../../components/UI/Form/Form';

class SetCurrentRound extends Component {
    state = {
        currentRoundForm: {
            round: {
                value: '',
                type: 'text'
            }
        },
        isRoundSet: false,
        message: ''
    }

    inputHandler = (event, inputElement) => {
        const currentRoundForm = {
            ...this.state.currentRoundForm,
            [inputElement.key]: {
                ...inputElement,
                value: event.target.value,
            }
        };
        this.setState({
            currentRoundForm: currentRoundForm
        });
    }

    submitHandler = (event) => {
        event.preventDefault();

        const settings = {
            currentRound: this.state.currentRoundForm.round.value
        };
        axios.put(`https://fd-book-club.firebaseio.com/settings.json?auth=${this.props.token}`, settings)
            .then((res) => {
                const currentRoundForm = {
                    ...this.state.currentRoundForm,
                    round: {
                        ...this.state.currentRoundForm.round,
                        value: ''
                    }
                };
                this.setState({
                    currentRoundForm: currentRoundForm,
                    isRoundSet: true,
                    message: settings.currentRound
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        const formElements = [];
        for (let key in this.state.currentRoundForm) {
            formElements.push({
                key: key,
                value: this.state.currentRoundForm[key].value,
                type: this.state.currentRoundForm[key].type
            });
        }

        let form = (
            <Form
                submitHandler={this.submitHandler}
                formElements={formElements}
                inputHandler={this.inputHandler} />
        );

        return (
            <main className="main">
                <h2>Set Current Round</h2>
                {form}
                {this.state.isRoundSet
                    ? <p>Current Round set to "{this.state.message}".</p>
                    : null}
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
};

export default connect(mapStateToProps)(SetCurrentRound);