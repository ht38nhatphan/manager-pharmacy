import React, { useEffect, useState } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import { CBadge, CButton, CCollapse, CCardBody, CCard, CCardHeader } from '@coreui/react'
import EllipsisDropdown from '../../module/EllipsisDropdown'
import { EyeOutlined, DeleteOutlined, EditOutlined, PrinterOutlined } from '@ant-design/icons'
import { Card, Menu, message, Popconfirm } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllThuocs } from 'src/redux/apiRequest'
import { createAxios } from '../../../createInstance'
import { loginSuccess } from '../../../redux/authSlice'
import "./ListPharmacy.css"
import { DatePicker, Space, Button } from 'antd';
const { RangePicker } = DatePicker;

import dayjs from 'dayjs';

const getBadge = (status) => {
  if (status > 0) {
    return 'warning'
  } else {
    return 'danger'
  }
}
const rangePresets = [
  {
    label: 'Ngày Hôm Nay',
    value: [dayjs().add(0, 'd'), dayjs()],
  },
  {
    label: 'Ngày Mai',
    value: [dayjs(), dayjs().add(1, 'd')],
  },
  {
    label: '1 Tuần',
    value: [dayjs(), dayjs().add(7, 'd')],
  },
  {
    label: '2 Tuần',
    value: [dayjs(), dayjs().add(14, 'd')],
  },
  {
    label: '1 Tháng',
    value: [dayjs(), dayjs().add(30, 'd')],
  },
  {
    label: '6 Tháng',
    value: [dayjs(), dayjs().add(180, 'd')],
  },
];
const ListExpired = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getAllThuocs(dispatch);
  }, [])
  const products = useSelector((state) => state.product.products);
  //  Handle Delete
  const [productExp, setproductExp] = useState(products);
  const today = new Date();
  // setproductExp(productExp.filter(item =>)
  const user = useSelector((state) => state.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  products.filter(item => console.log((Math.ceil((new Date(item.exp)).getTime() - today.getTime())) / (24 * 60 * 60 * 1000)) <= 0)
  // console.log();
  const dropdownMenu = (row) => {
    const handleDelete = (id) => {
      deleteProduct(user?.accessToken, dispatch, navigate, products[id]._id, axiosJWT);
    }


    return (

      <Menu>

        <Menu.Item>
          <Link className="text-decoration-none" to={'/pharmacy/edit-pharmacy/' + row}>
            <div className="d-flex align-items-center">
              <EditOutlined />
              <span className="ms-2">Sửa</span>
            </div>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link className="text-decoration-none" to={'/pharmacy/barcode-pharmacy/' + row}>
            <div className="d-flex align-items-center">
              <PrinterOutlined />
              <span className="ms-2">In mã Vạch</span>
            </div>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Popconfirm title="Bạn có chắc chắn muốn xóa không?" onConfirm={() => handleDelete(row)}>
            <DeleteOutlined />
            <a> Xóa </a>
          </Popconfirm>
        </Menu.Item>
      </Menu>
    )
  }


  const columns = [
    { key: '_id', _style: { width: '8%' } },
    {
      key: 'name',
      label: 'Tên Thuốc',
      _style: { width: '20%' },
    },
    { key: 'Images', label: 'Hình Ảnh', filter: false, sorter: false },
    { key: 'exp', label: 'Ngày Hết Hạn', filter: false, sorter: false },
    { key: 'dateLeft', label: 'Ngày Còn Lại:', filter: false, sorter: true },
    {
      key: 'operation',
      label: 'Hành Động',
      filter: false,
      sorter: false,
    },
  ]
  const [count, setCount] = useState(100)
  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      const today = new Date()
      // console.log('From: ', dates[0], ', to: ', dates[1]);


      let daysBetween = (new Date(dateStrings[1]).getTime() - new Date(dateStrings[0]).getTime()) / (1000 * 3600 * 24);
      // // if (daysBetween == 0) {
      //   daysBetween = 1
      // }
      setCount(daysBetween)
    } else {
      console.log('Clear');
    }
  };
  const handleChange = (data) => {
    // let selectedDateFromCalender = date.toUTCString();
    // console.log(data.target.placeholder == "Ngày Bắt Đầu" ? 'ngày bắt đầu' + data.target.value : 'ngày kết' + data.target.value);
    // if(data.target.placeholder == "Ngày Bắt Đầu")
    setproductExp(products)
    setCount(100000)
  }
  return (
    <CCard className="mb-4">

      <CCardHeader>
        <strong>Danh Sách Thuốc Sắp Hết Hạn</strong>
      </CCardHeader>
      <CCardBody>
        <Space direction="vertical" size={12}>
          <RangePicker
            size={"large"}
            locale="VN"
            presets={rangePresets}
            onChange={onRangeChange}
            placeholder={['Ngày Bắt Đầu', 'Ngày Kết Thúc']} />
        </Space>
        <Button
          size={"large"}
          // onClick={handleAdd}
          type="primary"
          style={{
            marginLeft: 50,
          }}
          onClick={handleChange}
        >
          Reset
        </Button>
        <CSmartTable
          // chuyen den trang thu 3
          // activePage={3}
          // cleaner
          clickableRows
          // onRowClick
          // confix columns
          columns={columns}
          // columnFilter
          columnSorter
          // footer
          items={

            productExp.filter(item => (Math.ceil((new Date(item.exp)).getTime() - today.getTime())) / (24 * 60 * 60 * 1000) <= count)}
          // chon trang
          itemsPerPageSelect
          itemsPerPage={5}
          pagination
          scopedColumns={{
            dateLeft: (item) => (
              <td>
                <CBadge style={{ padding: '10px', fontSize: '16px' }} color={getBadge((Math.round((Math.ceil(((new Date(item.exp)).getTime() - today.getTime())) / (24 * 60 * 60 * 1000) + 0.4))))}>
                  {(Math.round((Math.ceil(((new Date(item.exp)).getTime() - today.getTime())) / (24 * 60 * 60 * 1000) + 0.4))) > 0 ? 'Còn lại: ' + (Math.round((Math.ceil(((new Date(item.exp)).getTime() - today.getTime())) / (24 * 60 * 60 * 1000) + 0.4))) + 'ngày!' : 'Đã Hết Hạn'}
                </CBadge>
              </td>
            ),
            Images: (item) => {
              return (
                <div className="thumb_item">
                  <img src={item.Images[0]} alt={item.name} />
                </div>
              )
            },
            exp: (item) => {
              return (
                <td>
                  <p> {(String(item.exp).split('T').slice(0, 1).join(' ')).split('-').slice(0, 3).reverse().join('-')} </p>
                </td>
              )
            },
            operation: (item) => {

              return (
                <div className="text-right">
                  <EllipsisDropdown menu={dropdownMenu(item._id)} />
                </div>
              )
            },
          }}
          // console.log(item)
          // selectable
          // sorterValue={{ column: 'name', state: 'asc' }}
          // tableFilter
          // tableHeadProps
          // tableFilterLabel="Tìm Kiếm"
          // tableFilterPlaceholder="Nhập Thuốc cần tìm"
          // tableFilterPlace
          tableProps={{
            striped: true,
            hover: true,
          }}
        />

      </CCardBody>
    </CCard>
  )
}

export default ListExpired
