import React, { useState } from 'react'
// import FormBranchPharmacy from './FormBranchPharmacy'
import {
  CCard, CCardBody, CFormLabel, CCardHeader, CRow, CCol, CButton,
  // CCard,
  // CCardBody,
  // CCardHeader,
  CForm,
  // CFormCheck,
  CFormInput,
  CFormFeedback,
  // CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText
} from '@coreui/react'
import { getcategorySuccess, addcategorySuccess } from "src/redux/categorySlice";
import { useDispatch, useSelector } from "react-redux";

const AddCategory = () => {
  const categorystate = useSelector((state) => state.category.category.category);
  const [validated, setValidated] = useState(false)
  const dispatch = useDispatch();
  const [catategory, setCategory] = useState()
  const name = {}
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    console.log(categorystate);
    console.log(event.target.value);
    name.name = "11"
    name.value = event.target.value
    setCategory(name)
    setValidated(true)

    // dispatch(getcategorySuccess(event.target.value))
  }
  const handleAddCategory = () => {

    dispatch(addcategorySuccess(catategory))
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
          // onSubmit={handleSubmit}
          >
            <CCol md={6}>
              <CFormLabel htmlFor="validationCustom01">Tên Loại Sản Phẩm</CFormLabel>
              <CFormInput type="text" id="validationCustom01" onChange={handleSubmit} required />
              <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            {/* <CCol md={6}>
              <CFormLabel htmlFor="validationCustom02">Ten Chu Chi Nhanh</CFormLabel>
              <CFormInput type="text" id="validationCustom02" defaultValue="Otto" required />
              <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol> */}

            <CCol xs={12}>
              <CButton color="primary" type="submit" onClick={handleAddCategory}>
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
