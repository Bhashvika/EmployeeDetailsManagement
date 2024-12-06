import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/Home.css';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Outlet /> 
      <div className='main1'>
        <h1 className='h2'>WELCOME TO ADMIN DASHBOARD</h1><br />
        
      </div>
    </div>
  );
};

export default Home;
