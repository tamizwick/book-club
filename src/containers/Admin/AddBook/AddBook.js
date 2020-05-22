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
                type: 'text',
                config: {
                    required: true
                }
            },
            author: {
                value: '',
                type: 'text',
                config: {
                    required: true
                }
            },
            round: {
                value: '',
                type: 'select',
                config: {
                    options: []
                }
            },
            ISBN: {
                value: '',
                type: 'text',
                config: {
                    required: true
                }
            },
            nominator: {
                value: '',
                type: 'select',
                config: {
                    options: []
                }
            }
        },
        isEdit: false,
        key: null,
        message: '',
        messageColor: '#000'
    }

    componentDidMount() {
        axios.get(`https://fd-book-club.firebaseio.com/settings/rounds.json?auth=${this.props.token}`)
            .then((res) => {
                const options = [];
                for (let key in res.data) {
                    options.push(res.data[key].name);
                }
                this.setState({
                    bookForm: {
                        ...this.state.bookForm,
                        round: {
                            ...this.state.bookForm.round,
                            config: {
                                ...this.state.bookForm.round.config,
                                options: options
                            }
                        }
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get(`https://fd-book-club.firebaseio.com/settings/nominators.json?auth=${this.props.token}`)
            .then((res) => {
                const options = [];
                for (let key in res.data) {
                    options.push(res.data[key].name);
                }
                this.setState({
                    bookForm: {
                        ...this.state.bookForm,
                        nominator: {
                            ...this.state.bookForm.nominator,
                            config: {
                                ...this.state.bookForm.nominator.config,
                                options: options
                            }
                        }
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });

        const isEdit = this.props.location.pathname.includes('edit-book');
        if (isEdit) {
            axios.get(`https://fd-book-club.firebaseio.com/books.json?orderBy="isbn"&equalTo="${this.props.match.params.isbn}"&auth=${this.props.token}`)
                .then((res) => {
                    for (let key in res.data) {
                        this.setState({
                            bookForm: {
                                ...this.state.bookForm,
                                title: {
                                    ...this.state.bookForm.title,
                                    value: res.data[key].title || ''
                                },
                                author: {
                                    ...this.state.bookForm.author,
                                    value: res.data[key].author || ''
                                },
                                round: {
                                    ...this.state.bookForm.round,
                                    value: res.data[key].round || ''
                                },
                                ISBN: {
                                    ...this.state.bookForm.ISBN,
                                    value: res.data[key].isbn || ''
                                },
                                nominator: {
                                    ...this.state.bookForm.nominator,
                                    value: res.data[key].nominator || ''
                                },
                            },
                            isEdit: true,
                            key: key
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
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

        for (let input in this.state.bookForm) {
            if (this.state.bookForm[input].config && this.state.bookForm[input].config.required && this.state.bookForm[input].value === '') {
                const inputName = input[0].toUpperCase() + input.slice(1);
                this.setState({
                    message: `${inputName} is required.`,
                    messageColor: '#800000'
                });
                return;
            }
        }

        const bookData = {
            title: this.state.bookForm.title.value,
            author: this.state.bookForm.author.value,
            round: this.state.bookForm.round.value,
            isbn: this.state.bookForm.ISBN.value,
            nominator: this.state.bookForm.nominator.value
        };

        if (this.state.isEdit) {
            axios.put(`https://fd-book-club.firebaseio.com/books/${this.state.key}.json?auth=${this.props.token}`, bookData)
                .then((res) => {
                    this.setState({
                        message: `Updated ${res.data.title}.`,
                        messageColor: '#000'
                    });
                    bookData.key = this.state.key;
                    this.props.editBook(bookData);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            axios.post(`https://fd-book-club.firebaseio.com/books.json?auth=${this.props.token}`, bookData)
                .then((res) => {
                    bookData.key = res.data.name
                    this.props.addBook(bookData);

                    const title = bookData.title;
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
                        bookForm: bookForm,
                        message: `${title} has been added.`,
                        messageColor: '#000'
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    }

    render() {
        const formElements = [];
        for (let key in this.state.bookForm) {
            formElements.push({
                key: key,
                value: this.state.bookForm[key].value,
                type: this.state.bookForm[key].type,
                config: this.state.bookForm[key].config
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
                <h2>{this.state.isEdit ? 'Edit' : 'Add'} Book</h2>
                {form}
                <p style={{ color: this.state.messageColor }}>{this.state.message}</p>
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
        addBook: (bookData) => dispatch({ type: actionTypes.ADD_BOOK, bookData: bookData }),
        editBook: (bookData) => dispatch({ type: actionTypes.EDIT_BOOK, bookData: bookData })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);