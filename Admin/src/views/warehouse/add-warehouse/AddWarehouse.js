import React from 'react'
import FormAddWarehouse from './FormAddWarehouse'
import { CCard, CCardBody, CFormLabel, CCardHeader, CRow, CCol, CForm, CButton } from '@coreui/react'
import UploadImg from './UploadImg'
import { useState } from 'react'
const AddWarehouse = () => {
  // const [validated, setValidated] = useState(false)
  // const handleSubmit = (event) => {
  //   const form = event.currentTarget
  //   if (form.checkValidity() === false) {
  //     event.preventDefault()
  //     event.stopPropagation()
  //   }
  //   setValidated(true)
  // }
  return (
    <CRow>
      {/* <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    > */}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Thông Tin Thuốc</strong>
          </CCardHeader>
          <CCardBody>{FormAddWarehouse()}</CCardBody>
        </CCard>
      </CCol>
      {/* </CForm> */}
    </CRow>
  )
}

export default AddWarehouse
