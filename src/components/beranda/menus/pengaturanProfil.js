import React, { Component } from 'react'
// import axios from 'axios'
import LoadingPage from '../../loadingPage'
// import {API,ACCOUNT_PROFILE,APLUS,X_API_KEY} from '../../../api/index'
import { connect } from 'react-redux'
import moment from 'moment'
// import Swal from 'sweetalert2'

class PengaturanProfil extends Component {
    constructor(){
        super()
        this.state={
            loading : true,
            profil:[]
        }
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

    }
    render() {
        // console.log(this.props.data.profile)
        if(this.state.loading === true){
            return(
                <LoadingPage/>
            )
        }
        // const profil = this.state.profil.data[0]
        const profil = this.props.data.profile
        return (
            <div>
                {this.props.data.profile.data[0] === undefined ? "" :
                <div>
                    <div className='mb-1' style={styles.Shadow}> 
                        <p className='pl-2' style={styles.pHead}>
                            Data Diri
                        </p>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div className='m-2'>
                                    <p style={{fontSize:'11px', color:'#827D7D'}} className="mb-1">
                                        <b>Nomor Identitas (KTP) : </b>
                                    </p>
                                    <p style={{fontSize:'11px', color:'#827D7D'}} className="mb-0">
                                         {profil.data[0].no_ktp}
                                    </p>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className='m-2'>
                                    <p style={{fontSize:'11px', color:'#827D7D'}} className="mb-1">
                                        <b>Nama : </b>
                                    </p>
                                    <p style={{fontSize:'11px', color:'#827D7D'}} className="mb-0">
                                         {profil.data[0].o_nama_member}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div className='m-2'>
                                    <p style={{fontSize:'11px', color:'#827D7D'}} className="mb-1">
                                        <b>ID Member : </b>
                                    </p>
                                    <p style={{fontSize:'11px', color:'#827D7D'}} className="mb-0">
                                         {profil.userID}
                                    </p>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className='m-2'>
                                    <p style={{fontSize:'11px', color:'#827D7D'}} className="mb-1">
                                        <b>Tanggal Lahir : </b>
                                    </p>
                                    <p style={{fontSize:'11px', color:'#827D7D'}} className="mb-0">
                                         { moment(profil.data[0].o_tgl_lahir).format('DD MMMM YYYY') }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div className='m-2'>
                                    <p style={{fontSize:'11px', color:'#827D7D'}} className="mb-1">
                                        <b>Alamat : </b>
                                    </p>
                                    <p style={{fontSize:'11px', color:'#827D7D'}} className="mb-0">
                                         {profil.data[0].o_alamat}
                                    </p>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className='m-2'>
                                    <p style={{fontSize:'11px', color:'#827D7D'}} className="mb-1">
                                        <b>Kota : </b>
                                    </p>
                                    <p style={{fontSize:'11px', color:'#827D7D'}} className="mb-0">
                                         {profil.data[0].o_kota}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div className='m-2'>
                                    <p style={{fontSize:'11px', color:'#827D7D'}} className="mb-1">
                                        <b>Nomor HP : </b>
                                    </p>
                                    <p style={{fontSize:'11px', color:'#827D7D'}} className="mb-0">
                                         {profil.data[0].o_hp}
                                    </p>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className='m-2'>
                                    <p style={{fontSize:'11px', color:'#827D7D'}} className="mb-1">
                                        <b>Email : </b>
                                    </p>
                                    <p style={{fontSize:'11px', color:'#827D7D'}} className="mb-0">
                                         {profil.data[0].o_mail}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div className='m-2'>
                                    <p style={{fontSize:'11px', color:'#827D7D'}} className="mb-1">
                                        <b>Karir : </b>
                                    </p>
                                    <p style={{fontSize:'11px', color:'#827D7D'}} className="mb-0">
                                         {profil.data[0].o_jabatanmember}
                                    </p>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className='m-2'>
                                    <p style={{fontSize:'11px', color:'#827D7D'}} className="mb-1">
                                        <b>Tanggal Daftar : </b>
                                    </p>
                                    <p style={{fontSize:'11px', color:'#827D7D'}} className="mb-0">
                                         { moment(profil.data[0].o_tgl_daftar).format('DD MMMM YYYY') }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-1' style={styles.Shadow}> 
                        <p className='pl-2' style={styles.pHead}>
                            Rekening Pribadi
                        </p>
                        <ul className="list-group">
                            <li className="list-group-item rounded-0 p-2">
                                <p className='mb-0 rek-font' style={styles.RekP}><b>Rekening Bank</b></p>
                                <p className='mb-0 rek-font' style={styles.RekP}> {profil.data[0].o_bank} </p>
                            </li>
                            <li className="list-group-item rounded-0 p-2">
                                <p className='mb-0 rek-font'  style={styles.RekP}><b>Nomor Rekening</b></p>
                                <p className='mb-0 rek-font'  style={styles.RekP}> {profil.data[0].o_norec} </p> 
                            </li>
                            <li className="list-group-item rounded-0 p-2">
                                <p className='mb-0 rek-font'  style={styles.RekP}><b>Pemilik</b></p>
                                <p className='mb-0 rek-font'  style={styles.RekP}> {profil.data[0].o_nama_member} </p>
                            </li>
                        </ul>
                    </div>
                    {/* <div className='row p-3'>
                        <div className='col-sm-3'></div>
                        <div className='col-sm-3'></div>
                        <div className='col-sm-3'></div>
                        <div className='col-sm-3'>
                            <p style={styles.btnWhite} align='center'>Tutup Halaman</p>
                        </div>
                    </div> */}
                </div>


                }
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    data:state.riwayatTransaksi
})

export default connect(mapStateToProps,null)(PengaturanProfil)



const styles = {
    pHead:{
        backgroundColor:'#2E7D32',
        paddingTop:'10px',
        marginBottom:'0px', 
        height:'40px',
        color:'white',
        fontSize:'8pt'
    },
    RekP:{
        fontSize:'10pt',
        color:'#787474'
    },
    Shadow:{
        boxShadow: '0px 0px 6px #00000029',
        backgroundColor: '#FFFFFF'
    },
    btnGreen:{
        fontSize:'12px', color:'#FFFFFF', backgroundColor:'#2E7D32', width: '150px',padding:'0px',height:'40px',boxShadow: '0px 0px 6px #00000029'
    },
    btnWhite:{
        fontSize:'12px', color:'#2E7D32', backgroundColor:'white', width: '150px',height:'40px',boxShadow: '0px 0px 6px #00000029',paddingTop:'10px'
    },
}
