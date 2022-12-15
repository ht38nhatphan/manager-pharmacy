import React, { useEffect } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import { CBadge, CButton, CCollapse, CCardBody, CCard, CCardHeader } from '@coreui/react'
import EllipsisDropdown from '../../module/EllipsisDropdown'
import { EyeOutlined, DeleteOutlined, EditOutlined, PrinterOutlined } from '@ant-design/icons'
import { Card, Menu, message, Popconfirm } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllThuocs, getAllUsers } from 'src/redux/apiRequest'
import { createAxios } from '../../../createInstance'
import { loginSuccess } from '../../../redux/authSlice'


const columns = [
  { key: '_id' },
  {
    key: 'username',
    // _props: { color: 'primary', className: 'fw-semibold' },
    // replace name use label
    // label: 'aaa',
  },
  { key: 'email', filter: false, sorter: false, },
  { key: 'admin', filter: false, sorter: false, },

  {
    key: 'operation',
    label: '',
    filter: false,
    sorter: false,
  },
]

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

const ListStaff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.users.users?.allUsers);
  console.log(userList)
  const dropdownMenu = (row) => {
    return (
      <Menu>
        <Menu.Item>
          <Link className="text-decoration-none" to={'/branch-pharmacy/edit-branch-pharmacy/' + row}>
            <div className="d-flex align-items-center">
              <EditOutlined />
              <span className="ms-2">Sửa</span>
            </div>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <div className="d-flex align-items-center">
            <DeleteOutlined />
            <span className="ms-2">Xoa</span>
          </div>
        </Menu.Item>
      </Menu>
    )
  }
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Danh Sach Chi Nhanh</strong>
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
          items={userList}
          // chon trang
          itemsPerPageSelect
          itemsPerPage={5}
          pagination
          scopedColumns={{
            admin: (item) => (
              <td>
                <p> {item.admin === true ? 'Quản trị viên' : 'Khách Hàng'}</p>
              </td>
            ),
            operation: (item) => {
              return (
                <div className="text-right">
                  <EllipsisDropdown menu={dropdownMenu(item.ID)} />
                </div>
              )
            },
          }}

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

export default ListStaff
