
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createAxios } from "../../createInstance";
import { logOut } from "../../redux/apiRequest";
import { logoutSuccess } from "../../redux/authSlice";
import "./navbar.css";

const NavBar = () => {
  const user = useSelector( (state) => state.auth.login.currentUser);
  const accessToken = user?.accessToken;
  const id = user?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logoutSuccess);

  const handleLogout = () => {
    logOut(dispatch, id, navigate, accessToken, axiosJWT);
  }
  return (
    <nav className="navbar-container">
      <Link to="/home" className="navbar-home"> DASHBOARD </Link>
      {user? (
        <>
        <p className="navbar-user">Hi, <span> {user.username}  </span> </p>
        <Link to="/logout" className="navbar-logout" onClick={handleLogout}> Đăng xuất </Link>
        </>
      ) : (    
        <>
      <Link to="/login" className="navbar-login"> Đăng Nhập </Link>
      <Link to="/signup" className="navbar-register"> Đăng Kí</Link>
      </>
)}
    </nav>
  );
};

export default NavBar;
