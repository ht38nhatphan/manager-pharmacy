import { useState } from "react";
import { registerUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        const newUser = {
            email: email,
            username: username,
            password: password,
        };
        registerUser(newUser, dispatch, navigate);
    }
    return ( 
        <section className="register-container">
              <div className="register-title"> ĐĂNG KÍ </div>
            <form onSubmit={handleRegister}>
                <label> EMAIL </label>
                <input type="text" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/>
                <label> TÊN ĐĂNG NHẬP </label>
                <input type="text" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)}/>
                <label> MẬT KHẨU </label>
                <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit"> Tạo Tài Khoản </button>
            </form>
        </section>
        
     );
}
 
export default Register;