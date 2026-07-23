import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {

    const saved = localStorage.getItem("user");

    return saved ? JSON.parse(saved) : null;

  });

  const [token, setToken] = useState(() => {

    return localStorage.getItem("token") || null;

  });

  useEffect(() => {

    if (user) {

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

    } else {

      localStorage.removeItem("user");

    }

  }, [user]);

  useEffect(() => {

    if (token) {

      localStorage.setItem("token", token);

    } else {

      localStorage.removeItem("token");

    }

  }, [token]);

  const login = (data) => {

    setUser(data.user);

    setToken(data.token);

  };

  const logout = () => {

    setUser(null);

    setToken(null);

    localStorage.clear();

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isLoggedIn: !!token,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}

export function useAuth() {

  return useContext(AuthContext);

}