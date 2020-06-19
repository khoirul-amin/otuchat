const initialState = {
    statusLogin : true
}

const cekLogin = (state = initialState , action) => {
    if(action.type === 'SESSION_EXPIRED'){
        return{
            ...state,
            statusLogin: action.value
        }
    }
    return state
}
export default cekLogin