//rsc
import React, { useState } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import { CBadge, CButton, CCollapse, CCardBody, CCard, CCardHeader } from '@coreui/react'

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
const usersData = [
  { ID: 0, TenThuoc: 'JDoeohn', donvi: 'Goi', soluong: '1000', gianhap: '20.000' },
  { ID: 2, TenThuoc: 'JDoeohn', donvi: 'Vien', soluong: '1000', gianhap: '30.000' },
  { ID: 1, TenThuoc: 'Pradon', donvi: 'Lo', soluong: '200', gianhap: '40.000' },
  { ID: 3, TenThuoc: 'Hoa Sen', donvi: 'Vien', soluong: '100', gianhap: '320.000' },
  { ID: 4, TenThuoc: 'JDoeohn', donvi: 'Vien', soluong: '1000', gianhap: '220.000' },
  { ID: 5, TenThuoc: 'Duoc pham', donvi: 'Goi', soluong: '2000', gianhap: '1.120.000' },
  { ID: 6, TenThuoc: 'JDoeohn', donvi: 'Goi', soluong: '1000', gianhap: '4.420.000' },

  // { id: 0, name: 'John Doe', registered: '2022/01/01', role: 'Guest', status: 'Pending' },
  // {
  //   id: 1,
  //   name: 'Samppa Nori',
  //   registered: '2022/01/01',
  //   role: 'Member',
  //   status: 'Active',
  //   // _props: { color: 'primary', align: 'middle' },
  // },
  // {
  //   id: 2,
  //   name: 'Estavan Lykos',
  //   registered: '2022/02/07',
  //   role: 'Staff',
  //   status: 'Banned',
  //   // _cellProps: { all: { className: 'fw-semibold' }, name: { color: 'info' } },
  // },
  // { id: 3, name: 'Chetan Mohamed', registered: '2022/02/07', role: 'Admin', status: 'Inactive' },
  // {
  //   id: 4,
  //   name: 'Derick Maximinus',
  //   registered: '2022/03/19',
  //   role: 'Member',
  //   status: 'Pending',
  // },
  // { id: 5, name: 'Friderik Dávid', registered: '2022/01/21', role: 'Staff', status: 'Active' },
  // { id: 6, name: 'Yiorgos Avraamu', registered: '2022/01/01', role: 'Member', status: 'Active' },
  // {
  //   id: 7,
  //   name: 'Avram Tarasios',
  //   registered: '2022/02/07',
  //   role: 'Staff',
  //   status: 'Banned',
  //   // _props: { color: 'warning', align: 'middle' },
  // },
  // { id: 8, name: 'Quintin Ed', registered: '2022/02/07', role: 'Admin', status: 'Inactive' },
  // { id: 9, name: 'Enéas Kwadwo', registered: '2022/03/19', role: 'Member', status: 'Pending' },
  // { id: 10, name: 'Agapetus Tadeáš', registered: '2022/01/21', role: 'Staff', status: 'Active' },
  // { id: 11, name: 'Carwyn Fachtna', registered: '2022/01/01', role: 'Member', status: 'Active' },
  // { id: 12, name: 'Nehemiah Tatius', registered: '2022/02/07', role: 'Staff', status: 'Banned' },
  // { id: 13, name: 'Ebbe Gemariah', registered: '2022/02/07', role: 'Admin', status: 'Inactive' },
  // {
  //   id: 14,
  //   name: 'Eustorgios Amulius',
  //   registered: '2022/03/19',
  //   role: 'Member',
  //   status: 'Pending',
  // },
  // { id: 15, name: 'Leopold Gáspár', registered: '2022/01/21', role: 'Staff', status: 'Active' },
  // { id: 16, name: 'Pompeius René', registered: '2022/01/01', role: 'Member', status: 'Active' },
  // { id: 17, name: 'Paĉjo Jadon', registered: '2022/02/07', role: 'Staff', status: 'Banned' },
  // {
  //   id: 18,
  //   name: 'Micheal Mercurius',
  //   registered: '2022/02/07',
  //   role: 'Admin',
  //   status: 'Inactive',
  // },
  // {
  //   id: 19,
  //   name: 'Ganesha Dubhghall',
  //   registered: '2022/03/19',
  //   role: 'Member',
  //   status: 'Pending',
  // },
  // { id: 20, name: 'Hiroto Šimun', registered: '2022/01/21', role: 'Staff', status: 'Active' },
  // { id: 21, name: 'Vishnu Serghei', registered: '2022/01/01', role: 'Member', status: 'Active' },
  // { id: 22, name: 'Zbyněk Phoibos', registered: '2022/02/07', role: 'Staff', status: 'Banned' },
  // { id: 23, name: 'Aulus Agmundr', registered: '2022/01/01', role: 'Member', status: 'Pending' },
  // {
  //   id: 42,
  //   name: 'Ford Prefect',
  //   registered: '2001/05/25',
  //   role: 'Alien',
  //   status: "Don't panic!",
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
// const toggleDetails = (index) => {
//   const position = details.indexOf(index)
//   let newDetails = details.slice()
//   if (position !== -1) {
//     newDetails.splice(position, 1)
//   } else {
//     newDetails = [...details, index]
//   }
//   setDetails(newDetails)
// }
const Inventory = () => {
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Danh Sach Ton Kho</strong>
      </CCardHeader>
      <CCardBody>
        <CSmartTable
          // chuyen den trang thu 3
          // activePage={3}
          cleaner
          clickableRows={false}
          onRowClick
          // confix columns
          // columns={columns}
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
            // show_details: (item) => {
            //   return (
            //     <td className="py-2">
            //       <CButton
            //         color="primary"
            //         variant="outline"
            //         shape="square"
            //         size="sm"
            //         onClick={() => {
            //           toggleDetails(item._id)
            //         }}
            //       >
            //         {details.includes(item._id) ? 'Hide' : 'Show'}
            //       </CButton>
            //     </td>
            //   )
            // },
            // details: (item) => {
            //   return (
            //     <CCollapse visible={details.includes(item._id)}>
            //       <CCardBody>
            //         <h4>{item.username}</h4>
            //         <p className="text-muted">User since: {item.registered}</p>
            //         <CButton size="sm" color="info">
            //           User Settings
            //         </CButton>
            //         <CButton size="sm" color="danger" className="ml-1">
            //           Delete
            //         </CButton>
            //       </CCardBody>
            //     </CCollapse>
            //   )
            // },
          }}
          selectable
          sorterValue={{ column: 'name', state: 'asc' }}
          tableFilter
          tableHeadProps={{
            color: 'primary',
          }}
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
export default Inventory
