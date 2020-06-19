import React, { Component } from 'react'
import {TextField,InputLabel,Select,FormControl,withStyles } from '@material-ui/core';
import {convertCurrency} from '../commons/commonLib'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import {API,PLN_TOKEN_PRODUCT,APLUS,X_API_KEY,ORDER_PRODUCT} from '../../../api/index'
import Swal from 'sweetalert2'
import LoadingPage from '../../loadingPage'
import { connect } from 'react-redux';
import logo from '../../../images/buttonImage/token_listrik.svg'

class Tokenlisrik extends Component {
    constructor(){
        super()
        this.state={
            product:'',
            nomor:'',
            tipe:'Kosong',
            nominal:'',
            // harga:'',
            ep : '0',
            name:'',
            code :'',
            nomorPelanggan:'',
            loading:true,
            redirect:'',
            tipeProduct:'Token Listik'
        }
        this.handleChangeProduct= this.handleChangeProduct.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        this.setState({loading:true})
        e.preventDefault();
        const {nomor, nomorPelanggan, code} = this.state
        const isLogin = JSON.parse(localStorage.getItem('isLogin'))
        const header={
            'X-Api-Key' : X_API_KEY
        }
        const body = {
            'userID' :isLogin.userID,
            'accessToken' : isLogin.mbr_token,
            'aplUse': APLUS,
            'MSISDN':nomorPelanggan,
            'buyerPhone':nomor,
            'productCode':code
        }
        // console.log(body)
        axios.post(API+ORDER_PRODUCT, body, {headers:header} )
            .then(res => {
                const order = res.data;
                this.setState({ order });
                if(order.errNumber === '19' || order.errNumber === '23'){
                    Swal.fire({
                        icon : 'error',
                        title: order.status,
                        text : order.respMessage
                    })
                    this.setState({loading: false})
                }else{
                    this.setState({loading: false})
                    Swal.fire({
                        icon : 'success',
                        title: order.status,
                        text : order.respMessage,
                        allowOutsideClick: false,
                    }).then((result) => {
                        if (result.value) {
                            const keterangan ={
                                'product' : this.state.tipeProduct,
                                'tipe' : this.state.tipe,
                                'ep': this.state.ep,
                                'logo':this.state.logo
                            }
                            const data = {order,keterangan}
                            this.props.changeReport(data)
                            this.setState({ redirect:true })
                        }
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });
    }
    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    handleChangeProduct(e){
        this.setState({[e.target.name]:e.target.value})
        const nm = this.state.product.filter(
            (p) => {
                return p.code.indexOf(e.target.value) !== -1;
            }
        )
        // console.log(nm)
        this.setState({harga: nm[0].price})
        this.setState({ep: nm[0].ep})
        this.setState({name: nm[0].name})
        this.setState({code: nm[0].code})
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
            axios.post(API+PLN_TOKEN_PRODUCT, body, {headers:header} )
            .then(res => {
                const product = res.data.data;
                if(product.errNumber === '8'){
                    this.setState({loading:false})
                }else{
                    this.setState({ product: product, nomor:this.props.profile.o_hp });
                    this.setState({loading:false, logo:logo})
                }
                })
            .catch(error => {
            });
        }else{
            window.location = '/'
        }
        
    }

    render() {
        if(this.state.redirect === true){
            return <Redirect to='/home/detiletransaksi' />
        }
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
                            <h3 style={{color:'#2E7D32',marginTop:'10px',marginBottom:'10px'}} >Pembelian Token Listrik</h3>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm mt-2' >
                            <GreenTextField label="Nomor Pelanggan" style={{width:'100%'}} 
                                name="nomorPelanggan" 
                                value={this.state.nomorPelanggan} 
                                onChange={this.handleChange}
                                autoComplete='off' 
                            />
                            {this.state.nomorPelanggan === '' ? ''
                            :
                                <div style={{float:'right'}} >
                                     <img src={require('../../../images/icon/close-input.svg')} 
                                        alt='icon' width="15px" style={{cursor:'pointer', marginLeft:'-15px'}} className="mt-4 position-absolute" 
                                        onClick={()=>this.setState({nomorPelanggan:'',ep:'0',harga:''})} />
                                </div>
                            } 
                        </div>
                        <div className='col-sm mt-2' >
                            <GreenTextField label="Nomor Telepon" style={{width:'100%'}} 
                                name="nomor" 
                                value={this.state.nomor} 
                                onChange={this.handleChange}
                                autoComplete='off' 
                            />
                            {this.state.nomor === '' ? ''
                            :
                                <div style={{float:'right'}} >
                                     <img src={require('../../../images/icon/close-input.svg')} 
                                        alt='icon' width="15px" style={{cursor:'pointer', marginLeft:'-15px'}} className="mt-4 position-absolute" 
                                        onClick={()=>this.setState({nomor:'',ep:'0',harga:''})} />
                                </div>
                            }
                            <span style={{fontSize:'9px',color:'#D41C24'}}>No. Digunakan untuk menerima konfirmasi</span>
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
                            <span style={{fontSize:'36px', color:'#2E7D32',width:'200px'}} className='mb-0'>Rp {convertCurrency(this.state.harga) }</span>
                            <div style={{color:'#F5A100'}}><img src={require('../../../images/icon/coin.svg')} alt="koin"/> +{this.state.ep} Point</div>
                        </div>
                    </div>
                    <div className='row mt-5'>
                        <div className='col-sm-3'>
                            {this.state.nomorPelanggan === '' ? 
                                <div className='bt-green-off' align="center" disabled>Beli</div>
                            :
                                <div align="center" data-toggle="modal" data-target="#tokenListrik" className='bt-green'> Beli</div>
                            }
                        </div>
                    </div>

                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="tokenListrik" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="tokenListrikLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content border-0 bg-transparent">
                                <div className="custom-modal-header">
                                    <h5 className="m-0 p-0">KONFIRMASI PEMBELIAN</h5>
                                </div>
                                <div className="custom-modal-body" style={{borderBottom:'5px solid #CDF0DC'}}>
                                    <table className="w-100">
                                        <tbody>
                                            <tr>
                                                <td className="pt-4 pb-4 w-50"> <span style={{opacity:'60%'}}>Token Listrik</span> <br/> {this.state.name}</td>
                                                <td className="pt-4 pb-4" align="right" colSpan="2"> 
                                                    <img src={this.state.logo} alt={this.state.logo} width='120px' height='50px' />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="custom-modal-body">
                                    <table className="w-100">
                                        <tbody>
                                            <tr>
                                                <td className="pt-2 pb-2 w-25">No Pelanggan</td>
                                                <td className="pt-2 pb-2">:</td>
                                                <td className="pt-2 pb-2" align="right">{this.state.nomorPelanggan}</td>
                                            </tr>
                                            <tr style={{fontWeight:'bold', color:'#388E3C'}}>
                                                <td className="pt-2 pb-4 w-25">Point</td>
                                                <td className="pt-2 pb-4">:</td>
                                                <td className="pt-2 pb-4" align="right"> {this.state.ep} Point</td>
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
                                                <td className="pt-2 pb-2" align="right"> Rp {convertCurrency(this.state.harga) }</td>
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
                                            <div data-dismiss="modal" aria-label="Close"  className='custom-btn-green' onClick={this.handleSubmit}>KONFIRMASI</div>
                                        </div>
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

const mapStateToProps = (state) =>({
    profile : state.riwayatTransaksi.profile.data[0]
})

const mapDispatchToProps  = (dispatch) => ({
    changeReport : (data)=> dispatch({ type : 'REPORT_TRANSACTION', value : data  })
})

// export default Pulsa
export default connect(mapStateToProps, mapDispatchToProps)(Tokenlisrik)

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