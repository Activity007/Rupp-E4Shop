import { Link } from "react-router-dom";
import { ShoppingBag, X } from "lucide-react";

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(price);
}

export default function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      role="presentation"
      onClick={onClose}
    >
      <div
        aria-modal="true"
        className="relative grid w-full max-w-2xl overflow-hidden rounded-2xl border border-[color:var(--shop-border)] bg-[color:var(--shop-card)] text-[color:var(--shop-ink)] sm:grid-cols-2"
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-card)] text-[color:var(--shop-ink-light)] transition hover:bg-[color:var(--shop-surface)]"
          onClick={onClose}
          type="button"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <div className="flex h-56 items-center justify-center bg-[color:var(--shop-surface)] p-6 sm:h-auto">
          <img
            alt={product.name}
            className="max-h-full max-w-full object-contain"
            src={product.image}
          />
        </div>

        <div className="flex flex-col p-6">
          <span className="mb-2 self-start rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--shop-ink-mid)]">
            {product.brand}
          </span>

          <h3 className="text-xl font-semibold text-[color:var(--shop-ink)]">
            {product.name}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-[color:var(--shop-ink-mid)]">
            {product.description ??
              "Premium tech product with reliable performance, clean design, and everyday usability."}
          </p>

          <div className="mt-4 flex items-baseline gap-2.5">
            <span className="text-2xl font-semibold text-[color:var(--shop-ink)]">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-[color:var(--shop-ink-light)] line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {product.colors?.length > 0 && (
            <div className="mt-4 flex gap-2">
              {product.colors.map((color, index) => (
                <span
                  className="h-6 w-6 cursor-pointer rounded-full border-2 border-[color:var(--shop-card)] ring-1 ring-[color:var(--shop-border)] transition hover:scale-110"
                  key={index}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}

          <div className="mt-6 flex gap-2.5">
            <button
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[color:var(--shop-accent)] py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--shop-accent-hover)]"
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              type="button"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to cart
            </button>
            <Link
              className="inline-flex items-center justify-center rounded-xl border border-[color:var(--shop-border)] px-5 py-2.5 text-sm font-semibold text-[color:var(--shop-ink-mid)] transition hover:bg-[color:var(--shop-surface)] hover:text-[color:var(--shop-ink)]"
              onClick={onClose}
              to={`/product/${product.id}`}
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
