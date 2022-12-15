import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  // cilDrop,
  cilHouse,
  cilNotes,
  // cilPencil,
  cilTransfer,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilBeaker,
  cilIndustry,
  cilUserPlus,
  cilPeople,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  //dashboard
  {
    component: CNavItem,
    name: 'Thống Kê',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavTitle,
    name: 'Quản Lý Chung',
  },
  //warehouse
  {
    component: CNavGroup,
    name: 'Kho',
    to: '/theme/colors',
    icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Nhập Kho',
        to: '/warehouse/add-warehouse',
      },
      {
        component: CNavItem,
        name: 'Lịch Sử Nhập Kho',
        to: '/warehouse/list-warehouse',
      },
      // {
      //   component: CNavItem,
      //   name: 'Danh Sách Nhập Kho',
      //   to: '/warehouse/inventory',
      // },
    ],
  },
  //transaction
  {
    component: CNavGroup,
    name: 'Giao Dịch',
    to: '/theme/typography',
    icon: <CIcon icon={cilTransfer} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Tạo Hóa Đơn',
        to: '/transaction/add-invoice',
      },
      {
        component: CNavItem,
        name: 'Danh Sách Hóa Đơn',
        to: '/transaction/list-invoice',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Quản Lý',
  },
  //pharmacy
  {
    component: CNavGroup,
    name: 'Thuốc',
    to: '/theme/a',
    icon: <CIcon icon={cilBeaker} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh Sách Thuốc',
        to: '/pharmacy/list-pharmacy',
      },
      {
        component: CNavItem,
        name: 'Tạo Liều Dùng',
        to: '/pharmacy/add-prescription',
      },
      {
        component: CNavItem,
        name: 'Danh Sách Thuốc Sắp Hết Hạn',
        to: '/pharmacy/list-expired',
      },
    ],
  },
  //branch pharmacy
  {
    component: CNavGroup,
    name: 'Chi Nhanh',
    to: '/theme/typography',
    icon: <CIcon icon={cilIndustry} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Tao Chi Nhanh',
        to: '/branch-pharmacy/add-branch-pharmacy',
      },
      {
        component: CNavItem,
        name: 'Danh Sach Chi Nhanh',
        to: '/branch-pharmacy/list-branch-pharmacy',
      },
    ],
  },
  //staff
  {
    component: CNavGroup,
    name: 'Nhan Vien',
    to: '/theme/typography',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Them Nhan Vien',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Danh Sach Nhan Vien',
        to: '/staff/staff-list',
      },
    ],
  },
  //list account
  {
    component: CNavItem,
    name: 'Danh Sach Tai Khoan',
    to: '/theme/typography',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  //statistic
  {
    component: CNavGroup,
    name: 'Bao Cao',
    to: '/theme/typography',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Doanh Thu Tong',
        to: '/statistic/total-revenue',
      },
      {
        component: CNavItem,
        name: 'Doanh Thu Nhan Vien',
        to: '/statistic/total-staff',
      },
      {
        component: CNavItem,
        name: 'Doanh Thu Chi Nhanh',
        to: '/statistic/total-branch',
      },
      {
        component: CNavItem,
        name: 'Uoc Tinh Lai',
        to: '/statistic/profit-estimate',
      },
      {
        component: CNavItem,
        name: 'Thuoc Ban Chay Nhat',
        to: '/statistic/pharmacy-selling',
      },
      // {
      //   component: CNavItem,
      //   name: 'Thuoc Ban Lai Nhat',
      //   to: '/statistic/pharmacy-total',
      // },
      {
        component: CNavItem,
        name: 'Khach Hang Mua Nhieu',
        to: '/statistic/customer-buy',
      },
    ],
  },
]

export default _nav
