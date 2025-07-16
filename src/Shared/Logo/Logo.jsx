import React from 'react';
import logo from '../../assets/logo/logo.png'

const Logo = () => {
  return (
    <div className='flex items-center gap-2'>
      <img src={logo} alt="" className='w-10' />
      <h2 className='font text-3xl text-primary font-bold'>Medical </h2>
      
    </div>
  );
};

export default Logo;