// cartReducer.js

// helper to recalc totals
const getCartTotals = (cart) => {
  const { total_amount, total_products } = cart.reduce(
    (acc, item) => {
      acc.total_amount += (item.price ?? 0) * item.quantity;
      acc.total_products += item.quantity;
      return acc;
    },
    { total_amount: 0, total_products: 0 }
  );
  return { total_amount, total_products };
};

const cartReducer = (state, action) => {
  let updatedCart;
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = action.payload;
      const exist = state.cart.find((i) => i.id === product.id);
      if (exist) {
        updatedCart = state.cart.map((i) =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + product.quantity }
            : i
        );
      } else {
        updatedCart = [...state.cart, { ...product }];
      }
      break;
    }
    case "INCREASE_QUANTITY": {
      updatedCart = state.cart.map((i) =>
        i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      break;
    }
    case "DECREASE_QUANTITY": {
      updatedCart = state.cart
        .map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: Math.max(1, i.quantity - 1) }
            : i
        )
        .filter((i) => i.quantity > 0);
      break;
    }
    case "SET_CART":
      return {
        ...state,
        cart: action.payload,
        total_products: action.payload.reduce(
          (sum, item) => sum + item.quantity,
          0
        ),
        total_amount: action.payload.reduce((acc, item) => {
          if (!item.product || typeof item.product.price !== "number")
            return acc;
          return acc + item.product.price * item.quantity;
        }, 0),
      };
    case "REMOVE_FROM_CART": {
      updatedCart = state.cart.filter((i) => i.id !== action.payload.id);
      break;
    }
    case "CLEAR_CART": {
      updatedCart = [];
      break;
    }
    default:
      return state;
  }

  // after any cart change, recalc totals
  const { total_amount, total_products } = getCartTotals(updatedCart);
  return {
    ...state,
    cart: updatedCart,
    total_amount,
    total_products,
  };
};

export default cartReducer;
