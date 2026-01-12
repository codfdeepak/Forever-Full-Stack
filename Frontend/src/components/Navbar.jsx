import { useContext, useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";

const Navbar = () => {
  const {
    setShowSearch,
    getCartCount,
    token,
    setToken,
    setCardItem,
    navigate,
  } = useContext(ShopContext);
  const [mobileVisible, setMobileVisible] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const dropdownRef = useRef();

  const logOut = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCardItem({});
    setUserDropdown(false);
  };
  // const Navbar = () => {
  //   const navigate = useNavigate();
  // };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="w-36 object-contain" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-8 font-medium text-gray-700">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `py-2 relative ${
                isActive ? "text-blue-600" : "hover:text-blue-500"
              }`
            }
          >
            HOME
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-600 scale-x-0 transition-transform origin-left duration-300 hover:scale-x-100"></span>
          </NavLink>
          <NavLink
            to="/collection"
            className={({ isActive }) =>
              `py-2 ${isActive ? "text-blue-600" : "hover:text-blue-500"}`
            }
          >
            COLLECTION
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `py-2 ${isActive ? "text-blue-600" : "hover:text-blue-500"}`
            }
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `py-2 ${isActive ? "text-blue-600" : "hover:text-blue-500"}`
            }
          >
            CONTACT
          </NavLink>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <img
            src={assets.search_icon}
            alt="Search"
            className="w-5 cursor-pointer hover:scale-110 transition-transform duration-200"
            onClick={() => setShowSearch(true)}
          />

          {/* User Icon */}
          <div ref={dropdownRef} className="relative">
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="w-5 cursor-pointer hover:scale-110 transition-transform duration-200"
              onClick={() =>
                token ? setUserDropdown(!userDropdown) : navigate("/login")
              }
            />

            {token && (
              <div
                className={`absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-xl z-50 transform transition-all duration-300 origin-top-right 
                ${
                  userDropdown
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="flex flex-col p-3 gap-2 text-gray-700">
                  <p
                    onClick={() => {
                      navigate("/profile");
                      setUserDropdown(false);
                    }}
                    className="cursor-pointer hover:bg-blue-50 hover:text-blue-600 rounded px-2 py-1 transition-colors"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => {
                      navigate("/orders");
                      setUserDropdown(false);
                    }}
                    className="cursor-pointer hover:bg-blue-50 hover:text-blue-600 rounded px-2 py-1 transition-colors"
                  >
                    Orders
                  </p>
                  <p
                    onClick={logOut}
                    className="cursor-pointer hover:bg-red-50 hover:text-red-600 rounded px-2 py-1 transition-colors"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img
              src={assets.cart_icon}
              alt="Cart"
              className="w-5 cursor-pointer hover:scale-110 transition-transform duration-200"
            />
            <span className="absolute -top-2 -right-2 w-4 h-4 text-[10px] bg-blue-600 text-white rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          </Link>

          {/* Mobile Menu */}
          <img
            src={assets.menu_icon}
            alt="Menu"
            className="w-5 cursor-pointer sm:hidden"
            onClick={() => setMobileVisible(true)}
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-all duration-300 overflow-hidden z-40 ${
          mobileVisible ? "w-64" : "w-0"
        }`}
      >
        <div className="flex flex-col h-full">
          <div
            className="flex items-center gap-4 p-4 cursor-pointer border-b"
            onClick={() => setMobileVisible(false)}
          >
            <img
              src={assets.dropdown_icon}
              alt="Back"
              className="h-4 rotate-180"
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setMobileVisible(false)}
            to="/"
            className="py-3 px-6 border-b text-gray-700 hover:text-blue-600"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setMobileVisible(false)}
            to="/collection"
            className="py-3 px-6 border-b text-gray-700 hover:text-blue-600"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setMobileVisible(false)}
            to="/about"
            className="py-3 px-6 border-b text-gray-700 hover:text-blue-600"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setMobileVisible(false)}
            to="/contact"
            className="py-3 px-6 border-b text-gray-700 hover:text-blue-600"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
