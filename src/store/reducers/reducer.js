import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: localStorage.getItem('token'),
    expirationDate: localStorage.getItem('expDate')
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_TOKEN:
            localStorage.setItem('token', action.idToken);
            localStorage.setItem('expDate', action.expirationDate);
            return {
                ...state,
                token: action.idToken,
                expirationDate: action.expirationDate
            };
        case actionTypes.LOGOUT:
            localStorage.removeItem('token');
            localStorage.removeItem('expDate');
            return {
                ...state,
                token: null,
                expirationDate: null
            };
        default:
            return state;
    };
};

export default reducer;