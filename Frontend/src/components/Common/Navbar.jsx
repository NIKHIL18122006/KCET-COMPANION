import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";

const NAV_LINKS = [
  { label: "Practice", to: "/practice" },
  { label: "Mock Tests", to: "/mocktest" },
  { label: "PYQs", to: "/pyqs" },
  { label: "Performance", to: "/performance" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
  };

  const navClass = ({ isActive }) =>
    `transition-all duration-200 ${
      isActive
        ? "text-indigo-400 font-semibold"
        : "text-slate-300 hover:text-indigo-400"
    }`;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 z-50 w-full border-b border-slate-800 bg-slate-950 shadow-lg"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">

          <div className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 p-2">
            <img
              src={logo}
              alt="KCET Logo"
              className="h-8 w-8 object-contain"
            />
          </div>

          <div>
            <h1 className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text text-2xl font-bold text-transparent">
              KCET Companion
            </h1>

            <p className="text-xs text-slate-400">
              Learn • Practice • Succeed
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <NavLink
            to={user ? "/dashboard" : "/"}
            className={navClass}
          >
            {user ? "Dashboard" : "Home"}
          </NavLink>

          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={navClass}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-6 md:flex">

          {user ? (
            <>
              <NavLink
                to="/profile"
                className={navClass}
              >
                Profile
              </NavLink>

              <button
                onClick={handleLogout}
                className="text-slate-300 transition hover:text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={navClass}
              >
                Login
              </NavLink>

              <Link
                to="/register"
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 font-semibold text-white transition hover:scale-105"
              >
                Get Started
              </Link>
            </>
          )}

        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-lg border border-slate-700 bg-slate-900 p-2 text-slate-200 md:hidden"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-slate-800 bg-slate-950 md:hidden"
        >
          <div className="flex flex-col gap-5 px-8 py-6">

            <NavLink
              to={user ? "/dashboard" : "/"}
              className={navClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {user ? "Dashboard" : "Home"}
            </NavLink>

            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={navClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}

            <hr className="border-slate-800" />

            {user ? (
              <>
                <NavLink
                  to="/profile"
                  className={navClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="text-left text-slate-300 hover:text-red-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={navClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </NavLink>

                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-center font-semibold text-white"
                >
                  Get Started
                </Link>
              </>
            )}

          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}