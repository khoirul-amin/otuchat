import React, { Component } from 'react'
import './assets/cssLogin.css'
// import { Link } from 'react-router-dom'
import {API,LOGIN,CODE,APLUS,X_API_KEY,VERIFY_MOBILE_ID,VERSION} from './api/index'
import Swal from "sweetalert2"
import md5 from 'md5'
import axios from 'axios'
import {TextField,withStyles } from '@material-ui/core';
import LoadingPage from './components/loadingPage'
import uuid from 'uuid'
import ReCAPTCHA from 'react-google-recaptcha'
require('typeface-poppins');

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword:'no',
            erorUser:'',
            errorPassword:'',
            userID:'',
            passwd:'',
            securityCode:'',
            mobile_id:'',
            aplUse:APLUS,
            CODE:CODE,
            ip:'',
            isLogin:[],
            loading : true,
            recaptchaResponse:'',
            rechapchaValidate:''
        };
    
        this.handleCaptchaResponseChange = this.handleCaptchaResponseChange.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    handleCaptchaResponseChange(response){
      this.setState({
        recaptchaResponse: response,
        rechapchaValidate:'done'
      });
    }
    handleChange(e) {
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({loading:true})
        const { userID, passwd,KODE,aplUse } = this.state
        const token = `${new Date().getFullYear()}-${
        new Date().getMonth()}-${
        new Date().getDate()}T${
        new Date().getHours()}:${
        new Date().getMinutes()}:${
        new Date().getSeconds()}`
        const password = md5(passwd + KODE)
        const securityCode = md5(token + md5(password))
        const mobileId = md5(userID + JSON.parse(localStorage.getItem('uniqueID'))) 
        // console.log(mobileId)
        this.setState({mobile_id:mobileId})
        const header={
            'x-api-key' : X_API_KEY
        }
        const body ={
            userID: userID,
            token,
            passwd: passwd,
            securityCode,
            aplUse:aplUse,
            mobile_id :mobileId
        }

        axios.post(API+LOGIN, body, {headers:header} )
        .then(res => {
            const isLogin = res.data;
            this.setState({ isLogin });
            this.loginValidate();
            this.setState({recaptchaResponse:'',loading:false})
            // console.log(isLogin)
            })
        .catch(error => {
            console.log(error.response)
        });

      }
    loginValidate(){
        this.setState({loading:true})
        const {isLogin} = this.state
        if(isLogin.errNumber === "9" || isLogin.errNumber === "1" ){
            Swal.fire({
                title: isLogin.status,
                icon : 'error',
                text : isLogin.respMessage,
                allowOutsideClick:false
            })
            this.setState({loading:false})
        }else if(isLogin.errNumber === "141"){
            this.otpValidate()
        }else if (isLogin.errNumber === "0"){
            this.setState({loading:false})
            localStorage.setItem('isLogin', JSON.stringify(isLogin))
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
              icon: 'success',
              title: 'Signed in successfully'
            })
            window.location = '/home'
        }
    }
    componentDidMount(){
        this.setState({loading:false})
        const uniqueID = uuid.v4(require('uuid/v3')) ;
        if(!localStorage.getItem('uniqueID')){
          localStorage.setItem('uniqueID',JSON.stringify(uniqueID))
        }
        axios.get('https://api.ipify.org?format=json')
        .then(res =>{
            const ip = res.data.ip
            this.setState({ip:ip})
            // console.log(ip)
        }).catch(error => {
            console.log(error.response)
        });
        const isLogin = JSON.parse(localStorage.getItem('isLogin')) 
        if(isLogin){
            window.location = '/home'
        }
    }
    otpValidate(){
        Swal.fire({
            title: 'Masukkan OTP',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Masuk',
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
            preConfirm: (otp) => {
                this.setState({loading:true})
                this.cekOtp(otp)
              },
          }).then((result) => {
            if (result.value) {
                
            }
          })
    }
    cekOtp(otp){
        const {userID,mobile_id,ip,passwd} = this.state
        const header={
            'x-api-key' : X_API_KEY
        }
        const body={
            aplUse: APLUS,
            mobile_phone : userID,
            mobile_id:mobile_id,
            otp:otp,
            device : navigator.appCodeName,
            // device : '0',
            longtitude: '0',
            latitude : '0',
            os : navigator.appVersion.substring(4, 30),
            vapp : VERSION,
            ip : ip,
            password:passwd
        }
        axios.post(API+VERIFY_MOBILE_ID, body, {headers:header})
          .then(response => {
            const res = response.data
            console.log(res)
            if (res.errNumber === '41'){
                this.setState({loading:false})
                this.otpValidate()
                Swal.fire({
                    title: 'OTP Salah',
                    text: "Silahkan Masukkan Ulang",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#005005',
                    confirmButtonText: 'Ya',
                    allowOutsideClick: false,
                  }).then((result) => {
                    if (result.value) {
                        this.otpValidate()
                    }
                  })
            }else{
                this.setState({loading:false})
                localStorage.setItem('isLogin', JSON.stringify(res))
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    onOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                  icon: 'success',
                  title: 'Signed in successfully'
                })
                window.location = '/home'
            }
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
    }
    rechapchaValidate(data){
      this.setState({rechapchaValidate:data})
    }
    render() {
        if (this.state.loading === true){
            return (
                <LoadingPage/>
            )
        }
        return (
                <div className='bg-login'>
                    <div className='container'>
                        <div className="row margin-top-login">
                          <div className="col-sm-6">
                            <div className="box-form" align="center">
                              <img src={require("./images/ic-home-green.png")} width="150px" alt="logo-login" />
                                <GreenTextField label="Phone Number" color='secondary' style={{width:'100%', marginTop:'30px'}}
                                    autoComplete="off"
                                    name="userID" 
                                    value={this.state.userID} 
                                    onChange={this.handleChange}
                                />
                                <div className='mt-4'>
                                  <GreenTextField label="Password" style={{width:'100%'}} 
                                      name="passwd" 
                                      type={this.state.showPassword === 'no' ? 'password' : 'text'}
                                      value={this.state.passwd} 
                                      onChange={this.handleChange}
                                      autoComplete='off' 
                                  />
                                  {this.state.showPassword === 'no' ?
                                  <img src={require('./images/hide-pass.svg')} className="mt-4 position-absolute" style={{cursor:'pointer',marginLeft:'-20px'}} onClick={()=>this.setState({showPassword:'ok'})} width="20px" alt="eye" />
                                  :
                                  <img src={require('./images/show-pass.svg')} className="mt-4 position-absolute" style={{cursor:'pointer',marginLeft:'-20px'}} onClick={()=>this.setState({showPassword:'no'})} width="20px" alt="eye" />
                                  }
                                </div>
                                <div className='mt-4'>
                                    <ReCAPTCHA
                                      className="recaptcha"
                                      ref={(el) => { this.recaptcha = el; }}
                                      sitekey="6Leh38cUAAAAAEEo5rVihsfsLpXmWpxLGzN5bApE"
                                      onChange={this.handleCaptchaResponseChange}
                                    />
                                </div>
                                  {this.state.rechapchaValidate === 'kosong' ? 
                                    <span style={{fontSize:'8pt',color:'red'}}>Lengkapi recaptcha terlebih dahulu !</span>
                                  :
                                    <span style={{fontSize:'8pt',color:'white'}}>!</span>
                                  }

                                  <p align='center' className='mt-2'>
                                    { this.state.recaptchaResponse === '' ? 
                                      <button onClick={()=>this.rechapchaValidate('kosong')} className='button-login mt-1' align='center'>Login</button>
                                    :
                                      <button onClick={this.handleSubmit} className='button-login mt-1' align='center'>Login</button>
                                    }
                                  </p>
                            </div>
                          </div>
                          <div className="col-sm-6  align-self-center">
                            <p className="title-login"><b>Belum Punya OTUChat?</b></p>
                            <p style={{color:'#ffffff'}}>Install dan daftar sekarang, <b>GRATIS!</b></p>
                            <a href="https://play.google.com/store/apps/details?id=com.eklanku.otuChat&hl=in" target="new" >
                              <img src={require("./images/footer/googlePlay.svg")} alt="logoAppStore"/>
                            </a>
                            <a href="https://apps.apple.com/id/app/otu-chat/id1404186449" target="new" >
                              <img src={require("./images/footer/appStore.svg")} alt="logoAppStore"/>
                            </a>
                          </div>
                        </div>
                    </div>
                </div>
        )
    }
}
export default Home


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
