import { Landmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  return (

    <header
      className="
        sticky
        top-0
        z-50
        bg-white/90
        backdrop-blur-md
        border-b
        border-gray-200
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
          h-16
          px-6
          flex
          items-center
          justify-between
        "
      >

        {/* Logo */}

        <div className="flex items-center gap-3">

          <Landmark
            size={20}
            className="text-blue-600"
          />

          <div>

            <h1 className="text-sm font-semibold">
              Prapti AI
            </h1>

            <p className="text-[11px] text-gray-500 tracking-[0.25em] uppercase">
              Financial Intelligence Platform
            </p>

          </div>

        </div>

        {/* Navigation */}

        <nav className="flex items-center gap-8">

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="text-sm text-gray-600 hover:text-blue-600 transition"
          >
            Home
          </button>

          <button
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
            className="text-sm text-gray-600 hover:text-blue-600 transition"
          >
            Features
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-gray-600 hover:text-blue-600 transition"
          >
            Dashboard
          </button>

          {!user ? (

            <button
              onClick={() => navigate("/login")}
              className="
                border
                border-gray-300
                px-5
                py-2
                text-sm
                hover:border-blue-600
                hover:text-blue-600
                transition
              "
            >
              Login
            </button>

          ) : (

            <div className="relative group">

              <button
                className="
                  border
                  border-gray-300
                  px-5
                  py-2
                  text-sm
                  flex
                  items-center
                  gap-2
                  hover:border-blue-600
                  transition
                "
              >
                👤 {user.name}
              </button>

              <div
                className="
                  absolute
                  right-0
                  mt-2
                  hidden
                  group-hover:block
                  bg-white
                  border
                  border-gray-200
                  w-56
                  shadow-xl
                "
              >

                <button
                  onClick={() => navigate("/dashboard")}
                  className="
                    block
                    w-full
                    text-left
                    px-5
                    py-3
                    text-sm
                    hover:bg-gray-50
                  "
                >
                  Dashboard
                </button>

                <button
                  onClick={() => navigate("/history")}
                  className="
                    block
                    w-full
                    text-left
                    px-5
                    py-3
                    text-sm
                    hover:bg-gray-50
                  "
                >
                  Analysis History
                </button>

                <button
                  onClick={() => navigate("/settings")}
                  className="
                    block
                    w-full
                    text-left
                    px-5
                    py-3
                    text-sm
                    hover:bg-gray-50
                  "
                >
                  Settings
                </button>

                <div className="border-t border-gray-200" />

                <button
                  onClick={logout}
                  className="
                    block
                    w-full
                    text-left
                    px-5
                    py-3
                    text-sm
                    text-red-600
                    hover:bg-red-50
                  "
                >
                  Logout
                </button>

              </div>

            </div>

          )}

        </nav>

      </div>

    </header>

  );

}