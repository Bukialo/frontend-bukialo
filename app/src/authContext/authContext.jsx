import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    userData: null,
    loading: true,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (token) {
      setAuthState({
        token,
        userData,
        loading: false,
      });
    } else {
      setAuthState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userData", JSON.stringify(userData));

    setAuthState({
      token,
      userData,
      loading: false,
    });

    navigate("/profile");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setAuthState({
      token: null,
      userData: null,
      loading: false,
    });
    navigate("/login");
  };

  const updateUserData = (newData) => {
    const updatedData = { ...authState.userData, ...newData };
    localStorage.setItem("userData", JSON.stringify(updatedData));

    setAuthState((prev) => ({
      ...prev,
      userData: updatedData,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        token: authState.token,
        userData: authState.userData,
        loading: authState.loading,
        login,
        logout,
        updateUserData,
      }}
    >
      {!authState.loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
