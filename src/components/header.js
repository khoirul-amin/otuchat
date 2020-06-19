import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {convertCurrency} from './payment/commons/commonLib'
import LoadingPage from './loadingPage'
import '../assets/style.css'
import Swal from 'sweetalert2'

class Header extends Component {   
    constructor(){
        super()
        this.state={
            isLogin:'',
            saldo:'',
            colorActive:'payment',
            btnDrop:'close'
        }
    }
    logout(){
        Swal.fire({
            title: 'Keluar Aplikasi',
            text: "Apakah anda yakin mau keluar dari aplikasi ?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Keluar',
            cancelButtonText:'Batal',
            allowOutsideClick: false,
        }).then((result) => {
            if(result.value){
                localStorage.removeItem('isLogin')
                window.location = '/'
            }
        })
    }
    componentDidMount() {
        const isLogin = JSON.parse(localStorage.getItem('isLogin'))
        this.setState({isLogin:isLogin})
    }
    directProfil(data){
        if(data === "profil"){
            this.setState({colorActive:'dashboard'})
        }else{
            this.setState({colorActive:data})
        }
            this.props.directToProfil(data)
    }

    render() {
        if(!this.props.data.profile.data){
            return <LoadingPage/>
        }
        const profile = this.props.data.profile.data[0]
        const getaSaldo = this.props.data.saldo 
        // console.log(getaSaldo)
        return (
            <div>
                <div className='fixed-top' style={{background: '#FFFFFF',boxShadow: '0px 3px 10px #00000029' }}>
                    <div className='container'>
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <Link onClick={()=>this.directProfil('payment')} to='/home' className="pt-3 pb-3"><img src={require('../images/ic-home-green.png')} width='120px'  alt="head" /></Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse align-self-center" id="navbarSupportedContent">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item mr-5 mt-3 mb-3">
                                        {this.state.colorActive === 'dashboard' ?
                                            <Link className="nav-link p-0"  style={{fontSize:'11pt', color:'#399244'}} to="/home/profil">
                                                <img src={require('../images/icon/dashboard-green.svg')} alt='icon' style={{width:'18px',marginRight:'3px'}} />Dashboard
                                            </Link>
                                        :
                                            <Link onClick={()=>this.directProfil('dashboard')} className="nav-link p-0"  style={{fontSize:'11pt', color:'#888888'}} to="/home/profil">
                                                <img src={require('../images/icon/dashboard.svg')} alt='icon' style={{width:'18px',marginRight:'3px'}} />Dashboard
                                            </Link>
                                        }
                                    </li>
                                    <li className="nav-item mr-5 mt-3 mb-3">
                                        {this.state.colorActive === 'payment' ?
                                            <Link className="nav-link p-0"  style={{fontSize:'11pt', color:'#399244'}} to="/home">
                                                <img src={require('../images/icon/shopping_cart-24px-green.svg')} alt='icon' style={{width:'25px'}} />Payment
                                            </Link>
                                        :
                                            <Link onClick={()=>this.directProfil('payment')} className="nav-link p-0"  style={{fontSize:'11pt', color:'#888888'}} to="/home">
                                                <img src={require('../images/icon/shopping_cart-24px.svg')} alt='icon' style={{width:'25px'}} />Payment
                                            </Link>
                                        }
                                    </li>
                                    <li className="nav-item dropdown aji mr-0 mt-2 mb-2">
                                        <a className="nav-link p-0" href="/" id="navbarDropdown" data-toggle="dropdown">
                                        { !this.state.isLogin.avatar ? 
                                            <img src={require("../images/profil.svg")} alt='profil' width="40px" className='rounded-circle mr-2' />
                                        : 
                                            <img src={this.state.isLogin.avatar} alt='profil' width="40px" className='rounded-circle mr-2' /> 
                                        }
                                        { profile.o_nama_member }
                                        <img src={require('../images/icon/Polygon-close.svg')} alt='icon' className="ml-1 mb-1" style={{width:'15px'}} />
                                        </a>
                                        <div className="dropdown-menu bg-transparent border-0" aria-labelledby="navbarDropdown">
                                            <div className="custom-drop-menu">
                                                <Link to="/home/profil" onClick={()=>this.directProfil('profil')} className="link-to-profil">
                                                    <div className="row align-items-center m-0 p-3" style={{background:'#F1F1F1'}}>
                                                        <div className="">
                                                            { !this.state.isLogin.avatar ? 
                                                                <img src={require("../images/profil.svg")} alt='profil' width="50px" className='rounded-circle mr-2' />
                                                            : 
                                                                <img src={this.state.isLogin.avatar} alt='profil' width="50px" className='rounded-circle mr-2' /> 
                                                            }
                                                        </div>
                                                        <div className="col">
                                                            <p className="mb-0" style={{fontWeight:'500'}}>{ profile.o_nama_member }</p>
                                                            <p className="mb-1" style={{color:'#4BB04E'}}> {getaSaldo.id_member} 
                                                                <span className="ml-2" style={{color:'#FFFFFF',background:'#4BB04E',borderRadius:'20px',padding:'2px 10px'}}> {profile.o_jabatanmember} </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="row align-items-center m-0 p-3">
                                                    <div className="col p-0">
                                                        <p className="mb-0" style={{color:'#4BB04E'}}>Saldo <br/> Rp {convertCurrency(getaSaldo.sisa_uang)}</p>
                                                    </div>
                                                    <div className="col garis-kiri">
                                                        <p className="mb-0" style={{color:'#808080'}}>Point <br/> Rp {convertCurrency(getaSaldo.bonus_member)}</p>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center m-0 p-3">
                                                    <div className="col-sm-12 p-0">
                                                        <p align="center" className="mb-0 pt-2 pb-2" style={{color:'#FFFFFF',borderRadius:'20px',background:'#FFC001',cursor:'pointer'}}>
                                                            <Link className="link-top-up" to="/home/deposit">Top Up Saldo</Link>
                                                        </p>
                                                    </div>
                                                </div> 
                                                <div className="row align-items-center m-0 p-3">
                                                    <div className="col-sm-12 p-0" align="right" onClick={this.logout} style={{cursor:'pointer'}}>
                                                        <img src={require('../images/icon/btnLogout.svg')} alt="icon" width="25px" />
                                                        <span className="ml-2 mt-2" style={{color:'#808080'}}>Keluar</span>
                                                    </div>
                                                </div> 
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps  = (dispatch) => ({
    directToProfil : (data)=> dispatch({ type : 'DIRECT_TO_PROFIL', value : data  })
})
const mapStateToProps = (state) => ({
    data:state.riwayatTransaksi,
})
export default  connect(mapStateToProps, mapDispatchToProps )(Header)