export const isLogin = () =>{
    return(dispatch) =>{
        setTimeout(()=>{
            return dispatch({ type : 'CHANGE_USER', value: 'false'  })
        },3000)
    } 
}


export const FETCH_LOADING = 'FETCH_LOADING';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';

function fetchLoading() {
    return {
        type: FETCH_LOADING
    }
}

function fetchSuccess(data) {
    return {
        type: FETCH_SUCCESS,
        data: data
    }
}

function fetchError(error) {
    return {
        type: FETCH_ERROR,
        error: error
    }
}