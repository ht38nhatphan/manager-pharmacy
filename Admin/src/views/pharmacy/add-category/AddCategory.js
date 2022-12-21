import React from 'react'
import FormBranchPharmacy from './FormBranchPharmacy'
import {
  CCard, CCardBody, CFormLabel, CCardHeader, CRow, CCol, CButton,
  // CCard,
  // CCardBody,
  // CCardHeader,
  CForm,
  // CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText
} from '@coreui/react'
const AddCategory = () => {
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
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Loại Sản Phẩm</strong>
          </CCardHeader>
          <CCardBody>  <CForm
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
          </CForm></CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddCategory
