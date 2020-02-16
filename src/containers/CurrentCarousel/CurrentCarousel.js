import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Carousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import BookCover from '../../components/Books/BookCover/BookCover';

class CurrentCarousel extends Component {
    state = {
        currentBooks: [],
        loading: true
    }

    componentDidMount() {
        axios.get(`https://fd-book-club.firebaseio.com/books.json?orderBy="round"&equalTo="wanna-read-it books"&auth=${this.props.token}`)
            .then((res) => {
                const currentBooks = [];
                const transformedCurrentBooks = [];
                for (let key in res.data) {
                    currentBooks.push({
                        ...res.data[key],
                        id: key
                    });
                }

                currentBooks.map((book) => {
                    const googleBookInfo = `https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}`;
                    return axios.get(googleBookInfo)
                        .then((res) => {
                            if (res.data.items && res.data.items.length) {
                                transformedCurrentBooks.push({
                                    ...book,
                                    imageLink: res.data.items[0].volumeInfo.imageLinks.thumbnail
                                });
                            } else {
                                transformedCurrentBooks.push({
                                    ...book,
                                    imageLink: './assets/noImageAvailable.png'
                                });
                            }
                            transformedCurrentBooks.sort((a, b) => {
                                if (a.id < b.id) {
                                    return -1;
                                }
                                if (a.id > b.id) {
                                    return 1;
                                }
                                return 0;
                            });
                            this.setState({
                                currentBooks: transformedCurrentBooks,
                                loading: false
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const books = this.state.currentBooks.map((book) => {
            return (
                <BookCover book={book} />
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

const mapStateToProps = (state) => {
    return {
        token: state.token
    };
};

export default connect(mapStateToProps)(CurrentCarousel);