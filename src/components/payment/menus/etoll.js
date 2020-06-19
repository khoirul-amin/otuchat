import React, { Component } from 'react'
import {convertCurrency} from '../commons/commonLib'
import '../../../assets/style.css'
import bni from '../../../images/EToll/E-Toll-BNI.svg'
import bri from '../../../images/EToll/E-Toll-BRI.svg'
import mandiri from '../../../images/EToll/E-Toll-Mandiri.svg'
import {TextField,InputLabel,Select,FormControl,withStyles } from '@material-ui/core';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import {API,ETOLL_PRODUCT,APLUS,X_API_KEY,ORDER_PRODUCT} from '../../../api/index'
import Swal from "sweetalert2"
import LoadingPage from '../../loadingPage'
import { connect } from 'react-redux'

class Etoll extends Component {
    constructor(){
        super()
        this.state={
            product:[],
            etoll:[],
            nomor:'',
            nominal:'',
            // harga:'',
            ep : '',
            name:'',
            code :'',
            logo:'',
            title:'',
            loading:true,
            list:'ETOOL BNI',
            redirect:'',
            tipeProduct:'E Toll'
        }
        this.handleChangeNomor= this.handleChangeNomor.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        this.setState({loading:true})
        e.preventDefault();
        const {nomor, code} = this.state
        const isLogin = JSON.parse(localStorage.getItem('isLogin'))
        const header={
            'X-Api-Key' : X_API_KEY,
            // 'User-Agent' : USER_AGENT
        }
        const body = {
            'userID' :isLogin.userID,
            'accessToken' : isLogin.mbr_token,
            'aplUse': APLUS,
            'MSISDN':nomor,
            'productCode':code
        }
        // console.log(body)
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
            });
    }
    handleChange(e){
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
    handleChangeNomor(e){
        this.setState({[e.target.name]:e.target.value})
    }
    handleLayanan(data){
        const etoll = this.state.product.filter(
            (p) => {
                return p.type.indexOf(data) !== -1;
            }
        )
        if(this.state.list !== data){
            this.setState({ list : data })
        }
        // console.log(etoll)
        this.setState({etoll:etoll})
        if(data === 'ETOOL BNI' ){
            this.setState({logo:bni})
            this.setState({title:'ETOLL BNI'})
        }else if(data === 'ETOOL BRI'){
            this.setState({logo:bri})
            this.setState({title:'ETOLL BRI'})
        }else{
            this.setState({logo:mandiri})
            this.setState({title:'ETOLL Mandiri'})
        }
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
            axios.post(API+ETOLL_PRODUCT, body, {headers:header} )
            .then(res => {
                const product = res.data.data;
                this.setState({ product });
                this.setState({loading:false})
                this.handleLayanan('ETOOL BNI')
                // console.log('product',product)
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
                <div className='border shadow p-3 mt-3 mb-3 new-radius'>
                    <div>
                        <div className="row ">
                            <div className='col-sm-12'>
                                <p style={{color:'#2E7D32',marginTop:'10px',marginBottom:'10px'}} >Pilih Jenis Layanan</p>
                            </div>
                            <div className='col-sm-12 detile-product'>
                                <div onClick={() => this.handleLayanan('ETOOL BNI')} align="center"
                                     className={this.state.list === 'ETOOL BNI' ? 'game-product ongame' : 'game-product'} >
                                    <div className="row h-100 w-100 m-0">
                                        <div className="col align-self-center">
                                            <img className="img-custom" src={bni} alt='logo' /><br/>
                                            <span className="desc-prod">E-Toll BNI</span>
                                        </div>
                                    </div>
                                </div>
                                <div onClick={() => this.handleLayanan('ETOOL BRI')}  align="center"
                                     className={this.state.list === 'ETOOL BRI' ? 'game-product ongame' : 'game-product'} >
                                    <div className="row h-100 w-100 m-0">
                                        <div className="col align-self-center">
                                            <img className="img-custom" src={bri} alt='logo' /><br/><span className="desc-prod">E-Toll BRI</span>
                                        </div>
                                    </div>
                                </div>
                                <div onClick={() => this.handleLayanan('ETOOL MANDIRI')}  align="center"
                                     className={this.state.list === 'ETOOL MANDIRI' ? 'game-product ongame' : 'game-product'} >
                                    <div className="row h-100 w-100 m-0">
                                        <div className="col align-self-center">
                                            <img className="img-custom" src={mandiri} alt='logo' /><br/><span className="desc-prod">E-Toll Mandiri</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Etoll */}
                            <div className="col-sm-12" id="ETollBNI">
                            <hr style={{border: '1px solid #707070'}}></hr>
                                <div className="row">
                                    <div className='col'>
                                        <h5 style={{color:'#2E7D32',marginTop:'10px',marginBottom:'10px'}} > {this.state.title} </h5>
                                    </div>
                                    <div className='mr-3'>
                                        {/* <img src={require('../../../images/EToll/E-Toll-BNI.svg')} width='100px' height='50px' alt='logo' /> */}
                                        <img src={this.state.logo} width='100px' height='50px' alt='logo' />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-sm-6 mt-2' >
                                        <GreenTextField label="Nomor Kartu" style={{width:'100%'}} 
                                            name="nomor" 
                                            value={this.state.nomor} 
                                            onChange={this.handleChangeNomor}
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
                                    </div>
                                    <div className='col-sm-6  mt-2' >
                                        <GreenFormControl style={{width:'100%'}}>
                                            <InputLabel htmlFor="nominal-native-simple">Nominal</InputLabel>
                                            <Select
                                                native
                                                value={this.state.nominal}
                                                onChange={this.handleChange}
                                                name="nominal"
                                            >
                                                <option value="" ></option>
                                                {this.state.etoll.map(product=>(
                                                    <option className='mt-2' value={product.code} key={product.code}>{product.name}</option>
                                                ))}
                                            </Select>
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
                                        {this.state.nomor === '' ? 
                                            <div className='bt-green-off' align="center" disabled>Beli</div>
                                        :
                                            <div align="center" data-toggle="modal" data-target="#etol" className='bt-green'> Beli</div>
                                        }
                                    </div>
                                </div>
                            </div>
                            {/* End Etoll */}
                            
                        </div>
                    </div>
                </div>

                            
                {/* <!-- Modal --> */}
                <div className="modal fade" id="etol" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="etolLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content border-0 bg-transparent">
                            <div className="custom-modal-header">
                                <h5 className="m-0 p-0">KONFIRMASI PEMBELIAN</h5>
                            </div>
                            <div className="custom-modal-body" style={{borderBottom:'5px solid #CDF0DC'}}>
                                <table className="w-100">
                                    <tbody>
                                        <tr>
                                            <td className="pt-4 pb-4 w-50"> <span style={{opacity:'60%'}}>E-Toll</span> <br/> {this.state.name}</td>
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
        )
    }
}

const mapDispatchToProps  = (dispatch) => ({
    changeReport : (data)=> dispatch({ type : 'REPORT_TRANSACTION', value : data  })
})

// export default Pulsa
export default connect(null, mapDispatchToProps)(Etoll)
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