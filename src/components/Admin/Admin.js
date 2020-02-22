import React from 'react';
import { withRouter } from 'react-router-dom';
import * as utility from '../../utility/utility';
import Button from '../UI/Button/Button';

const admin = (props) => {
    return (
        <main className='main'>
            <Button
                btnClass='btn-secondary'
                clicked={(event) => utility.pushHistory('/admin/new-user', props.history)}>
                Add New User
            </Button>
            <Button
                btnClass='btn-secondary'
                clicked={(event) => utility.pushHistory('/admin/change-password', props.history)}>
                Change My Password
            </Button>
        </main>
    );
}

export default withRouter(admin);