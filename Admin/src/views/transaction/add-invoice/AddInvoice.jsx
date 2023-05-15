import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table, Select, InputNumber, message, Modal } from 'antd';
import {
  CCardBody, CCard, CCardHeader, CRow, CCol, CForm
} from '@coreui/react'

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { createAxios } from "src/createInstance";
import { loginSuccess } from "src/redux/authSlice";
import { addOrder, addThuocs } from "src/redux/apiRequest";
import { updateProduct, updateProductQuantity, getAllUsers, addUserForAdmin } from "src/redux/apiRequest";
const validateMessages = {
  required: '${label} Chưa được nhập!',
  types: {
    email: '${label} Chưa đúng định dạng E mail!',
    number: '${label} Chưa đúng định dạng số',
  },
  number: {
    range: '${label} Chưa đúng định dạng',
  },
};
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const AddInvoice = () => {
  const onFinish = (values) => {
    // console.log(values);
  };
  //backend
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //check login
  const user = useSelector((state) => state.auth.login?.currentUser);
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  const options = [];
  useEffect(() => {
    getAllUsers(dispatch);
  }, [])
  const userList = useSelector((state) => state.users.users?.allUsers);
  const [listuser, setListuser] = useState(userList.filter((item) => item.admin !== true))
  let listshow = []
  listuser.map((data, index) => {
    listshow.push({
      value: index,
      id: data._id,
      label: data.username,
    })
  });
  const today = new Date();
  const [max, setMax] = useState();
  let products = useSelector((state) => state.product.products);
  products = products.filter(item => (Math.ceil((new Date(item.exp)).getTime() - today.getTime())) / (24 * 60 * 60 * 1000) > 0)
  const [productstate, setProductState] = useState(products);
  products.map((data, index) => {
    options.push({
      value: index,

      label: data.name,
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

  const [sumall, setSumAll] = useState(0)
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    // console.log(value.amount);
    // const a = products.find(() => { return products.key === value })
    setMax(products[value].amount)
    const newData = {
      key: count,
      productId: products[value]._id,
      // productID: value,
      name: products[value].name,
      brand: products[value].brand,
      amount: 1,
      priceIn: products[value].priceIn,
      priceOut: products[value].priceOut,
      sumprice: products[value].priceOut,
      sumpriceIn: products[value].priceIn,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
    setSumAll(sumall + products[value].priceOut)
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
      dataIndex: 'name',
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
          <Popconfirm title="Bạn Có Chắc Chắn Muốn Xóa Không?" onConfirm={() => handleDelete(record.key)}>
            <a>Xóa</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    row.sumprice = row.amount * row.priceOut
    row.sumpriceIn = row.amount * row.priceIn
    // const sumpricearr = []
    // console.log(row);
    // row.map((data, index) => {
    //   sumpricearr.push(data.sumprice)
    //   // console.log(sumpricearr);
    // })
    setSumAll(row.amount * row.priceOut)
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    // if (row.length >= 2) {

    //   const total = Object.values(sumpricearr).reduce((a, b) => a + b, 0);
    //   setSumAll(total)
    // }
    // else {
    //   setSumAll(sumpricearr[0])
    // }
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
  const order = useSelector((state) => state.order.order.order);
  //add order
  const handleAdd = () => {
    // console.log(dataSource[0]);
    const formData = {}
    const productsindex = []
    // for (const [key, value] of Object.entries(dataSource)) {
    //   console.log(`${key}: ${value}`);
    //   formData.append(`products`, value);
    // }
    const sumpricearr = []
    const sumpricearrin = []
    dataSource.map((data, index) => {
      // console.log(data);
      productsindex.push(data)
      sumpricearr.push(data.sumprice)
      sumpricearrin.push(data.sumpriceIn)

    });
    // console.log(sumpricearr[0]);
    formData.userId = iduser
    formData.namecustomer = customer
    formData.status = 'Thành Công'
    formData.products = productsindex
    // productsindex = { ...dataSource }
    formData.idorder = guidGenerator()

    // console.log(formData.sumorder);
    if (dataSource.length >= 2) {
      const sumin = Object.values(sumpricearrin).reduce((a, b) => a + b, 0);
      const total = Object.values(sumpricearr).reduce((a, b) => a + b, 0);
      formData.sumorder = total
      formData.sumorderin = sumin
    }
    else {
      formData.sumorder = sumpricearr[0]
      formData.sumorderin = sumpricearrin[0]
    }
    order.length > 0 ?
      formData.key = order.length + 1 : formData.key = 0
    // console.log(order.length);
    // setDataSource([...dataSource, newData]);
    // setCount(count + 1);

    try {

      addOrder(formData, dispatch, navigate)
      dataSource.map((data, index) => {
        let sl = products.find(e => e.name == data.name)
        // console.log(sl.amount);
        const quantity = { 'amount': (sl.amount - data.amount) }
        console.log(quantity);
        updateProductQuantity(user?.accessToken, quantity, dispatch, navigate, data.productId, axiosJWT);
      });

    } catch (error) {

    }


  };

  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  let accessToken = user.accessToken
  const handleOk = () => {
    // setIsModalOpen(false);
    const formData = {
      username: name,
      email: email,
      password: '1',
      admin: false,
      name: name,
      phone: phone,
    };
    addUserForAdmin(accessToken, formData, dispatch, navigate, axiosJWT)

  };

  const handleCancel = () => {
    getAllUsers(dispatch);
    // get value before add user
    setListuser(userList.filter((item) => item.admin !== true))

    setIsModalOpen(false);
    form.resetFields();

  };
  const [iduser, setIdUser] = useState({});
  const [customer, setCustomer] = useState({});
  const handleChangecustomer = (data, index) => {
    // console.log(index);
    setIdUser(index.id)
    setCustomer(index.label)

  }
  const [email, setemail] = useState({});
  const [name, setname] = useState({});
  const [phone, setphone] = useState({});
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
              <CForm
                className="row g-3 needs-validation"
                noValidate
              // validated={validated}
              // onSubmit={handleSubmit}
              // onSubmit={handleAddProduct}
              >
                <CCol md={6}> <Select
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
                </CCol>
                <CCol md={5}>
                  <Select
                    showSearch
                    style={{
                      width: "100%",
                      marginBottom: 16,
                    }}
                    placeholder="Nhập Tên Khách Hàng"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '').includes(input)
                    }
                    // filterSort={(optionA, optionB) =>
                    //   (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    // }
                    onChange={handleChangecustomer}
                    // tokenSeparators={[',']}
                    options={listshow}
                  />
                </CCol>
                <CCol md={1}>
                  <Button
                    onClick={showModal}
                    type="primary"
                  >
                    Thêm
                  </Button>
                  <Modal title="Khách Hàng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} cancelText="Thoát" okText="Tạo" style={{ top: 180 }} >
                    <Form {...layout} name="nest-messages" form={form} onFinish={onFinish} validateMessages={validateMessages}>
                      <Form.Item
                        name={['user', 'name']}
                        label="Tên Khách Hàng"
                        onChange={(e) => setname(e.target.value)}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name={['user', 'email']}
                        label="Email"
                        rules={[
                          {
                            type: 'email',
                          },
                        ]}
                        onChange={(e) => setemail(e.target.value)}
                      >
                        <Input />
                      </Form.Item>
                      {/* <Form.Item

                        name={['user', 'age']}
                        label="Age"
                        rules={[
                          {
                            type: 'number',
                            min: 1000000000,
                            max: 9999999999,
                          },
                        ]}
                      >
                        <InputNumber />
                      </Form.Item> */}
                      <Form.Item name={['user', 'website']} label="Số Điện Thoại"
                        onChange={(e) => setphone(e.target.value)}>
                        <Input />
                      </Form.Item>


                    </Form>
                  </Modal>
                </CCol>
              </CForm >


              <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
              />
              {/* <CCol className="align-self-end">Tổng Tiền : {sumall}</CCol> */}
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

            {/* <div class="col-md-12 text-right">$42</div> */}
          </CRow>

        </>
      </CCardBody>
    </CCard>
  );

};

export default AddInvoice;