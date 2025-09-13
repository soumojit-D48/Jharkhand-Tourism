import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Layout = ({ children, showNavFooter = true }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showNavFooter && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {showNavFooter && <Footer />}
    </div>
  );
};

export default Layout;