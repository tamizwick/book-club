import * as actionTypes from './actionTypes';

export const login = (idToken, expirationDate) => {
    return {
        type: actionTypes.STORE_TOKEN,
        idToken: idToken,
        expirationDate: expirationDate
    };
};