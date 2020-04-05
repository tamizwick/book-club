import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';

const form = (props) => {
    return (
        <form onSubmit={props.submitHandler}>
            {props.formElements.map((el) => {
                return (
                    <Input
                        key={el.key}
                        name={el.key}
                        type={el.type}
                        value={el.value}
                        config={el.config}
                        changed={(event) => props.inputHandler(event, el, props.validationErrors)} >
                        {el.key.replace('_', ' ')}
                    </Input>
                );
            })}
            <Button btnClass='btn-primary'>Submit</Button>
        </form>
    );
}

export default form;