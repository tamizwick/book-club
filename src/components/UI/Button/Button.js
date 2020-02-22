import React from 'react';
import classes from './Button.module.css';

const button = (props) => {
    const buttonClasses = [classes.btn, classes[props.btnClass]];

    return (
        <button onClick={props.clicked} className={buttonClasses.join(' ')}>{props.children}</button>
    );
}

export default button;