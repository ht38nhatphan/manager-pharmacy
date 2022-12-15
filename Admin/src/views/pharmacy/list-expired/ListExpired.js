import React, { useEffect, useState } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import { CBadge, CButton, CCollapse, CCardBody, CCard, CCardHeader } from '@coreui/react'
import EllipsisDropdown from '../../module/EllipsisDropdown'
import { EyeOutlined, DeleteOutlined, EditOutlined, PrinterOutlined } from '@ant-design/icons'
import { Card, Menu, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllThuocs } from 'src/redux/apiRequest'
import { createAxios } from '../../../createInstance'
import { loginSuccess } from '../../../redux/authSlice'
import "./ListPharmacy.css"


const getBadge = (status) => {
  switch (status) {
    case 'Hoat Dong':
      return 'success'
    case 'Dang Bao Tri':
      return 'secondary'
    case 'Ngung Hoat Dong':
      return 'warning'
    case 'Banned':
      return 'danger'
    default:
      return 'primary'
  }
}

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

  products.filter(item => (Math.ceil((new Date(item.exp)).getTime() - today.getTime())) / (24 * 60 * 60 * 1000) <= 30)
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
          <div className="d-flex align-items-center">
            <DeleteOutlined onClick={() => handleDelete(row)} />
            <span className="ms-2" onClick={() => handleDelete(row)}> Xóa </span>
          </div>
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
    { key: 'priceIn', label: 'Giá Nhập', filter: false, sorter: true },
    { key: 'priceOut', label: 'Giá Bán', filter: false, sorter: true },
    {
      key: 'operation',
      label: 'Hành Động',
      filter: false,
      sorter: false,
    },
  ]

  return (
    <CCard className="mb-4">

      <CCardHeader>
        <strong>Danh Sách Thuốc Sắp Hết Hạn</strong>
      </CCardHeader>
      <CCardBody>

        <CSmartTable
          // chuyen den trang thu 3
          // activePage={3}
          cleaner
          clickableRows
          // onRowClick
          // confix columns
          columns={columns}
          // columnFilter
          columnSorter
          // footer
          items={products.filter(item => (Math.ceil((new Date(item.exp)).getTime() - today.getTime())) / (24 * 60 * 60 * 1000) <= 30)}
          // chon trang
          itemsPerPageSelect
          itemsPerPage={5}
          pagination
          scopedColumns={{
            status: (item) => (
              <tbody>
                <td>
                  <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                </td>
              </tbody>
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
          selectable
          sorterValue={{ column: 'name', state: 'asc' }}
          tableFilter
          tableHeadProps
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
