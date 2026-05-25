import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductGrid from "../components/ProductGrid.jsx";

const priceRanges = [
  { label: "All prices", value: "all", min: 0, max: Infinity },
  { label: "$150 - $500", value: "mid", min: 150, max: 500 },
  { label: "$500 - $900", value: "premium", min: 500, max: 900 },
  { label: "$900+", value: "ultra", min: 900, max: Infinity },
];

const sortOptions = [
  { label: "Latest to oldest", value: "featured" },
  { label: "Lowest price", value: "low" },
  { label: "Highest price", value: "high" },
  { label: "A to Z", value: "az" },
];

function humanizeCategory(category) {
  return category ? category.charAt(0).toUpperCase() + category.slice(1) : "Product";
}

function FilterSidebar({
  brands,
  hasActiveFilters,
  resetFilters,
  searchQuery,
  selectedBrands,
  selectedPrice,
  setSearchQuery,
  setSelectedPrice,
  setSortBy,
  sortBy,
  toggleBrand,
}) {
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">Categories</h2>
        {hasActiveFilters && (
          <button
            className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
            onClick={resetFilters}
            type="button"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
        <input
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-8 pr-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:bg-white"
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search devices..."
          type="search"
          value={searchQuery}
        />
      </div>

      <div className="mb-5">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
          Brand
        </p>
        <div className="flex flex-col gap-2">
          {brands.map((brand) => (
            <label
              className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-500 transition hover:text-gray-900"
              key={brand}
            >
              <input
                checked={selectedBrands.includes(brand)}
                className="h-3.5 w-3.5 cursor-pointer rounded border-gray-300 accent-indigo-600"
                onChange={() => toggleBrand(brand)}
                type="checkbox"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-5 border-t border-gray-100 pt-5">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
          Budget
        </p>
        <div className="flex flex-col gap-2">
          {priceRanges.map((range) => (
            <label
              className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-500 transition hover:text-gray-900"
              key={range.value}
            >
              <input
                checked={selectedPrice === range.value}
                className="h-3.5 w-3.5 cursor-pointer accent-indigo-600"
                name="price"
                onChange={() => setSelectedPrice(range.value)}
                type="radio"
              />
              {range.label}
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-5">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
          Sort by
        </p>
        <div className="flex flex-col gap-2">
          {sortOptions.map((option) => (
            <label
              className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-500 transition hover:text-gray-900"
              key={option.value}
            >
              <input
                checked={sortBy === option.value}
                className="h-3.5 w-3.5 cursor-pointer accent-indigo-600"
                name="sort"
                onChange={() => setSortBy(option.value)}
                type="radio"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>
    </>
  );
}

export default function ProductPage({
  category,
  loading,
  onAddToCart,
  onQuickView,
  products,
}) {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const categoryProducts = useMemo(
    () => products?.filter((product) => product.category === category) ?? [],
    [category, products],
  );

  const brands = useMemo(
    () => [...new Set(categoryProducts.map((product) => product.brand))],
    [categoryProducts],
  );

  const toggleBrand = (brand) =>
    setSelectedBrands((currentBrands) =>
      currentBrands.includes(brand)
        ? currentBrands.filter((currentBrand) => currentBrand !== brand)
        : [...currentBrands, brand],
    );

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedPrice("all");
    setSortBy("featured");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedBrands.length > 0 || selectedPrice !== "all" || searchQuery !== "";

  const filteredProducts = useMemo(() => {
    const range = priceRanges.find((priceRange) => priceRange.value === selectedPrice);
    const query = searchQuery.trim().toLowerCase();

    return [...categoryProducts]
      .filter((product) =>
        selectedBrands.length === 0 ? true : selectedBrands.includes(product.brand),
      )
      .filter((product) =>
        !range ? true : product.price >= range.min && product.price <= range.max,
      )
      .filter((product) =>
        query === ""
          ? true
          : product.name.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query),
      )
      .sort((a, b) => {
        if (sortBy === "low") return a.price - b.price;
        if (sortBy === "high") return b.price - a.price;
        if (sortBy === "az") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [categoryProducts, selectedBrands, selectedPrice, sortBy, searchQuery]);

  const sidebarProps = {
    brands,
    hasActiveFilters,
    resetFilters,
    searchQuery,
    selectedBrands,
    selectedPrice,
    setSearchQuery,
    setSelectedPrice,
    setSortBy,
    sortBy,
    toggleBrand,
  };

  const categoryLabel = humanizeCategory(category);
  const activeFilterCount = selectedBrands.length + (selectedPrice !== "all" ? 1 : 0);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:py-10 lg:px-0">
      <div className="flex gap-10">
        <aside className="hidden w-48 shrink-0 border-r border-gray-100 pr-8 lg:block">
          <FilterSidebar {...sidebarProps} />
        </aside>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="absolute inset-y-0 left-0 w-72 overflow-y-auto bg-white p-6 shadow-xl">
              <button
                aria-label="Close"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400"
                onClick={() => setMobileOpen(false)}
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
              <FilterSidebar {...sidebarProps} />
            </aside>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3">
              <button
                className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 lg:hidden"
                onClick={() => setMobileOpen(true)}
                type="button"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
                {hasActiveFilters && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {filteredProducts.length}
                </span>{" "}
                {categoryLabel.toLowerCase()}
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              Sort by:
              <select
                className="rounded-xl border border-gray-200 bg-white py-1.5 pl-3 pr-6 text-sm text-gray-700 outline-none"
                onChange={(event) => setSortBy(event.target.value)}
                value={sortBy}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <p className="empty-state">Loading products from API...</p>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-16 text-center">
              <p className="text-sm font-semibold text-gray-700">
                No {categoryLabel.toLowerCase()}s matched.
              </p>
              <button
                className="mt-3 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                onClick={resetFilters}
                type="button"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <ProductGrid
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              products={filteredProducts}
            />
          )}
        </div>
      </div>
    </div>
  );
}
