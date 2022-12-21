import React, { useRef } from 'react';
import './ExportInvoice.css'
import { useReactToPrint } from 'react-to-print'
import { Button } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const ExportInvoice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let id = location.pathname.split('/')[2];
  id == 0 ? id : id = id - 1
  const order = useSelector((state) => state.order.order.order);
  const userList = useSelector((state) => state.users.users?.allUsers);
  // const name = order[id].namecustomer
  let email, phone = null
  const getalluser = userList.find(x => x._id == order[id].userId)
  console.log(getalluser);

  const detail = order[id].products
  const orders = order[id]
  // console.log(order[id].products);
  const inputRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => inputRef.current,
    documentTitle: 'emp-data',
    // onAfterPrint: () => alert('in thành công')
  })
  return (
    <>     <div className="container bootstrap snippets bootdeys" ref={inputRef}>
      <div className="row">
        <div className="col-sm-12">
          <div className="panel panel-default invoice" id="invoice">
            <div className="panel-body">
              {/* <div className="invoice-ribbon"><div className="ribbon-inner">PAID</div></div> */}
              <div className="row">
                <div className="col-sm-6 top-left">
                  <img className="img-responsive" alt="iamgurdeeposahan" src="https://centerforfamilyhealth.org/wp-content/uploads/2020/05/icon_pharm2.png" />
                </div>
                <div className="col-sm-6 top-right">
                  <h3 className="marginright">Đơn Thuốc-{id}</h3>
                  <span className="marginright">{(String(orders.dateorder).split('T').slice(0, 1).join(' ')).split('-').slice(0, 3).reverse().join('-')}</span>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-xs-4 from">
                  <p className="lead marginbottom">Khách Hàng</p>
                  <p>Tên Khách Hàng : {getalluser.username}</p>
                  <p>Số điện thoại: {getalluser.phone}</p>
                  <p>Email: {getalluser.email}</p>
                </div>
                {/* <div className="col-xs-4 to">
                  <p className="lead marginbottom">To : John Doe</p>
                  <p>425 Market Street</p>
                  <p>Suite 2200, San Francisco</p>
                  <p>California, 94105</p>
                  <p>Phone: 415-676-3600</p>
                  <p>Email: john@doe.com</p>
                </div>
                <div className="col-xs-4 text-right payment-details">
                  <p className="lead marginbottom payment-info">Payment details</p>
                  <p>Date: 14 April 2014</p>
                  <p>VAT: DK888-777 </p>
                  <p>Total Amount: $1019</p>
                  <p>Account Name: Flatter</p>
                </div> */}
              </div>
              <div className="row table-row">
                <table className="table table-striped">
                  <thead>

                    <tr>
                      <th className="text-center" style={{ width: '5%' }}>#</th>
                      <th style={{ width: '50%' }}>Tên Thuốc</th>
                      <th className="text-right" style={{ width: '15%' }}>Số Lượng</th>
                      <th className="text-right" style={{ width: '15%' }}>Giá Bán</th>
                      <th className="text-right" style={{ width: '15%' }}>Tổng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail.map((data, item) => {
                      return (
                        <tr>
                          <td className="text-center">{item}</td>
                          <td>{data.name}</td>
                          <td className="text-right">{data.amount}</td>
                          <td className="text-right">{data.priceOut}</td>
                          <td className="text-right">{data.sumprice}</td>
                        </tr>
                      )
                    })}

                  </tbody>
                </table>
              </div>
              <div className="row">
                {/* <div className="col-xs-6 margintop">
                  <p className="lead marginbottom">THANK YOU!</p>
                  <button className="btn btn-success" id="invoice-print"><i className="fa fa-print" /> Print Invoice</button>
                  <button className="btn btn-danger"><i className="fa fa-envelope-o" /> Mail Invoice</button>
                </div> */}
                <div className="col-xs-6 text-right pull-right invoice-total">
                  <p>Tổng Tiền: {orders.sumorder}đ</p>
                  {/* <p>Discount (10%) : $101 </p> */}
                  <p>VAT (5%) : {((orders.sumorder * 5) / 100)}đ </p>
                  <p>Tổng Tiền Thành Toán (Bao Gồm VAT) : {orders.sumorder - (orders.sumorder * 5) / 100}đ </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="PrintInvoice">  <Button
        onClick={handlePrint}
        type="primary"

      >
        IN HÓA ĐƠN
      </Button></div></>
  );
};

export default ExportInvoice;