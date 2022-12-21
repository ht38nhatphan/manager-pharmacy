import React, { useState, useEffect } from 'react'
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

import { DatePicker, Space, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrder } from 'src/redux/apiRequest'
const { RangePicker } = DatePicker;
import dayjs from 'dayjs';
import moneyfomat from '../../module/moneyfomat'
const rangePresets = [
  {
    label: 'Ngày Hôm Nay',
    value: [dayjs().add(0, 'd'), dayjs()],
  },
  {
    label: 'Ngày Hôm Qua',
    value: [dayjs().add(-1, 'd'), dayjs()],
  },
  {
    label: '1 Tuần Trước',
    value: [dayjs().add(-7, 'd'), dayjs()],
  },
  {
    label: '2 Tuần Trước',
    value: [dayjs().add(-14, 'd'), dayjs()],
  },
  {
    label: '1 Tháng Trước',
    value: [dayjs().add(-30, 'd'), dayjs()],
  },
  {
    label: '90 Ngày Trước',
    value: [dayjs().add(-90, 'd'), dayjs()],
  },
];


const columns = [
  { key: '_id', _style: { width: '2%' }, sorter: false },
  {
    key: 'name',
    _style: { width: '40%' },
    // replace name use label
    label: 'Tên Thuốc',
  },
  { key: 'amount', filter: false, sorter: false, _style: { width: '5%' }, label: 'Số Lượng', },
  { key: 'priceOut', _style: { width: '10%' }, label: 'Giá Bán', },
  { key: 'sumprice', _style: { width: '10%' }, label: 'Tổng Tiền', },
  // {
  //   key: 'show_details',
  //   label: '',
  //   _style: { width: '1%' },
  //   filter: false,
  //   sorter: false,
  //   _props: { color: 'primary', className: 'fw-semibold' },
  // },
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

const TotalRevenue = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getAllOrder(dispatch);
  }, [])
  const order = useSelector((state) => state.order.order.order);
  // const data1 = []
  // const data2 = []

  const [data, setData] = useState(order)
  let sum = data.reduce(function (prev, current) {
    return prev + +current.sumorder
  }, 0);
  sum = sum
  let sumin = data.reduce(function (prev, current) {
    return prev + +current.sumorderin
  }, 0);
  sumin = sumin

  //get all produt to order
  const produc = []
  data.map((dt, index) => {
    produc.push(...dt.products)
  })



  console.log(produc);
  // let fullproduct = []
  // for (let i = 0; i < produc.length - 2; i + 2) {
  //   fullproduct = [...produc[i], ...produc[i + 1]]
  // }
  // console.log(fullproduct);
  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      const today = new Date()
      // console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('hi:    ' + new Date(dateStrings[0]));
      console.log(String(order[0].dateorder).split('T').slice(0, 1).join(' '));
      console.log(new Date(String(order[0].dateorder).split('T').slice(0, 1).join(' ')) > new Date(dateStrings[0]));
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      // let daysBetween = (new Date(dateStrings[1]).getTime() - new Date(dateStrings[0]).getTime()) / (1000 * 3600 * 24);
      // // if (daysBetween == 0) {
      //   daysBetween = 1
      // }
      setData(order.filter(item => {
        return (((new Date(String(item.dateorder).split('T').slice(0, 1).join(' ')))
          >= (new Date(dateStrings[0]))) &&
          ((new Date(String(item.dateorder).split('T').slice(0, 1).join(' '))) <= (new Date(dateStrings[1]))))
      }
      ))
      order.filter(item => console.log(Math.ceil(today.getTime() - (new Date((String(item.dateorder).split('T').slice(0, 1).join(' ')).split('-').slice(0, 3).join('-'))).getTime()) / (24 * 60 * 60 * 1000)))
      console.log('Những ngày ở giữa:' + data);
    } else {
      console.log('Clear');
    }
  };
  const handleChange = (data) => {
    // let selectedDateFromCalender = date.toUTCString();
    // console.log(data.target.placeholder == "Ngày Bắt Đầu" ? 'ngày bắt đầu' + data.target.value : 'ngày kết' + data.target.value);
    // if(data.target.placeholder == "Ngày Bắt Đầu")
    setData(order)
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Thống Kê Tổng</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={6} style={{ marginBottom: '20px' }}>
                <Space direction="vertical" size={12}>
                  <RangePicker
                    size={"large"}
                    locale="VN"
                    presets={rangePresets}
                    onChange={onRangeChange}
                    placeholder={['Ngày Bắt Đầu', 'Ngày Kết Thúc']} />
                </Space>
              </CCol>
              <CCol md={6}>
                <CButton type="submit" onClick={handleChange}>Khôi Phục</CButton>
              </CCol>
              <CCol xs={6}>
                <CWidgetStatsB
                  className="mb-3"
                  color="info"
                  progress={{ value: 75 }}
                  inverse
                  text="Tổng Tiền Nhập"
                  title="Tiền Nhập"
                  value={moneyfomat(sumin)}
                />
              </CCol>
              <CCol xs={6}>
                <CWidgetStatsB
                  className="mb-3"
                  color="primary"
                  inverse
                  progress={{ value: 75 }}
                  text="Tổng Tiền Bán"
                  title="Tiền Bán"
                  value={moneyfomat(sum)}
                />
              </CCol>
              <CCardHeader className="mb-3">
                <strong>Danh Sách Thuốc Bán được Bán Được</strong>
              </CCardHeader>
              <CSmartTable
                // chuyen den trang thu 3
                // activePage={3}
                cleaner
                clickableRows={false}
                onRowClick
                // confix columns
                columns={columns}
                // columnFilter
                columnSorter
                // footer
                items={produc}
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
                tableFilter
                tableHeadProps
                // tableFilterPlace
                tableProps={{
                  striped: true,
                  hover: true,
                }}
              />
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default TotalRevenue
