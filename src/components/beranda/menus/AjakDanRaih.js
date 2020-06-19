import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'

class AjakDanRaih extends Component {



    copyToClipboard (){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        var copyText = document.getElementById("linkRefferal");
        copyText.select();
        copyText.setSelectionRange(0, 99999)
        document.execCommand("copy");
        Toast.fire({
          icon: 'success',
          title: 'Copied to clipboard'
        })
    }
    render() {
        const data = this.props.data
        return (
            <div>
                <div className="modal fade" id="AjakDanRaih" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="AjakDanRaihLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content border-0 bg-transparent">
                            <div className="yellow-modal-header">
                                <h4 className="p-0 mb-3" align="center">AJAK DAN RAIH</h4>
                                <div className='row justify-content-md-center'>
                                    <div className="cell-header">
                                        <img className="icon-petir" src={require('../../../images/icon/icon-petir.svg')} alt="icon" />
                                        <span className="number mr-2 ml-2" style={{color:'#7C5E00'}}>3</span>
                                    </div>
                                    <div className="col-header">
                                        <p className="text-reff mt-1" style={{color:'#7C5E00'}}><span style={{fontWeight:'500'}}>LANGKAH MUDAH</span> <br/>Raih penghasilan tambahan!</p>
                                    </div>
                                </div>
                            </div>
                            <div className="custom-modal-body">
                                <div className='row mt-3'>
                                    <div className="cell-number">
                                        <p className="number">1</p>
                                    </div>
                                    <div className="col">
                                        <p className="text-reff"><span style={{fontWeight:'500'}}>SALIN</span> <br/> Link pendaftaran dari referral kamu</p>
                                        <input className="link-refferal" id="linkRefferal" readOnly value={`https://payment.otuchat.com/refferal/${data.saldo.id_member}`} />
                                        <span className="button-salin" onClick={()=>this.copyToClipboard()}>
                                            SALIN
                                        </span>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className="cell-number">
                                        <p className="number">2</p>
                                    </div>
                                    <div className="col">
                                        <p className="text-reff"><span style={{fontWeight:'500'}}>BAGIKAN</span> <br/> Ke bebagai sosial media kamu</p>
                                        <div className="link-refferal"> 
                                            <img className="mr-2 image-reff" src={require('../../../images/footer/imageshare.png')} alt='logo'/>
                                        </div>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className="cell-number">
                                        <p className="number">3</p>
                                    </div>
                                    <div className="col">
                                        <p className="text-reff" align="justify"><span style={{fontWeight:'500'}}>RAIH</span> 
                                        <br/> Kamu akan mendapatkan penghasilan tambahan dari transaksi member yang telah mendaftar dari referral kamu</p>
                                    </div>
                                </div>
                            </div>
                            <div className="custom-modal-footer">
                                <p className="footer-refferal mb-1">Customer Service OTUchat</p>
                                <p align="center"><a className="link-call-customer" href="tel:085711110318">
                                    <img className="mr-2" src={require('../../../images/footer/logo-telpon.svg')} width="15px" alt='logo'/>
                                    0857-1111-0318</a></p>
                                <div align="center" data-dismiss="modal"  style={{margin:'auto',width:'70%',borderRadius:'20px',cursor:'pointer',padding:'10px 0px',color:'#FFFFFF',background:'#4FAE50'}}>
                                    KEMBALI
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data:state.riwayatTransaksi
})
export default connect(mapStateToProps, null )(AjakDanRaih)