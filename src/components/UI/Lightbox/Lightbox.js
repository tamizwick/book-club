import React, { useEffect } from 'react';
import classes from './Lightbox.module.css';

const Lightbox = (props) => {
    const { close } = props;
    useEffect(() => {
        const handleKeyup = (event) => {
            if (event.keyCode === 27) {
                close();
            }
        };
        window.addEventListener('keyup', handleKeyup);

        return () => window.removeEventListener('keyup', handleKeyup);
    }, [close]);

    return (
        <div>
            <div className={classes.backdrop}>
                <button className={classes.close} onClick={close}>X</button>
            </div>
            <img src={props.src} alt={props.alt} className={classes.lightboxImg} />
        </div>
    );
}

export default Lightbox;