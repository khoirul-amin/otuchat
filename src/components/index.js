import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import {API,X_API_KEY,APLUS,GET_PROFILE,SALDO_BONUS} from '../api/index'
import Beranda from './beranda/beranda'
import Payment from './payment/payment'
import '../assets/stylehome.css'
import axios from 'axios'
import moment from 'moment'
import { connect } from 'react-redux'
import Header from './header'
import LoadingPage from './loadingPage'
import DepositSaldo from './beranda/menus/DepositSaldo'
import DetileDeposit from './beranda/menus/DetileDeposit'
import DetileTransaksi from './payment/detailTransaksi'
import DetileTransaksiTagihan from './payment/detailTransaksiTagihan'
import Swal from 'sweetalert2'
import Footer from './footer'
// import newPage from './newPage'
 
class Index extends Component {
    constructor(){
        super()
        this.state={
            isLogin:'',
            saldo:''
        }
    }
    logout(){
        localStorage.removeItem('isLogin')
        window.location = '/'
    }
    cekSession(data){
        const dateNow = moment().format('YYYY-MM-D');
        const lastLogin = moment(data).format('YYYY-MM-D')
        // console.log(dateNow,lastLogin)
        if(lastLogin !== dateNow){
            Swal.fire({
                title: 'Session Expired',
                text: "Anda telah Login lebih dari 24 jam, Silahkan Login kembali !",
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sign In',
                allowOutsideClick: false,
            }).then((result) => {
                this.logout()
            })
        }
    }


    componentDidMount() {
        const isLogin = JSON.parse(localStorage.getItem('isLogin'))
        this.setState({isLogin:isLogin})
        // console.log(isLogin)
        if (!isLogin){
            window.location = '/'
        } else {
            
            const header={
                'X-Api-Key' : X_API_KEY
            }
    
            const body ={
                'userID' : isLogin.userID,
                'aplUse':APLUS,
                'accessToken' : isLogin.mbr_token
            }
            axios.post(API+SALDO_BONUS, body, {headers:header} )
                .then(res => {
                    const saldo = res.data.Balance[0];
                    if(res.data.errNumber !== '0'){
                        this.setState({isLogin:null})
                    }else{
                        this.props.setSaldo(saldo)
                    }
                    })
                .catch(error => {
                    console.log(error.response)
                    
                });
            axios.post(API+GET_PROFILE, body, {headers:header} )
                .then(res => {
                    const profile = res.data;
                    if(res.data.errNumber !== '0'){
                        this.setState({isLogin:null})
                    }else{
                        this.props.setProfile(profile)
                    }
                    })
                .catch(error => {
                });
            this.cekSession(isLogin.respTime)
        }
    }

    render() {
        if(!this.props.data.profile.data){
            return <LoadingPage/>
        }
        return (
            <div>
                <Header/>
                <div style={{marginTop:'80px'}}>
                    <Route exact path='/home' component={Payment}/>
                    <Route path='/home/profil' component={Beranda}/>
                    <Route path='/home/deposit' component={DepositSaldo}/>
                    <Route path='/home/detaildeposit' component={DetileDeposit} />
                    <Route path='/home/detiletransaksi' component={DetileTransaksi}/>
                    <Route path='/home/detiletagihan' component={DetileTransaksiTagihan}/>
                </div>
                <Footer/>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    data:state.riwayatTransaksi
})

const mapDispatchToProps = dispatch =>({
    setSaldo: (saldo)=>dispatch({type:'SET_SALDO', value:saldo }),
    setProfile : (profile)=>dispatch({type:'SET_PROFILE', value:profile })
})

export default connect(mapStateToProps, mapDispatchToProps )(Index)