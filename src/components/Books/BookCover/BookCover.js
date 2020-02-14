import React from 'react';
import classes from './BookCover.module.css';

const bookCover = (props) => {
    return (
        <figure>
            <img
                key={props.book.isbn}
                src={props.book.imageLink}
                alt={`${props.book.title} cover`}
                className={classes.cover} />
            <figcaption>{props.book.title} by {props.book.author}</figcaption>
        </figure>
    );
}

export default bookCover;