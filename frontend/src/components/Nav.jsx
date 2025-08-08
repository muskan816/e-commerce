import { NavLink, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useContext, useState } from "react";
import "./Nav.css";
import { useCartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const { total_products } = useCartContext();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => setOpen(!open);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="nav">
      {/* Hamburger icon */}
      <div className="hamburger" onClick={toggleMenu}>
        {open ? <FiX size={24} /> : <FiMenu size={24} />}
      </div>

      <ul className={`nav-list ${open ? "open" : ""}`}>
        {/* Home */}
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={toggleMenu}
          >
            Home
          </NavLink>
        </li>

        {/* About */}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={toggleMenu}
          >
            About
          </NavLink>
        </li>

        {/* Products */}
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={toggleMenu}
          >
            Products
          </NavLink>
        </li>

        {/* Contact */}
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={toggleMenu}
          >
            Contact
          </NavLink>
        </li>

        {/* Cart icon with count - only if user is logged in */}
        {user && (
          <li className="cart-icon">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={toggleMenu}
            >
              <div className="flex items-center gap-1.5">
                <div>
                <FiShoppingCart />
                <span className="cart-count ">{total_products}</span>
                </div>
                <span className="ml-1">Cart</span>
              </div>
            </NavLink>
          </li>
        )}

        {/* Auth Section */}
        <li>
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="nav-link logout-btn"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={toggleMenu}
            >
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
