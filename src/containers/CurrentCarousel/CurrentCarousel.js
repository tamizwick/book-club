import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Carousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import BookCover from '../../components/Books/BookCover/BookCover';

class CurrentCarousel extends Component {
    state = {
        currentBooks: []
    }

    componentDidUpdate(prevProps) {
        let currentBooks = [];
        if (this.props.allBooks.length && !this.state.currentBooks.length) {
            currentBooks = this.filterByCurrentRound();
            this.fetchCovers(currentBooks);
        }
    }

    componentDidMount() {
        if (this.props.allBooks.length) {
            let currentBooks = [];
            currentBooks = this.filterByCurrentRound();
            this.fetchCovers(currentBooks);
        }
    }

    filterByCurrentRound() {
        const filteredBooks = this.props.allBooks.filter((book) => {
            return book.round === 'wanna-read-it books'
        });
        return filteredBooks;
    }

    fetchCovers(currentBooks) {
        const transformedCurrentBooks = [];
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
                        if (a.key < b.key) {
                            return -1;
                        }
                        if (a.key > b.key) {
                            return 1;
                        }
                        return 0;
                    });
                    this.setState({
                        currentBooks: transformedCurrentBooks
                    });
                })
                .catch((err) => {
                    console.log(err);
                })
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
            700: {
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
        allBooks: state.books.allBooks
    };
};

export default connect(mapStateToProps)(CurrentCarousel);