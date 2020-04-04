import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Form from '../../../components/UI/Form/Form';

class SetCurrentRound extends Component {
    state = {
        currentRoundForm: {
            round: {
                value: '',
                type: 'select',
                config: {
                    options: []
                }
            }
        },
        isRoundSet: false,
        message: ''
    }

    componentDidMount() {
        axios.get(`https://fd-book-club.firebaseio.com/settings/rounds.json?auth=${this.props.token}`)
            .then((res) => {
                const options = [];
                for (let key in res.data) {
                    options.push(res.data[key].name);
                }
                this.setState({
                    currentRoundForm: {
                        ...this.state.currentRoundForm,
                        round: {
                            ...this.state.currentRoundForm.round,
                            config: {
                                ...this.state.currentRoundForm.round.config,
                                options: options
                            }
                        }
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get(`https://fd-book-club.firebaseio.com/settings/currentRound/name.json?auth=${this.props.token}`)
            .then((res) => {
                this.setState({
                    currentRoundForm: {
                        ...this.state.currentRoundForm,
                        round: {
                            ...this.state.currentRoundForm.round,
                            value: res.data
                        }
                    }
                });
            })
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

        const currentRound = {
            name: this.state.currentRoundForm.round.value
        };
        axios.put(`https://fd-book-club.firebaseio.com/settings/currentRound.json?auth=${this.props.token}`, currentRound)
            .then((res) => {
                this.setState({
                    isRoundSet: true,
                    message: currentRound.name
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
                type: this.state.currentRoundForm[key].type,
                config: this.state.currentRoundForm[key].config
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