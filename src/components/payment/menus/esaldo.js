import React, { Component } from 'react'
import {convertCurrency} from '../commons/commonLib'
import '../../../assets/style.css'
import { esaldoImage } from '../../imageLoader/esaldo'
import {TextField,InputLabel,Select,FormControl,withStyles } from '@material-ui/core';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import {API,ESALDO_PRODUCT,APLUS,X_API_KEY,ORDER_PRODUCT} from '../../../api/index'
import Swal from "sweetalert2"
import LoadingPage from '../../loadingPage'
import { connect } from 'react-redux'

class Esaldo extends Component {
    constructor(){
        super()
        this.state={
            product:[],
            esaldo:[],
            nomor:'',
            nominal:'',
            // harga:'',
            ep : '',
            name:'',
            code :'',
            logo:'',
            title:'',
            loading:true,
            list: 'CINNEMA 21',
            redirect:'',
            tipeProduct:'E Saldo'
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
                // console.log(order)
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
        const esaldo = this.state.product.filter(
            (p) => {
                return p.provider.indexOf(data) !== -1;
            }
        )
        
        if(this.state.list !== data){
            this.setState({ list : data })
        }
        this.setState({esaldo:esaldo})
        this.setState({title:data})
        if(data === 'CINNEMA 21' ){
            this.setState({logo:esaldoImage.cinema})
        }else if(data === 'DANA'){
            this.setState({logo:esaldoImage.dana})
        }else if(data === 'GO-JEK'){
            this.setState({logo:esaldoImage.gopay})
        }else if(data === 'OVO CASH'){
            this.setState({logo:esaldoImage.ovo})
        }else if(data === 'TCASH'){
            this.setState({logo:esaldoImage.link})
        }else if(data === 'OWAI'){
            this.setState({logo:esaldoImage.owai})
        }else if(data === 'GRAB'){
            this.setState({logo:esaldoImage.grab})
        }else{
            this.setState({logo:esaldoImage.tix})
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
            axios.post(API+ESALDO_PRODUCT, body, {headers:header} )
            .then(res => {
                const product = res.data.data;
                this.setState({ product });
                this.setState({loading:false})
                this.handleLayanan('CINNEMA 21')
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
                                <div onClick={() => this.handleLayanan('CINNEMA 21')}  align="center"
                                     className={this.state.list === 'CINNEMA 21' ?  'game-product ongame' : 'game-product'} >
                                     <div className="row h-100 w-100 m-0">
                                        <div className="col align-self-center">
                                           <img className="img-custom" src={esaldoImage.cinema} alt='logo' /><br/><span className="desc-prod">Saldo Cinema 21</span>
                                        </div>
                                    </div>
                                </div>
                                <div onClick={() => this.handleLayanan('DANA')}  align="center"
                                    className={this.state.list === 'DANA' ?  'game-product ongame' : 'game-product'} >
                                    <div className="row h-100 w-100 m-0">
                                        <div className="col align-self-center">
                                           <img className="img-custom" src={esaldoImage.dana} alt='logo' /><br/><span className="desc-prod">Saldo Dana</span>
                                        </div>
                                    </div>
                                </div>
                                <div onClick={() => this.handleLayanan('GO-JEK')}  align="center"
                                    className={this.state.list === 'GO-JEK' ?  'game-product ongame' : 'game-product'} >
                                    <div className="row h-100 w-100 m-0">
                                        <div className="col align-self-center">
                                           <img className="img-custom" src={esaldoImage.gopay} alt='logo' /><br/><span className="desc-prod">Saldo Gopay</span>
                                        </div>
                                    </div>
                                </div>
                                <div onClick={() => this.handleLayanan('OVO CASH')} align="center" 
                                    className={this.state.list === 'OVO CASH' ?  'game-product ongame' : 'game-product'} >
                                    <div className="row h-100 w-100 m-0">
                                        <div className="col align-self-center">
                                           <img className="img-custom" src={esaldoImage.ovo} alt='logo' /><br/><span className="desc-prod">Saldo OVO</span>
                                        </div>
                                    </div>
                                </div>
                                <div onClick={() => this.handleLayanan('TCASH')}  align="center"
                                    className={this.state.list === 'TCASH' ?  'game-product ongame' : 'game-product'} >
                                    <div className="row h-100 w-100 m-0">
                                        <div className="col align-self-center">
                                           <img className="img-custom" src={esaldoImage.link} alt='logo' /><br/><span className="desc-prod">Saldo Link-Aja</span>
                                        </div>
                                    </div>
                                </div>
                                <div onClick={() => this.handleLayanan('TIX-ID MOVIE')}  align="center"
                                    className={this.state.list === 'TIX-ID MOVIE' ?  'game-product ongame' : 'game-product'} >
                                    <div className="row h-100 w-100 m-0">
                                        <div className="col align-self-center">
                                           <img className="img-custom" src={esaldoImage.tix} alt='logo' /><br/><span className="desc-prod">Saldo Tix-ID</span>
                                        </div>
                                    </div>
                                </div>
                                <div onClick={() => this.handleLayanan('OWAI')}  align="center"
                                    className={this.state.list === 'OWAI' ?  'game-product ongame' : 'game-product'} >
                                    <div className="row h-100 w-100 m-0">
                                        <div className="col align-self-center">
                                           <img className="img-custom" src={esaldoImage.owai} alt='logo' /><br/><span className="desc-prod">Owai Driver</span>
                                        </div>
                                    </div>
                                </div>
                                <div onClick={() => this.handleLayanan('GRAB')}  align="center"
                                    className={this.state.list === 'GRAB' ?  'game-product ongame' : 'game-product'} >
                                    <div className="row h-100 w-100 m-0">
                                        <div className="col align-self-center">
                                           <img className="img-custom" src={esaldoImage.grab} alt='logo' /><br/><span className="desc-prod">Saldo Grab</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Etoll */}
                            <div className="col-sm-12" id="Esaldo">
                            <hr style={{border: '1px solid #707070'}}></hr>
                                <div className="row">
                                    <div className='col'>
                                        <h5 style={{color:'#2E7D32',marginTop:'10px',marginBottom:'10px'}} > {this.state.title} </h5>
                                    </div>
                                    <div className='mr-3'>
                                        {/* <img src={require('../../../images/EToll/E-Toll-BNI.svg')} width='100px' height='50px' alt='logo' /> */}
                                        <img src={this.state.logo} width='130px' alt='logo' />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-sm-6 mt-2' >
                                        <GreenTextField label="Nomor Pelanggan" style={{width:'100%'}} 
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
                                    <div className='col-sm-6 mt-2' >
                                        <GreenFormControl style={{width:'100%'}}>
                                            <InputLabel htmlFor="nominal-native-simple">Nominal</InputLabel>
                                            <Select
                                                native
                                                value={this.state.nominal}
                                                onChange={this.handleChange}
                                                name="nominal"
                                            >
                                                <option value="" ></option>
                                                {this.state.esaldo.map(product=>(
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
                                            <div align="center" data-toggle="modal" data-target="#saldo" className='bt-green'> Beli</div>
                                        }
                                    </div>
                                </div>
                            </div>
                            {/* End esaldo */}
                       
                        </div>
                    </div>
                </div>
                
                {/* <!-- Modal --> */}
                <div className="modal fade" id="saldo" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="saldoLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content border-0 bg-transparent">
                            <div className="custom-modal-header">
                                <h5 className="m-0 p-0">KONFIRMASI PEMBELIAN</h5>
                            </div>
                            <div className="custom-modal-body" style={{borderBottom:'5px solid #CDF0DC'}}>
                                <table className="w-100">
                                    <tbody>
                                        <tr>
                                            <td className="pt-4 pb-4 w-50"> <span style={{opacity:'60%'}}>E-Saldo</span> <br/> {this.state.name}</td>
                                            <td className="pt-4 pb-4" align="right" colSpan="2"> 
                                                <img src={this.state.logo} alt={this.state.logo} width='130px' />
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
export default connect(null, mapDispatchToProps)(Esaldo)



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