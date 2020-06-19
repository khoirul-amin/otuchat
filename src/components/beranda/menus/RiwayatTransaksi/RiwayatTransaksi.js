import React, { Component } from 'react'
import { API, GET_HISTORY, X_API_KEY, APLUS } from '../../../../api/index'
import axios from 'axios';
import moment from 'moment'
import '../../../../assets/style.css'
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';




import DatePicker from "react-datepicker"
import { convertCurrency } from '../../../payment/commons/commonLib';
const $ = require('jquery')
$.DataTable = require('datatables.net')

class RiwayatTransaksi extends Component {
    constructor() {
        super()
        this.state = {
            posts: null,
            loading: true,
            link: 'https://invoice.eklankumax.com/GenerateInvoice/gen_pdf_download?trxID=',
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
            'requestID': 1,
            'start_date': moment(firstDay).format('YYYY-MM-DD'),
            'end_date': moment(lastDay).format('YYYY-MM-DD')
        }
        axios.post(API + GET_HISTORY, body, { headers: header })
            .then(res => {
                // console.log(res.data)
                if (res.data.listData) {
                    const pages = res.data.listData.map(data => {
                        var button = ''
                        if (data.vstatus === "Active") {
                            button = `<a class="btn-print m-3" target="new" href=${this.state.link + data.transaksi_id}>Print</a>`
                        } else {
                            button = ''
                        }
                        const push = {
                            'transaksi_id': data.transaksi_id,
                            'tgl': data.tgl,
                            'product_name': `<b>Nama Produk :</b> ${data.product_name} <br/> <b>Tujuan :</b> ${data.tujuan} <br/> <b>Harga :</b> Rp ${convertCurrency(data.harga)}`,
                            'vstatus': data.vstatus,
                            'action': button
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
        // this.setState({posts:''})
        $('#dataTable').DataTable().destroy()
        const isLogin = JSON.parse(localStorage.getItem('isLogin'))
        const header = {
            'X-Api-Key': X_API_KEY
        }
        const body = {
            'userID': isLogin.userID,
            'aplUse': APLUS,
            'accessToken': isLogin.mbr_token,
            'requestID': 1,
            'start_date': this.state.startSearchDate,
            'end_date': this.state.endSearchDate
        }
        axios.post(API + GET_HISTORY, body, { headers: header })
            .then(res => {
                // console.log(res.data)
                if (res.data.listData) {
                    const pages = res.data.listData.map(data => {
                        var button = ''
                        if (data.vstatus === "Active") {
                            button = `<a class="btn-print m-3" target="new" href=${this.state.link + data.transaksi_id}>Print</a>`
                        } else {
                            button = ''
                        }

                        const push = {
                            'transaksi_id': data.transaksi_id,
                            'tgl': data.tgl,
                            'product_name': `<b>Nama Produk :</b> ${data.product_name} <br/> <b>Tujuan :</b> ${data.tujuan} <br/> <b>Harga :</b> Rp ${convertCurrency(data.harga)}`,
                            'vstatus': data.vstatus,
                            'action': button
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
                { "data": "transaksi_id" },
                { "data": "tgl" },
                { "data": "product_name" },
                { "data": "vstatus" },
                { "data": "action" }
            ]
        })
    }
    render() {
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
                {this.state.posts === '' ?
                    <table className='table-riwayat mb-2'>
                        <thead>
                            <tr>
                                <th>Transaksi ID</th>
                                <th>Tanggal</th>
                                <th>Keterangan</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan='5' align='center'>
                                    Loading..
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    :
                    <table id="dataTable" className='table-riwayat mb-2' ref={el => this.el = el}>
                        <thead>
                            <tr>
                                <th>Transaksi ID</th>
                                <th>Tanggal</th>
                                <th>Keterangan</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </table>
                }

                <ExcelExport
                    data={this.state.posts}
                    fileName="Riwayat Transaksi.xlsx"
                    headerPaddingCellOptions={{ background: '#ff0000' }}
                    ref={(exporter) => { this._exporter = exporter; }}
                >
                    <ExcelExportColumn field="transaksi_id" title="Transaksi ID" />
                    <ExcelExportColumn field="tgl" title="Tanggal Transaksi" />
                    <ExcelExportColumn field="tujuan" title="Tujuan" />
                    <ExcelExportColumn field="tgl_sukses" title="Tanggal Sukses" />
                    <ExcelExportColumn field="harga" title="Harga" />
                    <ExcelExportColumn field="product_name" title="Nama Produk" />
                    <ExcelExportColumn field="keterangan" title="Keterangan" />
                    <ExcelExportColumn field="vstatus" title="Status" />
                </ExcelExport>
            </div>
        )
    }
}
export default RiwayatTransaksi