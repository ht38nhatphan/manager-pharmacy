import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import ReactPaginate from 'react-paginate';

const Product = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
       fetch('http://localhost:8000/thuocs/getAll')
       .then((response) => response.json())
       .then((data) => {setProducts(data)})
      
    }, [])
    // Pagination
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 15;
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
        currentItems.map((item) => {item.price = formatCash(item.price)})
    }, []);
    
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        setItemOffset(newOffset);
    };
    
  

    return ( 
        <div>
            <main>
        <section className="shop-area pt-85 pb-25">
            <div className="container">
           <div className="filterForm">

            <Form.Select aria-label="Default select example">
                <option> Tất cả </option>
                <option value="1"> Suy giãn tĩnh mạch </option>
                <option value="2"> Giảm Cholesterol </option>
                <option value="3"> Huyết Áp </option>
            </Form.Select>
           </div>
                <div className="shop-title-wrap">
                    <div className="row align-items-end">
                        <div className="col-md-6">
                            <div className="shop-section-title">
                                <h3 className="title"> Loại Sản Phẩm  </h3>
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
                        <div className="col grid-item grid-sizer cat-two shoppingcategory">
                            <div className="shop-item mb-60" >
                            <div className="shop-thumb">
                                <a href="shop-details.html" key={products._id}><img src={products.Images[0]} alt="" /></a>
                            </div>
                            <div className="shop-content">
                                <span className="cat"> </span>
                                <h5 className="title"><a href="shop-details.html"> </a></h5>
                                <div className="shop-item-rating">
                                    <span className="avg-rating" key={products._id}>  {products.price}  <span> đ {' '}/ {' '}</span> <span className="type-store"> Hộp </span></span>
                                </div>
                                <div className="shop-bottom">
                                    <ul>
                                        <li className="price"></li>
                                        <li className="add"><a href="shop-details.html"> Mua Ngay </a></li>
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
            </main>
        </div>
    );
}

export default Product;