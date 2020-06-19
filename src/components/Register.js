import React, { Component } from 'react'
import '../assets/cssLogin.css'
import {Redirect} from 'react-router-dom'
import {MenuItem ,Select,FormControl,withStyles,Checkbox,FormControlLabel } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import {API,X_API_KEY,APLUS,REGISTER_NEW_MEMBER} from '../api/index'
import axios from 'axios'
import Swal from 'sweetalert2'
import LoadingPage from './loadingPage'

class Register extends Component {
    constructor(){
        super()
        this.state={
            eklID:'',
            redirect:false,
            redirectToHome:false,
            gender:'L',
            checkedG:false,
            loading: false,
            showPassword:'no',
            showNewPasword:'no',
            showPin:'no',
            showNewPin:'no',
            password:'',
            userID : '',
            ulangiPassword:'',
            nama :'',
            email : '',
            address : '',
            city :'',
            pin :'',
            ulangiPin:'',
        }
        this.handleChange= this.handleChange.bind(this);
        this.handleChecked = this.handleChecked.bind(this)
    }
    handleChecked(e){
        if(this.state.checkedG === false){
            this.setState({checkedG:true})
        }else{
            this.setState({checkedG:false})
        }
    }
    registerMember(){
        this.setState({loading: true})
        const header={
            'X-Api-Key' : X_API_KEY
        }
        if(this.state.password === this.state.ulangiPassword){
            if(this.state.pin === this.state.ulangiPin){
                if(this.state.email === ''){
                    this.setState({loading: false})
                    Swal.fire(
                        'Data tidak lengkap',
                        'Mohon Lengkapi data sebelum mengajukan pendaftaran',
                        'error'
                    )
                }else{
                    const body ={
                        'userID' : this.state.userID,
                        'aplUse':APLUS,
                        'uplineID':this.state.eklID,
                        'nama' : this.state.nama,
                        'email' : this.state.email,
                        'address' : this.state.address,
                        'city' : this.state.city,
                        'gender' : this.state.gender,
                        'password': this.state.password,
                        'pin' : this.state.pin
                    }
                    axios.post(API+REGISTER_NEW_MEMBER, body, {headers:header} )
                    .then(res => {
                        const data = res.data;
                        if(data.errNumber !== '0'){
                            this.setState({loading: false})
                            Swal.fire(
                                data.status,
                                data.respMessage,
                                'error'
                            )
                        }else{
                            this.setState({loading: false, userID:'',nama:'',email:'',address:'', password:'',ulangiPassword:'',ulangiPin:'',city:'',pin:'',gender:''})
                            Swal.fire(
                                data.status,
                                data.respMessage,
                                'success'
                            )
                            this.setState({redirect:true})
                        }
                    })
                    .catch(error => {
                        this.setState({loading: false})
                        Swal.fire(
                            'ERROR',
                            'Mohon maaf, terjadi kesalah pada aplikasi',
                            'error'
                        )
                    });
                }
            }else{
                this.setState({loading: false})
                Swal.fire(
                    'Data Salah',
                    'Input Pin tidak sama',
                    'error'
                )
            }
        }else{
            this.setState({loading: false})
            Swal.fire(
                'Data Salah',
                'Input password tidak sama',
                'error'
            )
        }
    }
    componentDidMount(){
        if(this.props.match.params.id !== "new_member"){
            this.setState({eklID : this.props.match.params.id})
        }else{
            this.setState({eklID : 'EKL0000000'})
        }
        const isLogin = JSON.parse(localStorage.getItem('isLogin'))
        if (isLogin){
            this.setState({redirectToHome:true})
        }
        this.setState({loading:false})
    }
    handleChange (e) {
        this.setState({[e.target.name]:e.target.value})
    };
    render() {
        if(this.state.loading === true){
            return<LoadingPage/>
        }
        if(this.state.redirect){
            return <Redirect to="/"/>
        }
        if(this.state.redirectToHome){
            return <Redirect to="/home"/>
        }
        return (
            <div className='bg-register'>
                <div className="custom-container">
                    <div className="row m-0 align-items-center auto-height">
                        <div className="title-register">
                            <img src={require('../images/ic-home.png')} width="200px" alt="logo-login" />
                            <p className="title-login"><b>Sudah Punya Akun?</b></p>
                            <button style={{width:'150px'}} onClick={()=>this.setState({redirect:true})} className='button-login mt-1' align='center'>Login</button>
                        </div>
                        <div className="right-reg">
                            <div className="row m-0 align-items-center">
                                <div className="col-sm p-0">
                                    <h2 className="text-light">Formulir Pendaftaran</h2>
                                </div>
                                {this.state.eklID === "EKL0000000" ? '' :
                                    <div className="m-0 pt-2 pb-2 pr-0 pl-2">
                                        <span className="text-light">ID Sponsor</span>
                                        <input type="text" value={this.state.eklID} readOnly className="pl-2 input-sponsor" />
                                    </div>
                                }
                            </div>
                            <div className="row m-0 form-reg">
                                <div className="col-sm-6 sub-form">
                                    <label>Nama Lengkap</label>
                                    <input type="text" className="input-form" value={this.state.nama} name="nama" onChange={this.handleChange} />
                                </div>
                                <div className="col-sm-6 sub-form">
                                    <label>Jenis Kelamin</label>
                                    {/* <input type="text" className="input-form" value="etw" readOnly /> */}
                                    <GreenFormControl
                                        style={{width:'100%'}}>
                                        <Select
                                        value={this.state.gender}
                                        onChange={this.handleChange}
                                        name="gender"
                                        >
                                        <MenuItem value="L">Laki-laki</MenuItem>
                                        <MenuItem value="P">Perempuan</MenuItem>
                                        </Select>
                                    </GreenFormControl>
                                </div>
                                <div className="col-sm-6 sub-form">
                                    <label>Nomor Telepon</label>
                                    <input type="text" className="input-form" value={this.state.userID} name="userID" onChange={this.handleChange} />
                                </div>
                                <div className="col-sm-6 sub-form">
                                    <label>Email</label>
                                    <input type="email" className="input-form" value={this.state.email} name="email" onChange={this.handleChange} />
                                </div>
                                <div className="col-sm-12 sub-form">
                                    <label>Alamat Lengkap</label>
                                    <input type="text" className="input-form" value={this.state.address} name="address" onChange={this.handleChange} />
                                </div>
                                <div className="col-sm-12 sub-form">
                                    <div className="row m-0">
                                        <div className="col-sm-6  pl-0">
                                            <label>Kota</label>
                                            <input type="text" className="input-form" value={this.state.city} name="city" onChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 sub-form">
                                    <label>Password</label>
                                    <input type={this.state.showPassword === 'no' ? 'password' : 'text'} className="input-form" value={this.state.password} name="password" 
                                    onChange={this.handleChange} style={{marginRight:'-20px',width:'100%'}} />
                                    {this.state.showPassword === 'no' ?
                                    <img src={require('../images/hide-pass.svg')} className="mt-1 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showPassword:'ok'})} width="20px" alt="eye" />
                                    :
                                    <img src={require('../images/show-pass.svg')} className="mt-1 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showPassword:'no'})} width="20px" alt="eye" />
                                    }
                                </div>
                                <div className="col-sm-6 sub-form">
                                    <label>Ketuk Ulang Password</label>
                                    <input type={this.state.showNewPasword === 'no' ? 'password' : 'text'} className="input-form" value={this.state.ulangiPassword} name="ulangiPassword" 
                                    onChange={this.handleChange} style={{marginRight:'-20px',width:'100%'}} />
                                    {this.state.showNewPasword === 'no' ?
                                    <img src={require('../images/hide-pass.svg')} className="mt-1 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showNewPasword:'ok'})} width="20px" alt="eye" />
                                    :
                                    <img src={require('../images/show-pass.svg')} className="mt-1 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showNewPasword:'no'})} width="20px" alt="eye" />
                                    }
                                </div>
                                <div className="col-sm-6 sub-form">
                                    <label>PIN</label>
                                    <input type={this.state.showPin === 'no' ? 'password' : 'text'} className="input-form" value={this.state.pin} name="pin"  
                                    onChange={this.handleChange} style={{marginRight:'-20px',width:'100%'}} />
                                    {this.state.showPin === 'no' ?
                                    <img src={require('../images/hide-pass.svg')} className="mt-1 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showPin:'ok'})} width="20px" alt="eye" />
                                    :
                                    <img src={require('../images/show-pass.svg')} className="mt-1 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showPin:'no'})} width="20px" alt="eye" />
                                    }
                                </div>
                                <div className="col-sm-6 sub-form">
                                    <label>Ketuk Ulang PIN</label>
                                    <input type={this.state.showNewPin === 'no' ? 'password' : 'text'} className="input-form" value={this.state.ulangiPin} name="ulangiPin"  
                                    onChange={this.handleChange} style={{marginRight:'-20px',width:'100%'}} />
                                    {this.state.showNewPin === 'no' ?
                                    <img src={require('../images/hide-pass.svg')} className="mt-1 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showNewPin:'ok'})} width="20px" alt="eye" />
                                    :
                                    <img src={require('../images/show-pass.svg')} className="mt-1 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showNewPin:'no'})} width="20px" alt="eye" />
                                    }
                                </div>
                                <div className="col-sm-12 sub-form">
                                    <FormControlLabel className='mr-0 pr-0 mt-1'
                                        control={
                                            <GreenCheckbox
                                                checked={this.state.checkedG}
                                                onChange={this.handleChecked}
                                                value="checkedG"
                                            />
                                        }
                                        />
                                    <span>Saya menyetujui <span style={{color:"#00994d"}}><b>Syarat dan Ketentuan</b></span> yang berlaku</span>
                                </div>
                                <div className="col-sm-12 sub-form mb-2">
                                        {this.state.checkedG === false ?
                                            <button style={{width:'150px',cursor:'no-drop'}} className='button-login mt-1' align='center'>DAFTAR</button>
                                        :
                                            <button style={{width:'150px'}} onClick={()=>this.registerMember()} className='button-login mt-1' align='center'>DAFTAR</button>
                                        }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register

const GreenFormControl = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#bfbfbf',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#bfbfbf',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'red',
        },
        '&:hover fieldset': {
          borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#bfbfbf',
        },
      },
    },
  })(FormControl);
const GreenCheckbox = withStyles({
root: {
    color: green[400],
    '&$checked': {
    color: green[600],
    }
},
checked: {},
})(props => <Checkbox color="default" {...props} />);