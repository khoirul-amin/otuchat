import React, { Component } from 'react'
// import PengaturanProfil from './beranda/menus/pengaturanProfil'
import PengaturanPassword from './beranda/menus/pengaturanPassword'
import PengaturanPin from './beranda/menus/pengaturanPin'
import LoadingPage from './loadingPage'
import moment from 'moment'
import "../assets/responsivePage.css"
import "../assets/styleProfil.css"
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { cardImage } from './imageLoader/card'
 
class Profil extends Component {
    constructor(){
        super()
        this.state={
            showElement:'Profil',
            isLogin:'',
            loading:true,
            profil:[],
            backGround:cardImage.ambassador
        }
    }
    logout(){
        localStorage.removeItem('isLogin')
        window.location = '/'
    }
    noLogin(){
        Swal.fire({
            title: 'Session Expired',
            text: "Anda Terdekteksi Login Di device lain, silahkan Login kembali",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya',
            allowOutsideClick: false,
        }).then((result) => {
            this.logout()
        })
    }
    confirmLogout(){
        Swal.fire({
            title: 'Log Out',
            text: "You Will Bw Returned To Login Page",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout',
            allowOutsideClick: false,
        }).then((result) => {
            if (result.value) {
                this.logout()
            }
        })

    }
    componentDidMount(){
        const isLogin = JSON.parse(localStorage.getItem('isLogin'))
        this.setState({isLogin:isLogin})
        // console.log(isLogin)
        if (!isLogin){
            window.location = '/'
        } else {
            this.setState({ loading:false });
        }
        switch(this.props.data.profile.data[0].o_jabatanmember){
            case '1-STAR': 
                this.setState({backGround: cardImage.oneStar}); 
            break;
            case '2-STAR':
                this.setState({backGround: cardImage.twoStar}); 
            break;
            case '3-STAR':
                this.setState({backGround: cardImage.threeStar}); 
            break;
            case '4-STAR':
                this.setState({backGround: cardImage.fourStar}); 
            break;
            case '5-STAR':
                this.setState({backGround: cardImage.fiveStar}); 
            break;
            case '6-STAR':
                this.setState({backGround: cardImage.sixtStar}); 
            break;
            case 'AMBASSADOR':
                this.setState({backGround: cardImage.ambassador}); 
            break;
            case 'HEAD BISNIS MANAGER':
                this.setState({backGround: cardImage.bhm}); 
            break;
            case 'BISNIS MANAGER':
                this.setState({backGround: cardImage.bm}); 
            break;
            case 'CROWN AMBASSADOR':
                this.setState({backGround: cardImage.crown}); 
            break;
            case 'FC':
                this.setState({backGround: cardImage.fiance}); 
            break;
            case 'MANAGER':
                this.setState({backGround: cardImage.manager}); 
            break;
            case 'FREE':
                this.setState({backGround: cardImage.free}); 
            break;
            case 'RESELLER SIGNATURE':
                this.setState({backGround: cardImage.signature}); 
            break;
            case 'RESELLER PLATINUM':
                this.setState({backGround: cardImage.platinum}); 
            break;
            case 'RESELLER GOLD':
                this.setState({backGround: cardImage.gold}); 
            break;
            case 'RESELLER SILVER':
                this.setState({backGround: cardImage.silver}); 
            break;
            default:
                this.setState({backGround: cardImage.free}); 
            break;
        }
    }
    render() {
        if(this.state.profil === null){
            this.noLogin()
        }
        if(this.state.loading === true){
            return(
                <LoadingPage/>
            )
        }
        const profil = this.props.data.profile
        // console.log(profil)
        return (
            <div className="row m-0 pt-2">
                { this.props.data.profile.data[0] === undefined ? "" :
                    <div className="container">
                        <div className="col-right">
                            <div className="card-profil row ml-0 mr-0 align-items-center">
                                <div className="kartu" style={{ background: `url(${this.state.backGround}) no-repeat`,backgroundSize: '100%'}}>
                                    <p className="isi-kartu">{profil.data[0].o_nama_member}  <br/> {profil.userID}</p>
                                </div>
                                <div className="ket">
                                    <p className="m-0" style={{fontWeight:'600'}}>kartu</p>
                                    <p className="m-0">{profil.data[0].o_jabatanmember}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-left">
                            <div className="row ml-0 mr-0 mt-3">
                                <p className="title-profil">Data Diri</p>
                            </div>
                            <div className="row m-0 body-profil">
                                <table style={{color:'#6A6A6A',fontSize:'11pt'}}>
                                    <tbody>
                                        <tr> 
                                            <td style={{paddingBottom:'7px'}}>Nama</td> 
                                            <td style={{paddingBottom:'7px',wordBreak: 'break-all'}}>: {profil.data[0].o_nama_member}</td> 
                                        </tr>
                                        <tr> 
                                            <td style={{paddingBottom:'7px'}}>Tanggal Lahir</td> 
                                            <td style={{paddingBottom:'7px',wordBreak: 'break-all'}}>: {moment(profil.data[0].o_tgl_lahir).format('DD MMMM YYYY')}</td> 
                                        </tr>
                                        <tr> 
                                            <td style={{paddingBottom:'7px'}}>Alamat</td> 
                                            <td style={{paddingBottom:'7px',wordBreak: 'break-all'}}>: {profil.data[0].o_alamat}</td> 
                                        </tr>
                                        <tr> 
                                            <td style={{paddingBottom:'7px'}}>Kota</td> 
                                            <td style={{paddingBottom:'7px',wordBreak: 'break-all'}}>: {profil.data[0].o_kota}</td> 
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="row ml-0 mr-0 mt-3">
                                <p className="title-profil">Membership</p>
                            </div>
                            <div className="row m-0 body-profil">
                                <table style={{color:'#6A6A6A',fontSize:'11pt'}}>
                                    <tbody>
                                        <tr> 
                                            <td style={{paddingBottom:'7px'}}>ID Member</td> 
                                            <td style={{paddingBottom:'7px',wordBreak: 'break-all'}}>: {profil.userID}</td> 
                                        </tr>
                                        <tr> 
                                            <td style={{paddingBottom:'7px'}}>Jabatan</td> 
                                            <td style={{paddingBottom:'7px',wordBreak: 'break-all'}}>: {profil.data[0].o_jabatanmember}</td> 
                                        </tr>
                                        <tr> 
                                            <td style={{paddingBottom:'7px'}}>Telepon</td> 
                                            <td style={{paddingBottom:'7px',wordBreak: 'break-all'}}>: {profil.data[0].o_hp}</td> 
                                        </tr>
                                        <tr> 
                                            <td style={{paddingBottom:'7px'}}>Email</td> 
                                            <td style={{paddingBottom:'7px',wordBreak: 'break-all'}}>: {profil.data[0].o_mail}</td> 
                                        </tr>
                                        <tr> 
                                            <td style={{paddingBottom:'7px'}}>Tanggal Daftar</td> 
                                            <td style={{paddingBottom:'7px',wordBreak: 'break-all'}}>: {moment(profil.data[0].o_tgl_daftar).format('DD MMMM YYYY')}</td> 
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="row ml-0 mr-0 mt-3">
                                <p className="title-profil">Data bank</p>
                            </div>
                            <div className="row m-0 body-profil">
                                <table style={{color:'#6A6A6A',fontSize:'11pt'}}>
                                    <tbody>
                                        <tr> 
                                            <td style={{paddingBottom:'7px'}}>Bank</td> 
                                            <td style={{paddingBottom:'7px',wordBreak: 'break-all'}}>: {profil.data[0].o_bank}</td> 
                                        </tr>
                                        <tr> 
                                            <td style={{paddingBottom:'7px'}}>Nomor Rekening</td> 
                                            <td style={{paddingBottom:'7px',wordBreak: 'break-all'}}>: {profil.data[0].o_norec}</td> 
                                        </tr>
                                        <tr> 
                                            <td style={{paddingBottom:'7px'}}>Nama Pemilik</td> 
                                            <td style={{paddingBottom:'7px',wordBreak: 'break-all'}}>: {profil.data[0].o_pemilikrekening}</td> 
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="row ml-0 mr-0 mt-3 mb-3">
                                <p className="title-profil">Pengaturan Akun</p>
                            </div>
                            <div className="row m-0">
                                <div className="btn-pengaturan-akun" data-toggle="modal" data-target="#ubahPassword">
                                    Ubah Password
                                </div>
                                <div className="btn-pengaturan-akun" data-toggle="modal" data-target="#ubahPin">
                                    Ubah PIN
                                </div>
                            </div>
                        </div>
                    </div>
                } 
                <PengaturanPassword/>
                <PengaturanPin/>
        </div>
        )
    }
} 



const mapStateToProps = (state) => ({
    data:state.riwayatTransaksi
})
// const mapDispatchToProps = dispatch => ({
//     showDetileProfile:
// })
export default connect(mapStateToProps,null)(Profil)
