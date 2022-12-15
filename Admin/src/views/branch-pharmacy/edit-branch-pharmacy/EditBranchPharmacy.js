import React from 'react'
import FormEditBranchPharmacy from './FormEditBranchPharmacy'
import { CCard, CCardBody, CFormLabel, CCardHeader, CRow, CCol } from '@coreui/react'
const EditBranchPharmacy = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Chinh Sua Thong Tin Chi Nhanh</strong>
          </CCardHeader>
          <CCardBody>{FormEditBranchPharmacy()}</CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditBranchPharmacy
