import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './AllBooks.module.css';
import * as utility from '../../utility/utility';
import Button from '../../components/UI/Button/Button';

class AllBooks extends Component {
    state = {
        sortedBooks: this.props.allBooks || [],
        sortedBy: ''
    }

    componentDidUpdate() {
        if (!this.state.sortedBooks.length) {
            this.setState({
                sortedBooks: this.props.allBooks
            })
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

    addBookHandler = () => {
        utility.pushHistory('/admin/add-book', this.props.history);
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
                <h2>All Books</h2>
                <p className={classes.totalBooks}>Total: {this.props.allBooks.length}</p>
                <Button btnClass='btn-primary' clicked={this.addBookHandler}>Add Book</Button>
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
        allBooks: state.books.allBooks
    };
};

export default connect(mapStateToProps)(AllBooks);