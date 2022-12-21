import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/LoginHome/Login";
import Register from "./Components/Register/Register";
import HomePage from "./Components/HomePage/Home";
import Signup from "./Components/LoginHome/Signup";
import Header from "./Components/parts/Header";
import ShoppingCategory from "./Components/Shopping/ShoppingCategory";
import DetailProduct from "./Components/Shopping/Detail";
import Cart from "./Components/Shopping/Cart";
import { useSelector } from "react-redux";
import Footer from "./Components/parts/Footer";
import Blog from "./Components/HomePage/Blog";
// import Vnpay from "./Components/Vnpay/Vnpay";
import Testimonial from "./Components/HomePage/Testimonial";
import NavBar from "./Components/NavBar/NavBar";

require('dotenv').config()
function App() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = user?.accessToken;
  const id = user?._id;
  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/shoppingcategory/:category" element={<ShoppingCategory />} />
              <Route path="/thuocs/:id" element={<DetailProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/blog" element={<Testimonial />} />
            </>
          ) : (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/shoppingcategory/:category" element={<ShoppingCategory />} />
              <Route path="/thuocs/:id" element={<DetailProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/blog" element={<Testimonial />} />
            </>
          )}

        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
