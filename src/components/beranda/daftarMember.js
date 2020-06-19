import React, { Component } from 'react'
import axios from 'axios'
import {API, GET_MEMBER_NETWORK, X_API_KEY} from '../../api/index'
import LoadingPage from '../loadingPage'

class DaftarMember extends Component {
    constructor(){
        super()
        this.state={
            loading:true,
            downline:'',
            countDownline:0,
            userID:'',
            isLogin:'',
            upline:''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        this.setState({[e.target.name] : e.target.value})
    }

    componentDidMount() {
        const isLogin = JSON.parse(localStorage.getItem('isLogin'))
        this.setState({isLogin:isLogin})
        // console.log(isLogin)
        if (!isLogin){
            window.location = '/'
        } else {
            this.setState({userID:isLogin.userID})
            const header={
                'X-Api-Key' : X_API_KEY
            }
            const body ={
                'userID' : isLogin.userID,
            }
            axios.post(API+GET_MEMBER_NETWORK, body, {headers:header} )
            .then(res => {
                const downline = res.data;
                // console.log(downline.data)
                if(downline.data){
                    this.setState({ downline :downline.data, loading:false, countDownline:downline.data.length });
                }else{
                    this.setState({ downline :downline.data, loading:false });
                }
            })
            .catch(error => {
                console.log(error.response)
            });
        }
    }

    search(searchData){
        this.setState({upline:searchData})
        // console.log(searchData)
        const header={
            'X-Api-Key' : X_API_KEY
        }
        const body ={
            'userID' : searchData.Ekl,
        }
        axios.post(API+GET_MEMBER_NETWORK, body, {headers:header} )
        .then(res => {
            const downline = res.data;
            this.setState({ downline :downline.data, loading:false, countDownline:downline.data.length  });
        })
        .catch(error => {
            console.log(error.response)
        });
    }

    render() {
        // console.log(this.state.upline)
        if(this.state.loading === true){
            return(
                <LoadingPage/>
            ) 
        }
        return (
            <div>
                <div className='row mt-3'> 
                    <div className='container'> 
                        <div className="row m-0 mb-3">
                            <div className="col p-0 new-radius" style={{border:'3px solid #F2F2F2'}}>
                                <div style={{backgroundColor:'#F2F2F2',borderRadius:'5px 5px 0px 0px' }} className="p-3">
                                    <div className="col-sm-12">
                                        <div className="row align-items-center">
                                            <div className="col-sm-6 p-0" style={{color:'#707070'}}>
                                                <span style={{fontWeight:'500'}}>Member Group</span>
                                            </div>
                                            <div className="col-sm-6 p-0" style={{color:'#707070'}}>
                                                <div className="row m-0">
                                                    <div className="p-0 right">
                                                        <img src={require('../../images/icon/upline.svg')} width="30px" alt="logo"/>
                                                        <span className="ml-2" style={{fontWeight:'500'}}>Upline</span>
                                                    </div>
                                                    {this.state.upline ?
                                                        <div className="col pl-0">
                                                            <p className="mb-0 right-group"> {this.state.upline.Name} </p>
                                                            <p className="mb-0 right-group" style={{color:'#4BB04E'}}> {this.state.upline.Ekl} </p>
                                                        </div>
                                                    :
                                                        <div className="col pl-0">
                                                            <p className="mb-0 right-group"> {this.state.isLogin.name_member} </p>
                                                            <p className="mb-0 right-group" style={{color:'#4BB04E'}}> {this.state.isLogin.userID} </p>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='p-3 scroll-group'>                                    
                                    {this.state.countDownline === 0 ? 
                                        <p className="info-riwayat">
                                            Tidak mempunyai member
                                        </p>
                                    :
                                        <table id='Table' className="table table-bordered">
                                            <thead>
                                                <tr className='table-active'>
                                                    <td>Avatar</td>
                                                    <td>Data Downline</td>
                                                    <td>Action</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            { this.state.downline.map(downline=>(
                                                    <tr key={downline.Id}>
                                                        <td align="center">
                                                            <img src={downline.Image} width="60px" className="mt-2 rounded-circle" alt="avatar"/>
                                                        </td>
                                                        <td style={{color:'#827D7D', fontSize:'12px'}}>
                                                            <b>Nama</b> : {downline.Name} <br/>
                                                            <b>ID EKL</b> : {downline.Ekl} <br/>
                                                            <b>Title</b> : {downline.Title} <br/>
                                                            {downline.Transaksi}
                                                        </td>
                                                        <td>
                                                            <div className="btn-cek-downline" onClick={()=>this.search(downline)}>Lihat Downline</div>
                                                        </td>
                                                    </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    }
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        )
    }
}
export default DaftarMember