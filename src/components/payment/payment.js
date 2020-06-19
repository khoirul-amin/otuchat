import React, { Component } from 'react'
import Pembayaran from './pembayaran'
import Tagihan from './tagihan'
import Donasi from './donasi'
import Market from './market'
import '../../assets/responsivePage.css'
import { Carousel } from 'react-bootstrap';

import {API,X_API_KEY,BANNER,SALDO_BONUS,APLUS} from '../../api/index'
import Swal from 'sweetalert2'
import axios from'axios'
import '../../assets/style.css'
import { connect } from 'react-redux'
// import LoadingPage from '../loadingPage'

class Payment extends Component {
    state = {
        banner: [],
        firstBanner:'',
        list:'pembayaran',
        loading:true
    }

    handleClick(data){
        if(this.state.list !== data){
            this.setState({ list : data })
        }
    }
    logout(){
        localStorage.removeItem('isLogin')
        window.location = '/'
    }
    UNSAFE_componentWillMount() {
        const isLogin = JSON.parse(localStorage.getItem('isLogin')) 
        if (isLogin === null){
            window.location = '/'
        }
        axios.get(API+BANNER, { headers: {
            'X-Api-Key' : X_API_KEY
        } }).then(res => {
            const banner = res.data.data;
            // console.log(banner)
            this.setState({loading:false})
            let baner = banner.filter(
                (b) => {
                    return b.type.indexOf('Home Page') !== -1;
                }
            )
            this.setState({ banner:baner, firstBanner:baner[0] })
            this.cekSession()
        })
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
                    Swal.fire({
                        title: 'Token Expired',
                        text: "Anda terdeteksi Login pada dua device, Silahkan Login kembali",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Lanjutkan',
                        allowOutsideClick: false,
                        }).then((result) => {
                        if (result.value) {
                            this.logout()
                        }
                        }) 
                }else{
                }
            }).catch(error => {
            })
        }

    }
    render() {
        if(this.props.sessionLogin.statusLogin === false ){
            this.cekSession()
        }
        return (
            <div className="responsiveAll">
                <div className='container'>
                    <div className='row m-0 pb-3  justify-content-md-center' >
                        <Carousel>
                            {
                            this.state.banner.map(banner => 
                            <Carousel.Item key={banner.nama_promo}>
                                <img
                                className="d-block w-100"
                                src={banner.baner_promo} 
                                alt={banner.nama_promo}
                                />
                            </Carousel.Item>
                            )}
                        </Carousel>
                    </div>
                    <div className='row menu-pilihan'>
                        <div className='nav nav-tabs w-100 p-0' style={{border:'0px'}}>
                            <a id="nav-pembayaran-tab" data-toggle="tab" href="#nav-pembayaran" role="tab" aria-controls="nav-pembayaran" aria-selected="true" 
                                className={this.state.list === 'pembayaran' ? 'button on' : 'button'} 
                                onClick={() => this.handleClick('pembayaran')} >  
                                <b>Pembelian</b>
                            </a>
                            <a id="nav-tagihan-tab" data-toggle="tab" href="#nav-tagihan" role="tab" aria-controls="nav-tagihan" aria-selected="false" 
                                className={this.state.list === 'tagihan' ? 'button on' : 'button'} 
                                onClick={() => this.handleClick('tagihan')} >
                                <b>Tagihan</b>
                            </a>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-sm-12 m-0 p-0 tab-content"  id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-pembayaran" role="tabpanel" aria-labelledby="nav-pembayaran-tab"><Pembayaran/></div>
                            <div className="tab-pane fade" id="nav-tagihan" role="tabpanel" aria-labelledby="nav-tagihan-tab"><Tagihan/></div>
                            <div className="tab-pane fade" id="nav-donasi" role="tabpanel" aria-labelledby="nav-donasi-tab"><Donasi/></div>
                            <div className="tab-pane fade" id="nav-market" role="tabpanel" aria-labelledby="nav-market-tab"><Market/></div>
                        </div>
                    </div>
                </div>
            </div>

        )
        
    }

}

const mapStateToProps = (state) => ({
    sessionLogin : state.cekLogin
})

export default connect(mapStateToProps,null)(Payment)