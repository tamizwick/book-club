import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import classes from './Navigation.module.css';
import NavItem from './NavItem/NavItem';

const navigation = (props) => {
    return (
        <nav>
            <ul className={classes.Navigation}>
                {props.location.pathname !== '/signin'
                    ? <Fragment>
                        <NavItem to='/' exact>Home</NavItem>
                        <NavItem to='/admin'>Admin</NavItem>
                        <NavItem to='/logout' exact>Logout</NavItem>
                    </Fragment>
                    : <NavItem to='/signin' exact>Sign In</NavItem>}
            </ul>
        </nav>
    );
}

export default withRouter(navigation);