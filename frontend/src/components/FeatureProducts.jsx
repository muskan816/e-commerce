import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import "./FeatureProducts.css";
import { NavLink } from "react-router-dom";

const FeatureProducts = () => {
  const { isLoading, products } = useContext(ProductContext);

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10 text-red-500">No products found.</div>
    );
  }

  return (
    <section className="bg-white py-10 px-4">
      <div className="w-7xl mx-auto">
        <h2 className="text-sm uppercase text-indigo-600 mb-2">Check Now!</h2>
        <h3 className="text-2xl font-bold mb-8 font-serif">
          Our Feature Services
        </h3>

        <div className="overflow-x-auto">
          <div className="flex gap-6 flex-nowrap">
            {products.slice(0, 10).map((product) => (
              <NavLink
                to={`/singleProduct/${product.id}`}
                key={product.id}
                className="min-w-[300px] bg-gray-100 shadow-md rounded-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="relative image-wrapper m-2 bg-white hover:scale-110">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-52 w-full object-cover"
                  />
                  <div className="overlay-slide"></div>
                  <span className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full z-10">
                    {product.category}
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="font-medium">{product.title}</h4>
                  <p className="text-indigo-600 font-semibold">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureProducts;
