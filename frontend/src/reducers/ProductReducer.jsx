const ProductReducer = (state, action) => {
  //   if (action.type === "loading") {
  //     return {
  //       ...state,
  //       isLoading: true,
  //     };
  //   }
  //   if (action.type === "error") {
  //     return {
  //       ...state,
  //       isLoading: false,
  //       isError: true,
  //     };
  //   }
  //   return state;

  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "data":
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };
    case "error":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload?.message || "something went wrong",
      };
    case "single_loading":
      return {
        ...state,
        isSingleLoading: true,
      };
    case "singleProduct":
      return {
        ...state,
        isSingleLoading: false,
        singleProduct: action.payload,
      };
    case "single_error":
      return {
        ...state,
        isSingleLoading: false,
        isError: true,
        errorMessage: action.payload?.message || "something went wrong",
      };
    default:
      return state;
  }
};

export default ProductReducer;
