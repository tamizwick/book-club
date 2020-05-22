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
            const isValueSet = props.config.options.includes(props.value);
            inputElement = (
                <select
                    id={props.name}
                    name={props.name}
                    value={props.value}
                    onChange={props.changed} >
                    <option value="" disabled={isValueSet}>Select a {props.name}</option>
                    {props.config.options.map((option) => {
                        return <option key={option} value={option}>{option}</option>
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
                {props.config && props.config.required ? <span style={{ color: '#800000', marginLeft: '4px' }}>*</span> : null}
            </label>
            {inputElement}
        </div>
    );

}

export default input;