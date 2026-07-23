import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await api.post("/auth/login", {

        email,

        password,

      });

      login(res.data);

      toast.success("Welcome Back!");

      navigate("/");

    }

    catch (err) {

      toast.error(

        err.response?.data?.message ||

        "Login Failed"

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-[#f8fafc]">

      <div className="grid min-h-screen lg:grid-cols-2">

        

        <div className="relative flex flex-col justify-center overflow-hidden border-r border-gray-200 px-20">

          

          <div className="absolute inset-0 overflow-hidden pointer-events-none">

            <h1 className="absolute -left-10 top-10 text-[140px] font-black text-gray-100 uppercase">

              PRAPTI

            </h1>

            <h1 className="absolute left-20 top-56 text-[120px] font-black text-gray-100 uppercase">

              AI

            </h1>

            <h1 className="absolute -left-8 bottom-10 text-[120px] font-black text-gray-100 uppercase">

              FINANCE

            </h1>

          </div>

          <div className="relative z-10">

            <p className="tracking-[0.45em] uppercase text-xs text-blue-600 font-semibold">

              Financial Intelligence Platform

            </p>

            <h1 className="mt-8 text-7xl leading-none font-serif">

              BUILD

            </h1>

            <h1 className="text-7xl leading-none font-serif">

              WEALTH.

            </h1>

            <h1 className="mt-8 text-7xl leading-none font-serif">

              ELIMINATE

            </h1>

            <h1 className="text-7xl leading-none font-serif">

              DEBT.

            </h1>

            <p className="mt-12 max-w-xl text-gray-500 leading-8">

              Prapti AI empowers individuals with
              AI-driven financial planning,
              intelligent loan optimization,
              investment insights,
              and long-term wealth management.

            </p>

            <div className="mt-16 border-l-2 border-blue-600 pl-6">

              <p className="text-sm uppercase tracking-[0.25em] text-gray-500">

                Trusted Financial Intelligence

              </p>

              <h3 className="mt-3 text-2xl font-semibold">

                Smarter Decisions.

                <br />

                Better Future.

              </h3>

            </div>

          </div>

        </div>


        <div className="flex items-center justify-center px-10">

          <motion.div

            initial={{ opacity: 0, x: 40 }}

            animate={{ opacity: 1, x: 0 }}

            transition={{ duration: .6 }}

            className="w-full max-w-md border border-gray-300 bg-white p-12"

          >

            <p className="text-xs tracking-[0.35em] uppercase text-blue-600">

              Login

            </p>

            <h2 className="mt-5 text-4xl font-serif">

              Welcome Back

            </h2>

            <p className="mt-4 text-gray-500 leading-7">

              Continue your financial journey
              with AI-powered insights,
              wealth planning,
              and debt optimization.

            </p>

            <form
  onSubmit={handleSubmit}
  className="mt-12 space-y-8"
>

  {/* Email */}

  <div>

    <label className="text-xs uppercase tracking-[0.25em] text-gray-500">

      Email Address

    </label>

    <input

      type="email"

      value={email}

      onChange={(e)=>setEmail(e.target.value)}

      placeholder="you@example.com"

      required

      className="
        mt-3
        w-full
        border-0
        border-b-2
        border-gray-300
        bg-transparent
        px-0
        py-4
        text-lg
        outline-none
        transition
        focus:border-blue-600
      "

    />

  </div>

  {/* Password */}

  <div>

    <div className="flex items-center justify-between">

      <label className="text-xs uppercase tracking-[0.25em] text-gray-500">

        Password

      </label>

      <button

        type="button"

        className="text-sm text-blue-600 hover:text-blue-700"

      >

        Forgot Password?

      </button>

    </div>

    <input

      type="password"

      value={password}

      onChange={(e)=>setPassword(e.target.value)}

      placeholder="••••••••"

      required

      className="
        mt-3
        w-full
        border-0
        border-b-2
        border-gray-300
        bg-transparent
        px-0
        py-4
        text-lg
        outline-none
        transition
        focus:border-blue-600
      "

    />

  </div>

  {/* Login Button */}

  <button

    type="submit"

    disabled={loading}

    className="
      mt-4
      w-full
      border
      border-blue-600
      bg-blue-600
      py-4
      text-sm
      uppercase
      tracking-[0.35em]
      text-white
      transition
      hover:bg-slate-900
      hover:border-slate-900
      disabled:opacity-60
    "

  >

    {loading ? "Signing In..." : "Continue →"}

  </button>

</form>

{/* Divider */}

<div className="my-12 flex items-center">

  <div className="h-px flex-1 bg-gray-200"></div>

  <span className="px-4 text-xs uppercase tracking-[0.3em] text-gray-400">

    OR

  </span>

  <div className="h-px flex-1 bg-gray-200"></div>

</div>

{/* Signup */}

<div className="text-center">

  <p className="text-gray-500">

    New to Prapti AI?

  </p>

  <Link

    to="/signup"

    className="
      mt-4
      inline-block
      border
      border-gray-300
      px-10
      py-3
      text-sm
      uppercase
      tracking-[0.35em]
      transition
      hover:border-blue-600
      hover:text-blue-600
    "

  >

    Create Account

  </Link>

</div>

</motion.div>

</div>

</div>

</div>

);

}