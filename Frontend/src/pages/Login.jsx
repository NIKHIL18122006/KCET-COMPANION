import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

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
    } finally {
      setLoading(false);
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
              disabled={loading}
              className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
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
              disabled={loading}
              className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-3 font-semibold text-white transition-all duration-200 ${
              loading
                ? "cursor-not-allowed bg-purple-500/40"
                : "bg-purple-600 hover:bg-purple-700 active:scale-[0.98]"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Logging in...
              </span>
            ) : (
              "Login"
            )}
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