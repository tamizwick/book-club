import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    return (
        <div className={classes.formInput}>
            <label
                htmlFor={props.type}
                style={{ textTransform: 'capitalize' }}
                className={classes.label} >
                {props.children}
            </label>
            <input
                type={props.type}
                name={props.label}
                value={props.value}
                onChange={props.changed} />
        </div>
    );
}

export default input;