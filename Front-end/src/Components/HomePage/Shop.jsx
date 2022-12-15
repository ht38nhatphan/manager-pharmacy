import { useEffect, useState } from "react";
import Truncate from 'react-truncate';
import ReactPaginate from 'react-paginate';
import { Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getAllThuocs } from "../../redux/apiRequest";
function Shop(){

    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    useEffect(() => {
      getAllThuocs(dispatch);
      
    }, [])
 
     // Pagination
     const [currentItems, setCurrentItems] = useState([]);
     const [pageCount, setPageCount] = useState(0);
     const [itemOffset, setItemOffset] = useState(0);
     const itemsPerPage = 10;
     // Simulate fetching items from another resources.
     // (This could be items from props; or items loaded in a local state
     // from an API endpoint with useEffect and useState)
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(products.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(products.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, products]);
    useEffect(() => {
        function formatCash(str) {
            return str.split('').reverse().reduce((prev, next, index) => {
                return ((index % 3) ? next : (next + '.')) + prev
            })
       }
       const doubled = products.map( (item) => item.price)
       console.log(doubled)
       currentItems.map((item) => {item.price = formatCash(item.price)})
    }, []);
   
     // Invoke when user click to request another page.
     const handlePageClick = (event) => {
       const newOffset = (event.selected * itemsPerPage) % products.length;
       setItemOffset(newOffset);
     };
   
    return (
        <section className="shop-area pt-85 pb-25">
            <div className="container">
                <div className="shop-title-wrap">
                    <div className="row align-items-end">
                        <div className="col-md-6">
                            <div className="shop-section-title">

                                <h3 className="title"> Sản phẩm của Cửa Hàng  </h3>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="shop-menu-nav">
                                <button className="active" data-filter="*"> Bán Chạy</button>
                                <button data-filter=".cat-one"> Vote Nhiều </button>
                                <button data-filter=".cat-two"> Phổ Biến </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row shop-isotope-active">
                    <>
                    
                        {
                            currentItems.map( products =>{
                                return(
                        <div className="col grid-item grid-sizer cat-two">
                            <div className="shop-item mb-60" >
                                
                            <div className="shop-thumb">
                                <Link to={`/thuocs/${products._id}`}> <img src={products.Images[0]} alt="" /> </Link>
                            </div>
                            <div className="shop-content">
                                <span className="cat" > </span>
                                <Truncate lines={2} ellipsis={<span>...</span>}>
                                    <h5 className="title" key={products._id}> {products.name} </h5>
            
                                </Truncate>
                                <br/>
                                <span className="title-price" key={products._id}>  {products.priceOut} đ <span className="price-currency">  /</span> <span className="price-currency"> Hộp </span></span>
                                <div className="shop-item-rating">
                                    <span className="title-support" key={products._id}>  {products.category} </span>
                                </div>
                                <div className="shop-bottom">
                                    <ul>
                                    
                                        <li className="add"> <Link to={`/thuocs/${products._id}`}> Mua Ngay </Link></li>
                                    </ul>
                                </div>
                            </div>
                             </div>
                         </div>
                                )
                            })
                        } 
                        <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={4}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        containerClassName="pagination"
                        pageLinkClassName="page-num"
                        previousLinkClassName="page-num"
                        nextLinkClassName="page-num"
                        activeLinkClassName="active"
                        />
                       
                    </>      
                    
                </div> 
                              
            
            </div>
        </section>
    );
}

export default Shop;