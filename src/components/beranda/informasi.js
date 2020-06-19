import React, { Component } from 'react'
import {API,SALDO_BONUS,X_API_KEY,APLUS,INFO_HOME_PAYMENT} from '../../api/index'
import axios from 'axios'
import {convertCurrency} from '../payment/commons/commonLib'
import { Link } from 'react-router-dom'
import TransferSaldo from './menus/TransferSaldo/transferSaldo'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import WithdrawPage from './menus/Withdraw/WithdrawPage'
import ExchangePage from './menus/Exchange/ExchangePage'
import moment from 'moment'
import LoadingPage from '../loadingPage'

class Informasi extends Component {
    constructor(){
        super()
        this.state={
            saldo:'',
            loading:true,
            infoMember:''
        }
    }
    logout(){
        localStorage.removeItem('isLogin')
        window.location = '/'
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

            axios.post(API+INFO_HOME_PAYMENT, body, {headers:header} )
            .then(res=>{
                if(res.data.errNumber !== "0"){
                    Swal.fire({
                        icon: 'error',
                        title: res.data.respMessage,
                        text: 'Terjadi kesalahan saat mengambil data'
                    })
                }else{
                    this.setState({infoMember:res.data})
                }
            })
            .catch(error => {
                console.log(error.response)
            });
            axios.post(API+SALDO_BONUS, body, {headers:header} )
            .then(res => {
                // console.log(res)
                if(res.data.errNumber === '8' ){
                    Swal.fire({
                        title: 'Token Expired',
                        text: "Anda terdeteksi Login pada dua device, Silahkan Login kembali",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Lanjutkan',
                        allowOutsideClick: false,
                        }).then((result) => {
                        if (result.value) {
                            this.logout()
                        }
                        }) 
                }else{
                    const saldo = res.data.Balance[0];
                    this.setState({ saldo,loading:false });
                }
                })
            .catch(error => {
                console.log(error.response)
            });
        }else{
            window.location = '/'
        }
        
    }

    render() {
        if(this.state.loading === true){
            return(
                <LoadingPage/>
            ) 
        }
        // console.log(this.state.infoMember)
        const saldo = this.props.data.saldo
        return (
            <div>
                { saldo === '' ? <div></div> : 
            <div>
                <div className='row mt-3'>  
                    <div className='container'> 
                        <div className="row">
                            <div className='col-sm-9'>
                            <div className='p-3 new-radius' style={{background:'#F2F2F2'}}>
                                <div className="row" style={{borderBottom:'3px solid #D9D9D9'}}>
                                    <div className="col mb-2">
                                        <p className='mb-0' style={{fontSize:'14pt', color:'#69A96D'}}>Saldo</p>
                                        <p className='mb-0' style={{fontSize:'20pt', color:'#69A96D'}}>Rp. { convertCurrency(saldo.sisa_uang) } </p>
                                    </div>
                                    <div className="col pt-2">
                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <Link to='/home/deposit' style={styles.btnGreen} className='btn'>
                                                    <div className="row m-0">
                                                        <div className="ml-3">
                                                            <img src={require('../../images/iconBtn/TopUp.svg')} className="mt-2" width="20px" alt="logo" />
                                                        </div>
                                                        <div className="col">
                                                            <p className="mb-0" style={{marginTop:'10px'}} align="left">Top Up Saldo</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className='col-sm-6 pt-1'>
                                                <div style={styles.btnGreen} className='btn' data-toggle="modal" data-target="#Transfer">
                                                    <div className="row m-0">
                                                        <div className="ml-3">
                                                            <img src={require('../../images/iconBtn/Transfer.svg')} className="mt-2" width="30px" alt="logo" />
                                                        </div>
                                                        <div className="col">
                                                            <p className="mb-0" style={{marginTop:'10px'}} align="left">Transfer</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row pt-3">
                                    <div className="col">
                                        <p className='mb-0' style={{fontSize:'14pt', color:'#787474'}}>Point</p>
                                        <p className='mb-0' style={{fontSize:'20pt', color:'#787474'}}>Rp. { convertCurrency(saldo.bonus_member) }</p>
                                    </div>
                                    <div className='col pt-2'>
                                        <div className='row'>
                                            <div className="col-sm-6 pt-1">
                                                <div style={styles.btnSilver} data-toggle="modal" data-target="#TarikBonus" className='btn'>
                                                    <div className="row m-0">
                                                        <div className="ml-3">
                                                            <img src={require('../../images/iconBtn/TarikBonus.svg')} className="mt-2" width="20px" alt="logo" />
                                                        </div>
                                                        <div className="col">
                                                            <p className="mb-0" style={{marginTop:'10px'}} align="left">Tarik Point</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 pt-1">
                                                <div   data-toggle="modal" data-target="#TukarBonus" style={styles.btnSilver} className='btn'>
                                                    <div className="row m-0">
                                                        <div className="ml-3">
                                                            <img src={require('../../images/iconBtn/UbahBonus.svg')} style={{marginTop:'10px'}} width="20px" alt="logo" />
                                                        </div>
                                                        <div className="col">
                                                            <p className="mb-0" style={{marginTop:'10px'}} align="left">Tukar Point</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            </div>
                            <div className='col-sm-3 cart2'>
                                <div className="new-radius" style={{background:'#3A945F',color:'#FFFFFF'}}>
                                <p align="center" style={{fontSize:'12pt'}} className="mb-0 pt-2">
                                        TRANSAKSI <br/> Bulan {moment().format('MMMM')}
                                </p>
                                {this.state.infoMember ? 
                                    <p style={{fontSize:'70pt', margin:'0px' }} align='center'>
                                       {this.state.infoMember.transaksi_bulan_ini}
                                    </p>
                                :
                                    <div className="w-100 m-0" align="center" style={{paddingBottom:'65px',paddingTop:'40px'}}>
                                        <div className="spinner-border text-light" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>

                  
                <div className='row mt-3'> 
                    <div className='container'> 
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="new-radius mt-3" style={{background:'#F2F2F2',color:'#F2F2F2'}}>
                                    <div>
                                        <div className='row p-3 align-items-center'>
                                            <div className='pl-3'>
                                                <img src={require('../../images/iconBtn/iDana.svg')} alt="icon" width="50px" />
                                            </div>
                                            <div className='col'>
                                                <p className="m-0" style={{color:'#4FB146',fontSize:'11pt'}}>Penarikan Dana</p>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.infoMember ? 
                                        <p style={{color:'#3D9144',fontSize:'16pt',fontWeight:'400',margin:'0px', padding:'30px 0px 40px 0px' }} align='center'>Rp {convertCurrency(this.state.infoMember.penarikan_data)}</p>
                                    :
                                        <div className="w-100 m-0" align="center" style={{paddingBottom:'65px',paddingTop:'40px'}}>
                                            <div className="spinner-border text-success" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="new-radius mt-3" style={{background:'#F2F2F2',color:'#F2F2F2'}}>
                                    <div>
                                        <div className='row p-3 align-items-center'>
                                             <div className='pl-3'>
                                                <img src={require('../../images/iconBtn/iAnggota.svg')} alt="icon" width="50px" />
                                            </div>
                                            <div className='col'>
                                                <p className="m-0" style={{color:'#4FB146',fontSize:'11pt'}}>Jumlah Anggota</p>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.infoMember ? 
                                        <p style={{lineHeight:'24pt',color:'#3D9144',fontSize:'40pt',fontWeight:'400',margin:'0px', padding:'30px 0px 40px 0px' }} align='center'>{this.state.infoMember.jumlah_anggota}</p>
                                    :
                                        <div className="w-100 m-0" align="center" style={{paddingBottom:'65px',paddingTop:'40px'}}>
                                            <div className="spinner-border text-success" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="new-radius mt-3" style={{background:'#F2F2F2',color:'#F2F2F2'}}>
                                    <div>
                                        <div className='row p-3 align-items-center'>
                                             <div className='pl-3'>
                                                <img src={require('../../images/iconBtn/iTransaksi.svg')} alt="icon" width="50px" />
                                            </div>
                                            <div className='col'>
                                                <p className="m-0" style={{color:'#4FB146',fontSize:'11pt'}}>Transaksi Pribadi & Anggota</p>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.infoMember ? 
                                        <p style={{lineHeight:'24pt',color:'#3D9144',fontSize:'40pt',fontWeight:'400',margin:'0px', padding:'30px 0px 40px 0px' }} align='center'>{this.state.infoMember.trx_pribadi_anggota}</p>
                                    :
                                        <div className="w-100 m-0" align="center" style={{paddingBottom:'65px',paddingTop:'40px'}}>
                                            <div className="spinner-border text-success" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="new-radius mt-3" style={{background:'#F2F2F2',color:'#F2F2F2'}}>
                                    <div>
                                        <div className='row p-3 align-items-center'>
                                             <div className='pl-3'>
                                                <img src={require('../../images/iconBtn/iMember.svg')} alt="icon" width="50px" />
                                            </div>
                                            <div className='col'>
                                                <p className="m-0" style={{color:'#4FB146',fontSize:'11pt'}}>Member Baru Hari ini</p>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.infoMember ? 
                                        <p style={{lineHeight:'24pt',color:'#3D9144',fontSize:'40pt',fontWeight:'400',margin:'0px', padding:'30px 0px 40px 0px' }} align='center'>{this.state.infoMember.member_baru}</p>
                                    :
                                        <div className="w-100 m-0" align="center" style={{paddingBottom:'65px',paddingTop:'40px'}}>
                                            <div className="spinner-border text-success" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
                <TransferSaldo/>
                <WithdrawPage/>
                <ExchangePage/>
            </div>
            }
        </div>
        )
            
    }
}
const mapStateToProps = (state) =>({
    data: state.riwayatTransaksi
})
const mapDispatchToProps = dispatch => ({
    setStatusModal : (data) => dispatch({type:'SET_STATUS_MODAL', value:data})
})
export default connect(mapStateToProps, mapDispatchToProps)(Informasi)

const styles={
    shadowMini:{
        boxShadow:'0px 0px 6px #00000029'
    },
    pMini:{
        color:'#787474',fontSize:'10pt',marginTop:'15px',marginBottom:'-10px'
    },
    btnGreen:{
        fontSize:'12px', color:'#FFFFFF', backgroundColor:'#4BB04E', width: '150px',padding:'0px',height:'40px',borderRadius:'10px'
    },
    btnSilver:{
        fontSize:'12px', color:'#FFFFFF', backgroundColor:'#808080', width: '150px',padding:'0px',height:'40px',borderRadius:'10px'
    },
    iconBtn:{
        fontSize:'14pt',marginTop:'10px'
    }
}