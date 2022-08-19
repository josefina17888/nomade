
const initialState = {
    host: [],
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
    case 'POST_HOST':
            return{
                ...state
            }
            default: return state
    }
}
export default rootReducer;
