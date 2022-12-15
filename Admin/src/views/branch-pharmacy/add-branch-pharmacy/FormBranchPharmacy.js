import React, { useState } from 'react'
import {
  CButton,
  // CCard,
  // CCardBody,
  // CCardHeader,
  CCol,
  CRow,
  CForm,
  // CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  // CDatePicker,
  // CRow,
} from '@coreui/react'
import { CDatePicker } from '@coreui/react-pro'

const FormBranchPharmacy = () => {
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }
  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom01">Ten Chi Nhanh</CFormLabel>
        <CFormInput type="text" id="validationCustom01" defaultValue="0001" required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom02">Ten Chu Chi Nhanh</CFormLabel>
        <CFormInput type="text" id="validationCustom02" defaultValue="Otto" required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom02">Tinh Trang</CFormLabel>
        <CFormSelect aria-label="Default select example" required>
          <option></option>
          <option value="1">Hoat Dong</option>
          <option value="2">Ngung Hoat Dong</option>
          <option value="2">Dang Bao Tri</option>
        </CFormSelect>
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={12}>
        <CFormTextarea
          id="exampleFormControlTextarea1"
          label="Dia Chi"
          rows="3"
          text=""
          required
        ></CFormTextarea>
      </CCol>
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          Them
        </CButton>
      </CCol>
    </CForm>
  )
}

export default FormBranchPharmacy
