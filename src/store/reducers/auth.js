import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: localStorage.getItem('token'),
    expirationDate: localStorage.getItem('expDate'),
    emailAddress: localStorage.getItem('emailAddress')
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_TOKEN:
            localStorage.setItem('token', action.idToken);
            localStorage.setItem('expDate', action.expirationDate);
            localStorage.setItem('emailAddress', action.emailAddress);
            return {
                ...state,
                token: action.idToken,
                expirationDate: action.expirationDate,
                emailAddress: action.emailAddress
            };
        case actionTypes.LOGOUT:
            localStorage.removeItem('token');
            localStorage.removeItem('expDate');
            localStorage.removeItem('emailAddress');
            return {
                ...state,
                token: null,
                expirationDate: null,
                emailAddress: null
            };
        default:
            return state;
    };
};

export default reducer;