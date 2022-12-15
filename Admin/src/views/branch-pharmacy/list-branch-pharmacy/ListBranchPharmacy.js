import React from 'react'
import { CSmartTable } from '@coreui/react-pro'
import { CBadge, CButton, CCollapse, CCardBody, CCard, CCardHeader } from '@coreui/react'
import EllipsisDropdown from '../../module/EllipsisDropdown'
import { EyeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Card, Menu, message } from 'antd'
import { Link, useHistory } from 'react-router-dom'
const columns = [
  { key: 'ID', _style: { width: '8%' } },
  {
    key: 'TenChu',
    _style: { width: '20%' },
    // _props: { color: 'primary', className: 'fw-semibold' },
    // replace name use label
    // label: 'aaa',
  },
  { key: 'TenChiNhanh', filter: false, sorter: false, _style: { width: '20%' } },
  { key: 'DiaChi', filter: false, sorter: false, _style: { width: '40%' } },
  { key: 'status', _style: { width: '15%' }, filter: false, sorter: false },
  // {
  //   key: 'show_details',
  //   label: '',
  //   _style: { width: '1%' },
  //   filter: false,
  //   sorter: false,
  //   _props: { color: 'primary', className: 'fw-semibold' },
  // },
  {
    key: 'operation',
    label: '',
    filter: false,
    sorter: false,
  },
]

const dropdownMenu = (row) => {
  return (
    <Menu>
      {/* <Menu.Item>
        <Link className="text-decoration-none" to={'/branch-pharmacy/detal-branch-pharmacy/' + row}>
          <div className="d-flex align-items-center ">
            <EyeOutlined />
            <span className="ms-2 ">Xem chi tiết</span>
          </div>
        </Link>
      </Menu.Item> */}
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
const usersData = [
  {
    ID: 0,
    TenChu: 'JDoeohn',
    TenChiNhanh: 'Nha Thuoc HH',
    DiaChi: 'Thach Ha Ha Tinh',
    status: 'Hoat Dong',
  },
  {
    ID: 2,
    TenChu: 'JDoeohn',
    TenChiNhanh: 'Nha Thuoc HH',
    DiaChi: 'Thach Ha Ha Tinh',
    status: 'Hoat Dong',
  },
  {
    ID: 1,
    TenChu: 'JDoeohn',
    TenChiNhanh: 'Nha Thuoc HH',
    DiaChi: 'Thach Ha Ha Tinh',
    status: 'Dang Bao Tri',
  },
  {
    ID: 3,
    TenChu: 'JDoeohn',
    TenChiNhanh: 'Nha Thuoc HH',
    DiaChi: 'Thach Ha Ha Tinh',
    status: 'Ngung Hoat Dong',
  },
  {
    ID: 4,
    TenChu: 'JDoeohn',
    TenChiNhanh: 'Nha Thuoc HH',
    DiaChi: 'Thach Ha Ha Tinh',
    status: 'Hoat Dong',
  },
  {
    ID: 4,
    TenChu: 'JDoeohn',
    TenChiNhanh: 'Nha Thuoc HH',
    DiaChi: 'Thach Ha Ha Tinh',
    status: 'Hoat Dong',
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

const ListBranchPharmacy = () => {
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
          items={usersData}
          // chon trang
          itemsPerPageSelect
          itemsPerPage={5}
          pagination
          scopedColumns={{
            status: (item) => (
              <td>
                <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
              </td>
            ),
            operation: (item) => {
              console.log(item)
              return (
                <div className="text-right">
                  <EllipsisDropdown menu={dropdownMenu(item.ID)} />
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

export default ListBranchPharmacy
