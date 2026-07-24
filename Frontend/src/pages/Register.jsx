
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="min-h-screen bg-[#0B1226] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
        <h1 className="text-center text-3xl font-bold text-white">
          Create Account
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Join KCET Companion and start your preparation
        </p>

        <form className="mt-8 space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Full Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
            />
          </div>

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
              className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
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
              placeholder="Create a password"
              className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white transition duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-600/30"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-purple-400 hover:text-purple-300"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;