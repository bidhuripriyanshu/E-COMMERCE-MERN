import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingBag, FaUser, FaSignOutAlt, FaSignInAlt, FaBars, FaTimes, FaHome } from "react-icons/fa";
import { useState, useEffect } from 'react';

const user = { _id: "ferug", role: "admin" }; // temporary id 

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState<boolean>(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.header') && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobileMenuOpen]);

    const handleLogout = () => {
        // Logout functionality will be implemented later
        console.log("Logging out...");
        setIsOpen(false);
    };

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                {/* Logo */}
                <Link to="/" className="logo" onClick={() => setIsOpen(false)}>
                    <span className="logo-text">ShopHub</span>
                    <span className="logo-subtitle">Your Shopping Destination</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="nav-desktop">
                    <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
                        <FaHome />
                        <span>Home</span>
                    </Link>
                    <Link to="/search" className="nav-link" onClick={() => setIsOpen(false)}>
                        <FaSearch />
                        <span>Search</span>
                    </Link>
                    <Link to="/card" className="nav-link cart-link" onClick={() => setIsOpen(false)}>
                        <FaShoppingBag />
                        <span>Card</span>
                        <span className="cart-badge">3</span>
                    </Link>
                </nav>

                {/* User Menu */}
                <div className="user-section">
                    {user?._id ? (
                        <div className="user-menu">
                            <button 
                                className="user-btn" 
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label="User menu"
                            >
                                <FaUser />
                                <span className="user-name">Welcome, User</span>
                            </button>
                            
                            {isOpen && (
                                <div className="dropdown-menu">
                                    <div className="dropdown-header">
                                        <div className="user-info">
                                            <div className="user-avatar">
                                                <FaUser />
                                            </div>
                                            <div className="user-details">
                                                <span className="user-role">{user.role}</span>
                                                <span className="user-email">user@example.com</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="dropdown-links">
                                        {user.role === "admin" && (
                                            <Link to="/admin/dashboard" className="dropdown-link" onClick={() => setIsOpen(false)}>
                                                <span>Admin Dashboard</span>
                                            </Link>
                                        )}
                                        <Link to="/orders" className="dropdown-link" onClick={() => setIsOpen(false)}>
                                            <span>My Orders</span>
                                        </Link>
                                        <Link to="/profile" className="dropdown-link" onClick={() => setIsOpen(false)}>
                                            <span>Profile Settings</span>
                                        </Link>
                                        <button className="dropdown-link logout-btn" onClick={handleLogout}>
                                            <FaSignOutAlt />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="login-btn">
                            <FaSignInAlt />
                            <span>Login</span>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="mobile-menu">
                    <nav className="nav-mobile">
                        <Link to="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                            <FaHome />
                            <span>Home</span>
                        </Link>
                        <Link to="/search" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                            <FaSearch />
                            <span>Search</span>
                        </Link>
                        <Link to="/cart" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                            <FaShoppingBag />
                            <span>Cart</span>
                            <span className="cart-badge">3</span>
                        </Link>
                        
                        {user?._id ? (
                            <>
                                {user.role === "admin" && (
                                    <Link to="/admin/dashboard" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                                        <span>Admin Dashboard</span>
                                    </Link>
                                )}
                                <Link to="/orders" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                                    <span>My Orders</span>
                                </Link>
                                <Link to="/profile" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                                    <span>Profile Settings</span>
                                </Link>
                                <button className="mobile-nav-link logout-btn" onClick={handleLogout}>
                                    <FaSignOutAlt />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                                <FaSignInAlt />
                                <span>Login</span>
                            </Link>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;