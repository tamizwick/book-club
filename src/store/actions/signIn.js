import * as actionTypes from './actionTypes';

export const signIn = (idToken, expirationDate) => {
    return {
        type: actionTypes.STORE_TOKEN,
        idToken: idToken,
        expirationDate: expirationDate
    };
};