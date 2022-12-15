import React from 'react'
import FormBranchPharmacy from './FormBranchPharmacy'
import { CCard, CCardBody, CFormLabel, CCardHeader, CRow, CCol } from '@coreui/react'
const AddBranchPharmacy = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Thong Tin Chi Nhanh</strong>
          </CCardHeader>
          <CCardBody>{FormBranchPharmacy()}</CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddBranchPharmacy
