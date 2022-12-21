import React, { useEffect } from 'react'
import { useBarcode } from '@createnextapp/react-barcode';
import { useReactToPrint } from 'react-to-print'
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import {
  CCardBody, CCard, CCardHeader, CRow, CCol,
} from '@coreui/react'
import { Button } from 'antd';
const BarCodePharmacy = () => {
  const products = useSelector((state) => state.product.products);
  const location = useLocation();
  const id = location.pathname.split('/')[3];
  const handlePrint = useReactToPrint({
    content: () => inputRef.current,
    documentTitle: 'emp-data',
    // onAfterPrint: () => alert('in thành công')
  })
  const { inputRef } = useBarcode({
    value: products[id]._id,
    options: {
      background: '#ccffff',
    }
  });
  return (
    <CCard className="mb-4">
      {/* {contextHolder} */}
      <CCardHeader>
        <strong>Mã Vạch Thuốc</strong>
      </CCardHeader>
      <CCardBody>
        <>
          <CRow>
            <CCol md={12} >
              <svg ref={inputRef} />
              <Button
                onClick={handlePrint}
                type="primary"
                style={{
                  marginTop: 16,
                  marginLeft: 300,
                }}
              >
                In Mã Vạch PDF
              </Button>
            </CCol>
          </CRow>
        </>
      </CCardBody>
    </CCard>
  );
};

export default BarCodePharmacy;