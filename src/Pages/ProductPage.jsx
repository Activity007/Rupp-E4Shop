import { useMemo, useState } from "react";
import ProductFilters, { priceRanges } from "../components/ProductFilters.jsx";
import ProductGrid from "../components/ProductGrid.jsx";

export default function ProductPage({
  category,
  loading,
  onAddToCart,
  onQuickView,
  products,
  title,
}) {
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("new");

  const categoryProducts = useMemo(
    () => products.filter((product) => product.category === category),
    [category, products],
  );

  const brands = useMemo(
    () => [...new Set(categoryProducts.map((product) => product.brand))],
    [categoryProducts],
  );

  const filteredProducts = useMemo(() => {
    const priceRange = priceRanges.find(
      (range) => range.label === selectedPrice,
    );

    return categoryProducts
      .filter(
        (product) => selectedBrand === "all" || product.brand === selectedBrand,
      )
      .filter(
        (product) =>
          !priceRange ||
          (product.price >= priceRange.min && product.price <= priceRange.max),
      )
      .sort((a, b) => {
        if (sortBy === "low") {
          return a.price - b.price;
        }

        if (sortBy === "high") {
          return b.price - a.price;
        }

        return b.id - a.id;
      });
  }, [categoryProducts, selectedBrand, selectedPrice, sortBy]);

  return (
    <div className="container product-list-page mt-4">
      <div className="row p-0 m-0">
        <div className="col-12 product-list-header">
          <h2 className="page-title">{title}</h2>
          <select
            className="form-select sort-select"
            onChange={(event) => setSortBy(event.target.value)}
            value={sortBy}
          >
            <option value="new">New product</option>
            <option value="low">Low price</option>
            <option value="high">High price</option>
          </select>
        </div>

        <ProductFilters
          brands={brands}
          onBrandChange={setSelectedBrand}
          onPriceChange={setSelectedPrice}
          selectedBrand={selectedBrand}
          selectedPrice={selectedPrice}
        />

        <section className="col-lg-9 col-md-8 col-12 p-0 m-0">
          {loading ? (
            <p className="empty-state">Loading products from API...</p>
          ) : (
            <ProductGrid
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              products={filteredProducts}
            />
          )}
        </section>
      </div>
    </div>
  );
}
