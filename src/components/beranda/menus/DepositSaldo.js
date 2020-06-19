import React, { Component } from 'react'
import {TextField,withStyles } from '@material-ui/core';
// import { green } from '@material-ui/core/colors';
import '../../../assets/style.css'
import {API,APLUS,X_API_KEY,BANK_DEPOSIT,DEPOSIT_INFO,GET_HISTORY} from '../../../api/index'
import axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment'
import { connect } from 'react-redux'
import{ Redirect } from 'react-router-dom'
import  { convertCurrency } from '../../payment/commons/commonLib'
import $ from 'jquery'
 

class DepositSaldo extends Component {
    constructor(){
    super()
    this.state={
        checkedG:false,
        nominal:'',
        codeBank:'',
        bank:[],
        redirect:'',
        history:null

    }
    this.handleChecked = this.handleChecked.bind(this)
    // this.Deposit = this.Deposit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    }
    handleChecked(e){
        if(this.state.checkedG === false){
            this.setState({checkedG:true})
        }else{
            this.setState({checkedG:false})
        }
    
    }
    handleChangeCode(data){
        const bank = this.state.bank.filter(
            (p) =>{
            return p.kode_bank.indexOf(data) !== -1
            }
        )
        this.setState({codeBank: bank[0]})
    }
    componentDidMount(){
        const isLogin = JSON.parse(localStorage.getItem('isLogin')) 
        if (isLogin){
            const header={
                'X-Api-Key' : X_API_KEY
            }
            const body ={
                'userID' : isLogin.userID,
                'aplUse':APLUS,
                'accessToken' : isLogin.mbr_token
            }
            const bodyHistory ={
                'userID' : isLogin.userID,
                'aplUse':APLUS,
                'accessToken' : isLogin.mbr_token,
                'requestID' : 2,
            }
            axios.post(API+BANK_DEPOSIT, body, {headers:header} )
                .then(res => {
                    const bank = res.data.banklist.filter(
                        (p) =>{
                            return p.isactive.indexOf('Live') !== -1;
                        }
                    );
                    this.setState({ bank : bank, loading: false });
                })
                .catch(error => {
                    console.log(error.response)
                });
            axios.post(API+GET_HISTORY, bodyHistory, {headers:header} )
                .then(res => {
                    const resp = res.data.listData.filter(
                        (p) =>{
                            return p.status_deposit.indexOf('Waiting') !== -1;
                        }
                    );
                    if(resp[0]){
                        this.setState({ history : resp});
                    }
                })
                .catch(error => {
                    console.log(error.response)
                });
            // this.setDuration(isLogin.respTime)

        }else{
            window.location = '/'
        }

    }
    handleChange(e){
    this.setState({[e.target.name] : e.target.value })
    }

    getTiketDeposit () {
        const isLogin = JSON.parse(localStorage.getItem('isLogin')) 
        const header={
            'X-Api-Key' : X_API_KEY
        }
        const body ={
            'userID' : isLogin.userID,
            'aplUse':APLUS,
            'accessToken' : isLogin.mbr_token,
            'bank' : this.state.codeBank.bank,
            'nominal':this.state.nominal
        }
        axios.post(API+DEPOSIT_INFO, body, {headers:header} )
        .then(res => {
            const detil = res.data
            if( detil.errNumber !== '0'){
                Swal.fire({
                    icon : 'error',
                    title: detil.status,
                    text : detil.respMessage
                })
                // this.setState({loading: false})
            }else{
                $('#topUp').modal('hide')
                this.props.changeReport(detil)
                this.setState({redirect : true})
            }
        })
        .catch(error => {
            console.log(error.response)
    });
    }



    render() {
        if(this.state.redirect === true){
            return <Redirect to='/home/detaildeposit' />
        }
        return (
            <div>
                <div className='row mb-3 ml-0 mr-0'>
                    <div className='container'>
                        <div className='row mt-4'>
                            <p className="title-deposit">Top Up Saldo</p>
                        </div>
                        <div style={style.boxShadow} className='row ml-0 mr-0 p-4 new-radius'>
                            <div className='col-sm-12 mt-4'>
                                <p className="title-modal mb-0">Nominal Top Up</p>
                                <GreenTextField  style={{width:'100%'}} 
                                    onChange={this.handleChange}
                                    name='nominal'
                                    value={this.state.value}
                                    autoComplete='off'
                                    >
                                </GreenTextField>
                                <span  style={style.validate}>Minimal isi ulang adalah<span style={{color:'#6B6B6B',fontWeight:'500'}}> Rp 10.000</span></span>
                            </div>
                            <div className='col-sm-12 mt-3 mb-2'>
                                <p className="title-modal mb-0">Metode Pembayaran</p>
                                <GreenTextField style={{width:'100%'}} 
                                autoComplete='off' 
                                value={this.state.codeBank === '' ?
                                    ''
                                :
                                    this.state.codeBank.bank
                                }
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                />
                                <div className="dropdown-menu scrol-pdam rounded-0 p-0">
                                    {this.state.bank.map(bank=>(
                                        <div className='row m-0 menu-pdam' onClick={() => this.handleChangeCode(bank.kode_bank)} key={bank.kode_bank}>
                                            <div className='m-0 p-0'>
                                            <img src={bank.logo} width='60px' height='40px' alt={bank.bank} />
                                            </div>
                                            <div className='col mt-2'>
                                            <p className=''>{bank.bank}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* <div className='col-sm-12 mt-3'>
                                <FormControlLabel className='mr-0 pr-0 mt-1'
                                    control={
                                        <GreenCheckbox
                                            checked={this.state.checkedG}
                                            onChange={this.handleChecked}
                                            value="checkedG"
                                        />
                                    }
                                    />
                                <span style={{color:'#388E3C'}}>Saya menyetujui <span style={{color:"#00994d",fontWeight:'600'}}>Syarat dan Ketentuan</span> yang berlaku</span>
                            </div> */}
                            <div className='col-sm-12 mt-4 mb-2'>
                                {this.state.nominal === '' ?
                                    <div className='bt-green-off' align="center" disabled>Lanjutkan</div>
                                :
                                    <div align="center" data-toggle="modal" data-target="#topUp" className='bt-green'> Lanjutkan</div>
                                }

                            </div>
                        </div>

                        <div style={style.boxShadow} className='row mt-3 ml-0 mr-0 new-radius'>
                            <div className="w-100 p-3" style={{background:'#4CAF50',color:'#FFFFFF',fontWeight:'500',borderRadius:'10px 10px 0px 0px'}}>
                                Transaksi yang belum selesai
                            </div>
                            <div className="p-3 w-100 scroll-group" style={{height:'300px'}}>
                                {this.state.history ?
                                    <table className="table-riwayat">
                                        <thead>
                                            <tr>
                                                <th>Tanggal</th>
                                                <th>Nilai</th>
                                                <th>Tujuan</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        {this.state.history  ?
                                            <tbody>
                                                {this.state.history.map(posts => (
                                                    <tr key={posts.codeunix}> 
                                                        <td>{posts.tgl_deposit}</td>
                                                        <td><b>Jumlah :</b> Rp  { convertCurrency(posts.jumlah_deposit) } <br/> <b>Transfer :</b> Rp  { convertCurrency(posts.total_transfer) }</td>
                                                        <td> <b>Bank :</b> {posts.bank} <br/> <b>Rekening :</b> {posts.nomer_rekening} <br/>  <b>Pemilik :</b> {posts.nama_pemilik}</td>
                                                        <td>{posts.status_deposit}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            :
                                            <tbody>
                                                <tr> 
                                                    <td colSpan='5' align='center'> 
                                                        Data Tidak Ada
                                                    </td>
                                                </tr>
                                            </tbody>
                                        }
                                    </table>
                                    :
                                    <p className="info-riwayat">Tidak ada data</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Modal --> */}
                <div className="modal fade" id="topUp" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="topUpLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content border-0 bg-transparent">
                            <div className="custom-modal-header">
                                <h5 className="m-0 p-0">INFORMASI TOPUP</h5>
                            </div>
                            <div className="custom-modal-body" style={{borderBottom:'5px solid #CDF0DC'}}>
                                <table className="w-100">
                                    <tbody>
                                        <tr>
                                            <td className="pt-4 pb-4 w-50"> <span style={{opacity:'60%'}}>Top Up</span> <br/> BANK {this.state.codeBank.bank}</td>
                                            <td className="pt-4 pb-4" align="right" colSpan="2"> 
                                                <img src={this.state.codeBank.logo} alt={this.state.codeBank.logo} width='90px' height='50px' />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="custom-modal-body">
                                <table className="w-100">
                                    <tbody>
                                        <tr>
                                            <td className="pt-2 pb-2 w-25">Waktu</td>
                                            <td className="pt-2 pb-2">:</td>
                                            <td className="pt-2 pb-2" align="right"> {moment().format('LLLL')} </td>
                                        </tr>
                                        <tr>
                                            <td className="pt-2 pb-4 w-25">Metode bayar</td>
                                            <td className="pt-2 pb-4">:</td>
                                            <td className="pt-2 pb-4" align="right"> BANK {this.state.codeBank.bank} </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="custom-modal-body" style={{background:'#CDF0DC'}}>
                                <table className="w-100">
                                    <tbody>
                                        <tr style={{fontWeight:'bold'}}>
                                            <td className="pt-2 pb-2 w-25">TOTAL</td>
                                            <td className="pt-2 pb-2">:</td>
                                            <td className="pt-2 pb-2" align="right"> Rp {convertCurrency(this.state.nominal) }</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="custom-modal-footer">
                                <div className="row m-0">
                                    <div className="col-sm-6 p-0">
                                        <div className="custom-btn-white" data-dismiss="modal" align="center">BATALKAN</div>
                                    </div>
                                    <div className="col-sm-6 p-0" align="center">
                                        {this.state.loading ? 
                                        <div className='custom-btn-green'>Loading</div>
                                        :
                                        <div onClick={() => this.getTiketDeposit()} className='custom-btn-green'>KONFIRMASI</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
}

const mapStateToProps = (state) => ({
    data : state.firstReducer
})

const mapDispatchToProps  = (dispatch) => ({
    changeReport : (data)=> dispatch({ type : 'REPORT_TRANSACTION', value : data  })
})

export default connect(mapStateToProps, mapDispatchToProps) (DepositSaldo)


const GreenTextField = withStyles({
root: {
    '& label.Mui-focused': {
    color: 'green',
    },
    '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
    '& fieldset': {
        borderColor: 'red',
    },
    '&:hover fieldset': {
        borderColor: 'yellow',
    },
    '&.Mui-focused fieldset': {
        borderColor: 'green',
    },
    },
},
})(TextField);
const style={
    validate:{
        fontSize:'12pt',
        color:'#6B6B6B',
    },
    boxShadow:{
        boxShadow:'0px 0px 6px #00000029',
        backgroundColor:'#FFFFFF'
    },
    btGreen:{
        fontSize:'14px',
        color:'#FFFFFF',
        backgroundColor:'#2E7D32',
        width: '150px',
        padding:'10px'
    }
}
// const GreenCheckbox = withStyles({
//     root: {
//         color: green[400],
//         '&$checked': {
//         color: green[600],
//         }
//     },
//     checked: {},
// })(props => <Checkbox color="default" {...props} />);