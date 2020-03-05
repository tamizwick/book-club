import * as actionTypes from '../actions/actionTypes';

const initialState = {
    allBooks: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BOOKS:
            const allBooks = [];
            for (let key in action.allBooks) {
                allBooks.push({
                    ...action.allBooks[key],
                    key: key
                });
            }
            return {
                ...state,
                allBooks: allBooks
            }
        default:
            return state;
    };
};

export default reducer;