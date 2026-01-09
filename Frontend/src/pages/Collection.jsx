import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = products.slice();
    if (showSearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProducts(productCopy);
  };

  const sortProducts = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 pt-28 px-4 sm:px-16 lg:px-24">
      {/* Left Sidebar - Filters */}
      <aside className="w-full sm:w-60 flex-shrink-0">
        <p
          className="my-3 text-xl flex items-center justify-between cursor-pointer font-semibold"
          onClick={() => setShowFilter(!showFilter)}
        >
          Filter
          <img
            className={`h-4 sm:hidden transition-transform duration-300 ${
              showFilter ? "rotate-90" : ""
            }`}
            src={assets.dropdown_icon}
            alt="Toggle"
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 rounded-lg p-4 mt-4 bg-white shadow-sm ${
            showFilter ? "block" : "hidden sm:block"
          }`}
        >
          <p className="mb-3 text-sm font-medium text-gray-700">CATEGORIES</p>
          <div className="flex flex-col gap-2">
            {["Men", "Women", "Kids"].map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer hover:text-blue-600 transition-colors"
              >
                <input
                  type="checkbox"
                  value={cat}
                  onChange={toggleCategory}
                  className="w-4 h-4 accent-blue-600"
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div
          className={`border border-gray-300 rounded-lg p-4 mt-6 bg-white shadow-sm ${
            showFilter ? "block" : "hidden sm:block"
          }`}
        >
          <p className="mb-3 text-sm font-medium text-gray-700">TYPE</p>
          <div className="flex flex-col gap-2">
            {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
              <label
                key={sub}
                className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer hover:text-blue-600 transition-colors"
              >
                <input
                  type="checkbox"
                  value={sub}
                  onChange={toggleSubCategory}
                  className="w-4 h-4 accent-blue-600"
                />
                {sub}
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Right Side - Products */}
      <main className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <Title text1="ALL" text2="COLLECTION" />

          {/* Sort Dropdown */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm sm:text-base mt-4 sm:mt-0"
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Collection;
