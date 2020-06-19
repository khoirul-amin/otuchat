import React, { Component } from 'react'
import {API,WIFI_PRODUCT,APLUS,X_API_KEY,ORDER_PRODUCT} from '../../../api/index'
import axios from 'axios'
import {TextField,InputLabel,Select,FormControl,withStyles } from '@material-ui/core';
import {convertCurrency} from '../commons/commonLib'
import Swal from "sweetalert2"
import LoadingPage from '../../loadingPage'


export default class Wifi extends Component {
    constructor(){
        super()
        this.state={
            product:'',
            nomor:'',
            nominal:'',
            // harga:'',
            ep : '',
            name:'',
            code :'',
            loading:true
        }
        this.handleChange= this.handleChange.bind(this);
        this.handleChangeNomor= this.handleChangeNomor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChangeNomor(e){
        this.setState({[e.target.name]:e.target.value})
    }
    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
        const nm = this.state.product.filter(
            (p) => {
                return p.code.indexOf(e.target.value) !== -1;
            }
        )
        this.setState({harga: nm[0].price})
        this.setState({ep: nm[0].ep})
        this.setState({name: nm[0].name})
        this.setState({code: nm[0].code})
    }
    handleSubmit(e){
        this.setState({loading: true})
        e.preventDefault();
        const {nomor, code} = this.state
        const isLogin = JSON.parse(localStorage.getItem('isLogin'))
        const header={
            'X-Api-Key' : X_API_KEY
        }
        const body = {
            'userID' :isLogin.userID,
            'accessToken' : isLogin.mbr_token,
            'aplUse': APLUS,
            'MSISDN':nomor,
            'productCode':code
        }
        axios.post(API+ORDER_PRODUCT, body, {headers:header} )
            .then(res => {
                const order = res.data;
                this.setState({ order });
                // console.log('order',order)
                if(order.errNumber !== '0' ){
                    Swal.fire({
                        icon : 'error',
                        title: order.status,
                        text : order.respMessage
                    })
                    this.setState({loading: false})
                }else{
                    Swal.fire({
                        icon : 'success',
                        title: order.status,
                        text : order.respMessage
                    })
                    this.setState({loading: false})
                }
                })
            .catch(error => {
                console.log(error.response)
            });
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
            axios.post(API+WIFI_PRODUCT, body, {headers:header} )
            .then(res => {
                const product = res.data;
                if(product.errNumber === '7'){
                    this.setState({loading: false})
                    // Swal.fire({
                    //     icon : 'info',
                    //     title: 'INFO',
                    //     text : 'Mohon Maaf Product WiFi tidak bisa digunakan '
                    // })
                }else if(product.errNumber === '8'){
                    this.setState({ loading: false})
                }else{
                    this.setState({ product:product.data, loading: false})
                }
                })
            .catch(error => {
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
        return (
            <div>
            <div className=' border shadow p-3 mt-3 mb-3 new-radius'>
                <div className="row mt-2">
                    <div className='col-sm-12'>
                        <h3 style={{color:'#2E7D32',marginTop:'10px',marginBottom:'10px'}} >Pembelian Paket Wifi</h3>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm mt-2' >
                        <GreenTextField label="Nomor Pelanggan" style={{width:'100%'}} 
                            name="nomor" 
                            value={this.state.nomor} 
                            onChange={this.handleChangeNomor}
                            autoComplete='off' 
                        />
                    </div>
                    <div className='col-sm mt-2' >
                        <GreenFormControl style={{width:'100%'}}>
                            <InputLabel htmlFor="nominal-native-simple">Nominal</InputLabel>
                                { this.state.product === '' ? 
                                    <Select  native >
                                        <option value="" ></option>
                                    </Select> 
                                :
                                <Select
                                    native
                                    value={this.state.nominal}
                                    onChange={this.handleChangeProduct}
                                    name="nominal"
                                >
                                    <option value="" ></option>
                                    {this.state.product.map(product=>(
                                        <option className='mt-2' value={product.code} key={product.code}>{product.name}</option>
                                    ))}
                                </Select>
                                }
                        </GreenFormControl>
                    </div>
                </div>
                <div className='row  mt-3'>
                    <div className='col-sm-9'>
                        <p style={{fontSize:'12px', color:'#707070',width:'100px'}} className='mb-0'>Harga</p>
                        <span style={{fontSize:'36px', color:'#2E7D32',width:'200px'}} className='mb-0'>Rp. {convertCurrency(this.state.harga) }</span>
                        <div style={{color:'#F5A100'}}><img src={require('../../../images/icon/coin.svg')} alt="koin"/> +{this.state.ep} Point</div>
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col-sm-3'>
                        {this.state.nomor === '' ? 
                            <div className='bt-green-off' align="center" disabled>Beli</div>
                        :
                            <div align="center" data-toggle="modal" data-target="#saldo" className='bt-green'> Beli</div>
                        }
                    </div>
                </div>

                {/* <!-- Modal --> */}
                <div className="modal fade" id="wifi" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="wifiLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header" style={{backgroundColor:'#005005',color:'white'}}>
                        <h5 className="modal-title" align='center' id="wifiLabel">INFORMASI PEMBELIAN</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span style={{color:'white'}} aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body pb-0">
                        <div className='row'>
                            <div className='col'><b> {this.state.name} </b></div>
                            <div className='mr-2'>Logo</div>
                        </div>
                        <div className='row mt-5'>
                            <div className='col'><b>Nomor Pelanggan :</b></div>
                            <div className='mr-3'><b> {this.state.nomor} </b></div>
                        </div>
                        <hr className="my-3"></hr>
                        <div className='row' style={{color:'rgb(28, 145, 245)'}}>
                            <div className='col'><b>Point :</b></div>
                            <div className='mr-3'><b> {this.state.ep} </b></div>
                        </div>
                        <hr className="mt-3 mb-0"></hr>
                        <div className='row mt-0 pt-2 pb-2' style={{backgroundColor:'rgb(48, 144, 54)'}}>
                            <div className='col'><b>Jumlah Tagihan :</b></div>
                            <div className='mr-3'><b> {convertCurrency(this.state.harga) } </b></div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn  btn-outline-success" data-dismiss="modal">Batalkan</button>
                        <button type="button" onClick={this.handleSubmit}  data-dismiss="modal" className="btn btn-success">Ya, Lanjutkan</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        )
    }
}

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
const GreenFormControl = withStyles({
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
  })(FormControl);