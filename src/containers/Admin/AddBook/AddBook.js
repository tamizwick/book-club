import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actionTypes from '../../../store/actions/actionTypes';
import Form from '../../../components/UI/Form/Form';

class AddBook extends Component {
    state = {
        bookForm: {
            title: {
                value: '',
                type: 'text'
            },
            author: {
                value: '',
                type: 'text'
            },
            round: {
                value: '',
                type: 'text'
            },
            ISBN: {
                value: '',
                type: 'text'
            },
            nominator: {
                value: '',
                type: 'text'
            }
        }
    }

    inputHandler = (event, inputElement) => {
        const bookForm = {
            ...this.state.bookForm,
            [inputElement.key]: {
                ...inputElement,
                value: event.target.value,
            }
        };
        this.setState({
            bookForm: bookForm
        });
    }

    submitHandler = (event) => {
        event.preventDefault();

        const bookData = {
            title: this.state.bookForm.title.value,
            author: this.state.bookForm.author.value,
            round: this.state.bookForm.round.value,
            isbn: this.state.bookForm.ISBN.value,
            nominator: this.state.bookForm.nominator.value
        };
        axios.post(`https://fd-book-club.firebaseio.com/books.json?auth=${this.props.token}`, bookData)
            .then((res) => {
                bookData.key = res.data.name
                this.props.addBook(bookData);

                const bookForm = {
                    ...this.state.bookForm,
                    title: {
                        ...this.state.bookForm.title,
                        value: ''
                    },
                    author: {
                        ...this.state.bookForm.author,
                        value: ''
                    },
                    round: {
                        ...this.state.bookForm.round,
                        value: ''
                    },
                    ISBN: {
                        ...this.state.bookForm.ISBN,
                        value: ''
                    },
                    nominator: {
                        ...this.state.bookForm.nominator,
                        value: ''
                    },
                };
                this.setState({
                    bookForm: bookForm
                });
            })
            .catch((err) => {
                console.log(err);
            });

    }

    render() {
        const formElements = [];
        for (let key in this.state.bookForm) {
            formElements.push({
                key: key,
                value: this.state.bookForm[key].value,
                type: this.state.bookForm[key].type
            });
        }

        let form = (
            <Form
                submitHandler={this.submitHandler}
                formElements={formElements}
                inputHandler={this.inputHandler} />
        );

        return (
            <main className='main'>
                <h2>Add Book</h2>
                {form}
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addBook: (bookData) => dispatch({ type: actionTypes.ADD_BOOK, bookData: bookData })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);