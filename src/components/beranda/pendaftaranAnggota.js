import React, { Component } from 'react'
import {MenuItem ,Select,FormControl,withStyles,Checkbox,FormControlLabel } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import {API,X_API_KEY,APLUS,REGISTER_NEW_MEMBER} from '../../api/index'
import axios from 'axios'
import Swal from 'sweetalert2'
import LoadingPage from '../loadingPage'


class PendaftaranAnggota extends Component {
    constructor(){
        super()
        this.state ={
            showPassword:'no',
            showNewPasword:'no',
            showPin:'no',
            showNewPin:'no',
            password:'',
            userID : '',
            ulangiPassword:'',
            uplineID :'',
            nama :'',
            email : '',
            address : '',
            city :'',
            gender :'',
            pin :'',
            ulangiPin:'',
            checkedG:false,
            loading: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChecked = this.handleChecked.bind(this)
    }
    handleChecked(e){
        if(this.state.checkedG === false){
            this.setState({checkedG:true})
        }else{
            this.setState({checkedG:false})
        }
    }
    handleChange(e){
        this.setState({[e.target.name] : e.target.value})
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
                        'uplineID':this.state.uplineID,
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
                    'Input PIN tidak sama',
                    'error'
                )
            }
        }else{
            this.setState({loading: false})
            Swal.fire(
                'Data Salah',
                'Input Password tidak sama',
                'error'
            )
        }
    }
    componentDidMount(){
        const isLogin = JSON.parse(localStorage.getItem('isLogin')) 
        if (isLogin){
            this.setState({uplineID:isLogin.userID})
        }else{
            window.location = '/'
        }
    }
    render() {
        if(this.state.loading === true){
            return<LoadingPage/>
        }
        return (
            <div>
                <div className="row mt-3 new-radius mb-0 ml-0 mr-0" style={{background:'#F2F2F2',color:'#4CAF50',fontSize:'14pt' }}>
                    <div className="col-sm-6 p-0">
                        <p className="mb-0 pl-3 pt-3 pb-3">Formulir Pendaftaran</p>
                    </div>
                    <div className="col-sm-6 p-0">
                        <p className="mb-0 pl-3 pt-3 pb-3 hemm">EKL Upline<span className="ml-3 pt-1 pb-1 pl-3 pr-3" style={{color:'#FFFFFF',background:'#4FAE50',borderRadius:'10px'}}>{this.state.uplineID}</span></p>
                    </div>
                </div>
                <div className='row mt-3'> 
                    <div className='container'> 
                        <div className="row m-0">
                            <div className="col p-3 mb-3" style={{border:'3px solid #DFDFDF'}}>
                                <p align="center" style={{fontSize:'14pt', color:'#FFFFFF', backgroundColor:'#3A9460',margin:'-19px'}} className="p-3 pt-4 pb-4">
                                    <span style={{fontWeight:'600'}}>Info :</span> Isi formulir pendaftaran sesuai dengan data anggota
                                </p>
                                <div className="row m-0 pt-3">
                                    <div className="col-sm-6 sub-form">
                                        <label style={{color:'#388E3C'}}>Nama Lengkap</label>
                                        <input type="text" className="input-form" value={this.state.nama} name="nama" onChange={this.handleChange} />
                                    </div>
                                    <div className="col-sm-6 sub-form">
                                        <label style={{color:'#388E3C'}}>Jenis Kelamin</label>
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
                                        <label style={{color:'#388E3C'}}>Nomor Telepon</label>
                                        <input type="text" className="input-form" value={this.state.userID} name="userID" onChange={this.handleChange} />
                                    </div>
                                    <div className="col-sm-6 sub-form">
                                        <label style={{color:'#388E3C'}}>Email</label>
                                        <input type="email" className="input-form" value={this.state.email} name="email" onChange={this.handleChange} />
                                    </div>
                                    <div className="col-sm-12 sub-form">
                                        <label style={{color:'#388E3C'}}>Alamat Lengkap</label>
                                        <input type="text" className="input-form" value={this.state.address} name="address" onChange={this.handleChange} />
                                    </div>
                                    <div className="col-sm-12 sub-form">
                                        <div className="row m-0">
                                            <div className="col-sm-6 pl-0">
                                                <label style={{color:'#388E3C'}}>Kota</label>
                                                <input type="text" className="input-form" value={this.state.city} name="city" onChange={this.handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="notice">
                                        <p className="notice-p"><span className="notice-span">Peringatan:</span> Mengakses akun orang lain tanpa sepengetahuan dan seizin pihak bersangkutan adalah pelanggaran hukum</p>
                                    </div>
                                    <div className="col-sm-6 sub-form">
                                        <label style={{color:'#388E3C'}}>Password</label>
                                        <input type={this.state.showPassword === 'no' ? 'password' : 'text'} className="input-form" value={this.state.password} name="password" 
                                        onChange={this.handleChange} style={{marginRight:'-20px',width:'100%'}} />
                                        {this.state.showPassword === 'no' ?
                                        <img src={require('../../images/hide-pass.svg')} className="mt-1 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showPassword:'ok'})} width="20px" alt="eye" />
                                        :
                                        <img src={require('../../images/show-pass.svg')} className="mt-1 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showPassword:'no'})} width="20px" alt="eye" />
                                        }
                                    </div>
                                    <div className="col-sm-6 sub-form">
                                        <label style={{color:'#388E3C'}}>Ketuk Ulang Password</label>
                                        <input type={this.state.showNewPasword === 'no' ? 'password' : 'text'} className="input-form" value={this.state.ulangiPassword} name="ulangiPassword" 
                                        onChange={this.handleChange} style={{marginRight:'-20px',width:'100%'}} />
                                        {this.state.showNewPasword === 'no' ?
                                        <img src={require('../../images/hide-pass.svg')} className="mt-1 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showNewPasword:'ok'})} width="20px" alt="eye" />
                                        :
                                        <img src={require('../../images/show-pass.svg')} className="mt-1 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showNewPasword:'no'})} width="20px" alt="eye" />
                                        }
                                    </div>
                                    <div className="col-sm-6 sub-form">
                                        <label style={{color:'#388E3C'}}>PIN</label>
                                        <input type={this.state.showPin === 'no' ? 'password' : 'text'} className="input-form" value={this.state.pin} name="pin"  
                                        onChange={this.handleChange} style={{marginRight:'-20px',width:'100%'}} />
                                        {this.state.showPin === 'no' ?
                                        <img src={require('../../images/hide-pass.svg')} className="mt-1 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showPin:'ok'})} width="20px" alt="eye" />
                                        :
                                        <img src={require('../../images/show-pass.svg')} className="mt-1 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showPin:'no'})} width="20px" alt="eye" />
                                        }
                                    </div>
                                    <div className="col-sm-6 sub-form">
                                        <label style={{color:'#388E3C'}}>Ketuk Ulang PIN</label>
                                        <input type={this.state.showNewPin === 'no' ? 'password' : 'text'} className="input-form" value={this.state.ulangiPin} name="ulangiPin"  
                                        onChange={this.handleChange} style={{marginRight:'-20px',width:'100%'}} />
                                        {this.state.showNewPin === 'no' ?
                                        <img src={require('../../images/hide-pass.svg')} className="mt-1 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showNewPin:'ok'})} width="20px" alt="eye" />
                                        :
                                        <img src={require('../../images/show-pass.svg')} className="mt-1 position-absolute" style={{cursor:'pointer'}} onClick={()=>this.setState({showNewPin:'no'})} width="20px" alt="eye" />
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
                                        <span style={{color:'#388E3C'}}>Saya menyetujui <span style={{color:"#00994d",fontWeight:'600'}}>Syarat dan Ketentuan</span> yang berlaku</span>
                                    </div>
                                </div>
                                
                                <div className='row'>
                                    <div className='col-sm-12 m-2'>
                                        {this.state.checkedG === false ?
                                            <button  className='btn mt-4 pt-2 pb-2 pl-5 pr-5 rounded-pill' style={{backgroundColor:'#96D295', color:'#FFFFFF', fontSize:'10pt',cursor:'no-drop'}}>
                                                DAFTAR
                                            </button>
                                        :
                                            <button  className='btn mt-4 pt-2 pb-2 pl-5 pr-5 rounded-pill' onClick={()=>this.registerMember()} style={{backgroundColor:'#2E7D32', color:'#FFFFFF', fontSize:'10pt'}}>
                                                DAFTAR
                                            </button>
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

export default PendaftaranAnggota

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
