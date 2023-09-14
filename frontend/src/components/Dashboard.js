import React from 'react';
import Header from './common/Header';
import Footer from './common/Footer';

function Dashboard() {
  return (
    <>
    <Header />
        <div>
        <h2 className='mt-5'>Dashboard</h2>
        {/* Add your dashboard content here */}   
        </div>
    <Footer />
    </>
  );
}

export default Dashboard;
