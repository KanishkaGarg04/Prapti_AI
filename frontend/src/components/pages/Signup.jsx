import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function Signup() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await api.post("/auth/register", {

        name,

        email,

        password,

      });

      login(res.data);

      toast.success("Account Created Successfully!");

      navigate("/");

    }

    catch (err) {

      toast.error(

        err.response?.data?.message ||

        "Registration Failed"

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

        

          <div className="absolute inset-0 pointer-events-none overflow-hidden">

            <h1 className="absolute -left-10 top-10 text-[140px] font-black text-gray-100 uppercase">

              PRAPTI

            </h1>

            <h1 className="absolute left-16 top-56 text-[120px] font-black text-gray-100 uppercase">

              AI

            </h1>

            <h1 className="absolute -left-6 bottom-10 text-[120px] font-black text-gray-100 uppercase">

              WEALTH

            </h1>

          </div>

          <div className="relative z-10">

            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-blue-600">

              Financial Intelligence Platform

            </p>

            <h1 className="mt-8 font-serif text-7xl leading-none">

              START

            </h1>

            <h1 className="font-serif text-7xl leading-none">

              YOUR

            </h1>

            <h1 className="font-serif text-7xl leading-none">

              JOURNEY.

            </h1>

            <p className="mt-12 max-w-xl leading-8 text-gray-500">

              Join thousands of users using AI to
              optimise investments,
              eliminate debt,
              improve financial health,
              and build long-term wealth.

            </p>

            <div className="mt-16 border-l-2 border-blue-600 pl-6">

              <p className="text-sm uppercase tracking-[0.25em] text-gray-500">

                Intelligent Wealth Planning

              </p>

              <h3 className="mt-3 text-2xl font-semibold">

                Better Planning.

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

            <p className="text-xs uppercase tracking-[0.35em] text-blue-600">

              Create Account

            </p>

            <h2 className="mt-5 font-serif text-4xl">

              Join Prapti AI

            </h2>

            <p className="mt-4 leading-7 text-gray-500">

              Create your account and begin
              managing your financial future
              with intelligent AI-powered insights.

            </p>

            <form
  onSubmit={handleSubmit}
  className="mt-12 space-y-8"
>

  {/* Full Name */}

  <div>

    <label className="text-xs uppercase tracking-[0.25em] text-gray-500">

      Full Name

    </label>

    <input

      type="text"

      value={name}

      onChange={(e) => setName(e.target.value)}

      placeholder="Your Name"

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

  {/* Email */}

  <div>

    <label className="text-xs uppercase tracking-[0.25em] text-gray-500">

      Email Address

    </label>

    <input

      type="email"

      value={email}

      onChange={(e) => setEmail(e.target.value)}

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

    <label className="text-xs uppercase tracking-[0.25em] text-gray-500">

      Password

    </label>

    <input

      type="password"

      value={password}

      onChange={(e) => setPassword(e.target.value)}

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

  {/* Button */}

  <button

    type="submit"

    disabled={loading}

    className="
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
      hover:border-slate-900
      hover:bg-slate-900
      disabled:opacity-60
    "

  >

    {loading ? "Creating Account..." : "Create Account →"}

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

{/* Login */}

<div className="text-center">

  <p className="text-gray-500">

    Already have an account?

  </p>

  <Link

    to="/login"

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

    Sign In

  </Link>

</div>

</motion.div>

</div>

</div>

</div>

);

}
