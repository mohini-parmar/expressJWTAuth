import React from 'react';

function Footer() {
  return (
    <footer className="bg-light text-center py-3 fixed-bottom">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Auth App. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;