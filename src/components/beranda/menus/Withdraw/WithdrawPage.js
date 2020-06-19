import React, { Component } from 'react'
import{ connect } from 'react-redux'
import { convertCurrency } from '../../../payment/commons/commonLib'
import { API,APLUS,X_API_KEY,GET_OTP,WITHDRAW,SALDO_BONUS } from '../../../../api/index'
import axios from 'axios';
import Swal from 'sweetalert2'
import $ from 'jquery'

class WithdrawPage extends Component {
    constructor(){
        super()
        this.state={
            nominal:'',
            OTPCode:'',
            pin:'',
            cekOTP:false,
            loading:false,
            loadingTarik:false,
            openDialog:false
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    reqOTP(){
        this.setState({loading:true})
        const header={
            'X-Api-Key' : X_API_KEY
        }
        const body ={
            'mobilePhone':this.props.data.profile.data[0].o_hp,
            'aplUse' : APLUS,
            'type_otp' : 'REQUEST WITHDRAW'
        }
        axios.post(API+GET_OTP, body, {headers:header})
        .then(res=>{
            // console.log(res)
            if(res.data.errNumber !== '0'){
                Swal.fire({
                    icon : 'error',
                    title: res.data.status,
                    text : res.data.respMessage
                })
                this.setState({loading:false})
            }else{
                Swal.fire({
                    icon : 'success',
                    title: 'Request OTP Success',
                    text : 'Request OTP berhasil dikirim ke nomor   '+res.data.userID
                })
                this.setState({cekOTP:true,loading:false})
            }
        })
    }
    getWithdraw(){
        this.setState({loadingTarik:true})
        const isLogin = JSON.parse(localStorage.getItem('isLogin')) 
        const header={
            'X-Api-Key' : X_API_KEY
        }

        const body ={
            'userID' : isLogin.userID,
            'aplUse':APLUS,
            'accessToken' : isLogin.mbr_token,
            'amount' : this.state.nominal,
            'key' : this.state.OTPCode,
            'pin': this.state.pin
        }
        axios.post(API+WITHDRAW, body, {headers:header})
        .then(res=>{
            // console.log(res)
            if(res.data.errNumber !== '0'){
                Swal.fire({
                    icon : 'error',
                    title: res.data.status,
                    text : res.data.respMessage
                })
                this.setState({loadingTarik:false})
            }else{
                $('#TarikBonus').modal('hide')
                this.getSaldo()
                Swal.fire({
                    icon : 'success',
                    title: res.data.status,
                    text : res.data.respMessage
                })
                this.setState({loadingTarik:false,nominal:'',pin:'',OTPCode:''})
            }
        })
    }
    getSaldo(){
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
                    const saldo = res.data.Balance[0];
                    if(res.data.errNumber !== '0'){
                    }else{
                        this.props.setSaldo(saldo)
                    }
                    })
                .catch(error => {
                    console.log(error.response)
                    
                });
        }
    }

    render(){
        return (
            <div>
                <div className="modal fade" id="TarikBonus" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="TarikBonusLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content border-0 bg-transparent">
                            <div className="custom-modal-header">
                                <h5 className="m-0 p-0">Penarikan Point</h5>
                            </div>
                            <div className="custom-modal-body">
                                <div className="mt-3">
                                    <p className="title-modal mb-0">Point</p>
                                    <h3 style={{color:'#707070'}}>Rp {convertCurrency(this.props.data.saldo.bonus_member)}</h3>
                                </div>
                                <div className="mt-3">
                                    <p className="title-modal mb-0">Nominal Tarik Point</p>
                                    <input className="input-modal" autoComplete='off' name="nominal" value={this.state.nominal} onChange={this.handleChange} />
                                    <span  style={style.validate}>Minimal penarikan point adalah <b>Rp 10.000</b></span>
                                </div>
                                <div className="mt-3">
                                    <p className="title-modal mb-0">Kode OTP</p>
                                    <input className="input-modal"  autoComplete='off' name="OTPCode" value={this.state.OTPCode} onChange={this.handleChange}/>
                                    {this.state.loading ?
                                        <div className="button-req-otp">Loading</div>
                                    :
                                        <div className="button-req-otp" onClick={() => this.reqOTP()}>Request OTP</div>
                                    }
                                    <span className="color-silver">Kode OTP dikirim ke nomor <b>{this.props.data.profile.data[0].o_hp}</b> </span>
                                </div>
                                <div className="mt-3">
                                    <p className="title-modal mb-0">PIN</p>
                                    <input className="input-modal" autoComplete='off' name="pin" value={this.state.pin} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="custom-modal-footer">
                                <div className="row m-0">
                                    <div className="col-sm-6 p-0">
                                        <div className="custom-btn-white" data-dismiss="modal" onClick={()=>this.setState({nominal:'',pin:'',OTPCode:''})} align="center">BATALKAN</div>
                                    </div>
                                    <div className="col-sm-6 p-0" align="center">
                                        {this.state.loadingTarik ? 
                                        <div className='custom-btn-green'>Loading</div>
                                        :
                                        <div className='custom-btn-green' onClick={()=>this.getWithdraw()}>TARIK POINT</div>
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


const mapDispatchToProps = dispatch =>({
    setStatusModal : (data) => dispatch({type:'SET_STATUS_MODAL', value:''}),
    setSaldo: (saldo)=>dispatch({type:'SET_SALDO', value:saldo })
})

const mapStateToProps = (state) =>({
    data: state.riwayatTransaksi
})

export default connect(mapStateToProps,mapDispatchToProps)(WithdrawPage)
const style = {
    validate:{
        fontSize:'12pt',
        color:'#707070'
    }
}