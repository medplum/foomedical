import React from 'react';
import '../styles/responsive.css';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content container">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

// Annahme: Header-Komponente
const Header = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  
  return (
    <header className="app-header">
      <div className="container header-container">
        <div className="logo">
          <img src="/src/img/logo.png" alt="My Health Pass" />
        </div>
        
        {/* Hamburger-Menü für mobile Geräte */}
        <button 
          className="menu-toggle" 
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="hamburger"></span>
        </button>
        
        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/passes">My Passes</a></li>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/settings">Settings</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

// Annahme: Footer-Komponente
const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} My Health Pass. All rights reserved.</p>
      </div>
    </footer>
  );
};