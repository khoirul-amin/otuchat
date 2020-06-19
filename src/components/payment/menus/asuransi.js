import React, { Component } from 'react'
import LoadingPage from '../../loadingPage';
import {API,PASCABAYAR_PRODUCT,APLUS,X_API_KEY} from '../../../api/index'
import axios from 'axios'

class Asuransi extends Component {
    constructor(){
        super()
        this.state={
            cekTagihan: '',
            loading: true,
            nomor: '',
            nomorPelanggan:'',
            product:[],
            pdam:[],
            resTagihan:[],
            code:'',
            wilayah:''
        }
    }


    componentDidMount(){
        const isLogin = JSON.parse(localStorage.getItem('isLogin')) 
        if (isLogin){
            const header={
                'X-Api-Key' : X_API_KEY
            }
            const body ={
                'userID' : isLogin.userID,
                'aplUse':APLUS,
                'accessToken' : isLogin.mbr_token,
                'productGroup' : 'ASURANSI'
            }
            axios.post(API+PASCABAYAR_PRODUCT, body, {headers:header} )
            .then(res => {
                // console.log(res.data)
                if(res.data.errNumber !== '0'){

                }else{
                    let product = res.data.productList.filter(
                    (b) => {
                        return b.isactive.indexOf('Active') !== -1;
                    }
                    )
                    this.setState({ product:product, loading:false  });
                }
            })
            .catch(error => {
                // console.log(error.response)
            });
        }else{
            window.location = '/'
        }
      }


    render() {
        if(this.state.loading === true){
            return<LoadingPage/>
        }
        return (
            <div>
                <div className=' border shadow p-3 mt-3 mb-3 new-radius'>
                    <div className="row mt-2">
                        <div className='col-sm-12'>
                            <h3 style={{color:'#2E7D32',marginTop:'10px',marginBottom:'10px'}} >Asuransi</h3>
                        </div>
                    </div>
                    <div className='row m-0'>
                        { this.state.product[0] === undefined  ? 
                        <div className='col-sm-12'>
                            <p align='center'>Product Sedang Maintenance</p>
                        </div> 
                        : 
                        <div></div> }
                    </div>
                </div>
            </div>
        )
    }
}
export default Asuransi