import React from 'react';
import { useHistory } from 'react-router';
import classes from './BookCover.module.css';
import * as utility from '../../../utility/utility';
import button from '../../UI/Button/Button';

const BookCover = (props) => {
    const history = useHistory();
    const carouselItemClicked = () => {
        utility.pushHistory(`/books/details/${props.book.isbn}`, history);
        console.log(props.book.isbn + ' ' + props.book.title)
    }
    
    return (
        <button className={classes.itemButton} onClick={carouselItemClicked}>
            <figure className={classes.figure} >
                <img
                    key={props.book.isbn}
                    src={props.book.imageLink}
                    alt={`${props.book.title} cover`}
                    className={classes.cover} />
                <figcaption>{props.book.title} by {props.book.author}</figcaption>
            </figure>
        </button>
    );
}

export default BookCover;