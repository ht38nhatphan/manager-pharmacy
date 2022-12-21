import React, { useEffect } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import { CBadge, CButton, CCollapse, CCardBody, CCard, CCardHeader, CCol } from '@coreui/react'
import EllipsisDropdown from '../../module/EllipsisDropdown'
import { EyeOutlined, DeleteOutlined, EditOutlined, PrinterOutlined } from '@ant-design/icons'
import { Card, Menu, message, Popconfirm } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { deleteUser, getAllUsers } from 'src/redux/apiRequest'
import { createAxios } from 'src/createInstance'
import { loginSuccess, logoutSuccess } from 'src/redux/authSlice'



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
    case 'Khách Hàng':
      return 'success'
    case 'Quản trị viên':
      return 'danger'
    default:
      return 'primary'
  }
}

const ListStaff = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    getAllUsers(dispatch);
  }, [])
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.users.users?.allUsers);
  const count = useSelector((state) => state.count.count.deletedCount);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  console.log(userList)

  const dropdownMenu = (row) => {
    //handle DELETE
    const handleDelete = (id) => {
      console.log(userList[id]._id)
      deleteUser(user?.accessToken, dispatch, userList[id]._id, axiosJWT);
    }
    return (
      <Menu>
        <Menu.Item>
          <Link className="text-decoration-none" to={'/branch-pharmacy/edit-branch-pharmacy/' + row}>
            <div className="d-flex align-items-center">
              <EditOutlined />
              <span className="ms-2"> Sửa </span>
            </div>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Popconfirm title="Bạn có chắc chắn muốn khóa Tài Khoản này không?" onConfirm={() => handleDelete(row)}>
            <DeleteOutlined />
            <a> Khóa </a>
          </Popconfirm>
        </Menu.Item>
      </Menu>
    )
  }
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <CCol CCol md={2}><strong>Danh Sách Tài Khoản</strong></CCol>
        <CCol CCol md={8}> <Link className="link-trash" to={'/staff/staff-trash'}> Thùng Rác ({count}) </Link> </CCol>
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
          tableFilterLabel='Tìm Kiếm'
          tableFilterPlaceholder='Nhập gì đó...'
          scopedColumns={{
            admin: (item) => (
              <td>
                <CBadge color={getBadge(item.admin == true ? 'Quản trị viên' : 'Khách Hàng')}>{item.admin === true ? 'Quản trị viên' : 'Khách Hàng'}</CBadge>
              </td>
            ),
            operation: (item) => {
              return (
                <div className="text-right">
                  <EllipsisDropdown menu={dropdownMenu(item._id)} />
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
