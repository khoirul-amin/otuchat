import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Market extends Component {
    render() {
        return (
            <div className='col-sm-12 border pt-3 shadow'>
                <div id="tagihan" className='row justify-content-md-center nav nav-tabs'>
                    <Link to='/home/payment' className='pembayaran-product aktif'>
                        <div className='product-image'>
                            <img src={require('../../images/buttonImage/OTUMitra.svg')} width='100%' height='100%' alt='logo' />
                        </div>
                        <p className='list-product mt-2' align='center'>OTU MITRA</p>
                    </Link>
                </div>
                <div className="tab-content" id="nav-tabContent">

                </div>
            </div>
        )
    }
}