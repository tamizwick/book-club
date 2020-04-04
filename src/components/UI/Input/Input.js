import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;

    switch (props.type) {
        case ('text'): {
            inputElement = (
                <input
                    id={props.label}
                    type={props.type}
                    name={props.label}
                    value={props.value}
                    onChange={props.changed} />
            );
            break;
        }
        case ('password'): {
            inputElement = (
                <input
                    id={props.label}
                    type={props.type}
                    name={props.label}
                    value={props.value}
                    onChange={props.changed} />
            );
            break;
        }
        case ('select'): {
            inputElement = (
                <select
                    id={props.label}
                    name={props.name}
                    value={props.value}
                    onChange={props.changed} >
                    {props.config.options.map((option) => {
                        return <option key={option}>{option}</option>
                    })}
                </select>
            );
            break;
        }
        default: {
            inputElement = <input
                id={props.label}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
        }
    }

    return (
        <div className={classes.formInput}>
            <label
                htmlFor={props.label}
                style={{ textTransform: 'capitalize' }}
                className={classes.label} >
                {props.children}
            </label>
            {inputElement}
        </div>
    );

}

export default input;