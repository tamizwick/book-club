import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import classes from './Navigation.module.css';
import NavItem from './NavItem/NavItem';

const navigation = (props) => {
    const toggleMenu = () => {
        const navList = document.querySelector(`.${classes.Navigation}`);
        const navItems = Array.prototype.slice.call(document.querySelectorAll(`.${classes.Navigation} li`));
        if (!navList.classList.contains(classes.show)) {
            navList.classList.add(classes.show);
        } else {
            navList.classList.remove(classes.show);
        }
        navItems.forEach((li) => {
            if (!li.classList.contains(classes.show)) {
                li.classList.add(classes.show);
            } else {
                li.classList.remove(classes.show);
            }
        });
    }

    return (
        <nav>
            <ul className={classes.Navigation}>
                <button
                    className={classes.responsiveButton}
                    onClick={toggleMenu}>
                    &#9776;
                    </button>
                {props.location.pathname !== '/signin'
                    ? <Fragment>
                        <NavItem to='/' exact clicked={toggleMenu}>Home</NavItem>
                        <NavItem to='/all-books' clicked={toggleMenu}>All Books</NavItem>
                        <NavItem to='/admin' clicked={toggleMenu}>Admin</NavItem>
                        <NavItem to='/logout' clicked={toggleMenu}>Logout</NavItem>
                    </Fragment>
                    : <NavItem to='/signin' exact clicked={toggleMenu}>Sign In</NavItem>}
            </ul>
        </nav>
    );
}

export default withRouter(navigation);