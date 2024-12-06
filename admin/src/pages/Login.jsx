import React, { useState } from 'react';
import "../styles/Login.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const url = "http://localhost:4000"; // Make sure this matches your backend server URL
    const [token, setToken] = useState(null);
    const [currentState, setCurrentState] = useState("Login");
    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currentState === 'Login') {
            newUrl += "/api/login";
        } else {
            newUrl += "/api/register";
        }

        try {
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", response.data.username);
                navigate('/home');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error during login/register request:", error);
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                </div>
                <div className="login-popup-inputs">
                    <input 
                        name='username' 
                        onChange={onChangeHandler} 
                        value={data.username} 
                        type='text' 
                        placeholder='Your username' 
                        required 
                    />
                    <input 
                        name='password' 
                        onChange={onChangeHandler} 
                        value={data.password} 
                        type='password' 
                        placeholder='Your password' 
                        required 
                    />
                </div>
                <button type="submit">
                    {currentState === "Sign Up" ? "Register" : "Login"}
                </button>
                {currentState === 'Login' ? (
                    <p>Create a new Account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
                )}
            </form>
        </div>
    );
};

export default Login;
