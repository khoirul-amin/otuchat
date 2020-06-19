import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class donasi extends Component {


    render() {
        return (
            <div>
                <div className='col-sm-12 border pt-3 shadow'>
                    <div id="tagihan" className='row justify-content-md-center nav nav-tabs'>
                        <Link to='/home/payment' className='pembayaran-product aktif'>
                            <div className='product-image'>
                                <img src={require('../../images/buttonImage/cinta_anak.svg')} width='100%' height='100%' alt='logo' />
                            </div>
                            <p className='list-product mt-2' align='center'>Yayasan Cinta Anak</p>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}