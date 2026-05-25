import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";

const priceRanges = [
  { label: "All prices", value: "all", min: 0, max: Infinity },
  { label: "$150 – $500", value: "mid", min: 150, max: 500 },
  { label: "$500 – $900", value: "premium", min: 500, max: 900 },
  { label: "$900+", value: "ultra", min: 900, max: Infinity },
];

const sortOptions = [
  { label: "Latest to oldest", value: "featured" },
  { label: "Lowest price", value: "low" },
  { label: "Highest price", value: "high" },
  { label: "A to Z", value: "az" },
];

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(price);
}

function PhoneSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="aspect-[4/3] animate-pulse bg-gray-100 dark:bg-gray-700" />
          <div className="p-4 space-y-2.5">
            <div className="flex justify-between">
              <div className="h-3 w-16 animate-pulse rounded-full bg-gray-100 dark:bg-gray-700" />
              <div className="h-3 w-10 animate-pulse rounded-full bg-gray-100 dark:bg-gray-700" />
            </div>
            <div className="h-4 w-3/4 animate-pulse rounded-full bg-gray-100 dark:bg-gray-700" />
            <div className="h-3 w-1/2 animate-pulse rounded-full bg-gray-100 dark:bg-gray-700" />
            <div className="flex justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
              <div className="h-5 w-16 animate-pulse rounded-full bg-gray-100 dark:bg-gray-700" />
              <div className="h-7 w-20 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-700" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StarRating({ rating = 5.0 }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
      <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function FilterSidebar({
  brands,
  selectedBrands,
  toggleBrand,
  selectedPrice,
  setSelectedPrice,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery,
  resetFilters,
  hasActiveFilters,
}) {
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-100">
          Categories
        </h2>
        {hasActiveFilters && (
          <button
            className="text-xs font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            onClick={resetFilters}
            type="button"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <input
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-8 pr-3 text-sm text-gray-800 outline-none transition
            placeholder:text-gray-400
            focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20
            dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400
            dark:focus:border-indigo-400 dark:focus:bg-gray-600 dark:focus:ring-indigo-400/20"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search devices…"
          type="search"
          value={searchQuery}
        />
      </div>

      {/* Brand */}
      <div className="mb-5">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          Brand
        </p>
        <div className="flex flex-col gap-2.5">
          {brands.map((brand) => (
            <label
              className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              key={brand}
            >
              <input
                checked={selectedBrands.includes(brand)}
                className="h-3.5 w-3.5 cursor-pointer rounded border-gray-300 accent-indigo-600 dark:border-gray-600"
                onChange={() => toggleBrand(brand)}
                type="checkbox"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="mb-5 border-t border-gray-200 pt-5 dark:border-gray-700">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          Budget
        </p>
        <div className="flex flex-col gap-2.5">
          {priceRanges.map((range) => (
            <label
              className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
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

      {/* Sort */}
      <div className="border-t border-gray-200 pt-5 dark:border-gray-700">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          Sort by
        </p>
        <div className="flex flex-col gap-2.5">
          {sortOptions.map((option) => (
            <label
              className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
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

export default function PhoneProducts({ loading, onAddToCart, products }) {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [activePhone, setActivePhone] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const phoneProducts = useMemo(
    () => products?.filter((p) => p.category === "phone") ?? [],
    [products],
  );

  const brands = useMemo(
    () => [...new Set(phoneProducts.map((p) => p.brand))],
    [phoneProducts],
  );

  const toggleBrand = (brand) =>
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );

  const toggleFavorite = (id) =>
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
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
    const range = priceRanges.find((p) => p.value === selectedPrice);
    return [...phoneProducts]
      .filter((p) =>
        selectedBrands.length === 0 ? true : selectedBrands.includes(p.brand),
      )
      .filter((p) =>
        !range ? true : p.price >= range.min && p.price <= range.max,
      )
      .filter((p) =>
        searchQuery.trim() === ""
          ? true
          : p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .sort((a, b) => {
        if (sortBy === "low") return a.price - b.price;
        if (sortBy === "high") return b.price - a.price;
        if (sortBy === "az") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [phoneProducts, selectedBrands, selectedPrice, sortBy, searchQuery]);

  const sidebarProps = {
    brands,
    selectedBrands,
    toggleBrand,
    selectedPrice,
    setSelectedPrice,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    resetFilters,
    hasActiveFilters,
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:py-10 lg:px-0">
      <div className="flex gap-10">
        {/* ── Desktop sidebar ── */}
        <aside className="hidden w-48 shrink-0 border-r border-gray-200 pr-8 dark:border-gray-700 lg:block">
          <FilterSidebar {...sidebarProps} />
        </aside>

        {/* ── Mobile drawer ── */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="absolute inset-y-0 left-0 w-72 overflow-y-auto bg-white p-6 shadow-2xl dark:bg-gray-900">
              <button
                aria-label="Close"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                onClick={() => setMobileOpen(false)}
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
              <FilterSidebar {...sidebarProps} />
            </aside>
          </div>
        )}

        {/* ── Main ── */}
        <div className="min-w-0 flex-1">
          {/* Top bar */}
          <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <button
                className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 lg:hidden"
                onClick={() => setMobileOpen(true)}
                type="button"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
                {hasActiveFilters && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                    {selectedBrands.length + (selectedPrice !== "all" ? 1 : 0)}
                  </span>
                )}
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {filteredProducts.length}
                </span>{" "}
                phone{filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              Sort by:
              <select
                className="rounded-xl border border-gray-200 bg-white py-1.5 pl-3 pr-6 text-sm text-gray-800 shadow-sm outline-none transition
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                  dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200
                  dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20"
                onChange={(e) => setSortBy(e.target.value)}
                value={sortBy}
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* States */}
          {loading ? (
            <PhoneSkeleton />
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-16 text-center dark:border-gray-700 dark:bg-gray-800/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                No phones matched.
              </p>
              <button
                className="mt-3 text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                onClick={resetFilters}
                type="button"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => {
                const saving = Math.max(
                  (product.oldPrice ?? 0) - product.price,
                  0,
                );
                const isFav = favorites.includes(product.id);

                return (
                  <article
                    key={product.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200
                      hover:-translate-y-1 hover:border-gray-300 hover:shadow-md
                      dark:border-gray-700 dark:bg-gray-800
                      dark:hover:border-gray-600 dark:hover:shadow-lg dark:hover:shadow-black/30"
                  >
                    {/* Thumbnail Container */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-4 dark:from-gray-700 dark:to-gray-750">
                      <img
                        alt={product.name}
                        className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.02]"
                        src={product.image}
                      />

                      {/* Brand chip */}
                      <div className="absolute left-3 top-3 z-10 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-gray-700 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
                        {product.brand}
                      </div>

                      {/* Favorite */}
                      <button
                        aria-label={
                          isFav ? "Remove from favorites" : "Add to favorites"
                        }
                        className={`absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border shadow-sm transition ${
                          isFav
                            ? "border-rose-200 bg-rose-50 text-rose-500 dark:border-rose-700 dark:bg-rose-950 dark:text-rose-400"
                            : "border-gray-200 bg-white text-gray-400 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:border-rose-700 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                        }`}
                        onClick={() => toggleFavorite(product.id)}
                        type="button"
                      >
                        <Heart
                          className={`h-3.5 w-3.5 ${isFav ? "fill-rose-500 dark:fill-rose-400" : ""}`}
                        />
                      </button>

                      {/* Quick view — appears on hover */}
                      <div className="absolute inset-0 z-10 flex items-end justify-center pb-4 opacity-0 transition duration-200 group-hover:opacity-100">
                        <button
                          className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white/95 px-4 py-2 text-xs font-semibold text-gray-800 shadow-md backdrop-blur-sm transition hover:bg-white dark:border-gray-600 dark:bg-gray-800/95 dark:text-gray-100 dark:hover:bg-gray-800"
                          onClick={() => setActivePhone(product)}
                          type="button"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Quick view
                        </button>
                      </div>

                      {/* Savings badge */}
                      {saving > 0 && (
                        <div className="absolute bottom-3 right-3 z-10 rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 dark:border-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                          Save {formatPrice(saving)}
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col p-4">
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          {product.category ?? "Phone"}
                        </span>
                        <StarRating rating={product.rating ?? 4.8} />
                      </div>

                      <h3 className="text-sm font-semibold leading-snug text-gray-900 dark:text-gray-100">
                        <Link
                          className="transition hover:text-indigo-600 dark:hover:text-indigo-400"
                          to={`/product/${product.id}`}
                        >
                          {product.name}
                        </Link>
                      </h3>

                      <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                        By{" "}
                        <span className="text-gray-600 dark:text-gray-400">
                          {product.seller ?? product.brand}
                        </span>
                      </p>

                      {/* Color dots */}
                      {product.colors?.length > 0 && (
                        <div className="mt-3 flex gap-1.5">
                          {product.colors.slice(0, 4).map((color, i) => (
                            <span
                              key={i}
                              className="h-3.5 w-3.5 rounded-full border-2 border-white shadow ring-1 ring-gray-300 dark:border-gray-800 dark:ring-gray-600"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Price + CTA */}
                      <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-700">
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {formatPrice(product.price)}
                          </p>
                          {product.oldPrice && (
                            <p className="text-xs text-gray-400 line-through dark:text-gray-500">
                              {formatPrice(product.oldPrice)}
                            </p>
                          )}
                        </div>
                        <button
                          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-95 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                          onClick={() => onAddToCart(product)}
                          type="button"
                        >
                          <ShoppingBag className="h-3.5 w-3.5" />
                          Add
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="mt-10 flex items-center justify-center gap-1.5">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 text-gray-500 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                type="button"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`h-8 w-8 rounded-xl text-xs font-semibold shadow-sm transition ${
                    page === 1
                      ? "bg-indigo-600 text-white dark:bg-indigo-500"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                  }`}
                  type="button"
                >
                  {page}
                </button>
              ))}
              <button
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 text-gray-500 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                type="button"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Quick-view modal ── */}
      {activePhone && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          onClick={() => setActivePhone(null)}
        >
          <div
            aria-modal="true"
            className="relative grid w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900 sm:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
          >
            <button
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              onClick={() => setActivePhone(null)}
              type="button"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <div className="flex h-56 items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6 dark:from-gray-800 dark:to-gray-750 sm:h-auto">
              <img
                alt={activePhone.name}
                className="max-h-full max-w-full object-contain"
                src={activePhone.image}
              />
            </div>

            <div className="flex flex-col p-6">
              <span className="mb-2 self-start rounded-full border border-gray-200 bg-gray-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                {activePhone.brand}
              </span>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {activePhone.name}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                {activePhone.description ??
                  "Premium smartphone with pro-grade camera system, all-day battery, and the latest processor."}
              </p>

              <div className="mt-4 flex items-baseline gap-2.5">
                <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {formatPrice(activePhone.price)}
                </span>
                {activePhone.oldPrice && (
                  <span className="text-sm text-gray-400 line-through dark:text-gray-500">
                    {formatPrice(activePhone.oldPrice)}
                  </span>
                )}
              </div>

              {activePhone.colors?.length > 0 && (
                <div className="mt-4 flex gap-2">
                  {activePhone.colors.map((color, i) => (
                    <span
                      key={i}
                      className="h-6 w-6 cursor-pointer rounded-full border-2 border-white shadow ring-1 ring-gray-300 transition hover:scale-110 dark:border-gray-800 dark:ring-gray-600"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              )}

              <div className="mt-6 flex gap-2.5">
                <button
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                  onClick={() => {
                    onAddToCart(activePhone);
                    setActivePhone(null);
                  }}
                  type="button"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to cart
                </button>
                <Link
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  onClick={() => setActivePhone(null)}
                  to={`/product/${activePhone.id}`}
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
