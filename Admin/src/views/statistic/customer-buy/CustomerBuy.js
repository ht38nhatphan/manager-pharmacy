import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CWidgetStatsB,
  CFormInput,
  CButton,
  CBadge,
  CCollapse,
} from '@coreui/react'
import { CDateRangePicker, CSmartTable } from '@coreui/react-pro'
import '../../../assets/style_pro.css'
import '../../../css/styleprofit.css'
import { CChartPie } from '@coreui/react-chartjs'
const customRanges = {
  'Hom Nay': [new Date(), new Date()],
  'Hom Qua': [
    new Date(new Date().setDate(new Date().getDate() - 1)),
    new Date(new Date().setDate(new Date().getDate() - 1)),
  ],
  '7 Ngay Truoc': [new Date(new Date().setDate(new Date().getDate() - 6)), new Date(new Date())],
  '30 Ngay Truoc': [new Date(new Date().setDate(new Date().getDate() - 29)), new Date(new Date())],
  'Thang Nay': [
    new Date(new Date().setDate(1)),
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  ],
  'Thang Truoc': [
    new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
    new Date(new Date().getFullYear(), new Date().getMonth(), 0),
  ],
}


const columns = [
  { key: 'ID', _style: { width: '8%' } },
  {
    key: 'TenThuoc',
    _style: { width: '40%' },
    _props: { color: 'primary', className: 'fw-semibold' },
    // replace name use label
    // label: 'aaa',
  },
  'registered',
  { key: 'Don Vi', filter: false, sorter: false, _style: { width: '20%' } },
  { key: 'status', _style: { width: '10%' } },
  // {
  //   key: 'show_details',
  //   label: '',
  //   _style: { width: '1%' },
  //   filter: false,
  //   sorter: false,
  //   _props: { color: 'primary', className: 'fw-semibold' },
  // },
]
const usersData = [
  {
    ID: 0,
    TenThuoc: 'JDoeohn',
    donvi: 'Goi',
    soluong: '1000',
    tongtien: '1111111',
  },
  {
    ID: 2,
    TenThuoc: 'JDoeohn',
    donvi: 'Vien',
    soluong: '1000',
    tongtien: '2000000',
  },
  {
    ID: 0,
    TenThuoc: 'JDoeohn',
    donvi: 'Goi',
    soluong: '1000',
    tongtien: '1111111',
  },
  {
    ID: 2,
    TenThuoc: 'JDoeohn',
    donvi: 'Vien',
    soluong: '1000',
    tongtien: '2000000',
  },
]
const getBadge = (status) => {
  switch (status) {
    case 'Active':
      return 'success'
    case 'Inactive':
      return 'secondary'
    case 'Pending':
      return 'warning'
    case 'Banned':
      return 'danger'
    default:
      return 'primary'
  }
}

const CustomerBuy = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh Sach Khach Hang Mua Nhieu</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={6}>
                <CDateRangePicker
                  className="mb-3"
                  locale="VN"
                  placeholder={['Ngay Bat Dau', 'Ngay Ket Thuc']}
                  ranges={customRanges}
                />
              </CCol>
              <CCol md={6}>
                <CButton type="submit">Loc</CButton>
              </CCol>
              <CCol>
                <CSmartTable
                  // chuyen den trang thu 3
                  // activePage={3}
                  // cleaner
                  clickableRows={false}
                  onRowClick
                  // confix columns
                  // columns={columns}
                  // columnFilter
                  columnSorter
                  // footer
                  items={usersData}
                  // chon trang
                  itemsPerPageSelect
                  itemsPerPage={5}
                  pagination
                  // scopedColumns={{
                  //   status: (item) => (
                  //     <td>
                  //       <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                  //     </td>
                  //   ),
                  // }}
                  // selectable
                  sorterValue={{ column: 'name', state: 'asc' }}
                  // tableFilter
                  tableHeadProps
                  // tableFilterPlace
                  tableProps={{
                    striped: true,
                    hover: true,
                  }}
                />
              </CCol>
              <CCardHeader className="mb-3">
                <strong>Top Thuoc Ban Lai</strong>
              </CCardHeader>
              <CCol md={12}>
                <CChartPie
                  className="aaa"
                  data={{
                    labels: ['Red', 'Green', 'Yellow'],
                    datasets: [
                      {
                        data: [300, 50, 100],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                      },
                    ],
                  }}
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CustomerBuy
