import { priceRanges } from "../data/filterOptions.js";

export default function ProductFilters({
  brands,
  selectedBrand,
  selectedPrice,
  onBrandChange,
  onPriceChange,
}) {
  return (
    <aside className="col-lg-3 col-md-4 col-12 pe-lg-3 pe-md-3 pe-0 product-page">
      <div className="filter-panel mb-3">
        <div className="filter-title">Brand</div>
        <div className="filter-body">
          <label className="form-check">
            <input
              checked={selectedBrand === "all"}
              className="form-check-input"
              name="brand"
              onChange={() => onBrandChange("all")}
              type="radio"
            />
            <span>All brands</span>
          </label>
          {brands.map((brand) => (
            <label className="form-check" key={brand}>
              <input
                checked={selectedBrand === brand}
                className="form-check-input"
                name="brand"
                onChange={() => onBrandChange(brand)}
                type="radio"
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-panel mb-3">
        <div className="filter-title">Price</div>
        <div className="filter-body">
          <label className="form-check">
            <input
              checked={selectedPrice === "all"}
              className="form-check-input"
              name="price"
              onChange={() => onPriceChange("all")}
              type="radio"
            />
            <span>All prices</span>
          </label>
          {priceRanges.map((range) => (
            <label className="form-check" key={range.label}>
              <input
                checked={selectedPrice === range.label}
                className="form-check-input"
                name="price"
                onChange={() => onPriceChange(range.label)}
                type="radio"
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
