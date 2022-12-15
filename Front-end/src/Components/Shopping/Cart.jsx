import { useEffect } from 'react';
// import './detail.css';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBListGroup,
    MDBListGroupItem,
    MDBRipple,
    MDBRow,
    MDBTooltip,
    MDBTypography,
} from "mdb-react-ui-kit";
import './cart.css';

const ProductDetail = () => {
    useEffect(() => {

    })
    return (
        <section className="h-100 gradient-custom">
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center my-4">
                    <MDBCol md="8">
                        <MDBCard className="mb-4">
                            <MDBCardHeader className="py-3">
                                <MDBTypography tag="h5" className="mb-0">
                                    CÓ 2 SẢN PHẨM TRONG GIỎ HÀNG
                                </MDBTypography>
                            </MDBCardHeader>
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                                        <MDBRipple rippleTag="div" rippleColor="light"
                                            className="bg-image rounded hover-zoom hover-overlay">
                                            <img
                                                src="https://images.fpt.shop/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2021/12/00032923-vien-uong-cai-thien-tim-mach-hato-gold-jpanwell-60v-8446-61aa_large.jpg"
                                                className="w-100" />
                                            <a href="#!">
                                                <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)", }}>
                                                </div>
                                            </a>
                                        </MDBRipple>
                                    </MDBCol>

                                    <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                                        <p>
                                            <strong>Viên Uống Hato Gold Jpanwell Hỗ Trợ Giúp Trái Tim Khỏe Mạnh (60 Viên)</strong>
                                        </p>

                                        <button type="button" className="btn">
                                            Remove
                                        </button>
                                    </MDBCol>
                                    <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                                        <div className="d-flex mb-4">
                                            <MDBBtn style={{ maxWidth: "30px", maxHeight: "40px", display: "flex", justifyContent: "center", alignItems: "center" }} className="px-3 me-2">
                                                <MDBIcon fas icon="minus" />
                                            </MDBBtn>

                                            <MDBInput style={{ maxWidth: "100px" }} defaultValue={1} min={0} type="number" label="Số Lượng" />

                                            <MDBBtn style={{ maxWidth: "30px", maxHeight: "40px", display: "flex", justifyContent: "center", alignItems: "center" }} className="px-3 ms-2">
                                                <MDBIcon fas icon="plus" />
                                            </MDBBtn>
                                        </div>

                                        <p className="text-start text-md-center">
                                            <strong>960.000đ</strong>
                                        </p>
                                    </MDBCol>
                                </MDBRow>

                                <hr className="my-4" />

                                {/* <MDBRow>
                  <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                    <MDBRipple rippleTag="div" rippleColor="light"
                      className="bg-image rounded hover-zoom hover-overlay">
                      <img
                        src="https://images.fpt.shop/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2021/06/00030899-omexxel-cardio-excelife-2x15-1932-60d2_large.JPG"
                        className="w-100" />
                      <a href="#!">
                        <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)", }}>
                        </div>
                      </a>
                    </MDBRipple>
                  </MDBCol>

                  <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                    <p>
                      <strong>Viên Uống Omexxel Cardio Excelife Hỗ Trợ Duy Trì Sức Khỏe Tim Mạch (30 Viên)  </strong>
                    </p>

                    <MDBTooltip wrapperProps={{ size: "sm" }} wrapperClass="me-1 mb-2"
                      title="Remove item">
                      <MDBIcon fas icon="trash" />
                    </MDBTooltip>

                    <MDBTooltip wrapperProps={{ size: "sm", color: "danger" }} wrapperClass="me-1 mb-2"
                      title="Move to the wish list">
                      <MDBIcon fas icon="heart" />
                    </MDBTooltip>
                  </MDBCol>
                  <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                    <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                      <MDBBtn className="px-3 me-2">
                        <MDBIcon fas icon="minus" />
                      </MDBBtn>

                      <MDBInput defaultValue={1} min={0} type="number" label="Quantity" />

                      <MDBBtn className="px-3 ms-2">
                        <MDBIcon fas icon="plus" />
                      </MDBBtn>
                    </div>

                    <p className="text-start text-md-center">
                      <strong>380.000đ</strong>
                    </p>
                  </MDBCol>
                </MDBRow> */}
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <p>
                                    <strong>Expected shipping delivery</strong>
                                </p>
                                <p className="mb-0">12.10.2020 - 14.10.2020</p>
                            </MDBCardBody>
                        </MDBCard>


                    </MDBCol>
                    <MDBCol md="4">
                        <MDBCard className="mb-4">
                            <MDBCardHeader>
                                <MDBTypography tag="h5" className="mb-0">
                                    THÔNG TIN ĐƠN HÀNG
                                </MDBTypography>
                            </MDBCardHeader>
                            <MDBCardBody>
                                <MDBListGroup flush>
                                    <MDBListGroupItem
                                        className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                        Tổng tiền
                                        <span>1.340.000đ</span>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                                        Phí Giao hàng dự kiến
                                        <span> 0đ </span>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem
                                        className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong>Cần Thanh Toán</strong>
                                            <strong>
                                                <p className="mb-0">(bao gồm VAT)</p>
                                            </strong>
                                        </div>
                                        <span>
                                            <strong>1.340.000đ</strong>
                                        </span>
                                    </MDBListGroupItem>
                                </MDBListGroup>

                                <MDBBtn style={{ maxWidth: "301px", maxHeight: "51px" }} block size="lg">
                                    Hoàn Tất Đặt Hàng
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}

export default ProductDetail;