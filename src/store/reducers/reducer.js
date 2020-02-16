import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_TOKEN:
            return {
                ...state,
                token: action.idToken
            };
        default:
            return state;
    };
};

export default reducer;