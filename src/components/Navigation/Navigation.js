import React from 'react';
import classes from './Navigation.module.css';
import NavItem from './NavItem/NavItem';

const navigation = (props) => {
    return (
        <nav>
            <ul className={classes.Navigation}>
                <NavItem to='/' exact>Home</NavItem>
            </ul>
        </nav>
    );
}

export default navigation;