import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ products, onAddToCart, onQuickView }) {
  if (products.length === 0) {
    return <p className="empty-state">No products found.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          onAddToCart={onAddToCart}
          onQuickView={onQuickView}
          product={product}
        />
      ))}
    </div>
  );
}
