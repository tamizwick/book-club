import React from 'react';
import { withRouter } from 'react-router-dom';
import * as utility from '../../utility/utility';
import classes from './Admin.module.css';
import Button from '../UI/Button/Button';

const admin = (props) => {
    return (
        <main className='main'>
            <div className={classes.btnContainer}>
                <h2 className={classes.containerHeader}>User Management</h2>
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
            </div>
            <div className={classes.btnContainer}>
                <h2 className={classes.containerHeader}>Book Management</h2>
                <Button
                    btnClass='btn-secondary'
                    clicked={(event) => utility.pushHistory('/admin/add-round', props.history)}>
                    Add Round
                </Button>
                <Button
                    btnClass='btn-secondary'
                    clicked={(event) => utility.pushHistory('/admin/set-current-round', props.history)}>
                    Set Current Round
                </Button>
                <Button
                    btnClass='btn-secondary'
                    clicked={(event) => utility.pushHistory('/admin/add-book', props.history)}>
                    Add Book
                </Button>
            </div>
        </main>
    );
}

export default withRouter(admin);