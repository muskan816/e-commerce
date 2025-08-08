import { useContext, useState } from "react";
import ProductSidebar from "../components/ProductSidebar";
import { ProductContext } from "../contexts/ProductContext";
import { NavLink } from "react-router-dom";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import "../components/FeatureProducts.css";


const Products = () => {
  const { products = [] } = useContext(ProductContext);
  const [viewMode, setViewMode] = useState("grid");
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [priceFilter, setPriceFilter] = useState(900);

  const categories = [...new Set(products.map((product) => product.category))];
  const company = [...new Set(products.map((product) => product.brand))];
  const itemsPerPage = 6;

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      selectedCategory === "All" ? true : product.category === selectedCategory
    )
    .filter((product) =>
      selectedCompany === "All" ? true : product.brand === selectedCompany
    )
    .filter((product) => product.price <= priceFilter)
    .sort((a, b) => {
      if (sortOption === "lowest") {
        return a.price - b.price;
      } else if (sortOption === "highest") {
        return b.price - a.price;
      } else {
        return 0;
      }
    });

  console.log(products);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentProducts = filteredProducts.slice(start, end);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 flex gap-6">
      <ProductSidebar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
        company={company}
        setSortOption={setSortOption}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
      />

      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`border p-1 rounded hover:bg-gray-100 ${
                viewMode === "grid" ? "bg-gray-200" : ""
              }`}
            >
              <HiOutlineViewGrid className="text-xl" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`border p-1 rounded hover:bg-gray-100 ${
                viewMode === "list" ? "bg-gray-200" : ""
              }`}
            >
              <HiOutlineViewList className="text-xl" />
            </button>
          </div>
          <p className="text-gray-600">
            {filteredProducts.length} total products.
          </p>
          <select
            className="border px-3 py-1 rounded"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Sort By</option>
            <option value="lowest">Price (Low to High)</option>
            <option value="highest">Price (High to Low)</option>
          </select>
        </div>

        {/* Products */}
        {currentProducts.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No products found.</p>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product) => (
              <NavLink
                to={`/singleProduct/${product.id}`}
                key={product.id}
                className="min-w-[100px] bg-gray-100 shadow-md rounded-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
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
        ) : (
          <div className="space-y-4">
            {currentProducts.map((product) => (
              <NavLink
                to={`/singleProduct/${product.id}`}
                key={product.id}
                className="flex gap-6 bg-gray-100 rounded shadow-md hover:shadow-md transition-all duration-300 p-4 cursor-default"
              >
                {/* Image Section */}
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-40 h-40 object-cover rounded bg-white"
                />

                {/* Content Section */}
                <div className="flex flex-col justify-between w-full">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-xl">{product.title}</h4>
                    <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full h-fit">
                      {product.category}
                    </span>
                  </div>

                  <p className="text-indigo-600 font-bold text-lg mt-1">
                    ₹{product.price.toLocaleString()}
                  </p>

                  <p className="text-gray-600 text-sm my-2 line-clamp-2">
                    {product.description.slice(0, 120)}...
                  </p>

                  <button className="mt-2 self-start border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white text-sm px-4 py-1 rounded transition-all cursor-pointer">
                    READ MORE
                  </button>
                </div>
              </NavLink>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-2">
            <button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              {"<"}
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`px-3 py-1 border rounded hover:bg-gray-100 ${
                  page === index + 1 ? "bg-indigo-600 text-white" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              {">"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
