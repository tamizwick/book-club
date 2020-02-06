import React, { Component } from 'react';
import classes from './CurrentCarousel.module.css';
import axios from 'axios';

class CurrentCarousel extends Component {
    state = {
        currentBooks: [],
        loading: true
    }

    componentDidMount() {
        axios.get('https://fd-book-club.firebaseio.com/books.json?orderBy="round"&equalTo="wanna-read-it books"')
            .then((res) => {
                const currentBooks = [];
                for (let key in res.data) {
                    currentBooks.push({
                        ...res.data[key],
                        id: key
                    });
                }
                currentBooks.sort((a, b) => {
                    if (a.id < b.id) {
                        return -1
                    }
                    if (a.id > b.id) {
                        return 1
                    }
                    return 0
                });
                this.setState({
                    currentBooks: currentBooks,
                    loading: false
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const books = this.state.currentBooks.map((book) => {
            const url = `http://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`;
            return (
                <div key={book.isbn} style={{ margin: '0 1em' }}>
                    <img src={url} alt={`${book.title} cover`} />
                    <p>{book.title} by {book.author}</p>
                </div>
            );
        })
        return (
            <div className={classes.CurrentCarousel}>
                {books}
            </div>
        );
    }
}

export default CurrentCarousel;