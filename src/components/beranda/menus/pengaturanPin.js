import React, { Component } from 'react'
import {TextField,withStyles } from '@material-ui/core';
import {API,X_API_KEY,APLUS,GET_OTP,SET_SETTING_CHANGE_PIN} from '../../../api/index'
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import axios from 'axios'
import $ from 'jquery'

class PengaturanPin extends Component {
    constructor(){
        super()
        this.state={
            pinBaru:'',
            pinLama:'',
            ulangiPin:'',
            showOldPIN:'no',
            showNewPIN:'no',
            showUlangiPIN:'no',
            OTP:'',
            isLogin:'',
            loading:false,
            loadingOtp:false
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        this.setState({[e.target.name] : e.target.value})
    }
    requestOTP(){
        this.setState({loadingOtp:true})
        const header={
            'X-Api-Key' : X_API_KEY
        }
        const body ={
            'mobilePhone' : this.props.data.data[0].o_hp,
            'aplUse':APLUS,
            'type_otp' : 'GANTI PIN'
        }
        axios.post(API+GET_OTP, body, {headers:header} )
        .then(res => {
            const data = res.data;
            // console.log(data)
            if(data.errNumber !== "0"){
                Swal.fire(
                    data.status,
                    data.respMessage,
                    'error'
                )
                this.setState({loadingOtp:false})
            }else{
                this.setState({loadingOtp:false})
                Swal.fire(
                    data.status,
                    data.respMessage,
                    'success'
                )
                $('#ubahPin').modal('hide')
            }
        })
        .catch(error => {
            this.setState({loadingOtp:false})
            console.log(error.response)
        });
    }
    handleSubmit(){
        this.setState({loading:true})
        if(this.state.pinLama && this.state.pinBaru){
            if(this.state.pinBaru === this.state.ulangiPin){
                if(this.state.OTP){
                    const header={
                        'X-Api-Key' : X_API_KEY
                    }
                    const body ={
                        'userID' : this.state.isLogin.userID,
                        'aplUse':APLUS,
                        'newpin':this.state.OTP
                    }
                    axios.post(API+SET_SETTING_CHANGE_PIN, body, {headers:header} )
                    .then(res => {
                        const data = res.data;
                        // console.log(data)
                        if(data.errNumber !== "0"){
                            this.setState({loading:false})
                            Swal.fire(
                                data.status,
                                data.respMessage,
                                'error'
                            )
                        }else{
                            this.setState({loading:false})
                            Swal.fire(
                                data.status,
                                data.respMessage,
                                'success'
                            )
                            this.setState({pinLama:'',pinBaru:'',ulangiPin:'',OTP:''})
                        }
                    })
                    .catch(error => {
                        this.setState({loading:false})
                        console.log(error.response)
                        
                    });
                }else{
                    this.setState({loading:false})
                    Swal.fire(
                        'Lengkapi Data',
                        'Pastikan semua data sudah terisi',
                        'error'
                    )
                }
            }else{
                this.setState({loading:false})
                Swal.fire(
                    'Data Salah',
                    'Input PIN tidak sama',
                    'error'
                )
            }
        }else{
            this.setState({loading:false})
            Swal.fire(
                'Lengkapi Data',
                'Pastikan semua data sudah terisi',
                'error'
            )
        }
    }
    componentDidMount(){
        const isLogin = JSON.parse(localStorage.getItem('isLogin'))
        this.setState({isLogin:isLogin})
        if (!isLogin){
            window.location = '/'
        }
    }
    render() {
        return (
            <div>
                <div className="modal fade" id="ubahPin" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="ubahPinLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content border-0 bg-transparent">
                            <div className="custom-modal-header">
                                <h5 className="m-0 p-0">Ubah Pin</h5>
                            </div>
                            <div className="custom-modal-body">
                                <div className='mt-3'>
                                    <GreenTextField label="PIN Lama" style={{marginRight:'-20px',width:'100%'}} 
                                        name="pinLama" 
                                        type={this.state.showOldPIN === 'no' ? 'password' : 'text'}
                                        value={this.state.pinLama} 
                                        onChange={this.handleChange}
                                        autoComplete='off' 
                                    />
                                    {this.state.showOldPIN === 'no' ?
                                        <img src={require('../../../images/hide-pass.svg')} className="mt-4 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showOldPIN:'ok'})} width="20px" alt="eye" />
                                    :
                                        <img src={require('../../../images/show-pass.svg')} className="mt-4 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showOldPIN:'no'})} width="20px" alt="eye" />
                                    }
                                </div>
                                <div className='mt-3'>
                                    <GreenTextField label="PIN Baru" style={{marginRight:'-20px',width:'100%'}} 
                                        name="pinBaru" 
                                        type={this.state.showNewPIN === 'no' ? 'password' : 'text'}
                                        value={this.state.pinBaru} 
                                        onChange={this.handleChange}
                                        autoComplete='off' 
                                    />
                                    {this.state.showNewPIN === 'no' ?
                                        <img src={require('../../../images/hide-pass.svg')} className="mt-4 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showNewPIN:'ok'})} width="20px" alt="eye" />
                                    :
                                        <img src={require('../../../images/show-pass.svg')} className="mt-4 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showNewPIN:'no'})} width="20px" alt="eye" />
                                    }
                                </div>
                                <div className='mt-3'>
                                    <GreenTextField label="Ulangi PIN Baru" style={{marginRight:'-20px',width:'100%'}} 
                                        name="ulangiPin" 
                                        type={this.state.showUlangiPIN === 'no' ? 'password' : 'text'}
                                        value={this.state.ulangiPin} 
                                        onChange={this.handleChange}
                                        autoComplete='off' 
                                    />
                                    {this.state.showUlangiPIN === 'no' ?
                                        <img src={require('../../../images/hide-pass.svg')} className="mt-4 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showUlangiPIN:'ok'})} width="20px" alt="eye" />
                                    :
                                        <img src={require('../../../images/show-pass.svg')} className="mt-4 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showUlangiPIN:'no'})} width="20px" alt="eye" />
                                    }
                                </div>
                                <div className='mt-2'>
                                    <GreenTextField label="OTP" style={{marginRight:'-125px',width:'100%'}} 
                                        name="OTP" 
                                        type='text'
                                        value={this.state.OTP} 
                                        onChange={this.handleChange}
                                        autoComplete='off' 
                                    />
                                    {this.state.loadingOtp ? 
                                    <span className="btn-new-otp position-absolute">loading</span>
                                    :
                                    <span className="btn-new-otp position-absolute" onClick={() => this.requestOTP()}>Request OTP</span>
                                    }
                                </div>
                            </div>
                            <div className="custom-modal-footer">
                                <div className="row m-0">
                                    <div className="col-sm-6 p-0">
                                        <div className="custom-btn-white" onClick={()=>this.setState({pinLama:'',pinBaru:'',ulangiPin:'',OTP:''})} data-dismiss="modal" align="center">BATALKAN</div>
                                    </div>
                                    <div className="col-sm-6 p-0" align="center">
                                        {this.state.loading ?
                                        <div className='custom-btn-green'>Loading</div>
                                        :
                                        <div onClick={()=>this.handleSubmit()} className='custom-btn-green'>UBAH PIN</div>
                                        }
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
const mapStateToProps = (state) => ({
    data:state.riwayatTransaksi.profile
})
export default connect(mapStateToProps,null)(PengaturanPin)

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