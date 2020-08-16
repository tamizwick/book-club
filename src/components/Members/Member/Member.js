import React from 'react';
import classes from './Member.module.css';

const member = (props) => {
    return (
        <div className={classes.memberCard}>
            <img
                src={props.data.imgUrl}
                alt={props.data.name}
                className={classes.memberImg}
                onClick={props.clicked} />
            <div className={classes.memberData}>
                <h3>{props.data.name}</h3>
                <h4>Member Since:</h4>
                <p>{props.data.memberSince}</p>
                <h4>Interests:</h4>
                <p>{props.data.interests}</p>
                <h4>A book they'd recommend:</h4>
                <p>{props.data.bookRec}</p>
            </div>
        </div>
    );
}

export default member;