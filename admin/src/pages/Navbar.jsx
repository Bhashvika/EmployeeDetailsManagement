import React from 'react';
import logo from './logo1.jpeg';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Navbar.css'

const Navbar = () => {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username'); // Ensure this is also removed if needed
        navigate('/');
    };

    return (
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="nav-links">
            <Link to='/home'><h3>Home</h3></Link>
                <Link to='/employeedetails'><h3>Employee List</h3></Link>
            </div>
            <div className='user'>
            <div className="username">{username}</div>
            <div className="logout" onClick={logout}>Logout</div>
            </div>
            
        </div>
    );
};

export default Navbar;
