import React, { Component } from 'react'
import{ connect } from 'react-redux'
import { convertCurrency } from '../../../payment/commons/commonLib'
import { API,APLUS,X_API_KEY,EXCHANGE,SALDO_BONUS } from '../../../../api/index'
import axios from 'axios';
import Swal from 'sweetalert2'
import $ from 'jquery'

class ExchangePage extends Component {
    constructor(){
        super()
        this.state={
            nominal:'',
            pin:'',
            response:true,
            loading:false
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
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
    getExchange(){
        this.setState({loading:true})
        const isLogin = JSON.parse(localStorage.getItem('isLogin')) 
        const header={
            'X-Api-Key' : X_API_KEY
        }

        const body ={
            'userID' : isLogin.userID,
            'aplUse':APLUS,
            'accessToken' : isLogin.mbr_token,
            'amount' : this.state.nominal,
            'pin': this.state.pin
        }
        axios.post(API+EXCHANGE, body, {headers:header})
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
                    title: res.data.status,
                    text : res.data.respMessage
                })
                this.setState({loading:false})
                $('#TukarBonus').modal('hide')
                this.getSaldo()
            }
        })

    }
    render() {
        return (
            <div>
                <div className="modal fade" id="TukarBonus" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="TukarBonusLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content border-0 bg-transparent">
                            <div className="custom-modal-header">
                                <h5 className="m-0 p-0">Penukaran Point Menjadi Saldo</h5>
                            </div>
                            <div className="custom-modal-body">
                                <div className='mt-3'>
                                    <p className="title-modal mb-0">Saldo Total</p>
                                    <h3 style={{color:'#707070'}}>Rp {convertCurrency(this.props.data.saldo.bonus_member)}</h3>
                                </div>
                                <div className='mt-3'>
                                    <p className="title-modal mb-0">Nominal Penukaran Point</p>
                                    <input className="input-modal" autoComplete='off' name="nominal" value={this.state.nominal} onChange={this.handleChange} />
                                    <span  style={style.validate}>Minimal penukaran point adalah <b>Rp 10.000</b></span>
                                </div>
                                <div className='mt-3'>
                                    <p className="title-modal mb-0">PIN</p>
                                    <input className="input-modal" autoComplete='off' name="pin" value={this.state.pin} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="custom-modal-footer">
                                <div className="row m-0">
                                    <div className="col-sm-6 p-0">
                                        <div className="custom-btn-white" onClick={()=>this.setState({nominal:'',pin:''})} data-dismiss="modal" align="center">BATALKAN</div>
                                    </div>
                                    <div className="col-sm-6 p-0" align="center">
                                        {this.state.loading ? 
                                        <div className='custom-btn-green'>Loading</div>
                                        :
                                        <div onClick={()=>this.getExchange()} className='custom-btn-green'>TUKAR POINT</div>
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

export default connect(mapStateToProps,mapDispatchToProps)(ExchangePage)
const style = {
    validate:{
        fontSize:'12pt',
        color:'#707070'
    }
}