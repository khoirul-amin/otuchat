import React, { Component } from 'react'
import RiwayatDeposit from './RiwayatDeposit/RiwayatDeposit'
import RiwayatTransaksi from './RiwayatTransaksi/RiwayatTransaksi'
import { connect } from 'react-redux'
import moment from 'moment'
import RiwayatTransfer from './RiwayatTransfer/RiwayatTransfer'
import RiwayatSaldo from './RiwayatSaldo/RiwayatSaldo' 
import RiwayatBonus from './RiwayatBonus/RiwayatBonus' 
import RiwayatPenarikan from './RiwayatPenarikan/RiwayatPenarikan' 
// import DatePicker from "react-datepicker"; 

class DetileRiwayat extends Component {
    constructor(){
        super()
        this.state={
            loading:true,
            history : '',
            list: 'Saldo',
            search:'off',
            startDate: null,
            endDate: null,
            startSearchDate:null,
            endSearchDate:null,
            getData:null
        }
    }
    handleChangeStart = date => {
        this.setState({
            startDate: date,
            startSearchDate:moment(date).format('YYYY-MM-DD HH:mm:ss'),
            getData:null
        });
      };
    handleChangeEnd = date => {
        this.setState({
          endDate: date,
          endSearchDate:moment(date).format('YYYY-MM-DD HH:mm:ss'),
          getData:null
        });
      };
    cariData(){
        this.setState({
            getData:'ok'
        });
    }
    componentDidMount() {
        const isLogin = JSON.parse(localStorage.getItem('isLogin'))
        this.setState({isLogin:isLogin})
        
        if (!isLogin){
            window.location = '/'
        } else {
        }
    }
    render() {
        const riwayat = this.props.riwayat
        return (
            <div>
                <div className='row mt-4 mb-4 pb-4' style={{fontSize:'12px',color:'#827D7D'}}>
                    <div className='col-sm-12'>
                        { riwayat === 1 ? <RiwayatTransaksi />: <div></div> }
                        { riwayat === 2 ? <RiwayatDeposit/> : <div></div> }
                        { riwayat === 3 ? <RiwayatSaldo/> : <div></div> } 
                        { riwayat === 4 ? <RiwayatPenarikan/> : <div></div> }
                        { riwayat === 5 ? <RiwayatBonus/> : <div></div> }
                        { riwayat === 6 ? <RiwayatTransfer/> : <div></div> }
                        
                    </div>
                    <div className='col-sm-12'>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>({
    riwayat : state.firstReducer.kodeRiwayat,
    profil : state.riwayatTransaksi.profile
})

export default connect(mapStateToProps, null)(DetileRiwayat)