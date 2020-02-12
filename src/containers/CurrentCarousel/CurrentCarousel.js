import React, { Component } from 'react';
import classes from './CurrentCarousel.module.css';
import axios from 'axios';
import Carousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

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

                return currentBooks;
            })
            .then((currentBooks) => {
                const imageLinks = [];
                currentBooks.map((book) => {
                    const googleBookInfo = `https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}`;
                    return axios.get(googleBookInfo)
                        .then((res) => {
                            if (res.data.items && res.data.items.length) {
                                imageLinks.push({
                                    ...book,
                                    imageLink: res.data.items[0].volumeInfo.imageLinks.thumbnail
                                });
                            } else {
                                imageLinks.push({
                                    ...book,
                                    imageLink: 'nada'
                                });
                            }
                            imageLinks.sort((a, b) => {
                                if (a.id < b.id) {
                                    return -1;
                                }
                                if (a.id > b.id) {
                                    return 1;
                                }
                                return 0;
                            });
                            this.setState({
                                currentBooks: imageLinks,
                                loading: false
                            });
                        });
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const books = this.state.currentBooks.map((book) => {
            let url = book.imageLink;
            return (
                <img
                    key={book.isbn}
                    src={url}
                    alt={`${book.title} cover`}
                    className={classes.cover} />
            );
        });


        const responsive = {
            0: {
                items: 1
            },
            500: {
                items: 3
            },
            1024: {
                items: 5
            }
        };

        return (
            <Carousel
                mouseTrackingEnabled
                items={books}
                responsive={responsive}
                infinite={false} />
        );
    }
}

export default CurrentCarousel;