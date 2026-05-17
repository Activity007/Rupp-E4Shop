import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ products, onAddToCart, onQuickView }) {
  if (products.length === 0) {
    return <p className="empty-state">No products found.</p>;
  }

  return (
    <div className="all-product">
      <div className="row p-0 m-0">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
