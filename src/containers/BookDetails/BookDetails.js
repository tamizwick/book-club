import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as utility from '../../utility/utility';
import classes from './BookDetails.module.css';
import Button from '../../components/UI/Button/Button';

class BookDetails extends Component {
    state = {
        title: '',
        author: '',
        round: '',
        isbn: '',
        nominator: '',
        imageLink: ''
    };

    componentDidMount() {
        axios.get(`https://fd-book-club.firebaseio.com/books.json?orderBy="isbn"&equalTo="${this.props.match.params.isbn}"&auth=${this.props.token}`)
            .then((res) => {
                for (let key in res.data) {
                    this.setState({
                        title: res.data[key].title,
                        author: res.data[key].author,
                        round: res.data[key].round,
                        isbn: res.data[key].isbn,
                        nominator: res.data[key].nominator
                    });
                    this.fetchCover(res.data[key].isbn);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    fetchCover = (isbn) => {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
            .then((res) => {
                if (res.data.items && res.data.items.length) {
                    this.setState({
                        imageLink: res.data.items[0].volumeInfo.imageLinks.thumbnail
                    });
                } else {
                    this.setState({
                        imageLink: '../../assets/noImageAvailable.png'
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    editBookHandler = (event) => {
        event.preventDefault();

        utility.pushHistory(`/admin/edit-book/${this.state.isbn}`, this.props.history);
    }

    render() {
        return (
            <main className="main">
                {this.state.imageLink !== ''
                    ? <div className={classes.cover}><img src={this.state.imageLink} alt={this.state.title + ' cover'} className={classes.coverImg} /></div>
                    : null
                }
                <div className={classes.details}>
                    <h2 className={classes.bookTitle}>{this.state.title}</h2>
                    <Button btnClass='btn-primary' clicked={this.editBookHandler}>Edit Book</Button>
                    <h3 className={classes.author}>by {this.state.author}</h3>
                    <p><span className={classes.detailSpan}>Round:</span> {this.state.round.length ? this.state.round : 'none'}</p>
                    <p><span className={classes.detailSpan}>Nominated by:</span> {this.state.nominator && this.state.nominator.length ? this.state.nominator : 'unknown'}</p>
                    <p><span className={classes.detailSpan}>ISBN:</span> {this.state.isbn}</p>
                </div>
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