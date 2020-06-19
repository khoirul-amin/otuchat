import React, { Component } from 'react'
import {TextField,withStyles } from '@material-ui/core';
import {API,X_API_KEY,APLUS,SET_SETTING_CHANGE_PASSWORD} from '../../../api/index'
import Swal from "sweetalert2"
import axios from 'axios'
import $ from 'jquery'

class PengaturanPassword extends Component {
    constructor(){
        super()
        this.state={
            showOldPasword:'no',
            showNewPasword:'no',
            showUlangiPasword:'no',
            showPin:'no',
            passwordLama:'',
            passwordBaru:'',
            ulangiPassword:'',
            PIN:'',
            isLogin:'',
            loading:false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        this.setState({[e.target.name] : e.target.value})
    }
    logout(){
        localStorage.removeItem('isLogin')
        window.location = '/'
    }
    handleSubmit(){
        this.setState({loading:true})
        const {isLogin} = this.state
        const header={
            'X-Api-Key' : X_API_KEY
        }
        if(this.state.passwordLama && this.state.passwordBaru){
            if(this.state.passwordBaru === this.state.ulangiPassword){
                if(this.state.PIN){
                    const body ={
                        'userID' : isLogin.userID,
                        'aplUse':APLUS,
                        'accessToken' : isLogin.mbr_token,
                        'newpass' : this.state.passwordBaru,
                        'pin' : this.state.PIN
                    }
                    axios.post(API+SET_SETTING_CHANGE_PASSWORD, body, {headers:header} )
                        .then(res => {
                            const data = res.data;
                            if(data.errNumber !== "0"){
                                Swal.fire(
                                    data.status,
                                    data.respMessage,
                                    'error'
                                )
                                this.setState({loading:false})
                            }else{
                                Swal.fire(
                                    data.status,
                                    data.respMessage,
                                    'success'
                                )
                                $('#ubahPin').modal('hide')
                                this.setState({loading:false})
                                this.logout()
                            }
                        })
                        .catch(error => {
                            console.log(error.response)
                            this.setState({loading:false})
                        });
                }else{
                    Swal.fire(
                        'Lengkapi Data',
                        'Pastikan semua data sudah terisi',
                        'error'
                    )
                    this.setState({loading:false})
                }
            }else{
                Swal.fire(
                    'Data Salah',
                    'Input password baru tidak sama',
                    'error'
                )
                this.setState({loading:false})
            }
        }else{
            Swal.fire(
                'Lengkapi Data',
                'Pastikan semua data sudah terisi',
                'error'
            )
            this.setState({loading:false})
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
                <div className="modal fade" id="ubahPassword" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="ubahPasswordLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content border-0 bg-transparent">
                            <div className="custom-modal-header">
                                <h5 className="m-0 p-0">Ubah Password</h5>
                            </div>
                            <div className="custom-modal-body">
                                <div className='mt-3'>
                                    <GreenTextField label="Password Lama" style={{marginRight:'-20px',width:'100%'}} 
                                        name="passwordLama" 
                                        type={this.state.showOldPasword === 'no' ? 'password' : 'text'}
                                        value={this.state.passwordLama} 
                                        onChange={this.handleChange}
                                        autoComplete='off' 
                                    />
                                    {this.state.showOldPasword === 'no' ?
                                        <img src={require('../../../images/hide-pass.svg')} className="mt-4 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showOldPasword:'ok'})} width="20px" alt="eye" />
                                    :
                                        <img src={require('../../../images/show-pass.svg')} className="mt-4 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showOldPasword:'no'})} width="20px" alt="eye" />
                                    }
                                </div>
                                <div className='mt-3'>
                                    <GreenTextField label="Password Baru" style={{marginRight:'-20px',width:'100%'}} 
                                        name="passwordBaru" 
                                        type={this.state.showPin === 'no' ? 'password' : 'text'}
                                        value={this.state.passwordBaru} 
                                        onChange={this.handleChange}
                                        autoComplete='off' 
                                    />
                                    {this.state.showPin === 'no' ?
                                    <img src={require('../../../images/hide-pass.svg')} className="mt-4 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showPin:'ok'})} width="20px" alt="eye" />
                                    :
                                    <img src={require('../../../images/show-pass.svg')} className="mt-4 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showPin:'no'})} width="20px" alt="eye" />
                                    }
                                </div>
                                <div className='mt-3'>
                                    <GreenTextField label="Ulangi Password" style={{marginRight:'-20px',width:'100%'}} 
                                        name="ulangiPassword" 
                                        type={this.state.showNewPasword === 'no' ? 'password' : 'text'}
                                        value={this.state.ulangiPassword} 
                                        onChange={this.handleChange}
                                        autoComplete='off' 
                                    />
                                    {this.state.showNewPasword === 'no' ?
                                        <img src={require('../../../images/hide-pass.svg')} className="mt-4 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showNewPasword:'ok'})} width="20px" alt="eye" />
                                    :
                                        <img src={require('../../../images/show-pass.svg')} className="mt-4 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showNewPasword:'no'})} width="20px" alt="eye" />
                                    }
                                </div>
                                <div className='mt-3'>
                                    <GreenTextField label="PIN" style={{marginRight:'-20px',width:'100%'}} 
                                        name="PIN" 
                                        type={this.state.showUlangiPasword === 'no' ? 'password' : 'text'}
                                        value={this.state.PIN} 
                                        onChange={this.handleChange}
                                        autoComplete='off' 
                                    />
                                    {this.state.showUlangiPasword === 'no' ?
                                        <img src={require('../../../images/hide-pass.svg')} className="mt-4 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showUlangiPasword:'ok'})} width="20px" alt="eye" />
                                    :
                                        <img src={require('../../../images/show-pass.svg')} className="mt-4 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showUlangiPasword:'no'})} width="20px" alt="eye" />
                                    }
                                </div>
                            
                            </div>
                            <div className="custom-modal-footer">
                                <div className="row m-0">
                                    <div className="col-sm-6 p-0">
                                        <div className="custom-btn-white" data-dismiss="modal" onClick={()=>this.setState({passwordLama:'',passwordBaru:'',ulangiPassword:'',PIN:''})} align="center">BATALKAN</div>
                                    </div>
                                    <div className="col-sm-6 p-0" align="center">
                                        {this.state.loading ?
                                        <div className='custom-btn-green'>Loading</div>
                                        :
                                        <div onClick={()=>this.handleSubmit()} className='custom-btn-green'>UBAH PASSWORD</div>
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


export default PengaturanPassword

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