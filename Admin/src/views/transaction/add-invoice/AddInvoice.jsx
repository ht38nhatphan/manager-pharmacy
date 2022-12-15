import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table, Select, InputNumber, message } from 'antd';
import {
  CCardBody, CCard, CCardHeader, CRow, CCol,
} from '@coreui/react'

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { createAxios } from "src/createInstance";
import { loginSuccess } from "src/redux/authSlice";
import { addOrder, addThuocs } from "src/redux/apiRequest";

const AddInvoice = () => {

  //backend
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //check login
  const user = useSelector((state) => state.auth.login?.currentUser);
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  const options = [];

  const [max, setMax] = useState();
  const products = useSelector((state) => state.product.products);

  products.map((data, index) => {
    options.push({
      value: index,
      label: data.brand,
    })
  });
  const [messageApi, contextHolder] = message.useMessage();
  const EditableContext = React.createContext(null);
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
    const toggleEdit = () => {
      // console.log(record);
      // const nn = address
      setEditing(!editing);
      form.setFieldsValue({
        // [nn]: '23',
        [dataIndex]: record[dataIndex],
        // address: '3232',
      });
    };

    const save = async () => {

      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({
          ...record,
          ...values,
        });
      } catch (errInfo) {
        // console.log('Save failed:', errInfo);
        messageApi.open({
          type: 'error',
          content: 'Số Lượng Trong Kho Không đủ',
          className: 'custom-class',
          style: {
            marginTop: '100px',
            marginLeft: '130px',
          },
        });
      }
    };
    let childNode = children;
    // console.log(record);

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} phải nhập.`,
            },
          ]}
        >

          <InputNumber min={1} max={max} style={{
            width: 200,
          }} defaultValue={3} ref={inputRef} onPressEnter={save} onBlur={save} />
          {/* <Input ref={inputRef} onPressEnter={save} onBlur={save} /> */}
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 5,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
    return <td {...restProps}>{childNode}</td>;
  };
  // const dispatch = useDispatch();
  // // const navigate = useNavigate();
  // useEffect(() => {
  //   getAllThuocs(dispatch);
  // }, [])


  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    // console.log(value);
    // const a = products.find(() => { return products.key === value })
    setMax(value)
    const newData = {
      key: count,
      // productID: value,
      brand: products[value].brand,
      amount: 1,
      priceOut: products[value].priceOut,
      sumprice: products[value].priceOut,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const [dataSource, setDataSource] = useState([
  ]);
  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: 'Tên Thuốc',
      dataIndex: 'brand',
      width: '30%',
      // editable: true,
    },
    {
      title: 'Số Lượng',
      dataIndex: 'amount',
      editable: true,
    },
    {
      title: 'Giá Tiền',
      dataIndex: 'priceOut',
    },
    {
      title: 'Tổng Tiền',
      dataIndex: 'sumprice',
    },
    {
      title: 'Hành Động',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    row.sumprice = row.amount * row.priceOut
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  //random id order
  function guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }
  const handleAdd = () => {
    // console.log(dataSource[0]);
    const formData = new FormData();
    // for (const [key, value] of Object.entries(dataSource)) {
    //   console.log(`${key}: ${value}`);
    //   formData.append(`products`, value);
    // }
    const sumpricearr = []
    dataSource.map((data, index) => {
      // console.log(data.sumprice);
      sumpricearr.push(data.sumprice)

    });
    // console.log(sumpricearr[0]);
    formData.append("idorder", guidGenerator());
    if (dataSource.length >= 2) {

      const total = Object.values(sumpricearr).reduce((a, b) => a + b, 0);
      formData.append(`sumoder`, total);
    }
    else {
      formData.append(`sumoder`, sumpricearr[0]);
    }
    console.log(formData);
    // setDataSource([...dataSource, newData]);
    // setCount(count + 1);
    addOrder(formData, user?.accessToken, dispatch, navigate, axiosJWT)
  };
  return (
    <CCard className="mb-4">
      {contextHolder}
      <CCardHeader>
        <strong>Danh Sách Hóa Đơn Thuốc</strong>
      </CCardHeader>
      <CCardBody>
        <>
          <CRow>
            <CCol md={12}>
              <Select
                showSearch
                style={{
                  width: "100%",
                  marginBottom: 16,
                }}
                placeholder="Nhập Thuốc Cần Tìm"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                onChange={handleChange}
                // tokenSeparators={[',']}
                options={options}
              />
              <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
              />
              <Button
                onClick={handleAdd}
                type="primary"
                style={{
                  marginTop: 16,
                }}
              >
                Tạo Đơn Hàng
              </Button>
            </CCol>
          </CRow>
        </>
      </CCardBody>
    </CCard>
  );

};

export default AddInvoice;