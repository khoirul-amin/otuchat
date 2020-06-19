import React, { Component } from 'react'
// import LoadingPage from '../loadingPage'
import '../../assets/styleRiwayat.css'
import '../../assets/style.css'
import { connect } from 'react-redux'
import DetileRiwayat from './menus/DetileRiwayat'
import {convertCurrency} from '../payment/commons/commonLib'

class Riwayat extends Component {
    constructor(){
        super()
        this.state={
            loading:true,
            history : [],
            list: 'Saldo',
            jenisRiwayat: 1,
            menuRiwayat: 'Riwayat Transaksi'
        }
    }
    setJenisRiwayat(data){
        if(data === 1) {
            this.setState({menuRiwayat: 'Riwayat Transaksi', jenisRiwayat:1})
        }else if(data === 2) {
            this.setState({menuRiwayat: 'Riwayat Top Up', jenisRiwayat:2})
        }else if(data === 3) {
            this.setState({menuRiwayat: 'Riwayat Saldo', jenisRiwayat:3})
        }else if(data === 4) {
            this.setState({menuRiwayat: 'Riwayat Penarikan', jenisRiwayat:4})
        }else  if(data === 5) {
            this.setState({menuRiwayat: 'Riwayat Point', jenisRiwayat:5})
        } else if(data === 6) {
            this.setState({menuRiwayat: 'Riwayat Transfer Antar Member', jenisRiwayat:data})
        }
    }

    lihatHistory(){
        // this.getDataTables(this.state.jenisRiwayat)
        this.props.dataRiwayat(this.state.jenisRiwayat)
    }

    componentDidMount() {
        const isLogin = JSON.parse(localStorage.getItem('isLogin'))
        this.setState({isLogin:isLogin})
        if (!isLogin){
            window.location = '/'
        }
    }
    render() {
        const saldo = this.props.data.saldo
        return (
            <div>
                <div className="row mt-3 new-radius mb-0 ml-0 mr-0 align-items-center" style={{background:'#F2F2F2' }}>
                    <div className="col-sm-6">
                        <div className="row ml-0 mr-0 mt-2 mb-2">
                            <div className="col-sm-6 p-0" style={{color:'#4BB04E'}}>
                                <p className="mb-0" style={{fontSize:'11pt'}}>Saldo</p>
                                <p className="mb-0" style={{fontSize:'14pt',fontWeight:'500'}}>Rp {convertCurrency(saldo.sisa_uang)} </p>
                            </div>
                            <div className="col-sm-6 p-0" style={{color:'#707070'}}>
                                <p className="mb-0" style={{fontSize:'11pt'}}>Point</p>
                                <p className="mb-0" style={{fontSize:'14pt',fontWeight:'500'}}>Rp {convertCurrency(saldo.bonus_member)} </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className='row margin-search'>
                            <div className='' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  >
                                {this.state.jenisRiwayat === '' ?
                                    <p className='mb-0 ml-3 button-pilih p-2 pl-3 pr-3'>  
                                        ........ 
                                    </p>
                                        :
                                    <p className='mb-0 ml-3 button-pilih p-2 pl-3 pr-3'>  
                                        {this.state.menuRiwayat}  <i style={{float:"right"}} className="fa mt-1 fa-chevron-down"> </i> 
                                    </p>
                                }
                            </div>
                            <div className="dropdown-menu riwayat-list ml-3 rounded-0 p-0">
                                <p onClick={()=>this.setJenisRiwayat(1)}> Riwayat Transaksi </p>
                                <p onClick={()=>this.setJenisRiwayat(2)}> Riwayat Top Up </p>
                                <p onClick={()=>this.setJenisRiwayat(3)}> Riwayat Saldo </p>
                                <p onClick={()=>this.setJenisRiwayat(4)}> Riwayat Penarikan </p>
                                <p onClick={()=>this.setJenisRiwayat(5)}> Riwayat Point </p>
                                <p onClick={()=>this.setJenisRiwayat(6)}> Riwayat Transfer Antar Member </p>
                            </div>
                            <div className='col'>
                                <span className="buttonRiwayat" onClick={()=>this.lihatHistory()} type="submit">Lihat</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3 ml-0 mr-0'> 
                    <div className='col-sm-12 p-0 scroll-riwayat'>
                        <DetileRiwayat/>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) =>({
    data : state.riwayatTransaksi
})

const mapDispatchToProps = dispatch =>({
    dataRiwayat : (data)=> dispatch({type:'DATA_RIWAYAT', value:{data}})
})

export default connect(mapStateToProps, mapDispatchToProps)(Riwayat)