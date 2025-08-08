import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(); // ✅ Correct export
axios.defaults.withCredentials = true;

const initialState = {
  user: null,
  loading: false,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "AUTH_LOADING":
      return { ...state, loading: true, error: null };
    case "AUTH_SUCCESS":
      return { user: action.payload, loading: false, error: null };
    case "AUTH_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "LOGOUT":
      return { user: null, loading: false, error: null };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Always send cookies
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const loadUser = async () => {
      dispatch({ type: "AUTH_LOADING" });
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`);
        dispatch({ type: "AUTH_SUCCESS", payload: res.data.user });
      } catch (err) {
        dispatch({ type: "LOGOUT" });
      }
    };
    loadUser();
  }, []);

  const login = async ({ email, password }) => {
    dispatch({ type: "AUTH_LOADING" });
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password,
      });
      dispatch({ type: "AUTH_SUCCESS", payload: res.data.user });
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
        payload: err.response?.data?.msg || "Login failed",
      });
    }
  };

  const register = async ({ name, email, password }) => {
    dispatch({ type: "AUTH_LOADING" });
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        name,
        email,
        password,
      });
      dispatch({ type: "AUTH_SUCCESS", payload: res.data.user });
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
        payload: err.response?.data?.msg || "Registration failed",
      });
    }
  };

  const logout = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
