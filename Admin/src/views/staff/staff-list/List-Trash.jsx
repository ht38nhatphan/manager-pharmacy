import React, { useEffect } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import { CBadge, CButton, CCollapse, CCardBody, CCard, CCardHeader } from '@coreui/react'
import EllipsisDropdown from '../../module/EllipsisDropdown'
import { EyeOutlined, DeleteOutlined, EditOutlined, PrinterOutlined, RollbackOutlined } from '@ant-design/icons'
import { Card, Menu, message, Popconfirm } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { deleteUser, getAllUsers, getAllUsersDeleted, restoreUser } from 'src/redux/apiRequest'
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
  { key: 'admin', label: 'Vai trò  ', filter: false, sorter: false, },

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
const ListStaffTrash = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    getAllUsersDeleted(dispatch);
  }, [])
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.users.users?.allUsers);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const dropdownMenu = (row) => {
    //handle DELETE
    const handlerestoreUser = (id) => {
      console.log(userList[id]._id)
      restoreUser(dispatch, userList[id]._id);
    }
    return (
      <Menu>
        <Menu.Item>
          <Popconfirm title="Bạn có chắc chắn muốn khôi phục Tài Khoản này?" onConfirm={() => handlerestoreUser(row)}>
            <RollbackOutlined />
            <a> Khôi Phục </a>
          </Popconfirm>
        </Menu.Item>
        <Menu.Item>
          <Popconfirm title="Bạn có chắc chắn muốn xóa Tài Khoản này không?" onConfirm={() => handlerestoreUser(row)}>
            <DeleteOutlined />
            <a> Xóa </a>
          </Popconfirm>
        </Menu.Item>
      </Menu>
    )
  }
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Danh Sách Tài Khoản ĐÃ BỊ KHÓA! </strong>
        <Link className="link-trash" to={'/staff/staff-list'}> Trở về </Link>
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
                <CBadge color={getBadge(item.admin == true ? `Quản trị viên` : `Khách Hàng`)}>{item.admin === true ? 'Quản trị viên' : 'Khách Hàng'}</CBadge>
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
          tableFilterLabel='Tìm Kiếm'
          tableFilterPlaceholder='Nhập gì đó...'
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

export default ListStaffTrash
