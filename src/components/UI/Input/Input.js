import React, { Fragment } from 'react';

const input = (props) => {
    return (
        <Fragment>
            <label htmlFor={props.type} style={{ textTransform: 'capitalize' }}>{props.children}</label>
            <input type={props.type} name={props.label} onChange={props.changed} />
        </Fragment>
    );
}

export default input;