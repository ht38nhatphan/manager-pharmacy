import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../redux/apiRequest";
import {createAxios} from "../../createInstance"
import "./home.css";
import { loginSuccess } from "../../redux/authSlice";


const HomePage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.users.users?.allUsers);
  const msg = useSelector((state) => state.users?.msg);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  // Delete USER
  const handleDeleteUser = (id) => {
    deleteUser(user?.accessToken, dispatch, id, axiosJWT)
    msg = ""
  }

  // Get ALL USER
  useEffect(() => {
    function showUser(){
      console.log(user)
    }
    showUser();
    if(!user){
      navigate("/login")
    }
    if(user?.accessToken){
      try {
        
        if(user?.accessToken.admin === true){
          navigate("/adminPage")
        } else {
          navigate("/home")
        }
      } catch (error) {
        
      }
     
    }
  },[]);

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-userlist">
        {userList?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.username}</div>
              <div className="delete-user" onClick={() => handleDeleteUser(user._id)}> Delete </div>
            </div>
          );
        })}
      </div>
      <div className="errMsg"> {msg} </div>
    </main>
  );
};

export default HomePage;
