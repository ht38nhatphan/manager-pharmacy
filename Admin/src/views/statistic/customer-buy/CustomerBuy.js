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
import { CChartPie } from '@coreui/react-chartjs'
import { DatePicker, Space, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "src/redux/apiRequest";
const { RangePicker } = DatePicker;
import dayjs from "dayjs";
import moneyfomat from "../../module/moneyfomat";

const rangePresets = [
  {
    label: "Ngày Hôm Nay",
    value: [dayjs().add(0, "d"), dayjs()],
  },
  {
    label: "Ngày Hôm Qua",
    value: [dayjs().add(-1, "d"), dayjs()],
  },
  {
    label: "1 Tuần Trước",
    value: [dayjs().add(-7, "d"), dayjs()],
  },
  {
    label: "2 Tuần Trước",
    value: [dayjs().add(-14, "d"), dayjs()],
  },
  {
    label: "1 Tháng Trước",
    value: [dayjs().add(-30, "d"), dayjs()],
  },
  {
    label: "90 Ngày Trước",
    value: [dayjs().add(-90, "d"), dayjs()],
  },
];

const columns = [
  { key: '_id', _style: { width: '2%' }, sorter: false },
  {
    key: 'name',
    _style: { width: '40%' },
    // replace name use label
    label: 'Tên Khách Hàng',
  },
  { key: 'amount', filter: false, sorter: false, _style: { width: '15%' }, label: 'Số Sản Phẩm Đã Mua', },
  { key: 'sumorder', filter: false, sorter: false, _style: { width: '35%' }, label: 'Tổng Tiền Đã Mua', },
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
  const dispatch = useDispatch();
  useEffect(() => {
    getAllOrder(dispatch);
  }, []);
  const userList = useSelector((state) => state.users.users?.allUsers);
  const order = useSelector((state) => state.order.order.order);
  // const data1 = []
  // const data2 = []
  function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
  }
  const [data, setData] = useState(order);
  let sum = data.reduce(function (prev, current) {
    return prev + +current.sumorder;
  }, 0);
  // sum = sum + " VND"
  let sumin = data.reduce(function (prev, current) {
    return prev + +current.sumorderin;
  }, 0);
  // sumin = sumin + " VND"
  let estimate = sum - sumin;
  let percent = (estimate / sum) * 100;
  percent = roundToTwo(percent);

  //get all produt to order
  const produc = [];
  let producnew = [];
  const allcustomernew = []
  data.map((dt, index) => {
    let idkey = index == 0 ? index : index - 1
    const getalluser = userList.find(x => x._id == order[idkey].userId)
    const allcustomer = {}
    allcustomer.name = getalluser.username
    allcustomer.userId = order[idkey].userId

    allcustomer.amount = dt.products.length
    allcustomer.sumorder = dt.sumorder
    const indexcustomer = allcustomernew.findIndex((e) => e.userId == order[idkey].userId)
    console.log(getalluser.username);
    if (allcustomernew.length > 0 && indexcustomer >= 0) {
      allcustomernew[indexcustomer].amount += dt.products.length
      allcustomernew[indexcustomer].sumorder += dt.sumorder
    }
    else {
      allcustomernew.push(allcustomer)
    }

    // produc.push(...dt.products);
  });
  const news = allcustomernew

  let vlue = []
  let vdata = []

  allcustomernew.map(e => vlue.push(e.name))
  // vlue.length > 4 ? (vlue = vlue.slice(0, 4)) : vlue;
  allcustomernew.map(e => vdata.push(e.amount))
  // vdata.length > 4 ? (vdata = vdata.slice(0, 4)) : vdata;
  // allcustomernew.length > 4 ? (news = allcustomernew.slice(0, 4)) : news = allcustomernew;
  if (vlue.length > 4) {
    vlue = vlue.slice(0, 4)
    vdata = vdata.slice(0, 4)
  }

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      const today = new Date();
      // console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log("hi:    " + new Date(dateStrings[0]));
      console.log(String(order[0].dateorder).split("T").slice(0, 1).join(" "));
      console.log(
        new Date(String(order[0].dateorder).split("T").slice(0, 1).join(" ")) >
        new Date(dateStrings[0])
      );
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
      // let daysBetween = (new Date(dateStrings[1]).getTime() - new Date(dateStrings[0]).getTime()) / (1000 * 3600 * 24);
      // // if (daysBetween == 0) {
      //   daysBetween = 1
      // }
      setData(
        order.filter((item) => {
          return (
            new Date(String(item.dateorder).split("T").slice(0, 1).join(" ")) >=
            new Date(dateStrings[0]) &&
            new Date(String(item.dateorder).split("T").slice(0, 1).join(" ")) <=
            new Date(dateStrings[1])
          );
        })
      );
      order.filter((item) =>
        console.log(
          Math.ceil(
            today.getTime() -
            new Date(
              String(item.dateorder)
                .split("T")
                .slice(0, 1)
                .join(" ")
                .split("-")
                .slice(0, 3)
                .join("-")
            ).getTime()
          ) /
          (24 * 60 * 60 * 1000)
        )
      );
      console.log("Những ngày ở giữa:" + data);
    } else {
      console.log("Clear");
    }
  };
  const handleChange = (data) => {
    // let selectedDateFromCalender = date.toUTCString();
    // console.log(data.target.placeholder == "Ngày Bắt Đầu" ? 'ngày bắt đầu' + data.target.value : 'ngày kết' + data.target.value);
    // if(data.target.placeholder == "Ngày Bắt Đầu")
    setData(order);
  };
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh Sách Khách Hàng Mua Hàng</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={6} style={{ marginBottom: "20px" }}>
                <Space direction="vertical" size={12}>
                  <RangePicker
                    size={"large"}
                    locale="VN"
                    presets={rangePresets}
                    onChange={onRangeChange}
                    placeholder={["Ngày Bắt Đầu", "Ngày Kết Thúc"]}
                  />
                </Space>
              </CCol>
              <CCol md={6}>
                <CButton type="submit" onClick={handleChange}>
                  Khôi Phục
                </CButton>
              </CCol>
              <CCol>
                <CSmartTable
                  // chuyen den trang thu 3
                  // activePage={3}
                  // cleaner
                  clickableRows={false}
                  onRowClick
                  // confix columns
                  columns={columns}
                  // columnFilter
                  columnSorter
                  // footer
                  items={allcustomernew}
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
                <strong>Top Khách Hàng Mua Nhiều Nhât</strong>
              </CCardHeader>
              <CCol md={12}>
                <CChartPie
                  className="aaa"
                  data={{
                    labels: vlue,
                    datasets: [
                      {
                        data: vdata,
                        backgroundColor: ['#FF6384', '#36A2EB', "#33CC00", '#FFCE56'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', "#33CC00", '#FFCE56'],
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
