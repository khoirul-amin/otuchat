import React, { Component } from 'react'
import { API, GET_HISTORY, X_API_KEY, APLUS } from '../../../../api/index'
import { convertCurrency } from '../../../payment/commons/commonLib'
import axios from 'axios';
import DatePicker from "react-datepicker"
import moment from 'moment'
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';



const $ = require('jquery')
$.DataTable = require('datatables.net')



class RiwayatPenarikan extends Component {
    constructor() {
        super()
        this.state = {
            posts: '',
            startDate: null,
            endDate: null,
            startSearchDate: null,
            endSearchDate: null,
        }
    }
    _exporter;
    export = () => {
        this._exporter.save();
    }
    handleChangeStart = date => {
        this.setState({
            startDate: date,
            startSearchDate: moment(date).format('YYYY-MM-DD')
        });
    };
    handleChangeEnd = date => {
        this.setState({
            endDate: date,
            endSearchDate: moment(date).format('YYYY-MM-DD')
        });
    };
    componentDidMount() {
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 1);
        this.setState({
            startDate: firstDay,
            endDate: lastDay,
            startSearchDate: moment(firstDay).format('YYYY-MM-DD'),
            endSearchDate: moment(lastDay).format('YYYY-MM-DD')
        })
        const isLogin = JSON.parse(localStorage.getItem('isLogin'))
        const header = {
            'X-Api-Key': X_API_KEY
        }
        const body = {
            'userID': isLogin.userID,
            'aplUse': APLUS,
            'accessToken': isLogin.mbr_token,
            'requestID': 4,
            'start_date': moment(firstDay).format('YYYY-MM-DD'),
            'end_date': moment(lastDay).format('YYYY-MM-DD')
        }
        axios.post(API + GET_HISTORY, body, { headers: header })
            .then(res => {
                if (res.data.listData) {
                    const pages = res.data.listData.map(data => {
                        const bank = `<b>Bank :</b> ${data.bank} <br/> <b>Atas Nama :</b> ${data.atas_nama} <br/> <b>Nomor Rek :</b> ${data.nomer_rekening}`
                        const push = {
                            'tgl_deposit': data.tgl_penarikan,
                            'jml_penarikan': convertCurrency(data.jml_penarikan),
                            'bank': bank,
                            'status_penarikan': data.status_penarikan
                        }
                        return push
                    })
                    // console.log(pages)
                    this.setState({ posts: res.data.listData })
                    this.dataTable(pages)
                } else {
                    this.dataTable('')
                }
            })
    }
    cariData() {
        $('#dataTable').DataTable().destroy()
        const isLogin = JSON.parse(localStorage.getItem('isLogin'))
        const header = {
            'X-Api-Key': X_API_KEY
        }
        const body = {
            'userID': isLogin.userID,
            'aplUse': APLUS,
            'accessToken': isLogin.mbr_token,
            'requestID': 4,
            'start_date': this.state.startSearchDate,
            'end_date': this.state.endSearchDate
        }
        axios.post(API + GET_HISTORY, body, { headers: header })
            .then(res => {
                if (res.data.listData) {
                    // console.log(res.data.listData)
                    const pages = res.data.listData.map(data => {
                        const bank = `<b>Bank :</b> ${data.bank} <br/> <b>Atas Nama :</b> ${data.atas_nama} <br/> <b>Nomor Rek :</b> ${data.nomer_rekening}`
                        const push = {
                            'tgl_deposit': data.tgl_penarikan,
                            'jml_penarikan': convertCurrency(data.jml_penarikan),
                            'bank': bank,
                            'status_penarikan': data.status_penarikan
                        }
                        return push
                    })
                    // console.log(pages)
                    this.setState({ posts: res.data.listData })
                    this.dataTable(pages)
                } else {
                    this.dataTable('')
                }
            })
    }
    dataTable(dataT) {
        this.$el = $(this.el)
        this.$el.DataTable({
            data: dataT,
            lengthMenu: [
                [10, 50, 200, 1000],
                [10, 50, 200, 1000]
            ],
            order: [[ 0, "desc" ]],
            columns: [
                { "data": "tgl_deposit" },
                { "data": "jml_penarikan" },
                { "data": "bank" },
                { "data": "status_penarikan" }
            ]
        })
    }
    render() {
        // console.log(this.state.posts)
        return (
            <div>
                <div className="row ml-0 mr-0 mt-0 mb-2">
                    <DatePicker
                        className="input-search pl-2"
                        selected={this.state.startDate}
                        onChange={this.handleChangeStart}
                        dateFormat="dd-MM-yyyy"
                    />
                    <span className="p-2">Sampai</span>
                    <DatePicker
                        className="input-search pl-2"
                        selected={this.state.endDate}
                        onChange={this.handleChangeEnd}
                        dateFormat="dd-MM-yyyy"
                    />
                    <span onClick={() => this.cariData()} className="radius-pill ml-2" style={{ fontSize: '12px', color: '#ffffff', background: 'rgb(46, 125, 50)', width: '100px' }}>Cari</span>
                    {this.state.posts ?
                        <span onClick={this.export} className="radius-pill ml-2" style={{ fontSize: '12px', color: '#ffffff', background: 'rgb(46, 125, 50)', width: '100px' }}>Export</span>
                        : ''
                    }
                </div>
                <div>
                    {this.state.posts === '' ?
                        <table className='table-riwayat mb-2'>
                            <thead>
                                <tr>
                                    <th>Tanggal</th>
                                    <th>Nilai</th>
                                    <th>Bank</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan='4' align='center'>
                                        Loading..
                                </td>
                                </tr>
                            </tbody>
                        </table>
                        :
                        <table id="dataTable" className='table-riwayat mb-2' ref={el => this.el = el}>
                            <thead>
                                <tr>
                                    <th>Tanggal</th>
                                    <th>Nilai</th>
                                    <th>Bank</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                        </table>
                    }

                    <ExcelExport
                        data={this.state.posts}
                        fileName="Riwayat Penarikan.xlsx"
                        headerPaddingCellOptions={{ background: '#ff0000' }}
                        ref={(exporter) => { this._exporter = exporter; }}
                    >
                        <ExcelExportColumn field="tgl_penarikan" title="Tgl. Penarikan" />
                        <ExcelExportColumn field="jml_penarikan" title="Jumlah Penarikan" />
                        <ExcelExportColumn field="bank" title="Bank" />
                        <ExcelExportColumn field="nomer_rekening" title="No. Rek" />
                        <ExcelExportColumn field="atas_nama" title="Atas Nama" />
                        <ExcelExportColumn field="status_penarikan" title="Status" />
                    </ExcelExport>
                </div>
            </div>
        )
    }
}
export default RiwayatPenarikan