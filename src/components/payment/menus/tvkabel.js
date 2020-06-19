import React, { Component } from 'react'
import LoadingPage from '../../loadingPage';
import {API,PASCABAYAR_PRODUCT,APLUS,X_API_KEY,PASCABAYAR_CEK,ORDER_PRODUCT_PASCABAYAR} from '../../../api/index'
import axios from 'axios'
import {TextField,withStyles,InputLabel,Select,FormControl } from '@material-ui/core';
import  '../commons/alert.css'
import Swal from 'sweetalert2'
import logo from '../../../images/buttonImage/tv_kabel.svg'
import {convertCurrency} from '../commons/commonLib'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

class tvkabel extends Component {
    constructor(){
        super()
        this.state={
            cekTagihan: '',
            loading: true,
            nomor: '',
            nomorPelanggan:'',
            product:[],
            resTagihan:[],
            code:'',
            tipeProduct:'TV kabel',
            redirect:'',
            logo : logo,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeCode = this.handleChangeCode.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleOrder = this.handleOrder.bind(this)
    }
    handleOrder(){
        this.setState({loading: true})
        const {resTagihan} = this.state
        const isLogin = JSON.parse(localStorage.getItem('isLogin'))
        const header={
            'X-Api-Key' : X_API_KEY
        }
        const body = {
            'userID' :isLogin.userID,
            'accessToken' : isLogin.mbr_token,
            'aplUse': APLUS,
            'billingReferenceID' : resTagihan.billingReferenceID
        }
        axios.post(API+ORDER_PRODUCT_PASCABAYAR, body, {headers:header} )
        .then(res => {
            const orderProduct = res.data;
            this.setState({ loading:false });
            // console.log(orderProduct)
              if(orderProduct.errNumber !== '0'){
                Swal.fire({
                    icon : 'error',
                    title: orderProduct.status,
                    text : orderProduct.respMessage
                })
                this.setState({loading: false})
              }else{
                Swal.fire({
                    icon : 'success',
                    title: orderProduct.status,
                    text : orderProduct.respMessage,
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.value) {
                        const keterangan ={
                            'product' : this.state.tipeProduct
                        }
                        const data = {order:this.state.resTagihan,keterangan}
                        this.props.changeReport(data)
                        this.setState({ redirect:true })
                    }
                })
                this.setState({loading: false})
              }
            })
        .catch(error => {
            console.log(error.response)
        });
    }
    handleChange(e){
        this.setState({ [e.target.name] : e.target.value })
    }
    handleSubmit(e){
        e.preventDefault();
        this.setState({loading:true})
        const isLogin = JSON.parse(localStorage.getItem('isLogin'))
        const header={
            'X-Api-Key' : X_API_KEY
        }
        const body = {
            'userID' :isLogin.userID,
            'accessToken' : isLogin.mbr_token,
            'aplUse': APLUS,
            'customerID' : this.state.nomorPelanggan,
            'customerMSISDN': this.state.nomor,
            'productCode': this.state.code
        }
        axios.post(API+PASCABAYAR_CEK, body, {headers:header})
          .then(res => {
            const order = res.data;
            if(order.errNumber !== '0'){
                this.setState({ loading: false })
                Swal.fire({
                    icon : 'error',
                    title: order.status,
                    text : order.respMessage
                })
            }else{
              this.setState({
                resTagihan:order,
                loading: false, 
                cekTagihan:'open'
              })
              document.getElementById('form_detail_tv').scrollIntoView({behavior:'smooth'})
            }
            // console.log(order)
          })
          .catch(error => {
            this.setState({loading: false})
              Swal.fire({
                allowOutsideClick: false,
                title: 'Request Tume Out',
                showClass: {
                  popup: 'animated fadeInDown faster'
                },
                hideClass: {
                  popup: 'animated fadeOutUp faster'
                }
              })
          });
        
      }
    handleChangeCode(e){
      this.setState({[e.target.name] : e.target.value})
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
                'accessToken' : isLogin.mbr_token,
                'productGroup' : 'TV KABEL'
            }
            axios.post(API+PASCABAYAR_PRODUCT, body, {headers:header} )
            .then(res => {
                // const prod = res.data.productList;
                let product = res.data.productList.filter(
                  (b) => {
                      return b.isactive.indexOf('Active') !== -1;
                  }
                )
                // console.log(product)
                this.setState({ product:product, loading:false, nomor:this.props.profile.o_hp  });
            })
            .catch(error => {
            });
        }else{
            window.location = '/'
        }
      }
      render() {
        if(this.state.redirect === true){
            return <Redirect to='/home/detiletagihan' />
        }
          if(this.state.loading === true){
              return<LoadingPage/>
          }
          const {resTagihan, product} = this.state
        return (
            <div>
                <div className=' border shadow p-3 mt-3 mb-3 new-radius' id="form_detail_tv">
                    <div className="row mt-2">
                        <div className='col-sm-12'>
                            <h3 style={{color:'#2E7D32',marginTop:'10px',marginBottom:'10px'}} >TV KABEL</h3>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm mt-2' >
                            <GreenTextField label="Nomor Pelanggan" style={{width:'100%'}} 
                                name="nomorPelanggan" 
                                onChange={this.handleChange}
                                value={this.state.nomorPelanggan}
                                autoComplete='off'
                            />
                            {this.state.nomorPelanggan === '' ? ''
                            :
                            <div style={{float:'right'}}>
                              <img src={require('../../../images/icon/close-input.svg')} 
                                  alt='icon' width="15px" style={{cursor:'pointer', marginLeft:'-15px'}} className="mt-4 position-absolute" 
                                onClick={()=>this.setState({nomorPelanggan:''})} />
                            </div>
                            } 
                        </div>
                        <div className='col-sm mt-2' >
                            <GreenTextField label="Nomor Telephone" style={{width:'100%'}} 
                                name="nomor" 
                                onChange={this.handleChange}
                                value={this.state.nomor}
                                autoComplete='off'
                            />
                            {this.state.nomor === '' ? ''
                            :
                            <div style={{float:'right'}}>
                              <img src={require('../../../images/icon/close-input.svg')} 
                                  alt='icon' width="15px" style={{cursor:'pointer', marginLeft:'-15px'}} className="mt-4 position-absolute" 
                              onClick={()=>this.setState({nomor:''})} />
                            </div>
                            } 
                            <span style={style.validate}>Nomor digunakan untuk menerima konfirmasi</span>
                        </div>
                        <div className='col-sm mt-2' >
                            <GreenFormControl style={{width:'100%'}}>
                                <InputLabel htmlFor="code-native-simple">Jenis Pembayaran</InputLabel>
                                <Select
                                    native
                                    value={this.state.code}
                                    onChange={this.handleChangeCode}
                                    name="code"
                                >
                                    <option value="" ></option>
                                    {product.map(product=>(
                                        <option className='mt-2' value={product.code} key={product.code}>{product.name}</option>
                                    ))}
                                </Select>
                            </GreenFormControl>
                        </div>
                    </div>
                    
                    <div className='row m-0 mt-5'>
                            <div className='col-sm-3'>
                            {this.state.nomorPelanggan === '' ? 
                                <div className='bt-green-off' align="center" disabled>Cek Tagihan</div>
                            :
                                <div align="center"  onClick={this.handleSubmit}  className='bt-green'>Cek Tagihan</div>
                            }
                          </div>
                        </div>
                </div>
                {!this.state.cekTagihan ? <div></div> : 
                <div className='border shadow p-3 mt-3 mb-3 new-radius'>
                    <div className="row mt-2">
                        <div className='col-sm-12'>
                            <h5 style={{color:'#2E7D32'}} >DETAIL TRANSAKSI</h5>
                        </div>
                    </div>
                    <hr className='my-1'></hr>
                    <div className='row mt-2'>
                      <table className='table table-borderless'>
                        <tbody>
                          <tr>
                            <td>Transaction ID</td>
                            <td>:</td>
                            <td style={{wordWrap:'break-word'}}>{resTagihan.billingReferenceID}</td>
                          </tr>
                          <tr>
                            <td>ID Customer</td>
                            <td>:</td>
                            <td>{resTagihan.customerID}</td>
                          </tr>
                          <tr>
                            <td>Name</td>
                            <td>:</td>
                            <td>{resTagihan.customerName}</td>
                          </tr>
                          <tr>
                            <td>Phone</td>
                            <td>:</td>
                            <td>{resTagihan.customerMSISDN}</td>
                          </tr>
                          <tr>
                            <td>Date</td>
                            <td>:</td>
                            <td>{resTagihan.respTime}</td>
                          </tr>
                          <tr>
                            <td>Payment</td>
                            <td>:</td>
                            <td>Rp  {convertCurrency(resTagihan.payment)}</td>
                          </tr>
                          <tr>
                            <td>Admin Bank</td>
                            <td>:</td>
                            <td>Rp {convertCurrency(resTagihan.adminBank)}</td>
                          </tr>
                          <tr>
                            <td>Billink</td>
                            <td>:</td>
                            <td> Rp {convertCurrency(resTagihan.billing)}</td>
                          </tr>
                          <tr>
                            <td>Periode</td>
                            <td>:</td>
                            <td>{resTagihan.period}</td>
                          </tr>
                          <tr>
                            <td>Notice</td>
                            <td>:</td>
                            <td>{resTagihan.status}</td>
                          </tr>
                          <tr>
                            <td>Point</td>
                            <td>:</td>
                            <td>{resTagihan.ep}</td>
                          </tr>
                        </tbody>  
                      </table>
                    </div>
                    <div className='row mt-3 ml-0'>
                        <button data-toggle="modal" data-target="#tvkabel"  className='bt-green'>PROSES</button>
                    </div>
                </div>
                } 

                 {/* <!-- Modal --> */}
                 <div className="modal fade" id="tvkabel" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="tvkabelLabel" aria-hidden="true">
                      <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content border-0 bg-transparent">
                                <div className="custom-modal-header">
                                    <h5 className="m-0 p-0">KONFIRMASI PEMBELIAN</h5>
                                </div>
                                <div className="custom-modal-body" style={{borderBottom:'5px solid #CDF0DC'}}>
                                    <table className="w-100">
                                        <tbody>
                                            <tr>
                                                <td className="pt-4 pb-4 w-50"> <span style={{opacity:'60%'}}>{this.state.tipeProduct}</span> </td>
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
                                                <td className="pt-2 pb-2 w-25">No HP</td>
                                                <td className="pt-2 pb-2">:</td>
                                                <td className="pt-2 pb-2" align="right">{resTagihan.customerMSISDN}</td>
                                            </tr>
                                            <tr style={{fontWeight:'bold', color:'#388E3C'}}>
                                                <td className="pt-2 pb-4 w-25">Point</td>
                                                <td className="pt-2 pb-4">:</td>
                                                <td className="pt-2 pb-4" align="right">{resTagihan.ep} Point</td>
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
                                                <td className="pt-2 pb-2" align="right">Rp {convertCurrency(resTagihan.sellPrice)}</td>
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
                                            <div className='custom-btn-green' data-dismiss="modal" aria-label="Close" onClick={this.handleOrder}>KONFIRMASI</div>
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
export default connect(mapStateToProps, mapDispatchToProps)( tvkabel )
const style = {
    btGreen:{
        fontSize:'14px',
        color:'#FFFFFF',
        backgroundColor:'#2E7D32',
        width: '150px'
    },
    validate:{
        fontSize:'8pt',
        color:'#DB0C0B'
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