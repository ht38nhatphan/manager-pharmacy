import React, { useState, useEffect } from "react";
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
import { addThuocs, addCategory, getAllCategory, getAllUnit, getAllSupelier, addUnit, addSupelier } from "src/redux/apiRequest";
import '../../../css/styleformaddwarehouse.css'
import { createAxios } from "src/createInstance";
import { loginSuccess } from "src/redux/authSlice";
import { toast } from 'react-toastify';
const FormAddWarehouse = () => {
  const [fileListShow, setFileListShow] = useState([]);
  const [fileList, setFileList] = useState();
  const optionsBrandCountry = [
    { value: 'Afghanistan', code: 'AF' },
    { value: 'Åland Islands', code: 'AX' },
    { value: 'Albania', code: 'AL' },
    { value: 'Algeria', code: 'DZ' },
    { value: 'American Samoa', code: 'AS' },
    { value: 'AndorrA', code: 'AD' },
    { value: 'Angola', code: 'AO' },
    { value: 'Anguilla', code: 'AI' },
    { value: 'Antarctica', code: 'AQ' },
    { value: 'Antigua and Barbuda', code: 'AG' },
    { value: 'Argentina', code: 'AR' },
    { value: 'Armenia', code: 'AM' },
    { value: 'Aruba', code: 'AW' },
    { value: 'Australia', code: 'AU' },
    { value: 'Austria', code: 'AT' },
    { value: 'Azerbaijan', code: 'AZ' },
    { value: 'Bahamas', code: 'BS' },
    { value: 'Bahrain', code: 'BH' },
    { value: 'Bangladesh', code: 'BD' },
    { value: 'Barbados', code: 'BB' },
    { value: 'Belarus', code: 'BY' },
    { value: 'Belgium', code: 'BE' },
    { value: 'Belize', code: 'BZ' },
    { value: 'Benin', code: 'BJ' },
    { value: 'Bermuda', code: 'BM' },
    { value: 'Bhutan', code: 'BT' },
    { value: 'Bolivia', code: 'BO' },
    { value: 'Bosnia and Herzegovina', code: 'BA' },
    { value: 'Botswana', code: 'BW' },
    { value: 'Bouvet Island', code: 'BV' },
    { value: 'Brazil', code: 'BR' },
    { value: 'British Indian Ocean Territory', code: 'IO' },
    { value: 'Brunei Darussalam', code: 'BN' },
    { value: 'Bulgaria', code: 'BG' },
    { value: 'Burkina Faso', code: 'BF' },
    { value: 'Burundi', code: 'BI' },
    { value: 'Cambodia', code: 'KH' },
    { value: 'Cameroon', code: 'CM' },
    { value: 'Canada', code: 'CA' },
    { value: 'Cape Verde', code: 'CV' },
    { value: 'Cayman Islands', code: 'KY' },
    { value: 'Central African Republic', code: 'CF' },
    { value: 'Chad', code: 'TD' },
    { value: 'Chile', code: 'CL' },
    { value: 'China', code: 'CN' },
    { value: 'Christmas Island', code: 'CX' },
    { value: 'Cocos (Keeling) Islands', code: 'CC' },
    { value: 'Colombia', code: 'CO' },
    { value: 'Comoros', code: 'KM' },
    { value: 'Congo', code: 'CG' },
    { value: 'Congo, The Democratic Republic of the', code: 'CD' },
    { value: 'Cook Islands', code: 'CK' },
    { value: 'Costa Rica', code: 'CR' },
    { value: 'Cote D\'Ivoire', code: 'CI' },
    { value: 'Croatia', code: 'HR' },
    { value: 'Cuba', code: 'CU' },
    { value: 'Cyprus', code: 'CY' },
    { value: 'Czech Republic', code: 'CZ' },
    { value: 'Denmark', code: 'DK' },
    { value: 'Djibouti', code: 'DJ' },
    { value: 'Dominica', code: 'DM' },
    { value: 'Dominican Republic', code: 'DO' },
    { value: 'Ecuador', code: 'EC' },
    { value: 'Egypt', code: 'EG' },
    { value: 'El Salvador', code: 'SV' },
    { value: 'Equatorial Guinea', code: 'GQ' },
    { value: 'Eritrea', code: 'ER' },
    { value: 'Estonia', code: 'EE' },
    { value: 'Ethiopia', code: 'ET' },
    { value: 'Falkland Islands (Malvinas)', code: 'FK' },
    { value: 'Faroe Islands', code: 'FO' },
    { value: 'Fiji', code: 'FJ' },
    { value: 'Finland', code: 'FI' },
    { value: 'France', code: 'FR' },
    { value: 'French Guiana', code: 'GF' },
    { value: 'French Polynesia', code: 'PF' },
    { value: 'French Southern Territories', code: 'TF' },
    { value: 'Gabon', code: 'GA' },
    { value: 'Gambia', code: 'GM' },
    { value: 'Georgia', code: 'GE' },
    { value: 'Germany', code: 'DE' },
    { value: 'Ghana', code: 'GH' },
    { value: 'Gibraltar', code: 'GI' },
    { value: 'Greece', code: 'GR' },
    { value: 'Greenland', code: 'GL' },
    { value: 'Grenada', code: 'GD' },
    { value: 'Guadeloupe', code: 'GP' },
    { value: 'Guam', code: 'GU' },
    { value: 'Guatemala', code: 'GT' },
    { value: 'Guernsey', code: 'GG' },
    { value: 'Guinea', code: 'GN' },
    { value: 'Guinea-Bissau', code: 'GW' },
    { value: 'Guyana', code: 'GY' },
    { value: 'Haiti', code: 'HT' },
    { value: 'Heard Island and Mcdonald Islands', code: 'HM' },
    { value: 'Holy See (Vatican City State)', code: 'VA' },
    { value: 'Honduras', code: 'HN' },
    { value: 'Hong Kong', code: 'HK' },
    { value: 'Hungary', code: 'HU' },
    { value: 'Iceland', code: 'IS' },
    { value: 'India', code: 'IN' },
    { value: 'Indonesia', code: 'ID' },
    { value: 'Iran, Islamic Republic Of', code: 'IR' },
    { value: 'Iraq', code: 'IQ' },
    { value: 'Ireland', code: 'IE' },
    { value: 'Isle of Man', code: 'IM' },
    { value: 'Israel', code: 'IL' },
    { value: 'Italy', code: 'IT' },
    { value: 'Jamaica', code: 'JM' },
    { value: 'Japan', code: 'JP' },
    { value: 'Jersey', code: 'JE' },
    { value: 'Jordan', code: 'JO' },
    { value: 'Kazakhstan', code: 'KZ' },
    { value: 'Kenya', code: 'KE' },
    { value: 'Kiribati', code: 'KI' },
    { value: 'Korea, Democratic People\'S Republic of', code: 'KP' },
    { value: 'Korea, Republic of', code: 'KR' },
    { value: 'Kuwait', code: 'KW' },
    { value: 'Kyrgyzstan', code: 'KG' },
    { value: 'Lao People\'S Democratic Republic', code: 'LA' },
    { value: 'Latvia', code: 'LV' },
    { value: 'Lebanon', code: 'LB' },
    { value: 'Lesotho', code: 'LS' },
    { value: 'Liberia', code: 'LR' },
    { value: 'Libyan Arab Jamahiriya', code: 'LY' },
    { value: 'Liechtenstein', code: 'LI' },
    { value: 'Lithuania', code: 'LT' },
    { value: 'Luxembourg', code: 'LU' },
    { value: 'Macao', code: 'MO' },
    { value: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
    { value: 'Madagascar', code: 'MG' },
    { value: 'Malawi', code: 'MW' },
    { value: 'Malaysia', code: 'MY' },
    { value: 'Maldives', code: 'MV' },
    { value: 'Mali', code: 'ML' },
    { value: 'Malta', code: 'MT' },
    { value: 'Marshall Islands', code: 'MH' },
    { value: 'Martinique', code: 'MQ' },
    { value: 'Mauritania', code: 'MR' },
    { value: 'Mauritius', code: 'MU' },
    { value: 'Mayotte', code: 'YT' },
    { value: 'Mexico', code: 'MX' },
    { value: 'Micronesia, Federated States of', code: 'FM' },
    { value: 'Moldova, Republic of', code: 'MD' },
    { value: 'Monaco', code: 'MC' },
    { value: 'Mongolia', code: 'MN' },
    { value: 'Montserrat', code: 'MS' },
    { value: 'Morocco', code: 'MA' },
    { value: 'Mozambique', code: 'MZ' },
    { value: 'Myanmar', code: 'MM' },
    { value: 'Namibia', code: 'NA' },
    { value: 'Nauru', code: 'NR' },
    { value: 'Nepal', code: 'NP' },
    { value: 'Netherlands', code: 'NL' },
    { value: 'Netherlands Antilles', code: 'AN' },
    { value: 'New Caledonia', code: 'NC' },
    { value: 'New Zealand', code: 'NZ' },
    { value: 'Nicaragua', code: 'NI' },
    { value: 'Niger', code: 'NE' },
    { value: 'Nigeria', code: 'NG' },
    { value: 'Niue', code: 'NU' },
    { value: 'Norfolk Island', code: 'NF' },
    { value: 'Northern Mariana Islands', code: 'MP' },
    { value: 'Norway', code: 'NO' },
    { value: 'Oman', code: 'OM' },
    { value: 'Pakistan', code: 'PK' },
    { value: 'Palau', code: 'PW' },
    { value: 'Palestinian Territory, Occupied', code: 'PS' },
    { value: 'Panama', code: 'PA' },
    { value: 'Papua New Guinea', code: 'PG' },
    { value: 'Paraguay', code: 'PY' },
    { value: 'Peru', code: 'PE' },
    { value: 'Philippines', code: 'PH' },
    { value: 'Pitcairn', code: 'PN' },
    { value: 'Poland', code: 'PL' },
    { value: 'Portugal', code: 'PT' },
    { value: 'Puerto Rico', code: 'PR' },
    { value: 'Qatar', code: 'QA' },
    { value: 'Reunion', code: 'RE' },
    { value: 'Romania', code: 'RO' },
    { value: 'Russian Federation', code: 'RU' },
    { value: 'RWANDA', code: 'RW' },
    { value: 'Saint Helena', code: 'SH' },
    { value: 'Saint Kitts and Nevis', code: 'KN' },
    { value: 'Saint Lucia', code: 'LC' },
    { value: 'Saint Pierre and Miquelon', code: 'PM' },
    { value: 'Saint Vincent and the Grenadines', code: 'VC' },
    { value: 'Samoa', code: 'WS' },
    { value: 'San Marino', code: 'SM' },
    { value: 'Sao Tome and Principe', code: 'ST' },
    { value: 'Saudi Arabia', code: 'SA' },
    { value: 'Senegal', code: 'SN' },
    { value: 'Serbia and Montenegro', code: 'CS' },
    { value: 'Seychelles', code: 'SC' },
    { value: 'Sierra Leone', code: 'SL' },
    { value: 'Singapore', code: 'SG' },
    { value: 'Slovakia', code: 'SK' },
    { value: 'Slovenia', code: 'SI' },
    { value: 'Solomon Islands', code: 'SB' },
    { value: 'Somalia', code: 'SO' },
    { value: 'South Africa', code: 'ZA' },
    { value: 'South Georgia and the South Sandwich Islands', code: 'GS' },
    { value: 'Spain', code: 'ES' },
    { value: 'Sri Lanka', code: 'LK' },
    { value: 'Sudan', code: 'SD' },
    { value: 'Surivalue', code: 'SR' },
    { value: 'Svalbard and Jan Mayen', code: 'SJ' },
    { value: 'Swaziland', code: 'SZ' },
    { value: 'Sweden', code: 'SE' },
    { value: 'Switzerland', code: 'CH' },
    { value: 'Syrian Arab Republic', code: 'SY' },
    { value: 'Taiwan, Province of China', code: 'TW' },
    { value: 'Tajikistan', code: 'TJ' },
    { value: 'Tanzania, United Republic of', code: 'TZ' },
    { value: 'Thailand', code: 'TH' },
    { value: 'Timor-Leste', code: 'TL' },
    { value: 'Togo', code: 'TG' },
    { value: 'Tokelau', code: 'TK' },
    { value: 'Tonga', code: 'TO' },
    { value: 'Trinidad and Tobago', code: 'TT' },
    { value: 'Tunisia', code: 'TN' },
    { value: 'Turkey', code: 'TR' },
    { value: 'Turkmenistan', code: 'TM' },
    { value: 'Turks and Caicos Islands', code: 'TC' },
    { value: 'Tuvalu', code: 'TV' },
    { value: 'Uganda', code: 'UG' },
    { value: 'Ukraine', code: 'UA' },
    { value: 'United Arab Emirates', code: 'AE' },
    { value: 'United Kingdom', code: 'GB' },
    { value: 'United States', code: 'US' },
    { value: 'United States Minor Outlying Islands', code: 'UM' },
    { value: 'Uruguay', code: 'UY' },
    { value: 'Uzbekistan', code: 'UZ' },
    { value: 'Vanuatu', code: 'VU' },
    { value: 'Venezuela', code: 'VE' },
    { value: 'Viet Nam', code: 'VN' },
    { value: 'Virgin Islands, British', code: 'VG' },
    { value: 'Virgin Islands, U.S.', code: 'VI' },
    { value: 'Wallis and Futuna', code: 'WF' },
    { value: 'Western Sahara', code: 'EH' },
    { value: 'Yemen', code: 'YE' },
    { value: 'Zambia', code: 'ZM' },
    { value: 'Zimbabwe', code: 'ZW' }
  ]
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
  //show category
  useEffect(() => {
    getAllCategory(dispatch);
    getAllUnit(dispatch);
    getAllSupelier(dispatch)
  }, [])

  const categoryall = useSelector((state) => state.category.category?.category)
  const unitall = useSelector((state) => state.unit.unit?.unit)
  const supelierall = useSelector((state) => state.supelier.supelier?.supelier)

  // const [categoryss, setCategoryss] = useState([])
  // categoryall.map((value, index) => {
  //   setCategoryss({ 'name': value.name, 'value': value.value })
  // })
  const [selectone, setSelectOne] = useState({})
  const [selectone1, setSelectOne1] = useState({})
  const [selectone2, setSelectOne2] = useState({})
  const handleChangSelectOne = (index, value, e) => {
    setSelectOne1({ 'brandCountry': index })

  }
  const handleChangSelectUnit = (index, value) => {
    setSelectOne2({ 'specification': index[0] })
    const units = {}
    units.name = index[0]
    units.value = index[0]
    // console.log(na[0])
    console.log(value);
    let check = false

    unitall.map((value, indexs) => {

      value.name === index[0] ? check = true : ''

      // console.log(value.name === index[0]);
    })
    if (check == false) {
      addUnit(units, dispatch)
    }
  }
  const handleChangSelectSupelier = (index, value) => {
    setSelectOne({ 'producer': index[0] })
    const supeliers = {}
    supeliers.name = index[0]
    supeliers.value = index[0]
    // console.log(na[0])
    let check = false
    supelierall.map((value, indexs) => {

      value.name === index[0] ? check = true : ''
      // value.name === index[0] ? '' : addSupelier(supeliers, dispatch)

      // console.log(value.name);
    })
    if (check == false) {
      addSupelier(supeliers, dispatch)
    }
  }
  const handleChangSelect = (na, value) => {
    const category = new Array()
    for (let n in value) {
      category.push(value[n].name)
    }
    console.log(value);
    if (value.length > 0) {
      setSelect((prev) => {
        return { ...prev, 'categories': [category] };
      });
    }
    const categorys = {}
    categorys.name = na[0]
    categorys.value = na[0]
    // console.log(na[0])
    categoryall.map((value, index) => {
      value.name === na[0] ? '' : addCategory(categorys, dispatch)

      console.log(value.name === na[0]);
    })





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
      for (const [key, value] of Object.entries(selectone)) {
        formData.append(key, value);
      }
      for (const [key, value] of Object.entries(selectone1)) {
        formData.append(key, value);
      }
      for (const [key, value] of Object.entries(selectone2)) {
        console.log(value);
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
        {/* <CCol md={4}>
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
        </CCol> */}
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
        <CCol CCol md={4}>
          <CFormLabel htmlFor="validationCustom03">Loại Sản Phẩm</CFormLabel>
          <Select
            mode="tags"
            style={{
              width: '100%',
            }}
            maxTagCount="1"
            placeholder="-- Loại Sản Phẩm --"
            name="category"
            onChange={handleChangSelect}
            options={categoryall}
            rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm' }]}
          />
          <CFormFeedback valid>Ok!</CFormFeedback>
        </CCol>
        {/* <CCol CCol md={4}>
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
        </CCol> */}


        <CCol md={4}>
          <CFormLabel htmlFor="validationCustom07">Nhà Cung Cấp</CFormLabel>
          <Select
            mode="tags"
            style={{
              width: '100%',
            }}
            maxTagCount="1"
            placeholder="-- Nhà Cung Cấp --"
            name="category"
            onChange={handleChangSelectSupelier}
            options={supelierall}
            rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp' }]}
          />
          <CFormFeedback valid>Ok!</CFormFeedback>
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="validationCustom08">Nước Sản Xuất</CFormLabel>
          <Select
            showSearch
            name="brandCountry"
            style={{
              width: '100%',
            }}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.value ?? '').includes(input.toUpperCase())}
            filterSort={(optionA, optionB) =>
              (optionA?.value ?? '').toLowerCase().localeCompare((optionB?.value ?? '').toLowerCase())
            }

            options={optionsBrandCountry}
            onChange={handleChangSelectOne}
          />
        </CCol>

        <CCol md={4}>
          <CFormLabel htmlFor="validationCustom09">Đơn Vị Tính</CFormLabel>
          <Select
            mode="tags"
            style={{
              width: '100%',
            }}
            maxTagCount="1"
            placeholder="-- Đơn Vị Tính --"
            name="category"
            onChange={handleChangSelectUnit}
            options={unitall}
            rules={[{ required: true, message: 'Vui lòng chọn đơn vị tính' }]}
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
        {/* <CCol md={4}>
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
        </CCol> */}
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