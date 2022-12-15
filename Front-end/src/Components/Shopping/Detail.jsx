import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './detail.css';
import IMAGES from '../../images'
import { addProduct } from '../../redux/cartSlice';
import { useDispatch } from 'react-redux';
const ProductDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [quantity, setQuantity] = useState(1);

  const handleClickQuantity = (type) => {
    if (type === "desc") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  }
  const [product, setProduct] = useState([]);
  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity }))
  }

  useEffect(() => {
    fetch("http://localhost:8000/thuocs/" + id)
      .then((response) => response.json())
      .then((data) => { setProduct(data) })

  }, [id])
  useEffect(() => {
    console.log(product);
    const imgs = document.querySelectorAll('.img-select a');
    const imgBtns = [...imgs];
    let imgId = 1;

    imgBtns.forEach((imgItem) => {
      imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
      });
    });

    function slideImage() {
      const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

      document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId) * displayWidth}px)`;
    }

    window.addEventListener('resize', slideImage);
  })

  return (
    <section className="shop-area pt-85 pb-25">
      <div class="card-wrapperdetail">
        <div class="carddetail">
          <div class="product-imgs">
            <div class="img-display">

              <div class="img-showcase">

                {product.Images?.map((item) => {
                  console.log(item);
                  return (
                    <img src={item} alt="" />
                  )
                })
                }

              </div>
            </div>
            <div class="img-select">

              {product.Images?.map((item, index) => {
                return (
                  <div class="img-item">
                    <a href="#" data-id={index}>
                      <img src={item} alt="" />
                    </a>
                  </div>
                )
              })
              }


            </div>
          </div>

          <div class="product-content">
            <a href="#" class="product-link"> <span class="brand-title"> Thương Hiệu: </span> {product.brand}</a>
            <h2 class="product-title">{product.name}</h2>
            <div class="product-rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
              <span>4.7(21)</span>
            </div>

            <div class="product-price">
              <p class="new-price"> <span>{product.priceOut}đ <span className="new-price">  {' '} / {product.specification} {' '}</span> </span></p>
            </div>

            <div class="product-detail">
              <h2> Thông tin sản phẩm: </h2>
              <ul>
                <li>Danh Mục: <span> {product.category}</span></li>

                {product.mainPiece ? (
                  <>
                    <li>Thành Phần Chính: <span> {product.mainPiece} </span></li>
                  </>
                ) : (
                  <>
                  </>
                )}

                {product.dosageForm ? (
                  <>
                    <li> Dạng Bào Chế: <span> {product.dosageForm} </span></li>
                  </>
                ) : (
                  <>
                  </>
                )}

                {product.specification ? (
                  <>
                    <li> Quy Cách: <span> {product.specification} </span></li>
                  </>
                ) : (
                  <>
                  </>
                )}

                {product.support ? (
                  <>
                    <li> Hỗ Trợ: <span> {product.support} </span></li>
                  </>
                ) : (
                  <>
                  </>
                )}

                {product.brandCountry ? (
                  <>
                    <li> Xuất Xứ Thương Hiệu: <span> {product.brandCountry} </span></li>
                  </>
                ) : (
                  <>
                  </>
                )}
                {product.producer ? (
                  <>
                    <li> Nhà Sản Xuất: <span> {product.producer} </span></li>
                  </>
                ) : (
                  <>
                  </>
                )}
              </ul>
              <p> <span class="uses-title"> Công Dụng: </span> {product.uses} </p>

            </div>

            <div class="purchase-info">
              <div class="product_quantity">
                <button class="btn btn_quantity" id="dec" onClick={() => handleClickQuantity("desc")}> - </button>
                <div id="amount-space"> <span class="amount"> {quantity} </span> </div>
                <button class="btn btn_quantity" id="inc" onClick={() => handleClickQuantity("inc")}> + </button>
              </div>
              <button type="button" class="btn" onClick={handleClick}>
                Thêm vào giỏ hàng <i class="fas fa-shopping-cart"></i>
              </button>
            </div>

            <div class="social-links">
              <p>Liên Kết: </p>
              <a href="#">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i class="fab fa-whatsapp"></i>
              </a>
              <a href="#">
                <i class="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;