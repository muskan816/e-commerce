/* eslint-disable react-refresh/only-export-components */
// create a context
// provider
// consume => useContext hook

import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/ProductReducer";

export const ProductContext = createContext();

const API = import.meta.env.VITE_API_URL + "/products";

const ProductProvider = ({ children }) => {
  const initiaLState = {
    isLoading: false,
    isError: false,
    errorMessage: "",
    products: [],
    isSingleLoading: false,
    singleProduct: {},
  };
  const [state, dispatch] = useReducer(reducer, initiaLState);

  const getProducts = async (url) => {
    console.log("fetching from", API);
    dispatch({ type: "loading" });
    try {
      console.log("Fetching from:", url);

      const { data } = await axios.get(url);
      // const products = await res.data;
      console.log("fetched data:", data);
      dispatch({ type: "data", payload: data });
    } catch (error) {
      dispatch({ type: "error", payload: error });
    }
  };

  const getSingleProduct = async (url) => {
    dispatch({ type: "single_loading" });
    try {
      const { data } = await axios.get(url);
      dispatch({ type: "singleProduct", payload: data });
    } catch (err) {
      dispatch({ type: "single_error", payload: err });
    }
  };

  useEffect(() => {
    getProducts(API);
  }, []);


  return (
    <ProductContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider };
