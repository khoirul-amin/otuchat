import React, { Component } from 'react'
import Tagihanlistrik from './menus/tagihanlistrik'
import Bpjs from './menus/bpjs'
import Telkom from './menus/telkom'
import Tvkabel from './menus/tvkabel'
import Pdam from './menus/pdam'
import Pascabayar from './menus/pascabayar'
import Pgn from './menus/pgn'
import Finance from './menus/finance'
import Kartukredit from './menus/kartukredit'
import Pbb from './menus/pbb'
import Asuransi from './menus/asuransi'

export default class tagihan extends Component {
    state={
        list: 'tagihan'
    }
    handleClick(data){
        if(this.state.list !== data){
            this.setState({ list : data })
        }
    }

    render() {
        return (
            <div>
                <div className='col-sm-12 border pt-3 shadow new-radius'>
                    <div className='row justify-content-center m-0'>
                        <div className="custom-col" align="center">
                            <a id="nav-tagihanlistrik-tab" data-toggle="tab" href="#nav-tagihanlistrik" role="tab" aria-controls="nav-tagihanlistrik" aria-selected="true" 
                                className={this.state.list === 'tagihan' ? 'pembayaran-product aktif' : 'pembayaran-product'} 
                                onClick={() => this.handleClick('tagihan')} >
                                <div className='product-image'>
                                    <img src={require('../../images/buttonImage/tagihan_listrik.svg')} width='70%' height='70%' alt='logo' />
                                </div>
                                <p className='list-product mt-2' align='center'>Tagihan Listrik</p>
                            </a>
                        </div>
                        <div className="custom-col" align="center">
                            <a id="nav-bpjs-tab" data-toggle="tab" href="#nav-bpjs" role="tab" aria-controls="nav-bpjs" aria-selected="false" 
                                className={this.state.list === 'bpjs' ? 'pembayaran-product aktif' : 'pembayaran-product'} 
                                onClick={() => this.handleClick('bpjs')} >
                                <div className='product-image'>
                                    <img src={require('../../images/buttonImage/bpjs.svg')} width='70%' height='70%' alt='logo' />
                                </div>
                                <p className='list-product mt-2' align='center'>BPJS</p>
                            </a>
                        </div>
                        <div className="custom-col" align="center">
                            <a id="nav-telkom-tab" data-toggle="tab" href="#nav-telkom" role="tab" aria-controls="nav-telkom" aria-selected="false"  
                                className={this.state.list === 'telkom' ? 'pembayaran-product aktif' : 'pembayaran-product'} 
                                onClick={() => this.handleClick('telkom')} >
                                <div className='product-image'>
                                    <img src={require('../../images/buttonImage/telkom.svg')} width='70%' height='70%' alt='logo' />
                                </div>
                                <p className='list-product mt-2' align='center'>Telkom</p>
                            </a>
                        </div>
                        <div className="custom-col" align="center">
                            <a id="nav-tvkabel-tab" data-toggle="tab" href="#nav-tvkabel" role="tab" aria-controls="nav-tvkabel" aria-selected="false"  
                                className={this.state.list === 'tvkabel' ? 'pembayaran-product aktif' : 'pembayaran-product'} 
                                onClick={() => this.handleClick('tvkabel')} >
                                <div className='product-image'>
                                    <img src={require('../../images/buttonImage/tv_kabel.svg')} width='70%' height='70%' alt='logo' />
                                </div>
                                <p className='list-product mt-2' align='center'>TV Kabel</p>
                            </a>
                        </div>
                        <div className="custom-col" align="center">
                            <a id="nav-pdam-tab" data-toggle="tab" href="#nav-pdam" role="tab" aria-controls="nav-pdam" aria-selected="false"  
                                className={this.state.list === 'pdam' ? 'pembayaran-product aktif' : 'pembayaran-product'} 
                                onClick={() => this.handleClick('pdam')} >
                                <div className='product-image'>
                                    <img src={require('../../images/buttonImage/pdam.svg')} width='70%' height='70%' alt='logo' />
                                </div>
                                <p className='list-product mt-2' align='center'>PDAM</p>
                            </a>
                        </div>
                        <div className="custom-col" align="center">
                            <a id="nav-pascabayar-tab" data-toggle="tab" href="#nav-pascabayar" role="tab" aria-controls="nav-pascabayar" aria-selected="false"  
                                className={this.state.list === 'pascabayar' ? 'pembayaran-product aktif' : 'pembayaran-product'} 
                                onClick={() => this.handleClick('pascabayar')} >
                                <div className='product-image'>
                                    <img src={require('../../images/buttonImage/pasca_bayar.svg')} width='70%' height='70%' alt='logo' />
                                </div>
                                <p className='list-product mt-2' align='center'>Pasca Bayar</p>
                            </a>
                        </div>
                        <div className="custom-col" align="center">
                            <a id="nav-finance-tab" data-toggle="tab" href="#nav-finance" role="tab" aria-controls="nav-finance" aria-selected="false"  
                                className={this.state.list === 'finance' ? 'pembayaran-product aktif' : 'pembayaran-product'} 
                                onClick={() => this.handleClick('finance')} >
                                <div className='product-image'>
                                    <img src={require('../../images/buttonImage/finance.svg')} width='70%' height='70%' alt='logo' />
                                </div>
                                <p className='list-product mt-2' align='center'>Finance</p>
                            </a>
                        </div>
                        <div className="custom-col" align="center">
                            <a id="nav-kredit-tab" data-toggle="tab" href="#nav-kredit" role="tab" aria-controls="nav-kredit" aria-selected="false"  
                                className={this.state.list === 'kredit' ? 'pembayaran-product aktif' : 'pembayaran-product'} 
                                onClick={() => this.handleClick('kredit')} >
                                <div className='product-image'>
                                    <img src={require('../../images/buttonImage/kartu_kredit.svg')} width='70%' height='70%' alt='logo' />
                                </div>
                                <p className='list-product mt-2' align='center'>Kartu Kredit</p>
                            </a>
                        </div>
                        <div className="custom-col" align="center">
                            <a id="nav-pgn-tab" data-toggle="tab" href="#nav-pgn" role="tab" aria-controls="nav-pgn" aria-selected="false"  
                                className={this.state.list === 'pgn' ? 'pembayaran-product aktif' : 'pembayaran-product'} 
                                onClick={() => this.handleClick('pgn')} >
                                <div className='product-image'>
                                    <img src={require('../../images/buttonImage/pgn.svg')} width='70%' height='70%' alt='logo' />
                                </div>
                                <p className='list-product mt-2' align='center'>PGN</p>
                            </a>
                        </div>
                        <div className="custom-col" align="center">
                            <a id="nav-pbb-tab" data-toggle="tab" href="#nav-pbb" role="tab" aria-controls="nav-pbb" aria-selected="false"  
                                className={this.state.list === 'pbb' ? 'pembayaran-product aktif' : 'pembayaran-product'} 
                                onClick={() => this.handleClick('pbb')} >
                                <div className='product-image'>
                                    <img src={require('../../images/buttonImage/PBB.svg')} width='70%' height='70%' alt='logo' />
                                </div>
                                <p className='list-product mt-2' align='center'>PBB</p>
                            </a>
                        </div>
                        <div className="custom-col" align="center">
                            <a id="nav-asuransi-tab" data-toggle="tab" href="#nav-asuransi" role="tab" aria-controls="nav-asuransi" aria-selected="false"  
                                className={this.state.list === 'asuransi' ? 'pembayaran-product aktif' : 'pembayaran-product'} 
                                onClick={() => this.handleClick('asuransi')} >
                                <div className='product-image'>
                                    <img src={require('../../images/buttonImage/asuransi.svg')} width='70%' height='70%' alt='logo' />
                                </div>
                                <p className='list-product mt-2' align='center'>Asuransi</p>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-tagihanlistrik" role="tabpanel" aria-labelledby="nav-tagihanlistrik-tab"> 
                        <Tagihanlistrik/>
                    </div>
                    <div className="tab-pane fade" id="nav-bpjs" role="tabpanel" aria-labelledby="nav-bpjs-tab"> 
                        <Bpjs/>
                    </div>
                    <div className="tab-pane fade" id="nav-telkom" role="tabpanel" aria-labelledby="nav-telkom-tab"> 
                        <Telkom/>
                    </div>
                    <div className="tab-pane fade" id="nav-tvkabel" role="tabpanel" aria-labelledby="nav-tvkabel-tab"> 
                        <Tvkabel/>
                    </div>
                    <div className="tab-pane fade" id="nav-pdam" role="tabpanel" aria-labelledby="nav-pdam-tab"> 
                        <Pdam/>
                    </div>
                    <div className="tab-pane fade" id="nav-pascabayar" role="tabpanel" aria-labelledby="nav-pascabayar-tab"> 
                        <Pascabayar/>
                    </div>
                    <div className="tab-pane fade" id="nav-pgn" role="tabpanel" aria-labelledby="nav-pgn-tab"> 
                        <Pgn/>
                    </div>
                    <div className="tab-pane fade" id="nav-finance" role="tabpanel" aria-labelledby="nav-finance-tab"> 
                        <Finance/>
                    </div>
                    <div className="tab-pane fade" id="nav-kredit" role="tabpanel" aria-labelledby="nav-kredit-tab"> 
                        <Kartukredit/>
                    </div>
                    <div className="tab-pane fade" id="nav-pbb" role="tabpanel" aria-labelledby="nav-pbb-tab"> 
                        <Pbb/>
                    </div>
                    <div className="tab-pane fade" id="nav-asuransi" role="tabpanel" aria-labelledby="nav-asuransi-tab"> 
                        <Asuransi/>
                    </div>
                </div>
            </div>
        )
    }
}