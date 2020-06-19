
const initialState = {
    status: false,
    report:null,
    dataRiwayat:'',
    kodeRiwayat:1,
    pendukung:'',
    directProfil:null
}

const firstReducer = (state = initialState , action) => {
    if(action.type === 'CHANGE_POPUP'){
        return{
            ...state,
            status: action.value
        }
    }
    if(action.type === 'CHANGE_ISLOGIN'){
        return{
            ...state,
            isLogin: action.value
        }
    }
    if(action.type === 'CHANGE_USER'){
        return{
            ...state,
            isLogin: action.value
        }
    }
    if(action.type === 'REPORT_TRANSACTION'){
        return{
            ...state,
            report: action.value
        }
    }
    if(action.type === 'DATA_RIWAYAT'){
        return{
            ...state,
            kodeRiwayat: action.value.data
        }
    }
    if(action.type === 'DIRECT_TO_PROFIL'){
        return{
            ...state,
            directProfil: action.value
        }
    }
    return state
}
export default firstReducer