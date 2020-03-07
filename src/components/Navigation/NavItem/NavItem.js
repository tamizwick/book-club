import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavItem.module.css';

const navItem = (props) => {
    return (
        <li onClick={props.clicked} className={classes.NavItem}>
            <NavLink
                to={props.to}
                exact={props.exact}
                activeClassName={classes.active}
            >
                {props.children}
            </NavLink>
        </li>
    );
}

export default navItem;