import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './AllBooks.module.css';

class AllBooks extends Component {
    render() {
        const books = this.props.allBooks.map((book) => {
            return (
                <tr key={book.key}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.round}</td>
                    <td>{book.isbn}</td>
                </tr>
            );
        });
        return (
            <main className="main">
                <table className={classes.allbooks}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Round</th>
                            <th>ISBN</th>
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
        allBooks: state.books.allBooks
    };
};

export default connect(mapStateToProps)(AllBooks);