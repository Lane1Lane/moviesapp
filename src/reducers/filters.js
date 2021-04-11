const filtersReducerDefaultState = {
    currentPage: '1'
}

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            };
        default:
            return state;
    };
};