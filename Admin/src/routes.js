import React from 'react'
// 404 
// const Page404 = React.lazy(() => import('./views/pages/page404'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))
// warehouse

const AddWarehouse = React.lazy(() => import('./views/warehouse/add-warehouse/AddWarehouse'))
const Inventory = React.lazy(() => import('./views/warehouse/inventory/Inventory'))
const ListWarehouse = React.lazy(() => import('./views/warehouse/list-warehouse/ListWarehouse'))

//Transaction
const AddInvoice = React.lazy(() => import('./views/transaction/add-invoice/AddInvoice'))
const ListInvoice = React.lazy(() => import('./views/transaction/list-invoice/ListInvoice'))

//pharmacy
const ListPharmacy = React.lazy(() => import('./views/pharmacy/list-pharmacy/ListPharmacy'))
const ListExpired = React.lazy(() => import('./views/pharmacy/list-expired/ListExpired'))
const EditPharmacy = React.lazy(() => import('./views/pharmacy/edit-pharmacy/EditPharmacy'))
const BarCodePharmacy = React.lazy(() => import('./views/pharmacy/barcode-pharmacy/BarCodePharmacy'))
//branch pharmacy
const AddBranchPharmacy = React.lazy(() =>
  import('./views/branch-pharmacy/add-branch-pharmacy/AddBranchPharmacy'),
)
const EditBranchPharmacy = React.lazy(() =>
  import('./views/branch-pharmacy/edit-branch-pharmacy/EditBranchPharmacy'),
)
const DetailBranchPharmacy = React.lazy(() =>
  import('./views/branch-pharmacy/detail-branch-pharmacy/DetailBranchPharmacy'),
)
const ListBranchPharmacy = React.lazy(() =>
  import('./views/branch-pharmacy/list-branch-pharmacy/ListBranchPharmacy'),
)
//Staff
const ListStaff = React.lazy(() =>
  import('./views/staff/staff-list/ListStaff'),
)
const AddStaff = React.lazy(() =>
  import('./views/staff/add-staff/AddStaff'),
)
const StaffTrash = React.lazy(() =>
  import('./views/staff/staff-list/List-Trash'),
)
//Test
const Test = React.lazy(() => import('./views/pages/test/Test'))

//account
const Profile = React.lazy(() => import('./views/account/profile/Profile'))
//statistic

const Login = React.lazy(() => import('./views/pages/login/Login'))
const TotalRevenue = React.lazy(() => import('./views/statistic/total-revenue/TotalRevenue'))
const TotalBranch = React.lazy(() => import('./views/statistic/total-branch/TotalBranch'))
const ProfitEstimate = React.lazy(() => import('./views/statistic/profit-estimate/ProfitEstimate'))
const TotalStaff = React.lazy(() => import('./views/statistic/total-staff/TotalStaff'))
const PharmacySelling = React.lazy(() => import('./views/statistic/pharmacy-selling/PharmacySelling'))
const PharmacyTotal = React.lazy(() => import('./views/statistic/pharmacy-total/PharmacyTotal'))
const CustomerBuy = React.lazy(() => import('./views/statistic/customer-buy/CustomerBuy'))


const routes = [
  { path: '/', exact: true, name: 'Login Page', element: Login },
  { path: 'dashboard', name: 'Dashboard', element: Dashboard },
  { path: 'dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/warehouse/add-warehouse', name: 'AddWarehouse', element: AddWarehouse },
  { path: '/warehouse/inventory', name: 'Inventory', element: Inventory },
  { path: '/warehouse/list-warehouse', name: 'ListWarehouse', element: ListWarehouse },
  { path: '/transaction/add-invoice', name: 'AddInvoice', element: AddInvoice },
  { path: '/transaction/list-invoice', name: 'ListInvoice', element: ListInvoice },
  { path: '/pharmacy/list-pharmacy', name: 'ListPharmacy', element: ListPharmacy },
  { path: '/pharmacy/list-expired', name: 'ListExpired', element: ListExpired },
  { path: '/statistic/total-revenue', name: 'TotalRevenue', element: TotalRevenue },
  { path: '/statistic/total-staff', name: 'TotalStaff', element: TotalStaff },
  { path: '/statistic/total-branch', name: 'TotalBranch', element: TotalBranch },
  { path: '/statistic/profit-estimate', name: 'ProfitEstimate', element: ProfitEstimate },
  { path: '/statistic/pharmacy-total', name: 'PharmacyTotal', element: PharmacyTotal },
  { path: '/statistic/pharmacy-selling', name: 'PharmacySelling', element: PharmacySelling },
  { path: '/statistic/customer-buy', name: 'CustomerBuy', element: CustomerBuy },
  { path: '/account/profile', name: 'Profile', element: Profile },
  { path: '/pharmacy/edit-pharmacy/:id', name: 'EditPharmacy', element: EditPharmacy },
  {
    path: '/branch-pharmacy/add-branch-pharmacy',
    name: 'AddBranchPharmacy',
    element: AddBranchPharmacy,
  },
  {
    path: '/branch-pharmacy/list-branch-pharmacy',
    name: 'ListBranchPharmacy',
    element: ListBranchPharmacy,
  },
  {
    path: '/staff/staff-list',
    name: 'ListStaff',
    element: ListStaff,
  },
  { path: '/staff/staff-trash', name: 'StaffTrash', element: StaffTrash },
  {
    path: '/staff/add-staff',
    name: 'AddStaff',
    element: AddStaff,
  },
  {
    path: '/branch-pharmacy/edit-branch-pharmacy/:id',
    name: 'EditBranchPharmacy',
    element: EditBranchPharmacy,
  },
  {
    path: '/branch-pharmacy/detail-branch-pharmacy/:id',
    name: 'DetailBranchPharmacy',
    element: DetailBranchPharmacy,
  },
  { path: '/test', name: 'Test', element: Test },
  { path: '/pharmacy/barcode-pharmacy/:id', name: 'BarCodePharmacy', element: BarCodePharmacy },
]

export default routes
