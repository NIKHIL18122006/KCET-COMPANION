import { Link } from "react-router-dom";
import { useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await authService.login({
        email,
        password,
      });

      setUser(data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error(
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center overflow-x-hidden bg-[#0B1226] px-4 py-8 sm:px-6">

      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:p-8">

        <h1 className="text-center text-2xl font-bold text-white sm:text-3xl">
          Welcome Back
        </h1>

        <p className="mt-2 text-center text-sm text-gray-400 sm:text-base">
          Sign in to continue your KCET preparation
        </p>

        <form
          className="mt-6 space-y-4 sm:mt-8 sm:space-y-5"
          onSubmit={handleSubmit}
        >

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 sm:text-base"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 sm:text-base"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 text-sm font-semibold text-white transition duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-600/30 sm:text-base"
          >
            Log In
          </button>

        </form>

        <p className="mt-5 text-center text-sm text-gray-400 sm:mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-purple-400 hover:text-purple-300"
          >
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;