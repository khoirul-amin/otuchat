import './style.css'
import React, { Component } from 'react'
import { API,X_API_KEY,APLUS,GET_MEMBER,GET_TRANSFER,SALDO_BONUS } from '../../../../api/index' 
import{ connect } from 'react-redux'
import axios from 'axios'
import Swal from 'sweetalert2'
import $ from 'jquery'

class transferSaldo extends Component {
    constructor(){
        super()
        this.state={
            IDTujuan : '',
            nomor: '',
            pin:'',
            nominal:'',
            loadingID:false,
            loadingTransfer:false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        this.setState({[event.target.name] : event.target.value})
    }
    cekIdTujuan(){
        this.setState({loadingID:true})
        const isLogin = JSON.parse(localStorage.getItem('isLogin')) 
        if (isLogin){
            const header={
                'X-Api-Key' : X_API_KEY
            }
            const body ={
                'userID' : isLogin.userID,
                'aplUse':APLUS,
                'accessToken' : isLogin.mbr_token,
                'destination' : this.state.nomor
            }
            axios.post(API+GET_MEMBER, body, {headers:header} )
            .then(res => {
                this.setState({loadingID:false})
                if(res.data.errNumber !== '0'){
                    Swal.fire({
                        title: res.data.status,
                        text: res.data.respMessage,
                        icon: 'error',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Kembali',
                        allowOutsideClick: false,
                        }).then((result) => {
                        })
                }else{
                    this.setState({IDTujuan : res.data.datarespon[0]})
                }
            })
            .catch(error => {
                console.log(error.response)
                this.setState({loadingID:false})
            });
        }else{
            window.location = '/'
        }
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
    requestTransfer(){
        this.setState({loadingTransfer:true})
        const isLogin = JSON.parse(localStorage.getItem('isLogin')) 
        if (isLogin){
            const header={
                'X-Api-Key' : X_API_KEY
            }
            const body ={
                'userID' : isLogin.userID,
                'aplUse':APLUS,
                'accessToken' : isLogin.mbr_token,
                'tujuan' : this.state.nomor,
                'nominal' : this.state.nominal,
                'pin' : this.state.pin
            }
            axios.post(API+GET_TRANSFER, body, {headers:header} )
            .then(res => {
                    this.setState({loadingTransfer:false})
                    if(res.data.errNumber !== '0'){
                        Swal.fire({
                            title: res.data.status,
                            text: res.data.respMessage,
                            icon: 'error',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ok',
                            allowOutsideClick: false,
                          }).then((result) => {
                          })
                    }else{
                        Swal.fire({
                            title: res.data.status,
                            text: res.data.respMessage,
                            icon: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Kembali',
                            allowOutsideClick: false,
                          }).then((result) => {
                            this.setState({nominal:'',IDTujuan:'',pin:'',nomor:''})
                            $('#Transfer').modal('hide')
                            this.getSaldo()
                          })
                        //   console.log(res.data)
                    }
                })
            .catch(error => {
                console.log(error.response)
                this.setState({loadingTransfer:false})
            });
        }else{
            window.location = '/'
        }
    }

    render() {
        // console.log(this.state)
        return (
            <div>
                <div className="modal fade" id="Transfer" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="TransferLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content border-0 bg-transparent">
                            <div className="custom-modal-header">
                                <h5 className="m-0 p-0">Transfer Saldo OTUChat</h5>
                            </div>
                            <div className="custom-modal-body">
                                <div className='mt-3'>
                                    <p className="title-modal mb-0">Jumlah Transaksi</p>
                                    <input className="input-modal" autoComplete='off' type='number' name="nominal" value={this.state.nominal} onChange={this.handleChange}/>
                                    <span  style={style.validate}>Minimal transfer saldo adalah <b>Rp 10.000</b></span>
                                </div>
                                <div className='mt-3'>
                                    <p className="title-modal mb-0">ID/No. OTU Tujuan</p>
                                    <input className="input-modal" autoComplete='off' name="nomor" value={this.state.nomor} onChange={this.handleChange}/>
                                    {this.state.loadingID ? 
                                    <div className="button-req-otp">Loading</div>
                                    :
                                    <div className="button-req-otp" onClick={() => this.cekIdTujuan()}>Cek ID</div>
                                    }
                                    <span  style={style.validate}> Cek tujuan terlebih dahulu sebelum lanjut transaksi </span>
                                </div>
                                <div className='mt-3'>
                                    {this.state.IDTujuan === '' ? '' :
                                        <div className='pl-0' style={{color:'#827D7D', fontSize:'12px'}}>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td style={{color:'black'}}> ID Tujuan </td>
                                                        <td style={{color:'black'}}>:</td>
                                                        <td> {this.state.IDTujuan.id_member} </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{color:'black'}}>Tujuan Transfer</td>
                                                        <td style={{color:'black'}}>:</td>
                                                        <td> {this.state.IDTujuan.nama_member} </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    }
                                </div>
                                <div className='mt-3'>
                                    <p className="title-modal mb-0">PIN</p>
                                    <input className="input-modal" autoComplete='off' name="pin" value={this.state.pin} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="custom-modal-footer">
                                <div className="row m-0">
                                    <div className="col-sm-6 p-0">
                                        <div className="custom-btn-white" onClick={()=>this.setState({nominal:'',IDTujuan:'',pin:'',nomor:''})} data-dismiss="modal" align="center">BATALKAN</div>
                                    </div>
                                    <div className="col-sm-6 p-0" align="center">
                                        {this.state.loadingTransfer ? 
                                        <div className='custom-btn-green'>Loading</div>
                                        :
                                        <div onClick={()=>this.requestTransfer()} className='custom-btn-green'>TRANSFER SALDO</div>
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


export default connect(null,mapDispatchToProps)(transferSaldo)

const style = {
    validate:{
        fontSize:'12pt',
        color:'#707070'
    }
}
