import React, { useState } from "react";
import {
  CButton,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import { Space, Spin, message, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addThuocs } from "src/redux/apiRequest";
import '../../../css/styleformaddwarehouse.css'
import { createAxios } from "src/createInstance";
import { loginSuccess } from "src/redux/authSlice";
import { toast } from 'react-toastify';
const FormAddWarehouse = () => {
  const [fileListShow, setFileListShow] = useState([]);
  const [fileList, setFileList] = useState();

  const options = [
    {
      name: 'heart',
      value: 'Tim Mạch',
    },
    {
      name: 'vitamin',
      value: 'Tăng Đề Kháng',
    },
    {
      name: 'skincare',
      value: 'Chăm Sóc Da',

    },
  ]
  const [validated, setValidated] = useState(false);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;

    // setFileList(selectedFiles)

    // console.log(fileList)
    // console.log(event.target.files[0]);
    const selectedFilesArray = Array.from(selectedFiles);
    setFileList(selectedFilesArray)
    console.log(selectedFilesArray)
    const imagesArray = selectedFilesArray.map((file) => {
      // console.log(URL.createObjectURL(file))
      return URL.createObjectURL(file);
    });

    setFileListShow((previousImages) => previousImages.concat(imagesArray));
    // console.log(imagesArray)
    // FOR BUG IN CHROME

    // event.target.value = "";
  }

  function deleteHandler(image, index) {
    // setFileList(fileList.fitter((file, index1) => index1 !== index));
    setFileListShow(fileListShow.filter((e) => e !== image));
    // setFileList(e.target.files)
    URL.revokeObjectURL(image);
    setFileList(fileList.filter((file, index1) => index1 !== index));
    // console.log(fileList)

  }



  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [select, setSelect] = useState({});
  const user = useSelector((state) => state.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleChangSelect = (na, value) => {
    const category = new Array()
    for (let n in value) {
      // console.log(value[n].name);
      // console.log(i)
      category.push(value[n].name)
    }
    // // letters.add(name)
    // console.log(category);
    if (value.length > 0) {
      setSelect((prev) => {
        return { ...prev, 'categories': [category] };
      });
    }
    // console.log(category)


  }
  const handleAddProduct = (e) => {
    // console.log(fileList);
    // console.log(inputs);
    // if(inputs)
    // 

    try {
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        // e.preventDefault();
        // e.stopPropagation();
      }
      setValidated(true);
      const formData = new FormData();
      // console.log(select);
      formData.append("files", fileList);
      for (const [key, value] of Object.entries(fileList)) {
        console.log(`files`, value);
        formData.append(`files`, value);
      }

      for (const [key, value] of Object.entries(select)) {
        for (const [key1, value1] of Object.entries(value)) {
          for (const [key2, value2] of Object.entries(value1)) {
            formData.append(`categories`, value2);
          }
        }
      }

      // formData.append(`Images`, fileListShow);

      // console.log("entries", Object.entries(inputs));
      for (const [key, value] of Object.entries(inputs)) {
        formData.append(key, value);
      }

      addThuocs(formData, user?.accessToken, dispatch, navigate, axiosJWT);
    } catch (error) {
      toast.error('Thêm Thuốc Thất Bại!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }


  };

  return (
    <div>
      <CForm
        className="row g-3 needs-validation"
        noValidate
        validated={validated}
      // onSubmit={handleSubmit}
      // onSubmit={handleAddProduct}
      >

        <CCol md={12}>
          <CFormLabel htmlFor="validationCustom01">Tên Sản Phẩm</CFormLabel>
          <CFormInput
            type="text"
            id="validationCustom01"
            placeholder="Viên uống Vitamins.."
            name="name"
            onChange={handleChange}
            required

          />
          <CFormFeedback valid>Ok!</CFormFeedback>
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="validationCustom02">Mã Thuốc</CFormLabel>
          <CFormInput
            type="text"
            id="validationCustom02"
            placeholder="Jpanwell"
            name="idbrand"
            onChange={handleChange}
            required
          />
          <CFormFeedback valid>Ok!</CFormFeedback>
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="validationCustom02">Tên Thương Hiệu</CFormLabel>
          <CFormInput
            type="text"
            id="validationCustom02"
            placeholder="Jpanwell"
            name="brand"
            onChange={handleChange}
            required
          />
          <CFormFeedback valid>Ok!</CFormFeedback>
        </CCol>

        <CCol CCol md={4}>
          <CFormLabel htmlFor="validationCustom03">Loại Sản Phẩm</CFormLabel>
          <Select
            mode="tags"
            style={{
              width: '100%',
            }}
            placeholder="-- Loại Sản Phẩm --"
            name="category"
            onChange={handleChangSelect}
            options={options}
            rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm' }]}
          />
          <CFormFeedback valid>Ok!</CFormFeedback>
        </CCol>
        <CCol CCol md={4}>
          <CFormLabel htmlFor="validationCustom04">Dạng Bào Chế</CFormLabel>

          <CFormSelect
            aria-label="Default select example"
            name="dosageForm"
            onChange={handleChange}
            required
          >
            <option disabled value="">
              {" "}
              -- Dạng Bào Chế --{" "}
            </option>
            <option name="viennangmem" value="Viên Nang Mềm">
              Viên Nang Mềm
            </option>
            <option name="viennen" value="Viên Nén">
              Viên Nén
            </option>
            <option name="SiRo" value="SiRo">
              SiRo
            </option>
          </CFormSelect>
          <CFormFeedback valid>Ok!</CFormFeedback>
        </CCol>

        <CCol md={4}>
          <CFormLabel htmlFor="validationCustom05">Giá Nhập</CFormLabel>
          <CInputGroup className="mb-3">
            <CFormInput
              aria-label="VND amount (with dot and two decimal places)"
              id="priceInInput"
              placeholder="20.000"
              type="number"
              min="0"
              name="priceIn"
              onChange={handleChange}
              required
            />
            <CInputGroupText>VND</CInputGroupText>
          </CInputGroup>
          <CFormFeedback valid>Ok!</CFormFeedback>
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="validationCustom06">Giá Bán</CFormLabel>
          <CInputGroup className="mb-3">
            <CFormInput
              aria-label="VND amount (with dot and two decimal places)"
              id="priceOutInput"
              placeholder="25.000"
              type="number"
              min="0"
              name="priceOut"
              onChange={handleChange}
              required
            />
            <CInputGroupText>VND</CInputGroupText>
          </CInputGroup>
          <CFormFeedback valid>Ok!</CFormFeedback>
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="validationCustom07">Nhà Cung Cấp</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            name="producer"
            onChange={handleChange}
            required
          >

            <option value="Thanh Sen">Thanh Sen</option>
            <option value="Panaco">Panaco</option>
            <option value="GENSEI">GENSEI </option>
            <option value="VITAMINS FOR LIFE LLC">VITAMINS FOR LIFE LLC </option>
          </CFormSelect>
          <CFormFeedback valid> Hoàn Thành!</CFormFeedback>
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="validationCustom08">Nước Sản Xuất</CFormLabel>
          <CFormInput
            type="text"
            id="brandCountryInput"
            placeholder="Việt Nam"
            name="brandCountry"
            onChange={handleChange}
            required
          />
          <CFormFeedback valid>Ok!</CFormFeedback>
        </CCol>

        <CCol md={4}>
          <CFormLabel htmlFor="validationCustom09">Quy Cách</CFormLabel>
          <CFormInput
            type="text"
            id="specificationInput"
            placeholder="Hộp 30 Viên"
            name="specification"
            onChange={handleChange}
            required
          />
          <CFormFeedback valid>Ok!</CFormFeedback>
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="validationCustom06">Số Lượng</CFormLabel>
          <CInputGroup className="mb-3">
            <CFormInput
              id="priceOutInput"
              type="number"
              min="0"
              name="amount"
              onChange={handleChange}
              required
            />

          </CInputGroup>
          <CFormFeedback valid>Ok!</CFormFeedback>
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="validationCustom09">Hỗ Trợ</CFormLabel>
          <CFormInput
            type="text"
            id="specificationInput"
            placeholder="hỗ trợ sức khỏe tim mạch..."
            name="support"
            onChange={handleChange}
            required
          />
          <CFormFeedback valid>Ok!</CFormFeedback>
        </CCol>
        {/* <CCol md={4}>
          <CFormLabel htmlFor="validationCustom05">Số Lượng</CFormLabel>
          <CInputGroup className="mb-3">
            <CFormInput
              aria-label="VND amount (with dot and two decimal places)"
              id="priceInInput"
              placeholder="0"
              type="number"
              name="priceIn"
              onChange={handleChange}
              required
            />
            <CInputGroupText>VND</CInputGroupText>
          </CInputGroup>
          <CFormFeedback valid>Ok!</CFormFeedback>
        </CCol> */}

        <CCol md={4}>
          <CFormLabel htmlFor="validationCustom02">Ngày Hết hạn</CFormLabel>

          <input
            type="date"
            className="form-control"
            id="expInput"
            name="exp"
            onChange={handleChange}
            required
          />
          <CFormFeedback valid>Ok!</CFormFeedback>
        </CCol>

        <CCol md={12}>
          <CFormTextarea
            id="exampleFormControlTextarea1"
            name="uses"
            label="Công Dụng"
            rows="3"
            text=""
            onChange={handleChange}
            required
          ></CFormTextarea>
        </CCol>

        <CCol md={12}>
          <section className="formaddware">
            <label className="lbformaddware">
              + Thêm Ảnh
              <br />
              <span>Tải Tối Đa 4 Ảnh</span>
              <input
                className="ipformaddware"
                type="file"
                id="file"
                multiple
                name="files"
                accept="image/jpg , image/jpeg , image/png"
                onChange={onSelectFile}
              />
            </label>
            <br />

            {fileListShow.length > 0 &&
              (fileListShow.length > 4 ? (
                <p className="error">
                  Không quá 4 file <br />
                  <span>
                    Vui Lòng Xóa <b> {fileListShow.length - 4} </b> File Ảnh{" "}
                  </span>
                </p>
              ) : (
                <div></div>
                // <button
                //   className="upload-btn"
                //   onClick={() => {
                //     console.log(selectedImages);
                //   }}
                // >
                //   UPLOAD {selectedImages.length} IMAGE
                //   {selectedImages.length === 1 ? "" : "S"}
                // </button>
              ))}

            <div className="images">
              {fileListShow &&
                fileListShow.map((image, index) => {

                  return (
                    <div key={image} className="image">
                      <img src={image} height="200" width="250" alt="upload" />
                      <button onClick={() => deleteHandler(image, index)}>
                        Xóa Ảnh
                      </button>
                      <p>{index + 1}</p>
                    </div>
                  );
                })
                // &&
                // fileList.map((file) => {
                //   return (
                //     console.log(file)
                //   )
                // })
              }
            </div>
          </section>
        </CCol>
        <CButton onClick={handleAddProduct} color="primary" >
          Lưu Sản Phẩm
        </CButton>
      </CForm >
    </div >

  );
};

export default FormAddWarehouse;