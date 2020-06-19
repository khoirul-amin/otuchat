import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
// import { convertCurrency } from './commons/commonLib'
import { X_API_KEY,API,SALDO_BONUS,APLUS } from '../../api/index'
import '../../assets/style.css'

import axis from '../../images/Profider/axis.png'
import indosat from '../../images/Profider/indosat.png'
import smartfren from '../../images/Profider/smartfren.png'
import telkomsel from '../../images/Profider/telkomsel.png'
import three from '../../images/Profider/three.png'
import xl from '../../images/Profider/xlx.png'
 
class detailTransaksi extends Component {
    constructor(){
        super()
        this.state={
            tipe:'',
            logo:indosat,
            redirect:'',
            report : 'https://invoice.eklankumax.com/GenerateInvoice/gen_pdf_download?trxID='
        }
    }
    print(){
        window.print()
    }

    componentDidMount(){
        // const order = {
        //     'errNumber':'0',
        //     'userID' : 'EKL123456',
        //     'respTime' : '2020-01-16 17:30:25',
        //     'status' : 'SUCCESSS',
        //     'transactionDate' : '2020-01-16 17:30:25',
        //     'MSISDN' : '085967176079',
        //     'nominal': '7200',
        //     'transactionID' : 4286030,
        // }
        // const keterangan = {
        //     'ep': '200',
        //     'nominal' : '5000',
        //     'tipe' : 'Telkomsel',
        //     'product' : 'Pulsa',
        //     logo:this.state.logo
        // }
        // const data = {order,keterangan}
        // this.props.changeReport(data)

        if(this.props.data.report === null){

        }else{
            const tipeProduct = this.props.data.report.keterangan.product

            if (!tipeProduct || tipeProduct === ''){
                this.setState({logo : ''})
            }else if (tipeProduct === 'Indosat'){
                this.setState({logo : indosat})
            }else if(tipeProduct === 'Three'){
                this.setState({logo: three})
            }else if(tipeProduct === 'Smart'){
                this.setState({logo: smartfren})
            }else if(tipeProduct === 'Axis'){
                this.setState({logo: axis})
            }else if(tipeProduct === 'Telkomsel'){
                this.setState({logo: telkomsel})
            }else if(tipeProduct === 'XL'){
                this.setState({logo: xl})
            }else{
                this.setState({logo: ''})
            }

        }
    }

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
                                <div className='col-sm-6 mt-4'>
                                    <p style={style.pGreen}><b>{ this.props.data.report.keterangan.product }</b></p>
                                </div>
                                <div className='col-sm-6 mt-3'>
                                    <p align='right'>
                                        {this.props.data.report.keterangan.logo === '' ? "" :
                                        <img src={ this.props.data.report.keterangan.logo } alt='logo' width='120px' />
                                        }
                                    </p>
                                </div>
                                <div className='col-sm-6 mt-4'>
                                    <p>Status</p>
                                </div>
                                <div className='col-sm-6 mt-4'>
                                    <p align='right'> { this.props.data.report.order.status } </p>
                                </div>
                                <div className='col-sm-6'>
                                    <p>Reff ID</p>
                                </div>
                                <div className='col-sm-6'>
                                    <p align='right'> {this.props.data.report.order.transactionID} </p>
                                </div>
                                <div className='col-sm-6'>
                                    <p>Nomor Handphone</p>
                                </div>
                                <div className='col-sm-6'>
                                    <p align='right'> { this.props.data.report.order.MSISDN } </p>
                                </div>
                                <div className='col-sm-6'>
                                    <p>Tanggal</p>
                                </div>
                                <div className='col-sm-6'>
                                    <p align='right'>  { moment(this.props.data.report.order.respTime).format('D MMMM YYYY') } </p>
                                </div>
                                <div className='col-sm-6'>
                                    <p>Harga</p>
                                </div>
                                <div className='col-sm-6'>
                                    <p align='right'>Rp. {this.props.data.report.order.nominal}</p>
                                </div>
                                <div className='col-sm-6 mt-3'>
                                    <p>Total</p>
                                </div>
                                <div className='col-sm-6 mt-3'>
                                    <p align='right'>Rp.  {this.props.data.report.order.nominal }</p>
                                </div>
                                <div className='col-sm-6'>
                                    <p style={style.pGreen}><b>Point</b></p>
                                </div>
                                <div className='col-sm-6'>
                                    <p align='right' style={style.pGreen}><b> { this.props.data.report.keterangan.ep } </b></p>
                                </div>
                        </div>

                        
                        <p className='mt-3' ><b>Keterangan</b></p>
                        <div style={style.boxShadow} className='row ml-0 mb-3 mr-0'>
                            <div className='col-sm-8 pt-3'>
                                <p>Transaksi ke nomor tujuan <b><i> { this.props.data.report.order.MSISDN } </i></b> sukses</p>
                            </div>
                            <div className='col-sm-4'>
                                <p align='right'><i style={style.printBookmark} className="fa fa-bookmark"></i></p>
                                <p style={style.print} align='center'>
                                    {/* <a className="link-print" target="new" href={this.state.report+this.props.data.report.order.transactionID}>
                                        <i className="fa fa-print" style={{cursor:'pointer'}}></i>
                                    </a> */}
                                </p>
                            </div>
                        </div>
                        <div className='row ml-0 mt-1 mb-5 mr-0'>
                            <p align='right' className='w-100'>
                                <span onClick={()=>this.getSaldo()} style={{borderRadius:'20px',padding:'10px 35px', color:'white', background:'#2E7D32', fontSize:'10pt',cursor:'pointer'}} >
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
export default connect(mapStateToProps, mapDispatchToProps)(detailTransaksi)

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