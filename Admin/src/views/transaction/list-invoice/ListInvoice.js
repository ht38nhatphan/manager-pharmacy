import React, { useState } from 'react';
// import { Space, Switch, Table } from 'antd';
import { Select, Input, Table } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import {
  CBadge, CButton, CCollapse, CCardBody, CCard, CCardHeader, CRow, CCol,
} from '@coreui/react'
import { CDateRangePicker } from '@coreui/react-pro'
import '../../../assets/style_pro.css'

const { Search } = Input;

const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);


const customRanges = {
  'Hom Nay': [new Date(), new Date()],
  'Hom Qua': [
    new Date(new Date().setDate(new Date().getDate() - 1)),
    new Date(new Date().setDate(new Date().getDate() - 1)),
  ],
  '7 Ngay Truoc': [new Date(new Date().setDate(new Date().getDate() - 6)), new Date(new Date())],
  '30 Ngay Truoc': [new Date(new Date().setDate(new Date().getDate() - 29)), new Date(new Date())],
  'Thang Nay': [
    new Date(new Date().setDate(1)),
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  ],
  'Thang Truoc': [
    new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
    new Date(new Date().getFullYear(), new Date().getMonth(), 0),
  ],
}

const columns = [
  {
    title: 'Mã Đơn Thuốc',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Ngày Tạo Hóa Đơn',
    dataIndex: 'age',
    key: 'age',
    width: '38%',
  },
  {
    title: 'Trạng Thái',
    dataIndex: 'address',
    width: '30%',
    key: 'address',
  },
  {
    title: 'Hành Động',
    dataIndex: 'address',
    width: '10%',
    key: 'address',
  },
];
const data = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    // children: [
    //   {
    //     key: 11,
    //     name: 'John Brown',
    //     age: 42,
    //     address: 'New York No. 2 Lake Park',
    //   },
    //   {
    //     key: 12,
    //     name: 'John Brown jr.',
    //     age: 30,
    //     address: 'New York No. 3 Lake Park',
    //   },
    //   {
    //     key: 13,
    //     name: 'Jim Green sr.',
    //     age: 72,
    //     address: 'London No. 1 Lake Park',
    //   },
    // ],
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

// rowSelection objects indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

const ListInvoice = () => {
  const expandedRowRender = () => {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: '12%',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        width: '30%',
        key: 'address',
      },
      {
        title: 'Status',
        key: 'state',
        render: () => (
          <span>
            {/* <Badge status="success" /> */}
            Finished
          </span>
        ),
      },

      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <span>
            Finished
          </span>
        ),
      },
    ];

    return <Table columns={columns} dataSource={data} pagination={false} />;
  };
  const [checkStrictly, setCheckStrictly] = useState(false);
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Danh Sách Đơn Thuốc</strong>
      </CCardHeader>
      <CCardBody>
        <>
          <CRow>
            <CCol md={6}>
              <CDateRangePicker
                className="mb-3"
                locale="VN"
                placeholder={['Ngay Bat Dau', 'Ngay Ket Thuc']}
                ranges={customRanges}
              />
            </CCol>
            <CCol md={6}>
              {/* <CButton type="submit">Loc</CButton> */}
              <Search placeholder="Tìm Đơn Thuốc" style={{
                marginBottom: 20,
              }} enterButton />
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