import React, { useState, useEffect } from 'react';
// import { Space, Switch, Table } from 'antd';
import { Select, Input, Table, Tag, Popconfirm } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import {
  CBadge, CButton, CCollapse, CCardBody, CCard, CCardHeader, CRow, CCol,
} from '@coreui/react'
import { CDateRangePicker } from '@coreui/react-pro'
import '../../../assets/style_pro.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrder } from 'src/redux/apiRequest'
import { DatePicker, Space, Button } from 'antd';
const { RangePicker } = DatePicker;
const { Search } = Input;
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom'



// // rowSelection objects indicates the need for row selection
// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//   },
//   onSelect: (record, selected, selectedRows) => {
//     console.log(record, selected, selectedRows);
//   },
//   onSelectAll: (selected, selectedRows, changeRows) => {
//     console.log(selected, selectedRows, changeRows);
//   },
// };

const ListInvoice = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getAllOrder(dispatch);
  }, [])
  const order = useSelector((state) => state.order.order.order);

  const userList = useSelector((state) => state.users.users?.allUsers);
  // const name = order[id].namecustomer
  // const data1 = []
  // const data2 = []
  const [data, setData] = useState(order)


  console.log(data);
  const rangePresets = [
    {
      label: 'Ngày Hôm Nay',
      value: [dayjs().add(0, 'd'), dayjs()],
    },
    {
      label: 'Ngày Hôm Qua',
      value: [dayjs().add(-1, 'd'), dayjs()],
    },
    {
      label: '1 Tuần Trước',
      value: [dayjs().add(-7, 'd'), dayjs()],
    },
    {
      label: '2 Tuần Trước',
      value: [dayjs().add(-14, 'd'), dayjs()],
    },
    {
      label: '1 Tháng Trước',
      value: [dayjs().add(-30, 'd'), dayjs()],
    },
    {
      label: '90 Ngày Trước',
      value: [dayjs().add(-90, 'd'), dayjs()],
    },
  ];
  const handleDelete = (key) => { }
  const columns = [
    {
      title: 'Mã Đơn Thuốc',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Ngày Tạo Hóa Đơn',
      dataIndex: 'dateorder',
      key: 'dateorder',
      width: '26%',
      render: (_, { dateorder }) => {
        return (
          <td>
            <p> {(String(dateorder).split('T').slice(0, 1).join(' ')).split('-').slice(0, 3).reverse().join('-')} </p>
          </td>
        )
      }
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      width: '15%',
      key: 'status',
      render: (_, { status }) => {
        let color = status == 'Thành Công' ? 'green' : 'geekblue';
        // if (status === 'loser') {
        //   color = 'volcano';
        // }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        )
      }
    },
    {
      title: 'Khách Mua',
      dataIndex: 'namecustomer',
      width: '10%',
      key: 'namecustomer',
      render: (_, record) => {
        let idkey = record.key == 0 ? record.key : record.key - 1
        const getalluser = userList.find(x => x._id == order[idkey].userId)
        // console.log(getalluser);
        return (
          getalluser.username
        )
      }
    },
    {
      title: 'Tổng Tiền',
      dataIndex: 'sumorder',
      width: '12%',
      key: 'sumorder',
    },
    {
      title: 'Hành Động',
      dataIndex: 'operation',
      width: '10%',
      render: (_, record) =>
        order.length >= 1 ? (
          <Link className="text-decoration-none" to={'/exportinvoice/' + record.key}>
            {/* <Popconfirm onClick ={() => {handleDelete(record.key)}}> */}
            <a>In Hóa Đơn</a>
            {/* </Popconfirm> */}
          </Link>
        ) : null,
    },
  ];
  const expandedRowRender = (index, data) => {
    const detail = [...index.products]

    const columns = [
      {
        title: 'Tên Thuốc',
        dataIndex: 'name',
        // key: 'name',
      },
      {
        title: 'Số Lượng Thuốc',
        dataIndex: 'amount',
        // key: 'age',
        width: '12%',
      },
      {
        title: 'Giá tiền',
        dataIndex: 'priceOut',
        width: '20%',
        // key: 'address',
      },
      {
        title: 'Tổng Tiền',
        dataIndex: 'sumprice',
        width: '20%',
        // key: 'address',
      },
      // {
      //   title: 'Status',
      //   key: 'state',
      //   render: () => (
      //     <span>
      //       {/* <Badge status="success" /> */}
      //       Finished
      //     </span>
      //   ),
      // },

      // {
      //   title: 'Action',
      //   dataIndex: 'operation',
      //   key: 'operation',
      //   render: () => (
      //     <span>
      //       Finished
      //     </span>
      //   ),
      // },
    ];

    return <Table columns={columns} dataSource={detail} pagination={false} />;
  };
  // const [startDate, setStartDate] = useState(new Date())
  // useEffect(() => {
  //   setStartDate(getTime(startDate))
  // }, [])
  const handleChange = (data) => {
    // let selectedDateFromCalender = date.toUTCString();
    // console.log(data.target.placeholder == "Ngày Bắt Đầu" ? 'ngày bắt đầu' + data.target.value : 'ngày kết' + data.target.value);
    // if(data.target.placeholder == "Ngày Bắt Đầu")
    setData(order)
  }

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      const today = new Date()
      // console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('hi:    ' + new Date(dateStrings[0]));
      console.log(String(order[0].dateorder).split('T').slice(0, 1).join(' '));
      console.log(new Date(String(order[0].dateorder).split('T').slice(0, 1).join(' ')) > new Date(dateStrings[0]));
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      // let daysBetween = (new Date(dateStrings[1]).getTime() - new Date(dateStrings[0]).getTime()) / (1000 * 3600 * 24);
      // // if (daysBetween == 0) {
      //   daysBetween = 1
      // }
      setData(order.filter(item => {
        return (((new Date(String(item.dateorder).split('T').slice(0, 1).join(' ')))
          >= (new Date(dateStrings[0]))) &&
          ((new Date(String(item.dateorder).split('T').slice(0, 1).join(' '))) <= (new Date(dateStrings[1]))))
      }
      ))
      order.filter(item => console.log(Math.ceil(today.getTime() - (new Date((String(item.dateorder).split('T').slice(0, 1).join(' ')).split('-').slice(0, 3).join('-'))).getTime()) / (24 * 60 * 60 * 1000)))
      console.log('Những ngày ở giữa:' + data);
    } else {
      console.log('Clear');
    }
  };

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Danh Sách Đơn Thuốc</strong>
      </CCardHeader>
      <CCardBody>
        <>
          <CRow>
            {/* <CCol md={6}>

              <CDateRangePicker
                className="mb-3"
                locale="VN"
                label="Lọc Đơn Hàng"
                // selected={startDate}

                placeholder={['Ngày Bắt Đầu', 'Ngày Kết Thúc']}
                ranges={customRanges}
                onClick={handleChange}
              />
            </CCol> */}
            <CCol md={6} style={{ marginBottom: '20px' }}>
              <Space direction="vertical" size={12}>
                <RangePicker
                  size={"large"}
                  locale="VN"
                  presets={rangePresets}
                  onChange={onRangeChange}
                  placeholder={['Ngày Bắt Đầu', 'Ngày Kết Thúc']} />
              </Space>
              <Button
                size={"large"}
                // onClick={handleAdd}
                type="primary"
                style={{
                  marginLeft: 50,
                }}
                onClick={handleChange}
              >
                Reset
              </Button>
            </CCol>

            {/* <Select
        // mode="multiple"
        style={{
          width: '100%',
        }}
        placeholder="Tags Mode"
        onChange={handleChange}
        options={options} /> */}
            {/* <Space
            align="center"
            style={{
              marginBottom: 16,
            }}
          >
          </Space> */}


            <Table
              columns={columns}
              // rowSelection={{
              //   ...rowSelection,
              //   checkStrictly,
              // }}
              expandable={{
                expandedRowRender,
                defaultExpandedRowKeys: ['0'],
              }}
              size="small"
              dataSource={data}
            />
          </CRow>
        </>
      </CCardBody>
    </CCard>
  );

};

export default ListInvoice;