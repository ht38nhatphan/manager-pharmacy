import { useEffect } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import { CBadge, CButton, CCollapse, CCardBody, CCard, CCardHeader } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllThuocs } from 'src/redux/apiRequest'

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

const ListWarehouse = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getAllThuocs(dispatch);
  }, [])


  const columns = [
    { key: '_id', _style: { width: '10%' } },
    { key: 'name', label: 'Tên', _style: { width: '30%' } },
    {
      key: 'brand', label: 'Thương Hiệu',
      _style: { width: '20%' },
      _props: { color: 'primary', className: 'fw-semibold' },
      // replace name use label
      // label: 'aaa',
    },
    { key: 'createdAt', label: 'Thời gian tạo', filter: true, sorter: true, _style: { width: '20%' } },
    { key: 'Images', label: 'Hình ảnh', filter: false, sorter: false, _style: { width: '20%' } },

  ]
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Lịch Sử Nhập Kho</strong>
      </CCardHeader>
      <CCardBody>
        <CSmartTable
          // chuyen den trang thu 3
          // activePage={3}
          cleaner
          clickableRows={false}
          onRowClick
          // confix columns
          columns={columns}
          tableFilterLabel="TÌM KIẾM"
          tableFilterPlaceholder="Nhập gì đó..."
          columnSorter
          // footer
          items={products}
          // chon trang
          itemsPerPageSelect
          itemsPerPage={5}
          pagination
          selectable
          sorterValue={{ column: '_id', column: 'createdAt', state: 'desc' }}
          tableFilter
          tableHeadProps={{
            color: 'primary',
          }}
          // tableFilterPlace
          tableProps={{
            striped: true,
            hover: true,
          }}
          scopedColumns={{
            createdAt: (item) => {
              return (
                <td>
                  <p> {(String(item.createdAt).split('T').slice(0, 1).join(' ')).split('-').slice(0, 3).reverse().join('-')} </p>
                </td>
              )
            },
            Images: (item) => {
              return (
                <td>
                  <div className="thumb_item">
                    <img style={{ maxWidth: "100px" }} src={item.Images[0]} alt={item.name} />
                  </div>
                </td>

              )
            },
          }}
        />
      </CCardBody>
    </CCard>
  )
}

export default ListWarehouse
