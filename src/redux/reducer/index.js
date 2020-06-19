import firstReducer from './firstReducer'
import riwayatTransaksi from './riwayatTransaksi'
import cekLogin from './cekLogin'
import {combineReducers} from 'redux'

const reducer = combineReducers({
    firstReducer,
    riwayatTransaksi,
    cekLogin
})
export default reducer