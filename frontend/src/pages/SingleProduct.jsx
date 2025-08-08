/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import PageNav from "../components/PageNav";
import AddToCart from "../components/AddToCart";

const SingleProduct = () => {
  const { id } = useParams();
  const { getSingleProduct, singleProduct, isSingleLoading } =
    useContext(ProductContext);

  useEffect(() => {
    getSingleProduct(`${import.meta.env.VITE_API_URL}/products/${id}`);
  }, [id]);

  if (isSingleLoading) {
    return <div className="text-center py-10 text-xl">Loading...</div>;
  }

  const {
    title,
    brand,
    category,
    description,
    discountPercentage,
    price,
    images = [],
    stock,
    rating,
  } = singleProduct || {};

  return (
    <section>
      <PageNav title={category} />
      <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto px-4 pt-6 pb-2 -mb-6">
        {/* Left Image Panel */}
        <div className="w-full lg:w-1/2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {images.length > 0 ? (
              images
                .slice(0, 4)
                .map((img, index) => (
                  <img
                    key={`thumb-${index}`}
                    src={img}
                    alt={`product-thumbnail-${index}`}
                    className="h-20 w-full object-cover border rounded cursor-pointer p-2"
                  />
                ))
            ) : (
              <p>No images available</p>
            )}
          </div>

          <img
            src={images?.[0]}
            alt={title || "Product image"}
            className="w-full object-cover rounded-lg shadow"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>

        {/* Right Product Info Panel */}
        <div className="w-full lg:w-1/2 space-y-4">
          <h1 className="text-2xl font-semibold capitalize">{title}</h1>
          <div className="text-yellow-500">
            ⭐ {rating}{" "}
            <span className="text-gray-500">(23 customer reviews)</span>
          </div>
          <p>
            MRP:{" "}
            <s className="text-gray-500">
              ₹{(price + discountPercentage / 100)?.toFixed(2)}
            </s>
          </p>
          <p className="text-blue-600 font-bold">
            Deal of the Day: ₹{price?.toFixed(2)}
          </p>
          <p className="text-gray-700">{description}</p>

          <div className="flex gap-6 mt-4 text-sm text-gray-600">
            <span>
              {" "}
              <span className="text-xl">🚚</span> Free Delivery
            </span>
            <span>
              <span className="text-xl">🔄</span> 30 Days Replacement
            </span>
            <span>
              <span className="text-xl">✅</span> 100% Guarantee
            </span>
            <span>
              <span className="text-xl">🛡️</span> 2 Year Warranty
            </span>
          </div>

          <div className="mt-4">
            <p>
              Available:{" "}
              <span className="font-medium">
                {stock > 0 ? "In stock" : "Out of stock"}
              </span>
            </p>
            <p>
              <strong>ID:</strong> <span className="text-gray-600">#{id}</span>
            </p>
            <p>
              <strong>Brand:</strong>{" "}
              <span className="capitalize">{brand}</span>
            </p>
            <p>
              <strong>Category:</strong>{" "}
              <span className="capitalize">{category}</span>
            </p>
          </div>

          <AddToCart product={singleProduct} />
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
