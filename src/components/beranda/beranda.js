import React, { Component } from 'react'
import Informasi from './informasi'
import DaftarMember from './daftarMember'
import PendaftaranAnggota from './pendaftaranAnggota'
import Riwayat from './riwayat'
import '../../assets/responsivePage.css'
import '../../assets/styleDashboard.css'
// import {} from '../../api/index'
// import axios from 'axios' 
import { connect } from 'react-redux'
import LoadingPage from '../loadingPage'
import Profil from '../profil'
import Swal from 'sweetalert2'
import AjakDanRaih from './menus/AjakDanRaih'

class Beranda extends Component {
    constructor(){
        super()
        this.state={
            isLogin:'Ok',
            status:'',
            linkRef :'https://payment.otuchat.com/refferal/',
            subMenu:'informasi'
        }
    }
    componentDidMount(){
        const isLogin = JSON.parse(localStorage.getItem('isLogin'))
        
        // console.log(isLogin) 
        this.setState({isLogin})
        if (!isLogin){
            window.location = '/'
        }else{
        }
        if(this.props.directProfil.directProfil === 'profil'){
            // console.log(this.props.directProfil.directProfil)
            this.setState({subMenu:'profil'})
        }
        switch(this.props.data.profile.data[0].o_jabatanmember){
            case '1-STAR': 
                this.setState({status: 'col-sm-6 bgcart-1star'}); 
            break;
            case '2-STAR':
                this.setState({status: 'col-sm-6 bgcart-2star'}); 
            break;
            case '3-STAR':
                this.setState({status: 'col-sm-6 bgcart-3star'}); 
            break;
            case '4-STAR':
                this.setState({status: 'col-sm-6 bgcart-4star'}); 
            break;
            case '5-STAR':
                this.setState({status: 'col-sm-6 bgcart-5star'}); 
            break;
            case '6-STAR':
                this.setState({status: 'col-sm-6 bgcart-6star'}); 
            break;
            case 'AMBASSADOR':
                this.setState({status: 'col-sm-6 bgcart-ambasador'}); 
            break;
            case 'HEAD BISNIS MANAGER':
                this.setState({status: 'col-sm-6 bgcart-hbmanager'}); 
            break;
            case 'BISNIS MANAGER':
                this.setState({status: 'col-sm-6 bgcart-bmanager'}); 
            break;
            case 'CROWN AMBASSADOR':
                this.setState({status: 'col-sm-6 bgcart-crown'}); 
            break;
            case 'FC':
                this.setState({status: 'col-sm-6 bgcart-fc'}); 
            break;
            case 'MANAGER':
                this.setState({status: 'col-sm-6 bgcart-manager'}); 
            break;
            case 'FREE':
                this.setState({status: 'col-sm-6 bgcart-free'}); 
            break;
            case 'RESELLER SIGNATURE':
                this.setState({status: 'col-sm-6 bgcart-signature'}); 
            break;
            case 'RESELLER PLATINUM':
                this.setState({status: 'col-sm-6 bgcart-platinum'}); 
            break;
            case 'RESELLER GOLD':
                this.setState({status: 'col-sm-6 bgcart-gold'}); 
            break;
            case 'RESELLER SILVER':
                this.setState({status: 'col-sm-6 bgcart-silver'}); 
            break;
            default:
                this.setState({status: 'col-sm-6 bgcart-free'}); 
            break;
        }
    }
    directPage(data){

        this.setState({subMenu:data})
        this.props.directToProfil(data)
    }
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
        // console.log(this.props.directProfil)
        if(this.state.isLogin === null){
            alert('Login')
        }
        const data = this.props.data
        if(!this.props.data.profile.data ){
            return <LoadingPage/>
        }
        return (
            <div className="row ml-0 mr-0 responsiveAll" >
                    <div className='container'> 
                        <div className="row m-0 mt-3">
                            <div className="col mt-3 p-0">
                                <div className="row m-2">
                                    <div className="">
                                        { !this.state.isLogin.avatar ? 
                                            <img src={require("../../images/profil.svg")} alt='profil' className='rounded-circle img-dashboard' />
                                        :
                                            <img src={this.state.isLogin.avatar} alt='profil' className='rounded-circle img-dashboard' />
                                        }
                                    </div>
                                    <div className="col p-0 mt-2">
                                        <div className="row m-0">
                                            <div className="col-sm p-0">
                                                <h4>{ data.profile.data[0].o_nama_member }</h4>
                                                    <p className='mb-0' style={{}}>{ data.profile.userID }
                                                    <span style={{padding:'2px 10px',marginLeft:'10px',background:'#66BB68 0% 0% no-repeat padding-box',fontSize:'10pt',borderRadius:'15px', color:'#FFFFFF'}}>
                                                        { data.profile.data[0].o_jabatanmember }
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="mt-2">
                                                <p data-toggle="modal" data-target="#AjakDanRaih"
                                                style={{ border: '1px solid #FFC001',borderRadius: '10px',background:'#FFC001 0% 0% no-repeat padding-box',color: '#FFFFFF',padding:'5px 10px',cursor:'pointer'}}>
                                                    AJAK DAN RAIH
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                <div className="row m-0">
                                    <div>
                                        <div className="dummy"></div>
                                    </div>
                                    <div className="col-sm p-0 menu-beranda">
                                        <div className="row m-0">
                                            <div align="center" 
                                                className={this.state.subMenu === 'informasi' ? 'col sub-menu-beranda sub-menu-aktiv' : 'col sub-menu-beranda'}
                                                onClick={()=>this.directPage('informasi')}
                                            >
                                                Informasi
                                            </div>
                                            <div align="center" 
                                                className={this.state.subMenu === 'profil' ? 'col sub-menu-beranda sub-menu-aktiv' : 'col sub-menu-beranda'}
                                                onClick={()=>this.directPage('profil')}
                                            >
                                                Profil
                                            </div>
                                            <div  align="center" 
                                                className={this.state.subMenu === 'group' ? 'col sub-menu-beranda sub-menu-aktiv' : 'col sub-menu-beranda'}
                                                onClick={()=>this.directPage('group')}
                                            >
                                                Group
                                            </div>
                                            <div align="center"
                                                className={this.state.subMenu === 'pendaftaran' ? 'col sub-menu-beranda sub-menu-aktiv' : 'col sub-menu-beranda'}
                                                onClick={()=>this.directPage('pendaftaran')}
                                            >
                                                Pendaftaran Anggota
                                            </div>
                                            <div align="center" 
                                                className={this.state.subMenu === 'riwayat' ? 'col sub-menu-beranda sub-menu-aktiv' : 'col sub-menu-beranda'}
                                                onClick={()=>this.directPage('riwayat')}
                                            >
                                                Riwayat
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                                    
                        </div>

                        <AjakDanRaih/>
                        <div className="tab-content" id="myTabContent">
                            {this.state.subMenu === "informasi" ? <Informasi/> : '' }
                            {this.state.subMenu === "group" ? <DaftarMember/> : '' }
                            {this.state.subMenu === "pendaftaran" ? <PendaftaranAnggota/> : '' }
                            {this.state.subMenu === "riwayat" ? <Riwayat/> : '' }
                            {this.state.subMenu === "profil" ?  <Profil/> : '' }
                        </div>
                    </div> 


            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data:state.riwayatTransaksi,
    directProfil: state.firstReducer
})

const mapDispatchToProps  = (dispatch) => ({
    directToProfil : (data)=> dispatch({ type : 'DIRECT_TO_PROFIL', value : data  })
})
export default  connect(mapStateToProps, mapDispatchToProps )(Beranda)

