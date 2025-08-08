import CustomSelect from "./CustomSlect";


const ProductSidebar = ({
  searchTerm,
  setSearchTerm,
  categories,
  selectedCategory,
  setSelectedCategory,
  company,
  selectedCompany,
  setSelectedCompany,
  setSortOption,
  priceFilter,
  setPriceFilter
}) => {
  return (
    <aside className="w-full sm:w-64 px-4 py-6 border-r border-gray-200">
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="SEARCH"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-1.5 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Category */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-[1.15rem]">Category</h3>
        <ul className="space-y-2 text-indigo-600 font-semibold text-[1.12rem]">
          <li>
            <button
              onClick={() => setSelectedCategory("All")}
              className={`hover:underline cursor-pointer ${
                selectedCategory === "All" ? "font-semibold" : ""
              }`}
            >
              All
            </button>
          </li>
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => setSelectedCategory(category)}
                className={`hover:underline cursor-pointer ${
                  selectedCategory === category ? "font-semibold" : ""
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Company */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-[1.15rem]">Company</h3>
        <CustomSelect
          options={["All", ...company]}
          selected={selectedCompany}
          onChange={setSelectedCompany}
        />
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-[1.15rem]">Price</h3>
        <p className="text-sm text-gray-700 mb-1">₹{priceFilter.toLocaleString()}</p>
        <input
          type="range"
          min="0"
          max="900"
          value={priceFilter}
          onChange={(e) => setPriceFilter(Number(e.target.value))}
          className="w-full accent-indigo-600"
        />
      </div>

      {/* Clear Filters */}
      <div>
        <button
          className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 transition-all"
          onClick={() => {
            setSearchTerm("");
            setSelectedCategory("All");
            setSelectedCompany("All");
            setSortOption("default")
            setPriceFilter(900)
          }}
        >
          CLEAR FILTERS
        </button>
      </div>
    </aside>
  );
};

export default ProductSidebar;
