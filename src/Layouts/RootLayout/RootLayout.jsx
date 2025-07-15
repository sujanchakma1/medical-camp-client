import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <div>

      <Navbar></Navbar>
      <div className='max-w-7xl mx-auto mt-28'>
        <Outlet></Outlet>
      </div>
      
    </div>
  );
};

export default RootLayout;