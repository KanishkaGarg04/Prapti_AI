import {
  Landmark,
  Menu,
  X,
  User,
  LayoutDashboard,
  History,
  Settings,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import { useAuth } from "../../context/AuthContext";

export default function Navbar() {

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [mobileMenu, setMobileMenu] = useState(false);

  const [profileMenu, setProfileMenu] = useState(false);

  const handleLogout = () => {

    logout();

    navigate("/");

  };

  return (

    <header
      className="
      sticky
      top-0
      z-50
      border-b
      border-gray-200
      bg-white/95
      backdrop-blur-md
    "
    >

      <div
        className="
        mx-auto
        flex
        h-16
        max-w-7xl
        items-center
        justify-between
        px-5
        lg:px-8
      "
      >

        

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3"
        >

          <Landmark
            size={22}
            className="text-blue-600"
          />

          <div className="text-left">

            <h1 className="text-sm font-semibold">

              Prapti AI

            </h1>

            <p
              className="
              text-[10px]
              uppercase
              tracking-[0.35em]
              text-gray-500
            "
            >

              Financial Intelligence

            </p>

          </div>

        </button>

       

        <nav
          className="
          hidden
          items-center
          gap-8
          md:flex
        "
        >

          <button
            onClick={() => navigate("/")}
            className="
              text-sm
              text-gray-600
              transition
              hover:text-blue-600
            "
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
            className="
              text-sm
              text-gray-600
              transition
              hover:text-blue-600
            "
          >
            Features
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="
              text-sm
              text-gray-600
              transition
              hover:text-blue-600
            "
          >
            Dashboard
          </button>

         

          {!user && (

            <button

              onClick={() => navigate("/login")}

              className="
                border
                border-gray-300
                px-5
                py-2
                text-sm
                transition
                hover:border-blue-600
                hover:text-blue-600
              "

            >

              Login

            </button>

          )}

          

          {user && (

            <div className="relative">

              <button

                onClick={() =>
                  setProfileMenu(!profileMenu)
                }

                className="
                  flex
                  items-center
                  gap-2
                  border
                  border-gray-300
                  px-5
                  py-2
                  text-sm
                  transition
                  hover:border-blue-600
                "

              >

                <User size={16} />

                {user.name}

              </button>
                            {profileMenu && (

                <div
                  className="
                    absolute
                    right-0
                    mt-2
                    w-64
                    border
                    border-gray-200
                    bg-white
                    shadow-xl
                  "
                >

                  <div className="border-b border-gray-200 p-5">

                    <h3 className="font-semibold">

                      {user.name}

                    </h3>

                    <p className="mt-1 text-sm text-gray-500">

                      {user.email}

                    </p>

                  </div>

                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setProfileMenu(false);
                    }}
                    className="flex w-full items-center gap-3 px-5 py-4 text-sm hover:bg-gray-50"
                  >

                    <LayoutDashboard size={17} />

                    Dashboard

                  </button>

                  <button
                    onClick={() => {
                      navigate("/history");
                      setProfileMenu(false);
                    }}
                    className="flex w-full items-center gap-3 px-5 py-4 text-sm hover:bg-gray-50"
                  >

                    <History size={17} />

                    History

                  </button>

                  <button
                    onClick={() => {
                      navigate("/settings");
                      setProfileMenu(false);
                    }}
                    className="flex w-full items-center gap-3 px-5 py-4 text-sm hover:bg-gray-50"
                  >

                    <Settings size={17} />

                    Settings

                  </button>

                  <div className="border-t border-gray-200" />

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-5 py-4 text-sm text-red-600 hover:bg-red-50"
                  >

                    <LogOut size={17} />

                    Logout

                  </button>

                </div>

              )}

            </div>

          )}

        </nav>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden"
        >

          {mobileMenu ? (

            <X size={24} />

          ) : (

            <Menu size={24} />

          )}

        </button>

      </div>

      {/* Mobile Drawer */}

      {mobileMenu && (

        <div
          className="
            border-t
            border-gray-200
            bg-white
            md:hidden
          "
        >

          <button
            onClick={() => {
              navigate("/");
              setMobileMenu(false);
            }}
            className="block w-full border-b border-gray-100 px-6 py-4 text-left"
          >
            Home
          </button>

          <button
            onClick={() => {
              navigate("/dashboard");
              setMobileMenu(false);
            }}
            className="block w-full border-b border-gray-100 px-6 py-4 text-left"
          >
            Dashboard
          </button>

          <button
            onClick={() => {
              document
                .getElementById("features")
                ?.scrollIntoView({
                  behavior: "smooth",
                });

              setMobileMenu(false);
            }}
            className="block w-full border-b border-gray-100 px-6 py-4 text-left"
          >
            Features
          </button>

          {!user ? (

            <button
              onClick={() => {
                navigate("/login");
                setMobileMenu(false);
              }}
              className="block w-full px-6 py-4 text-left text-blue-600"
            >
              Login
            </button>

          ) : (

            <>

              <div className="border-t border-gray-200 px-6 py-4">

                <p className="font-semibold">

                  {user.name}

                </p>

                <p className="text-sm text-gray-500">

                  {user.email}

                </p>

              </div>

              <button
                onClick={() => {
                  navigate("/history");
                  setMobileMenu(false);
                }}
                className="block w-full border-b border-gray-100 px-6 py-4 text-left"
              >
                History
              </button>

              <button
                onClick={() => {
                  navigate("/settings");
                  setMobileMenu(false);
                }}
                className="block w-full border-b border-gray-100 px-6 py-4 text-left"
              >
                Settings
              </button>

              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenu(false);
                }}
                className="block w-full px-6 py-4 text-left text-red-600"
              >
                Logout
              </button>

            </>

          )}

        </div>

      )}

    </header>

  );

}
                