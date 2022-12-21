import { useEffect, useState } from 'react';
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
import { useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../redux/cartSlice';
const KEY = process.env.REACT_APP_STRIPE
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const cart = useSelector((state) => state.cart)
    const a = cart
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [stripeToken, setStripeToken] = useState(null);
    const onToken = (token) => {
        setStripeToken(token);
    }

    console.log(KEY)

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post("/stripe/payment", {
                    tokenId: stripeToken.id,
                    amount: 500,
                });
                history.push("/success", {
                    stripeData: res.data,
                    products: cart,
                });
            } catch { }

        };
        stripeToken && makeRequest();
    }, [stripeToken, cart.total, history]);
    const [productd, setProductd] = useState([])
    // this.setState({ cart: {} })
    // setProductd(a)
    return (
        <section className="h-100 gradient-custom">
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center my-4">
                    <MDBCol md="8">
                        <MDBCard className="mb-4">
                            <MDBCardHeader className="py-3">
                                <MDBTypography tag="h5" className="mb-0">
                                    CÓ {cart.products.length} SẢN PHẨM TRONG GIỎ HÀNG
                                </MDBTypography>
                            </MDBCardHeader>
                            <MDBCardBody>
                                {cart.products.map((product) => {
                                    const [quantity, setQuantity] = useState(product.quantity);
                                    const [sum, setSum] = useState(product.priceOut)
                                    const [valueproduct, setValueproduct] = useState(product)
                                    const handleDelete = (id) => {

                                        setValueproduct(cart.products.filter((data) => data._id !== id))
                                        navigate('/cart')
                                        // console.log(cart.products.filter((data) => data._id !== id));
                                        dispatch(deleteProduct(id))

                                    }
                                    const handleClickQuantity = (type) => {
                                        if (type === "desc") {
                                            quantity > 1 && setQuantity(quantity - 1);
                                            valueproduct.quantity > 1 && setValueproduct({
                                                ...valueproduct,
                                                quantity: product.quantity - 1
                                            });
                                            console.log(valueproduct._id);
                                            // console.log(quantity);

                                            quantity > 1 ? setSum((quantity * product.priceOut) - product.priceOut) : setSum(quantity * product.priceOut)

                                        } else {
                                            setQuantity(quantity + 1);
                                            setValueproduct({
                                                ...valueproduct,
                                                quantity: product.quantity + 1
                                            });

                                            quantity == 1 ? setSum(2 * product.priceOut) : setSum(quantity * product.priceOut)
                                        }
                                    }
                                    return (
                                        <MDBRow>
                                            <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                                                <MDBRipple rippleTag="div" rippleColor="light"
                                                    className="bg-image rounded hover-zoom hover-overlay">
                                                    <img
                                                        src={valueproduct.Images[0]}
                                                        className="w-100"
                                                        style={{ maxWidth: "130px", maxHeight: "200px" }}
                                                    />
                                                    <a href="#!">
                                                        <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)", }}>
                                                        </div>
                                                    </a>
                                                </MDBRipple>
                                            </MDBCol>
                                            <MDBCol lg="5" md="6" className="delete_product mb-4 mb-lg-0">
                                                <p>
                                                    <strong style={{ fontSize: "1.0rem" }}>{valueproduct.name}</strong>
                                                </p>
                                                <button type="button" className="btn" onClick={() => handleDelete(valueproduct._id)}>
                                                    Xóa
                                                </button>
                                            </MDBCol>
                                            <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                                                <div className="d-flex mb-4">
                                                    <div class="product_quantity">
                                                        <button class="btn btn_quantity" onClick={() => handleClickQuantity("desc")} id="dec" > - </button>
                                                        <div id="amount-space"> <span class="amount"> {quantity} </span> </div>
                                                        <button class="btn btn_quantity" onClick={() => handleClickQuantity("inc")} id="inc" > + </button>
                                                    </div>
                                                </div>
                                                <p className="text-start text-md-center">
                                                    <span>Giá Tiền  :  </span>
                                                    <strong>{sum}đ</strong>
                                                </p>
                                            </MDBCol>
                                        </MDBRow>
                                    )
                                })}

                                <hr className="my-4" />
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
                                        <span>{cart.total}đ</span>
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
                                            <strong>{cart.total}đ</strong>
                                        </span>
                                    </MDBListGroupItem>
                                </MDBListGroup>
                                <StripeCheckout
                                    name="NV DrugStore"
                                    image="https://avatars.githubusercontent.com/u/1486366?v=4"
                                    billingAddress
                                    shippingAddress
                                    description={`Your total is $${cart.total}`}
                                    amount={cart.total * 100}
                                    token={onToken}
                                    stripeKey={KEY}
                                >
                                    <MDBBtn style={{ maxWidth: "401px", maxHeight: "51px" }} block size="lg">
                                        Hoàn Tất Đặt Hàng
                                    </MDBBtn>
                                </StripeCheckout>

                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}

export default Cart;