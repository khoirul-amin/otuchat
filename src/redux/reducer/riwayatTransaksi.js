

const initialState = {
    statusModal: '',
    saldo:'',
    profile:''
}

const riwayatTransaksi = (state = initialState , action) => {
    if(action.type === 'SET_STATUS_MODAL'){
        return{
            ...state,
            statusModal: action.value
        }
    }
    if(action.type === 'SET_SALDO'){
        return{
            ...state,
            saldo: action.value
        }
    }
    if(action.type === 'SET_PROFILE'){
        return{
            ...state,
            profile: action.value
        }
    }
    return state
}
export default riwayatTransaksi