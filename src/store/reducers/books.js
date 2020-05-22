import * as actionTypes from '../actions/actionTypes';

const initialState = {
    allBooks: []
};

const reducer = (state = initialState, action) => {
    let allBooks;
    switch (action.type) {
        case actionTypes.FETCH_BOOKS:
            allBooks = [];
            for (let key in action.allBooks) {
                allBooks.push({
                    ...action.allBooks[key],
                    key: key
                });
            }
            return {
                ...state,
                allBooks: allBooks
            };
        case actionTypes.ADD_BOOK:
            allBooks = [...state.allBooks];
            allBooks.push(action.bookData);
            return {
                ...state,
                allBooks: allBooks
            };
        case actionTypes.EDIT_BOOK:
            allBooks = [...state.allBooks];
            const bookIndex = state.allBooks.findIndex((book) => {
                return book.key === action.bookData.key;
            });
            Object.assign(allBooks[bookIndex], action.bookData);
            return {
                ...state,
                allBooks: allBooks
            };
        default:
            return state;
    };
};

export default reducer;