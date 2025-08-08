import { useContext, useState } from "react";
import { useCartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";

const AddToCart = ({ product }) => {
  console.log("Product passed to addToCart:", product); 
  const { user } = useContext(AuthContext);
  const { stock } = product || {};
  const { addToCart } = useCartContext();

  const [amount, setAmount] = useState(stock > 0 ? 1 : 0);

  const setDecrease = () => {
    setAmount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const setIncrease = () => {
    setAmount((prev) => (prev < stock ? prev + 1 : stock));
  };

  const handleAddToCart = () => {
    if (!user) return alert("Please login to add items to cart");
    const productToAdd = {
      ...product,
      quantity: amount,
    };
    console.log("Adding to cart:", productToAdd);
    addToCart(productToAdd);
  };

  return (
    <div>
      <div className="flex items-center mt-4 gap-4">
        <button
          className="px-4 py-1 text-xl bg-gray-200 hover:bg-gray-300 cursor-pointer"
          onClick={setDecrease}
        >
          -
        </button>
        <span>{amount}</span>
        <button
          className="px-4 py-1 text-xl bg-gray-200 hover:bg-gray-300 cursor-pointer"
          onClick={setIncrease}
        >
          +
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        disabled={!user}
        className={`mt-6 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 cursor-pointer active:bg-indigo-800`}
      >
        ADD TO CART
      </button>
      {!user && (
        <p className="mt-2 text-sm text-red-600 italic">
          Login required to add to cart.
        </p>
      )}{" "}
    </div>
  );
};

export default AddToCart;
