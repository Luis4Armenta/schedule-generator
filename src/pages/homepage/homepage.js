import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <div className='container'>
      <div className='d-flex align-items-center justify-content-center min-vh-100'>
        <div className='text-center'>
          <h1>Schedule generator</h1>
          <hr className='my-4'/>
          <h3>Find your best option for your daily scholar life</h3>
          <Link to='/generator' className='btn btn-primary btn-lg my-3'>Try right now!</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;