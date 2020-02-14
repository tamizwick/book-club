import React, { Fragment } from 'react';

const input = (props) => {
    return (
        <Fragment>
            <label htmlFor={props.type}>{props.children}</label>
            <input type={props.type} name={props.label} onChange={props.changed} />
        </Fragment>
    );
}

export default input;