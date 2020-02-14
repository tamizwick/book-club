import React, { Fragment } from 'react';
import classes from './Homepage.module.css';
import Navigation from '../Navigation/Navigation';
import CurrentCarousel from '../../containers/CurrentCarousel/CurrentCarousel';

const homepage = (props) => {
    return (
        <Fragment>
            <Navigation />
            <header className={classes.heading}>
                <h1 className={classes.homepageHeader}>F*** Democracy B*** Club</h1>
                <h2 className={classes.homepageHeader}>Burnin' through books since 2015!</h2>
            </header>
            <main className={classes.main}>
                <CurrentCarousel />
            </main>
        </Fragment>
    );
}

export default homepage;