import React, { Component } from 'react'
import '../../assets/style.css'
import Pulsa from './menus/pulsa'
import Paketdata from './menus/paketdata'
import Sms from './menus/sms'
import Telephone from './menus/telephone'
import Tokenlisrik from './menus/tokenlisrik'
import Etoll from './menus/etoll'
import Esaldo from './menus/esaldo'
import Wifi from './menus/wifi'
import Game from './menus/game'
import axios from 'axios'
import Swal from 'sweetalert2'
import {API,X_API_KEY,APLUS,SALDO_BONUS} from '../../api/index'
import { connect } from 'react-redux'

class pembayaran extends Component {
    state={
        list: 'pulsa'
    }
    handleClick(data){
        if(this.state.list !== data){
            this.setState({ list : data })
        }
        if(data === 'wifi'){
            Swal.fire({
                icon : 'info',
                title: 'INFO',
                text : 'Mohon Maaf Product WiFi tidak bisa digunakan '
            })
        }
    }

    cekSession(){
        const isLogin = JSON.parse(localStorage.getItem('isLogin'))
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
                    if(res.data.errNumber === '8' ){
                        this.props.setLogout()
                    }
                }).catch(error => {
            })
        }
    }
    
    render() {
        if(this.props.sessionLogin.statusLogin === false ){

        }else{
            this.cekSession()
        }
        return (
            <div>
                <div className='col-sm-12 border pt-3 shadow new-radius'>
                    <div className='row justify-content-center m-0'>
                        <div className="custom-col" align="center">
                            <a id="nav-pulsa-tab" data-toggle="tab" href="#nav-pulsa" role="tab" aria-controls="nav-pulsa" aria-selected="true" 
                                className={this.state.list === 'pulsa' ? 'pembayaran-product aktif' : 'pembayaran-product'} 
                                onClick={() => this.handleClick('pulsa')} >
                                <div className='product-image'>
                                    <img src={require('../../images/buttonImage/pulsa.svg')} width='70%' height='70%' alt='logo' />
                                </div>
                                <p className='list-product mt-2' align='center'>Pulsa</p>
                            </a>
                        </div>
                        <div className="custom-col" align="center">
                            <a id="nav-paketdata-tab" data-toggle="tab" href="#nav-paketdata" role="tab" aria-controls="nav-paketdata" aria-selected="false"  
                                className={this.state.list === 'paketdata' ? 'pembayaran-product aktif' : 'pembayaran-product'} 
                                onClick={() => this.handleClick('paketdata')} >
                                <div className='product-image'>
                                    <img src={require('../../images/buttonImage/paket_data.svg')} width='70%' height='70%' alt='logo' />
                                </div>
                                <p className='list-product mt-2' align='center'>Paket Data</p>
                            </a>
                        </div>
                        <div className="custom-col" align="center">
                            <a id="nav-sms-tab" data-toggle="tab" href="#nav-sms" role="tab" aria-controls="nav-sms" aria-selected="false"
                                className={this.state.list === 'sms' ? 'pembayaran-product aktif' : 'pembayaran-product'} 
                                onClick={() => this.handleClick('sms')} >
                                <div className='product-image'>
                                    <img src={require('../../images/buttonImage/sms.svg')} width='70%' height='70%' alt='logo' />
                                </div>
                                <p className='list-product mt-2' align='center'>SMS</p>
                            </a>
                        </div>
                        <div className="custom-col" align="center">
                            <a  id="nav-telephone-tab" data-toggle="tab" href="#nav-telephone" role="tab" aria-controls="nav-telephone" aria-selected="false"  
                                className={this.state.list === 'telephone' ? 'pembayaran-product aktif' : 'pembayaran-product'} 
                                onClick={() => this.handleClick('telephone')} >
                                <div className='product-image'>
                                    <img src={require('../../images/buttonImage/telephone.svg')} width='70%' height='70%' alt='logo' />
                                </div>
                                <p className='list-product mt-2' align='center'>Telepon</p>
                            </a>
                        </div>
                        <div className="custom-col" align="center">
                            <a  id="nav-tokenlistrik-tab" data-toggle="tab" href="#nav-tokenlistrik" role="tab" aria-controls="nav-tokenlistrik" aria-selected="false"  
                                className={this.state.list === 'tokenlistrik' ? 'pembayaran-product aktif' : 'pembayaran-product'} 
                                onClick={() => this.handleClick('tokenlistrik')} >
                                <div className='product-image'>
                                    <img src={require('../../images/buttonImage/token_listrik.svg')} width='70%' height='70%' alt='logo' />
                                </div>
                                <p className='list-product mt-2' align='center'>Token Listrik</p>
                            </a>
                        </div>
                        <div className="custom-col" align="center">
                            <a id="nav-etoll-tab" data-toggle="tab" href="#nav-etoll" role="tab" aria-controls="nav-etoll" aria-selected="false"  
                                className={this.state.list === 'etoll' ? 'pembayaran-product aktif' : 'pembayaran-product'} 
                                onClick={() => this.handleClick('etoll')} >
                                <div className='product-image'>
                                    <img src={require('../../images/buttonImage/e_toll.svg')} width='70%' height='70%' alt='logo' />
                                </div>
                                <p className='list-product mt-2' align='center'>E-Toll</p>
                            </a>
                        </div>
                        <div className="custom-col" align="center">
                            <a id="nav-esaldo-tab" data-toggle="tab" href="#nav-esaldo" role="tab" aria-controls="nav-esaldo" aria-selected="false"
                                className={this.state.list === 'esaldo' ? 'pembayaran-product aktif' : 'pembayaran-product'} 
                                onClick={() => this.handleClick('esaldo')} >
                                <div className='product-image'>
                                    <img src={require('../../images/buttonImage/e_saldo.svg')} width='70%' height='70%' alt='logo' />
                                </div>
                                <p className='list-product mt-2' align='center'>E-Saldo</p>
                            </a>
                        </div>
                        <div className="custom-col" align="center">
                            <a id="nav-wifi-tab" data-toggle="tab" href="#nav-wifi" role="tab" aria-controls="nav-wifi" aria-selected="false"
                                className={this.state.list === 'wifi' ? 'pembayaran-product aktif' : 'pembayaran-product'} 
                                onClick={() => this.handleClick('wifi')} >
                                <div className='product-image'>
                                    <img src={require('../../images/buttonImage/wifi.svg')} width='70%' height='70%' alt='logo' />
                                </div>
                                <p className='list-product mt-2' align='center'>WiFi</p>
                            </a>
                        </div>
                        <div className="custom-col" align="center">
                            <a id="nav-game-tab" data-toggle="tab" href="#nav-game" role="tab" aria-controls="nav-game" aria-selected="false"
                                className={this.state.list === 'game' ? 'pembayaran-product aktif' : 'pembayaran-product'} 
                                onClick={() => this.handleClick('game')} >
                                <div className='product-image'>
                                    <img src={require('../../images/buttonImage/voucher_game.svg')} width='70%' height='70%' alt='logo' />
                                </div>
                                <p className='list-product mt-2' align='center'>Voucher Game</p>
                            </a>
                        </div>
                    </div> 
                </div>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-pulsa" role="tabpanel" aria-labelledby="nav-pulsa-tab"><Pulsa/></div>
                    <div className="tab-pane fade" id="nav-paketdata" role="tabpanel" aria-labelledby="nav-paketdata-tab"><Paketdata/></div>
                    <div className="tab-pane fade" id="nav-sms" role="tabpanel" aria-labelledby="nav-sms-tab"><Sms/></div>
                    <div className="tab-pane fade" id="nav-telephone" role="tabpanel" aria-labelledby="nav-telephone-tab"><Telephone/></div>
                    <div className="tab-pane fade" id="nav-tokenlistrik" role="tabpanel" aria-labelledby="nav-tokenlistrik-tab"><Tokenlisrik/></div>
                    <div className="tab-pane fade" id="nav-etoll" role="tabpanel" aria-labelledby="nav-etoll-tab"><Etoll/></div>
                    <div className="tab-pane fade" id="nav-esaldo" role="tabpanel" aria-labelledby="nav-esaldo-tab"><Esaldo/></div>
                    <div className="tab-pane fade" id="nav-wifi" role="tabpanel" aria-labelledby="nav-wifi-tab"><Wifi/></div>
                    <div className="tab-pane fade" id="nav-game" role="tabpanel" aria-labelledby="nav-game-tab"><Game/></div>
                </div>
            </div>
            
        )
    }
}


const mapStateToProps = (state) => ({
    sessionLogin : state.cekLogin
})
const mapDispatchToProps = dispatch =>({
    setLogout : ()=>dispatch({ type:'SESSION_EXPIRED', value: false })
})

export default  connect(mapStateToProps, mapDispatchToProps )(pembayaran)
