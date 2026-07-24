import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white/70 shadow-xl backdrop-blur-xl transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 p-2 shadow-lg">
            <img
              src={logo}
              alt="KCET Logo"
              className="h-7 w-7 object-contain"
            />
          </div>

          <div>
            <h1 className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent">
              KCET Companion
            </h1>

            <p className="text-xs text-gray-500">
              Learn • Practice • Succeed
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-10 font-medium md:flex">
          <Link
            to="/"
            className="text-gray-700 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          >
            Home
          </Link>

          <Link
            to="/mock-tests"
            className="text-gray-700 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          >
            Mock Tests
          </Link>

          <Link
            to="/pyqs"
            className="text-gray-700 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          >
            PYQs
          </Link>

          <Link
            to="/college-predictor"
            className="text-gray-700 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          >
            Predictor
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden text-gray-700 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 md:block"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40 md:block"
          >
            Get Started
          </Link>

          {/* Mobile Button */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white/70 shadow-lg backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:bg-white dark:border-slate-700 dark:bg-slate-800/70 dark:text-white dark:hover:bg-slate-700 md:hidden"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="border-t border-gray-200 bg-white/90 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/90 md:hidden"
        >
          <div className="flex flex-col gap-4 px-8 py-6">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-medium text-gray-700 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Home
            </Link>

            <Link
              to="/mock-tests"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-medium text-gray-700 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Mock Tests
            </Link>

            <Link
              to="/pyqs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-medium text-gray-700 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              PYQs
            </Link>

            <Link
              to="/college-predictor"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-medium text-gray-700 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Predictor
            </Link>

            <hr className="border-gray-300 dark:border-slate-700" />

            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-medium text-gray-700 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 text-center font-semibold text-white shadow-lg transition hover:scale-[1.02]"
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}