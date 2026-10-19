import "./Header.css";
import Logo from "../../assets/Logo.png"
import Menu from "../../assets/menuButton.svg";
import Logout from "../../assets/logoutButton.svg"
import DowndropOpen from "../../assets/dropdownButtonOpen.svg"
import DowndropClose from "../../assets/dropdownButtonClose.svg"
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

  type Props = {
    onMenuOpen: () => void;
    onMenuClose: () => void;
    isMobileMenuOpen: boolean;
  };

export default function Header({ onMenuOpen, onMenuClose, isMobileMenuOpen }: Props) {

  const { isAuthenticated, currentUser, logout } = useAuth();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  function getNavLinkClass({ isActive }: { isActive: boolean }) {
    return isActive
    ? "header__nav-link header__nav-link_active"
    : "header__nav-link";
  }

  function handleLogout() {
    logout();
    navigate('/login');
  }
  

  return (
    
    <header className={isMobileMenuOpen ? 'header header_mobile' : 'header'}>
      <button
        type="button"
        className="header__menu-btn"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileMenuOpen}
        onClick={isMobileMenuOpen ? onMenuClose : onMenuOpen}>
        <img src={Menu} alt="Menu button" />
      </button>
      <img src={Logo} alt="Mesh AI logo" className="header__logo" />

      {isAuthenticated && (
        <>
          <nav className={isMobileMenuOpen ? 'header__nav header__nav_mobile' : 'header__nav'}>
            <NavLink to="/knowledge" className={getNavLinkClass} onClick={onMenuClose}>Knowledge Base</NavLink>
            <NavLink to="/chat" className={getNavLinkClass} onClick={onMenuClose}>Chat</NavLink>
          </nav>
          <div className="header__account-menu">
            <button
              type="button"
              className="header__dropdown-btn"
              aria-haspopup="menu"
              aria-expanded={isAccountMenuOpen}
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
            >
              {currentUser?.name}'s Account
              <img src={isAccountMenuOpen ? DowndropClose : DowndropOpen} alt="" className="header__dropdown-icon" />
            </button>
            
            {isAccountMenuOpen && (
              <ul className="header__menu" role="menu">
                <li role="none">
                  <button
                    type="button"
                    role="menuitem"
                    className="logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                    <img src={Logout} />
                  </button>
                </li>
              </ul>
            )}
          </div>
        </>
      )}
    </header>
  );
}