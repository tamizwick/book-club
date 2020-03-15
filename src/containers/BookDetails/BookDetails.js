import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class BookDetails extends Component {
    state = {
        title: '',
        author: '',
        round: '',
        isbn: ''
    };

    componentDidMount() {
        axios.get(`https://fd-book-club.firebaseio.com/books.json?orderBy="isbn"&equalTo="${this.props.match.params.isbn}"&auth=${this.props.token}`)
            .then((res) => {
                for (let key in res.data) {
                    this.setState({
                        title: res.data[key].title,
                        author: res.data[key].author,
                        round: res.data[key].round,
                        isbn: res.data[key].isbn
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <main className="main">
                <h2>{this.state.title}</h2>
                <h3>by {this.state.author}</h3>
                <p>Round: {this.state.round.length ? this.state.round : 'none'}</p>
                <p>ISBN: {this.state.isbn}</p>
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
};

export default connect(mapStateToProps)(BookDetails);