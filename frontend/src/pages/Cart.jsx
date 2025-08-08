// Cart.jsx
import { useCartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const {
    cart,
    total_amount,
    total_products,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCartContext();

  if (!cart || cart.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        <h2>Your cart is empty</h2>
        <Link to="/products" className="text-indigo-600 underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <p className="mb-4">Total items: {total_products}</p>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-4">
          <thead>
            <tr className="text-gray-700">
              <th>ITEM</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>SUBTOTAL</th>
              <th>REMOVE</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(({ product, quantity }) => {
              const { _id, title, thumbnail, price } = product;
              return (
                <tr key={_id} className="bg-white shadow">
                  <td className="py-4 flex items-center gap-4">
                    <img
                      src={thumbnail}
                      alt={title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <p className="font-medium">{title}</p>
                  </td>
                  <td>
                    ₹
                    {(price ?? 0).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(product._id)}
                        className="text-xl"
                      >
                        −
                      </button>
                      <span>{quantity}</span>
                      <button
                        onClick={() => increaseQuantity(product._id)}
                        className="text-xl"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    ₹
                    {((price ?? 0) * quantity).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td>
                    <button
                      onClick={() => removeFromCart(product._id)}
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-10 flex flex-col md:flex-row justify-between gap-6 items-center">
        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/products"
            className="bg-indigo-600 text-white px-4 py-2 text-sm rounded hover:bg-indigo-700"
          >
            CONTINUE SHOPPING
          </Link>
          <button
            onClick={clearCart}
            className="bg-red-500 text-white px-4 py-2 text-sm rounded hover:bg-red-600"
          >
            CLEAR CART
          </button>
        </div>

        {/* Order Summary */}
        <div className="border p-6 rounded-md shadow bg-white w-full sm:w-auto">
          <p className="mb-2">
            Subtotal: ₹
            {total_amount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>
          <p className="mb-2">Shipping Fee: ₹5.00</p>
          <hr className="my-2" />
          <p className="font-semibold text-lg">
            Order Total: ₹
            {(total_amount + 5).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Cart;
