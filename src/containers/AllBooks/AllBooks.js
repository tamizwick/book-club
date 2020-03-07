import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import classes from './AllBooks.module.css';
import * as actionTypes from '../../store/actions/actionTypes';

// @TODO: Rework CurrentCarousel to get current books from state instead of api call
// @TODO: Responsive navigation

class AllBooks extends Component {
    state = {
        sortedBooks: this.props.allBooks || [],
        sortedBy: ''
    }

    componentDidMount() {
        if (!this.props.allBooks.length) {
            axios.get(`https://fd-book-club.firebaseio.com/books.json?auth=${this.props.token}`)
                .then((res) => {
                    this.props.fetchBooks(res.data);
                    this.setState({
                        sortedBooks: this.props.allBooks,
                        sortedBy: ''
                    })
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    sortBy = (event, header) => {
        const sortedBooks = [...this.props.allBooks];
        sortedBooks.sort((a, b) => {
            if (a[header].toLowerCase() > b[header].toLowerCase()) {
                return 1;
            } else if (a[header].toLowerCase() < b[header].toLowerCase()) {
                return -1;
            }
            return 0;
        });
        this.setState({
            sortedBooks: sortedBooks,
            sortedBy: header
        });
    }

    render() {
        const books = this.state.sortedBooks.map((book) => {
            return (
                <tr key={book.key}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.round}</td>
                    <td>{book.isbn}</td>
                </tr>
            );
        });
        const headers = ['Title', 'Author', 'Round', 'ISBN'].map((header) => {
            return (
                <th
                    key={header}
                    onClick={(event) => this.sortBy(event, header.toLowerCase())}
                    className={this.state.sortedBy === header.toLowerCase() ? classes.sorted : null}>
                    {header}
                </th>
            );
        });
        return (
            <main className="main">
                <table className={classes.allbooks}>
                    <thead>
                        <tr>
                            {headers}
                        </tr>
                    </thead>
                    <tbody>
                        {books}
                    </tbody>
                </table>
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        allBooks: state.books.allBooks
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBooks: (allBooks) => dispatch({ type: actionTypes.FETCH_BOOKS, allBooks: allBooks })
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllBooks);