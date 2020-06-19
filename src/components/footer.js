import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
            <div>
                <div className='text-light footer'>
                    <div className='row m-0 align-items-center'>
                        <div className='col-sm-4 p-0'>
                            <div className="row m-0 justify-content-center">
                                <div className="mb-4 mt-4 p-0">
                                    <img className='imagePhone' height='260px' src={require('../images/footer/imagePhone.png')} alt="imagePhone"/>
                                </div>
                                <div className="ml-3 align-self-center">
                                    <img src={require("../images/ic-home.png")} width="170px" alt="imagelogo"/>
                                    <p>#KaryaAnakBangsa</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-8'>
                            <div className="row m-0 justify-content-center">
                                <div className="col-sm-4 p-0">
                                    <p className="mb-1">Download</p>
                                    <div className="row m-0">
                                        <div className="col-auto p-0">
                                            <a target="blank" className='link-image-footer' href='https://play.google.com/store/apps/details?id=com.eklanku.otuChat&hl=in'>
                                                <img src={require("../images/footer/googlePlay.svg")} alt="logoAppStore"/>
                                            </a>
                                        </div>
                                        <div className="col-auto p-0">
                                            <a target="blank" className='link-image-footer' href='https://apps.apple.com/id/app/otu-chat/id1404186449'>
                                                <img src={require("../images/footer/appStore.svg")} alt="logoGooglePlay"/>
                                            </a>
                                        </div>
                                    </div>
                                    <img className='mt-2 line-footer' src={require("../images/footer/line.svg")} alt="line"/>
                                </div>
                                <div className="col-lg-3 p-0">
                                    <p className="mb-1">Ikuti kami</p>
                                    <div className="row m-0 pb-3">
                                        <div className="col-auto mr-2 p-0">
                                            <a target="blank"  href="https://www.facebook.com/otuchat/">
                                                <img src={require('../images/footer/facebook.svg')} alt='logo'/>
                                            </a>
                                        </div>
                                        <div className="col-auto mr-2 p-0">
                                            <a target="blank"  href="https://twitter.com/Otuchat_">
                                                <img src={require('../images/footer/twitter.png')} alt='logo'/>
                                            </a>
                                        </div>
                                        <div className="col-auto mr-2 p-0">
                                            <a target="blank"  href="https://www.instagram.com/otuchat.id/">
                                                <img src={require('../images/footer/instagram.png')} alt='logo'/>
                                            </a>
                                        </div>
                                        <div className="col-auto mr-2 p-0">
                                            <a target="blank"  href="https://www.youtube.com/channel/UC_1F77J6q-rYRW9XptMJ8yg">
                                                <img src={require('../images/footer/youtube.png')} alt='logo'/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg p-0">
                                    <div className="row m-0">
                                        <div className='col p-0'>
                                            <p className="mb-1">Hubungi kami</p>
                                            <div className="row m-0">
                                                <div className="m-0 p-0">
                                                    <img src={require('../images/icon/cs-footer.svg')} alt="logo"/>
                                                </div>
                                                <div className="col p-0 ml-2">
                                                    <table style={{fontSize:'10pt'}}>
                                                        <tbody>
                                                            <tr>
                                                                <td> Kendala Transaksi</td>
                                                                <td style={{paddingLeft:'5px'}}>
                                                                    <a href='tel:085711110315' className="foot-link"> 
                                                                        <span className="mt-0 mb-0">0857-1111-0315</span>
                                                                    </a> 
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td> Informasi Umum</td>
                                                                <td style={{paddingLeft:'5px'}}>
                                                                    <a href='tel:085711110318' className="foot-link"> 
                                                                        <span className="mt-0 mb-0">0857-1111-0318</span>
                                                                    </a> 
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <a href='mailto:admin@otuchat.com' className="foot-link"> 
                                                <i className="fa fa-envelope"></i>
                                                <span className="mt-0 mb-0">admin@otuchat.com</span>
                                            </a><br/>
                                            <a href='https://www.google.com/maps/place/Office+Eklanku/@-8.6668077,115.2395563,15z/data=!4m12!1m6!3m5!1s0x0:0x4c4406c6edcdd9a4!2sOffice+Eklanku!8m2!3d-8.6668077!4d115.2395563!3m4!1s0x0:0x4c4406c6edcdd9a4!8m2!3d-8.6668077!4d115.2395563'
                                                target="new" className="foot-link"> 
                                                <i className="fa fa-map-marker"></i>
                                                <span className="mt-0 ml-2">Bali : Jln. Merdeka II no 68 Renon - Denpasar, Bali, Indonesia</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row ml-0 mr-0' style={{background:'#3A9460',color:'#FFFFFF'}}>
                    <div className="container">
                        <div className='row m-0' align="center">
                            <div className='col p-0 mb-2 mt-2'>
                                <p align="center" className='mb-0'>© 2018-2020 OTUCHAT</p>
                                <p align="center" className='mb-0' style={{fontSize:'9pt'}}>OTUChat adalah merek milik PT Eklanku Indonesia Cemerlang</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Footer