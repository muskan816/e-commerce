/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect } from "react";
import cartReducer from "../reducers/cartReducer";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const CartContext = createContext();

const initialState = {
  cart: [],
  total_amount: 0,
  total_products: 0,
};

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart for logged-in user, or from localStorage if not logged in
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`);
          dispatch({ type: "SET_CART", payload: data });
        } catch (err) {
          console.error("Failed to load cart", err);
        }
      } else {
        // handle guest cart from localStorage (unchanged logic)
        const localData = JSON.parse(localStorage.getItem("my_cart") || "null");
        if (localData) {
          dispatch({ type: "SET_CART", payload: localData.cart });
        }
      }
    };
    fetchCart();
  }, [user]);

  // Whenever cart changes and user is not logged in, save to localStorage
  useEffect(() => {
    if (!user) {
      localStorage.setItem("my_cart", JSON.stringify(state));
    }
  }, [state, user]);

  // Add product to cart
  const addToCart = async (product) => {
    if (user) {
      try {
        // Removed manual Authorization header; withCredentials sends our cookie
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/cart/${product.id}`, 
          {quantity: 1 }
        );
        dispatch({ type: "SET_CART", payload: data });
      } catch (err) {
        console.error("Add to cart failed", err);
      }
    } else {
      dispatch({ type: "ADD_TO_CART", payload: product });
    }
  };

  const increaseQuantity = async (id) => {
    if (user) {
      try {
        const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/cart/increase/${id}`);
        dispatch({ type: "SET_CART", payload: data });
      } catch (err) {
        console.error("Increase failed", err);
      }
    } else {
      dispatch({ type: "INCREASE_QUANTITY", payload: { id } });
    }
  };

  const decreaseQuantity = async (id) => {
    if (user) {
      try {
        const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/cart/decrease/${id}`);
        dispatch({ type: "SET_CART", payload: data });
      } catch (err) {
        console.error("Decrease failed", err);
      }
    } else {
      dispatch({ type: "DECREASE_QUANTITY", payload: { id } });
    }
  };

  const removeFromCart = async (id) => {
    if (user) {
      try {
        const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/cart/${id}`);
        dispatch({ type: "SET_CART", payload: data });
      } catch (err) {
        console.error("Remove failed", err);
      }
    } else {
      dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/cart`);
        dispatch({ type: "SET_CART", payload: data });
      } catch (err) {
        console.error("Clear cart failed", err);
      }
    } else {
      dispatch({ type: "CLEAR_CART" });
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
