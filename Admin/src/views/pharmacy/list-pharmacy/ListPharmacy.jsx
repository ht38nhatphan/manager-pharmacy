import React, { useEffect } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import { CBadge, CButton, CCollapse, CCardBody, CCard, CCardHeader } from '@coreui/react'
import EllipsisDropdown from '../../module/EllipsisDropdown'
import { EyeOutlined, DeleteOutlined, EditOutlined, PrinterOutlined } from '@ant-design/icons'
import { Card, Menu, message, Popconfirm, Space, RangePicker } from 'antd'
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

const ListBranchPharmacy = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getAllThuocs(dispatch);
  }, [])


  const products = useSelector((state) => state.product.products);
  //  Handle Delete

  const user = useSelector((state) => state.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const dropdownMenu = (row) => {

    const handleDelete = (id) => {
      // console.log(id)
      // message.success({
      //   content: 'Xóa Thành công',
      //   className: 'custom-class',
      //   style: {
      //     marginTop: '100px',
      //     marginLeft: '130px',
      //   },
      // });
      deleteProduct(user?.accessToken, dispatch, navigate, products[id]._id, axiosJWT);
    }

    return (

      <Menu>
        <Menu.Item>
          <Link className="text-decoration-none" to={'/pharmacy/barcode-pharmacy/' + row}>
            <div className="d-flex align-items-center">
              <PrinterOutlined />
              <span className="ms-2">In mã Vạch</span>
            </div>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link className="text-decoration-none" to={'/pharmacy/edit-pharmacy/' + row}>
            <div className="d-flex align-items-center">
              <EditOutlined />
              <span className="ms-2">Sửa</span>
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
    // { key: 'MaThuoc', filter: false, sorter: false },
    { key: 'Images', label: 'Hình Ảnh', filter: false, sorter: false },
    { key: 'amount', label: 'Số Lượng', filter: false, sorter: false },
    // { key: 'barcode', label: 'Mã Vạch', filter: false, sorter: false },
    { key: 'priceIn', label: 'Giá Nhập', filter: false, sorter: false },
    { key: 'priceOut', label: 'Giá Bán', filter: false, sorter: false },
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
        <strong>Danh Sách Thuốc Đã Nhập</strong>
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
          items={products}
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
          tableFilterLabel="Tìm Kiếm"
          tableFilterPlaceholder="Nhập Thuốc cần tìm"
          tableProps={{
            striped: true,
            hover: true,
          }}
        />

      </CCardBody>
    </CCard>
  )
}

export default ListBranchPharmacy
