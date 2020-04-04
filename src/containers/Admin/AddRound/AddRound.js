import React, { Component } from 'react';
import axios from 'axios';
import Form from '../../../components/UI/Form/Form';
import { connect } from 'react-redux';

class AddRound extends Component {
    state = {
        addRoundForm: {
            round: {
                value: '',
                type: 'text'
            }
        },
        message: ''
    }

    inputHandler = (event, inputElement) => {
        const addRoundForm = {
            ...this.state.addRoundForm,
            [inputElement.key]: {
                ...inputElement,
                value: event.target.value,
            }
        };
        this.setState({
            addRoundForm: addRoundForm
        });
    }

    submitHandler = (event) => {
        event.preventDefault();

        const round = {name: this.state.addRoundForm.round.value};
        axios.post(`https://fd-book-club.firebaseio.com/settings/rounds.json?auth=${this.props.token}`, round)
            .then((res) => {
                const addRoundForm = {
                    ...this.state.addRoundForm,
                    round: {
                        ...this.state.addRoundForm.round,
                        value: ''
                    }
                };
                this.setState({
                    addRoundForm: addRoundForm,
                    message: `Added ${round.name} to rounds.`
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const formElements = [];
        for (let key in this.state.addRoundForm) {
            formElements.push({
                key: key,
                value: this.state.addRoundForm[key].value,
                type: this.state.addRoundForm[key].type
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
                <h2>Add Round</h2>
                {form}
                <p>{this.state.message}</p>
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
};

export default connect(mapStateToProps)(AddRound);