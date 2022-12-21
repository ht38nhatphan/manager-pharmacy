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
import '../../../css/styleprofit.css'
import { CChart } from '@coreui/react-chartjs'
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



const ProfitEstimate = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    getAllOrder(dispatch);
  }, [])
  const order = useSelector((state) => state.order.order.order);
  // const data1 = []
  // const data2 = []
  function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
  }
  const [data, setData] = useState(order)
  let sum = data.reduce(function (prev, current) {
    return prev + +current.sumorder
  }, 0);
  // sum = sum + " VND"
  let sumin = data.reduce(function (prev, current) {
    return prev + +current.sumorderin
  }, 0);
  // sumin = sumin + " VND"
  let estimate = sum - sumin
  let percent = (estimate / sum) * 100
  percent = roundToTwo(percent)
  // let estimate = data.reduce(function (prev, current) {
  //   return prev + +current.sumorder
  // }, 0);
  // estimate = estimate + " VND"
  // let percent = data.reduce(function (prev, current) {
  //   return prev + +current.sumorderin
  // }, 0);
  // percent = percent + " %"

  //get all produt to order
  const produc = []
  let producnew = []
  data.map((dt, index) => {
    produc.push(...dt.products)
  })

  for (let i = 0; i < produc.length; i++) {

    if (producnew.length > 0 && producnew.findIndex(e => e.productId == produc[i].productId) > 0) {

      producnew[producnew.length - 1].sumprice += produc[i].sumprice
      producnew[producnew.length - 1].sumpriceIn += produc[i].sumpriceIn
    }
    else {
      // console.log(index);
      // producnew.push(produc[i])
      producnew.push({ name: produc[i].name, productId: produc[i].productId, sumprice: produc[i].sumprice, sumpriceIn: produc[i].sumpriceIn, estimate: produc[i].sumprice - produc[i].sumpriceIn })
    }
  }
  // produc.map((dt, index) => {
  // console.log(producnew);
  // if (producnew.length > 0 && producnew.findIndex(e => e.productId == dt.productId) > 0) {
  //   producnew[producnew.length - 1].sumprice += dt.sumprice
  //   producnew[producnew.length - 1].sumpriceIn += dt.sumpriceIn
  // }
  // else {
  //   // console.log(index);
  //   producnew.push(dt)
  //   // producnew.push({ prouctId: dt.productId }, { sumprice: dt.sumprice }, { sumpriceIn: dt.sumpriceIn }, { estimate: dt.sumprice - dt.sumpriceIn })
  // }
  // console.log(dt);

  // })
  producnew.sort((a, b) => (a.estimate > b.estimate) ? -1 : 1)
  console.log(producnew);
  producnew.length > 4 ? producnew = producnew.slice(0, 4) : producnew
  const datalabel = []
  const datadetail = []
  producnew.map((dt, index) => {

    dt.name.length > 19 ? datalabel.push(dt.name.slice(0, 20)) : datalabel.push(dt.name)
    datadetail.push(dt.estimate)
  })

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
            <strong>Ước Tính Lãi</strong>
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
                  className="mb-4"
                  color="success"
                  inverse
                  progress
                  text="Tông Tiền Lãi Thu Được"
                  title="Tiền Lãi Thu Được"
                  value={moneyfomat(estimate)}
                />
              </CCol>
              <CCol xs={6}>
                <CWidgetStatsB
                  className="mb-3"
                  color="info"
                  inverse
                  progress={{ value: 75 }}
                  text="Ước Tính Lãi Thu Được"
                  title="Ước Tính Lãi"
                  value={percent + " %"}
                />
              </CCol>
              <CCardHeader className="mb-3">
                <strong>Top Thuốc Bán Lãi</strong>
              </CCardHeader>
              <CCol xs={12}>
                <CChart
                  className="aaa"
                  type="doughnut"
                  data={{
                    labels: datalabel,
                    datasets: [
                      {
                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                        data: datadetail,
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

export default ProfitEstimate
