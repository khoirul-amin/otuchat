import React, { Component } from 'react'
import { connect } from 'react-redux'
import { convertCurrency } from './commons/commonLib';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
// import { convertCurrency } from './commons/commonLib'
import { X_API_KEY,API,SALDO_BONUS,APLUS } from '../../api/index'

class DetailTransaksiTagihan extends Component {
    constructor(){
        super()
        this.state={
            tipe:'',
            redirect:''
        }
    }

    print(){
        window.print()
    }

// componentDidMount(){
//     const order = {
//         errNumber: "0",
//         userID: "EKL0280775",
//         respTime: "2020-01-15 17:41:37",
//         productCode: "PLNPOST",
//         billingReferenceID: "1665736150",
//         customerID: "516700216660",
//         customerMSISDN: "085967176079",
//         customerName: "SMP/SMA PP PUTRI HBBLH 2",
//         period: "1",
//         policeNumber: "-",
//         lastPaidPeriod: "-",
//         tenor: "-",
//         lastPaidDueDate: "-",
//         usageUnit: "-",
//         penalty: "-",
//         payment: "148872",
//         minPayment: "0",
//         maxPayment: "0",
//         additionalMessage: "SUCCESSFULL",
//         billing: "151872",
//         sellPrice: "151872",
//         adminBank: "3000",
//         profit: "500.00",
//         ep: "1820",
//         ref1: "20200115174137",
//         status: "SUCCESS",
//         respMessage: "SUCCESS",
//     }
//     const keterangan = {
//         'ep': '200',
//         'nominal' : '5000',
//         'tipe' : 'Telkomsel',
//         'product' : 'Pulsa'
//     }
//     const data = {order,keterangan}
//     this.props.changeReport(data)
// }
getSaldo(){

    const isLogin = JSON.parse(localStorage.getItem('isLogin'))
    this.setState({isLogin:isLogin})
    // console.log(isLogin)
    if (!isLogin){
        window.location = '/'
    } else {
        
        const header={
            'X-Api-Key' : X_API_KEY
        }

        const body ={
            'userID' : isLogin.userID,
            'aplUse':APLUS,
            'accessToken' : isLogin.mbr_token
        }
        axios.post(API+SALDO_BONUS, body, {headers:header} )
            .then(res => {
                const saldo = res.data.Balance[0];
                if(res.data.errNumber !== '0'){
                    this.setState({isLogin:null})
                }else{
                    this.props.setSaldo(saldo)
                    this.setState({redirect:true})
                }
                })
            .catch(error => {
                console.log(error.response)
                
            });
    }
}
    render() {
        if(this.state.redirect === true){
            return <Redirect to='/home'/>
        }
        return (
            <div id='report'>
                {/* {console.log(this.props.data.report)} */}
                <div className='row'>
                        { this.props.data.report === null ? "" : 
                    <div className='container mt-4'>
                        <p><b>Detail Transaksi</b></p>
                        <div style={style.boxShadow} className='row ml-0 mr-0'>
                        <div className='col-sm-12 mt-3'>
                            <p style={{ color:'#2E7D32', fontSize:'14pt' }}><b>{ this.props.data.report.keterangan.product }</b></p>
                        </div>
                            <div className='col-sm-12 m-0 p-0'>
                                <div className='row m-0'>
                                    <div className='col-sm-6 mt-3'>
                                        <p>Status</p>
                                    </div>
                                    <div className='col-sm-6 mt-3'>
                                        <p align='right'> { this.props.data.report.order.status } </p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-12 m-0 p-0'>
                                <div className='row m-0'>
                                    <div className='col-sm-6'>
                                        <p>Transaction ID</p>
                                    </div>
                                    <div className='col-sm-6'>
                                        <p align='right'> {this.props.data.report.order.billingReferenceID} </p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-12 m-0 p-0'>
                                <div className='row m-0'> 
                                    <div className='col-sm-6'>
                                        <p>Nomor Handphone</p>
                                    </div>
                                    <div className='col-sm-6'>
                                        <p align='right'> { this.props.data.report.order.customerMSISDN } </p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-12 m-0 p-0'>
                                <div className='row m-0'>
                                    <div className='col-sm-6'>
                                        <p>Nama</p>
                                    </div>
                                    <div className='col-sm-6'>
                                        <p align='right'> {this.props.data.report.order.customerName} </p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-12 m-0 p-0'>
                                <div className='row m-0'>
                                    <div className='col-sm-6'>
                                        <p>Tanggal</p>
                                    </div>
                                    <div className='col-sm-6'>
                                        <p align='right'>{this.props.data.report.order.respTime}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-12 m-0 p-0'>
                                <div className='row m-0'>
                                    <div className='col-sm-6'>
                                        <p>Admin Bank</p>
                                    </div>
                                    <div className='col-sm-6'>
                                        <p align='right'>Rp. { convertCurrency(this.props.data.report.order.adminBank) }</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-12 m-0 p-0'>
                                <div className='row m-0'>
                                    <div className='col-sm-6'>
                                        <p>Harga</p>
                                    </div>
                                    <div className='col-sm-6'>
                                        <p align='right'>Rp. {convertCurrency(this.props.data.report.order.payment)}</p>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                            <div className='col-sm-12 m-0 p-0'>
                                <div className='row m-0'>
                                    <div className='col-sm-6 mt-3'>
                                        <p>Total</p>
                                    </div>
                                    <div className='col-sm-6 mt-3'>
                                        <p align='right'>Rp.  {convertCurrency(this.props.data.report.order.sellPrice )}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-12 m-0 p-0'>
                                <div className='row m-0'>
                                    <div className='col-sm-6'>
                                        <p style={style.pGreen}><b>Point</b></p>
                                    </div>
                                    <div className='col-sm-6'>
                                        <p align='right' style={style.pGreen}><b> { this.props.data.report.order.ep } </b></p>
                                    </div>
                                    </div>
                            </div>


                                
                        </div>

                        
                        <p className='mt-3' ><b>Keterangan</b></p>
                        <div style={style.boxShadow} className='row ml-0 mb-5 mr-0'>
                            <div className='col-sm-8 pt-3'>
                                <p>Transaksi ke nomor tujuan <b><i> { this.props.data.report.order.customerID } </i></b> telah sukses</p>
                            </div>
                            <div className='col-sm-4'>
                                <p align='right'><i style={style.printBookmark} className="fa fa-bookmark"></i></p>
                                <p style={style.print} align='center'>
                                    {/* <i onClick={()=>this.print()} className="fa fa-print" style={{cursor:'pointer'}}></i> */}
                                </p>
                            </div>
                        </div>
                        <div className='row ml-0 mt-1 mb-5 mr-0'>
                            <p align='right' className='w-100'>
                                <span onClick={()=>this.getSaldo()} style={{padding:'10px 35px', color:'white', background:'#2E7D32', fontSize:'10pt',cursor:'pointer'}} >
                                    Kembali
                                </span>
                            </p>
                        </div>
                    </div>
            }
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    data : state.firstReducer
})

const mapDispatchToProps  = (dispatch) => ({
    changeReport : (data)=> dispatch({ type : 'REPORT_TRANSACTION', value : data  }),
    setSaldo: (saldo)=>dispatch({type:'SET_SALDO', value:saldo }),
})

export default connect(mapStateToProps,mapDispatchToProps)(DetailTransaksiTagihan)

const style={
    boxShadow:{
        boxShadow:'0px 0px 6px #00000029',
        backgroundColor:'#FFFFFF',
        fontSize:'10pt'
    },
    head:{
        backgroundColor:'#005005',
        height:'70px'
    },
    pGreen:{
        color:'#2E7D32'
    },
    print:{
        color:'#2E7D32',
        fontSize:'20pt'
    },
    printBookmark:{
        color:'#2E7D32',
        fontSize:'50px',
        marginTop:'-4px'
    }
}