import { useState, useEffect } from "react";
import { loginRequest, registerRequest, verifyTokenRequest, logoutRequest } from "../api/authApi";
import Cookies from "js-cookie";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = async (data) => {
    try {
      const res = await loginRequest(data);
      setUser(res.data.user);
      setIsAuthenticated(true);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Error while logging in");
      throw error;
    }
  };

  const signup = async (data) => {
    try {
      const res = await registerRequest(data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Error while registering");
      throw error;
    }
  };

  const logout = async () => {
    await logoutRequest();
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await verifyTokenRequest();

        setUser(res.data.user);
        setIsAuthenticated(true);

      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    signup,
    logout
  };
};

export default useAuth;