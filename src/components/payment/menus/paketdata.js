import React, {Component} from 'react'
import { imagePrefix } from '../../imageLoader/prefix'
import {API,PAKETDATA_PRODUCT,APLUS,X_API_KEY,PAKETDATA_PREFIX,ORDER_PRODUCT} from '../../../api/index'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import {TextField,withStyles } from '@material-ui/core';
import {convertCurrency} from '../commons/commonLib'
import LoadingPage from '../../loadingPage'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'

class Paketdata extends Component {
    constructor(){
        super()
        this.state={
            prefix:[],
            product:'',
            nomor:'',
            tipe:'Kosong',
            nominal:'',
            ep : '0',
            name:'',
            code :'',
            loading: true,
            logo:'',
            productFilter:'',
            redirect:'',
            tipeProduct:'Paket Data'
        }
        // this.handleChange= this.handleChange.bind(this);
        this.handleChangeNomor= this.handleChangeNomor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChangeNomor(e){
        this.setState({[e.target.name]:e.target.value})
        const nomor = e.target.value.substr(0,4)
        // console.log(nomor)
        const pref = this.state.prefix.filter(
            (pref) => {
                return pref.prefix.indexOf(nomor) !== -1;
            }
        )
        if(!pref[0] || nomor === ''){
            this.setState({tipe: 'Kosong', productFilter:'',ep:'0',harga:'',logo:''})
        }else{
            const paketdata = this.state.product.filter(
                (p) => {
                    return p.provider.indexOf(pref[0].provider.toUpperCase()) !== -1;
                }
            )
            this.setState({productFilter: paketdata, tipe:pref[0].provider})
        }
        if (!pref[0]){
            this.setState({logo : ''})
        }else if (pref[0].provider === 'ISAT DATA'){
            this.setState({logo : imagePrefix.indosat})
        }else if(pref[0].provider === 'TRI DATA'){
            this.setState({logo: imagePrefix.three})
        }else if(pref[0].provider === 'SMARTFREN DATA'){
            this.setState({logo: imagePrefix.smartfren})
        }else if(pref[0].provider === 'AXIS DATA'){
            this.setState({logo: imagePrefix.axis})
        }else if(pref[0].provider === 'TSEL DATA'){
            this.setState({logo: imagePrefix.telkomsel})
        }else if(pref[0].provider === 'XL DATA'){
            this.setState({logo: imagePrefix.xl})
        }else{
            this.setState({logo: ''})
        }
    }
    handleChange(e,name){
        this.setState({nominal:name})
        const nm = this.state.product.filter(
            (p) => {
                return p.code.indexOf(e) !== -1;
            }
        )
        this.setState({harga: nm[0].price, ep: nm[0].ep, name: nm[0].name,code: nm[0].code  })
    }
    handleSubmit(e){
        e.preventDefault();
        this.setState({loading:true})
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
                if(order.errNumber !== '0' ){
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
            axios.post(API+PAKETDATA_PRODUCT, body, {headers:header} )
            .then(res => {
                const product = res.data.data;
                this.setState({ product:product, loading: false });
                
                })
            .catch(error => {
                console.log(error.response)
            });
            axios.post(API+PAKETDATA_PREFIX, body, {headers:header} )
            .then(res => {
                const prefix = res.data.data;
                this.setState({ prefix });
                // console.log('prefix',prefix)
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
        let product = this.state.productFilter
        return (
            <div>
                <div className=' border shadow p-3 mt-3 mb-3 new-radius'>
                    <div className="row mt-2">
                        <div className='col-sm-12'>
                            <h3 style={{color:'#2E7D32',marginTop:'10px',marginBottom:'10px'}} >Pembelian Paket Data</h3>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-6 mt-2' >
                            <GreenTextField label="Nomor Telepon" style={{width:'100%'}} 
                                name="nomor" 
                                value={this.state.nomor} 
                                onChange={this.handleChangeNomor}
                                autoComplete='off' 
                            />
                            {this.state.nomor === '' ? ''
                            :
                                <div style={{float:'right', marginTop:'-30px'}} >
                                {this.state.logo === '' ? 
                                   <span width="60px" style={{marginRight: '15px'}}></span>
                                :
                                    <img src={this.state.logo} alt='icon' width="60px" style={{marginRight: '20px'}}/>
                                }
                                     <img src={require('../../../images/icon/close-input.svg')} 
                                        alt='icon' width="15px" style={{cursor:'pointer', marginLeft:'-15px'}} className="mt-1 position-absolute" 
                                        onClick={()=>this.setState({nomor:'',productFilter:'',ep:'0',harga:'',nominal:''})} />
                                </div>
                            } 
                        </div>
                        <div className='col-sm-6 mt-2' >
                           {product === '' ? 
                                <GreenTextField label="Nominal" style={{width:'100%'}} 
                                    autoComplete='off' 
                                    name="nominal"
                                    value=""
                                    readOnly
                                />
                                :
                                <div>
                                    <GreenTextField label="Nominal" style={{width:'100%'}} 
                                        autoComplete='off' 
                                        name="nominal"
                                        value={this.state.nominal}
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                    />
                                    <div className="dropdown-menu scrol-pdam rounded-0 p-0" >
                                        {product.map(product=>(
                                            <div className='row m-0 menu-pdam' key={product.code} style={{fontSize:'12pt'}} onClick={() => this.handleChange(product.code,product.name)}>
                                                <div className='col m-0 p-0'>
                                                    <p className="mb-0">{product.name}<br/><span style={{fontSize:'10pt'}}>+ Point {product.ep}</span></p>
                                                </div>
                                                <div>
                                                    <p className="mb-0" style={{color:'#3A9460'}}>Rp {convertCurrency(product.price)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                            }
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
                            {this.state.ep === '0' ? 
                                <div className='bt-green-off' align="center" disabled>Beli</div>
                            :
                                <div align="center" data-toggle="modal" data-target="#paketData" className='bt-green'> Beli</div>
                            }
                        </div>
                    </div>
                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="paketData" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="paketDataLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content border-0 bg-transparent">
                                <div className="custom-modal-header">
                                    <h5 className="m-0 p-0">KONFIRMASI PEMBELIAN</h5>
                                </div>
                                <div className="custom-modal-body" style={{borderBottom:'5px solid #CDF0DC'}}>
                                    <table className="w-100">
                                        <tbody>
                                            <tr>
                                                <td className="pt-4 pb-4 w-50"> <span style={{opacity:'60%'}}>Paket Data</span> <br/> {this.state.name}</td>
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
                                                <td className="pt-2 pb-2" align="right">{this.state.nomor}</td>
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
const mapDispatchToProps  = (dispatch) => ({
    changeReport : (data)=> dispatch({ type : 'REPORT_TRANSACTION', value : data  })
})

// export default Pulsa
export default connect(null, mapDispatchToProps)(Paketdata)

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