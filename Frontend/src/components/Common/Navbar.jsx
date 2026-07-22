import { Link } from "react-router-dom";
import { Moon, Sun, GraduationCap, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";

export default function Navbar() {
    const [dark, setDark] = useState(
  localStorage.getItem("theme") === "dark"
);

useEffect(() => {
  if (dark) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [dark]);


return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-gray-200 dark:border-slate-700 shadow-xl text-gray-900
          dark:text-white

                transition-colors
                duration-300
                "
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-xl bg-linear-to-r from-blue-600 to-violet-600 shadow-lg">
            <img src={logo} alt="KCET Logo" className="h-7 w-7 object-contain"/>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              KCET Companion
            </h1>
            <p className="text-xs text-gray-500">
              Learn • Practice • Succeed
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 font-medium">
          <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
            Home
          </Link>
          <Link to="/mock-tests" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
            Mock Tests
          </Link>
          <Link to="/pyqs" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400transition">
            PYQs
          </Link>
          <Link to="/college-predictor" className=" text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400transition">
            Predictor
          </Link>
        </div>
        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Button */}
        <button onClick={() => setDark(!dark)} className="w-11 h-11 rounded-full bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 flex items-center justify-center hover:scale-110 transition-all duration-300 ">
            {dark ? (
               <Sun className="text-yellow-400" size={20} />
                ) : (
               <Moon className="text-slate-700" size={20} />
            )}
        </button>
        <Link to="/login" className=" hidden md:block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition" >
            Login
        </Link>
        <Link to="/register" className=" hidden md:block px-6 py-3 rounded-full bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-blue-500/40 transition-all duration-300 ">
            Get Started
        </Link>

          {/* Mobile Menu */}
          <button className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl  bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg   border border-gray-200 dark:border-slate-700 shadow-lg text-slate-700 dark:text-white  hover:scale-105  hover:bg-white  dark:hover:bg-slate-70  transition-all  duration-300">
             <Menu size={22} />
          </button>

        </div>

      </div>
    </motion.nav>
  );
}