import React, { Component } from 'react'
import {createDurationToCurrentTime,convertCurrency} from '../../payment/commons/commonLib'
import { connect } from 'react-redux'
import moment from 'moment'
import '../../../assets/reportTopUp.css'
import Swal from 'sweetalert2'

class DetileDeposit extends Component {

    constructor(){
        super()
        this.state = {
            duration : ''
        }
    }

    componentDidMount(){
        // const detil={
        //     "errNumber": "0",
        //     "userID": "EKL0280775",
        //     "bank": "CIMB",
        //     "kode_bank": "022",
        //     "logo": "https://crm.eklanku.com/assets/imgMAX/bank/ekl-cimb-niaga.png",
        //     "nominal": "20773",
        //     "nomer_rekening": "800157965800",
        //     "nama_pemilik": "PT. Eklanku Indonesia Cemerlang",
        //     "respTime": "2020-02-28 16:20:13",
        //     "status": "SUCCESS",
        //     'respMessage': "Deposit amount to Rp. 20773 (MUST BE SAME) To BANK CIMB, Norec:800157965800, AN:PT. Eklanku Indonesia Cemerlang has succeeded in the counter please immediately make a transfer no later than 4 hours"
            
        // }
        // this.props.changeReport(detil)
        // this.setDuration()
        if (!this.props.data.report){
            console.log('Report Null')
        }else{
            this.setDuration()
        }
    }
    copyToClipboard (input){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        var copyText = document.getElementById(input);
        copyText.select();
        copyText.setSelectionRange(0, 99999)
        document.execCommand("copy");
        Toast.fire({
          icon: 'success',
          title: 'Copied to clipboard'
        })
    }
    setDuration = () => {
        setInterval(() => {
        const duration = createDurationToCurrentTime(this.props.data.report.respTime, 4)
        this.setState({ duration })
        }, 1000)
    }
    render() {
        // console.log(this.props.data)
        return (
            <div>
                {this.props.data.report  ? 
                <div className='row mb-3 ml-0 mr-0'>
                    <div className='container'>
                        <div className='row mt-4'>
                            <div className='col-sm-6'>
                                <p>Konfirmasi Pembayaran</p>
                            </div>
                            <div className='col-sm-6'>
                                <p align='right' style={{fontSize:'12pt'}}> Deposit/<span style={{color:'#005005'}}>Bank Transfer </span></p>
                            </div>
                        </div>
                        <div style={style.boxShadow} className='row ml-0 mr-0'>
                            <div className='col-sm-12 mt-3'>
                                <p className="title-rcent">Transfer sesuai nominal di bawah ini :</p>
                                <div className="nominal-transfer">
                                    <input className="huemm" id="nominal" value={`Rp ${convertCurrency(this.props.data.report.nominal)}` } readOnly />
                                    <i className="fa fa-files-o" style={{cursor:'pointer'}} onClick={()=>this.copyToClipboard("nominal")}></i>
                                </div>
                            </div>
                            <div className='col-sm-12 mt-2'>
                                <div className="row green-transfer align-items-center">
                                    <div className="p-0 m-auto">
                                        <img src={require('../../../images/iconBtn/metroInfo.svg')} width="50px" alt="logo" />
                                    </div>
                                    <div className="col-sm p-0 ml-2">
                                        <p className="info-black">PENTING! Pastikan transfer sesuai hingga digit terakhir, dan 3 angka terakhir akan masuk ke saldo Anda</p>
                                    </div>
                                </div>
                            </div>

                            <div className='col-sm-12 mt-4'>
                                <p align="center" style={{fontSize:'14pt',fontWeight:'400',color:'#000000'}}>Transfer ke</p>
                            </div>
                            <div className='col-sm-12 mt-4'>
                                <div className="row m-0">
                                    <div className="left-trans p-0">
                                        <p className="text-green">Kode Bank</p>
                                        <p className="kode-bank"> {this.props.data.report.kode_bank} </p>
                                    </div>
                                    <div className="right-trans p-0 img-bank">
                                        <img src={this.props.data.report.logo} width='100px' alt='logo' />
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-12 p-0'>
                                <hr className='m-0' ></hr>
                            </div>
                            <div className='col-sm-12 mt-4'>
                                <div className="row m-0">
                                    <div className="left-rek p-0">
                                        <p className="text-green">Nomor Rekening :</p>
                                    </div>
                                    <div className="right-rek p-0">
                                        <input className="mb-0 input-rek" id="rekening" value={this.props.data.report.nomer_rekening} readOnly />
                                        <b><i className="fa fa-files-o" style={{cursor:'pointer'}} onClick={()=>this.copyToClipboard("rekening")}></i></b>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-12 p-0'>
                                <hr className='m-0' ></hr>
                            </div>
                            <div className='col-sm-12 mt-4'>
                                <div className="row m-0">
                                    <div className="left-trans p-0">
                                        <p className="text-green">Nama Rekening :</p>
                                    </div>
                                    <div className="right-trans p-0 align-bank">
                                        <p className="mb-0">{this.props.data.report.nama_pemilik}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-12 mt-2'>
                                <p className="info-topup">Selesaikan Pembayaran Sebelum</p>
                                <p className="info-green">{ moment(this.props.data.report.respTime).format('LLLL')}</p>
                                <p className="info-timer">{this.state.duration}</p>
                            </div>
                            <div className='col-sm-12 mt-2'>
                                <p className="mb-3" style={{opacity:'50%',fontWeight:'500',fontSize:'12pt'}}>Cara melakukan isi ulang saldo OTU :</p>
                                <p className='mb-1' style={{opacity:'50%',fontSize:'12pt'}}>1. Pastikan transfer sesuai hingga digit terakhir</p>
                                <p className='mb-1' style={{opacity:'50%',fontSize:'12pt'}}>2. Pastikan nomor rekening tujuan sesuai atas nama PT. Eklanku Indonesia Cemerlang</p>
                                <p className='mb-1' style={{opacity:'50%',fontSize:'12pt'}}>3. Perhatikan batas waktu transfer adalah 4 jam setelah request dilakukan</p>
                                <p className='mb-1' style={{opacity:'50%',fontSize:'12pt'}}>4. Silahkan tekan tombol KONFIRMASI setelah melakukan pembayaran</p>
                            </div>
                            <div className='col-sm-12 mt-2'>
                                <div className="row yellow-transfer">
                                    <div className="col-sm-12 p-0">
                                        <p className="info-customer">Apabila terdapat kendala, silahkan hubungi Customer service</p>
                                        <p className="mb-0" align="center"><a className="call-customer" href="tel:085711110315">
                                            <img className="mr-2" src={require('../../../images/footer/logo-telpon.svg')} alt='logo'/>
                                            0857-1111-0315
                                        </a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :''
            }
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
    
export default connect(mapStateToProps, mapDispatchToProps)(DetileDeposit)
const style={
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