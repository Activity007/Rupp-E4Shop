import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(price);
}

function StarRating({ rating = 4.8 }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
      <span className="text-xs font-semibold text-amber-600">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function ProductCard({ product, onQuickView, onAddToCart }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const saving = Math.max((product.oldPrice ?? 0) - product.price, 0);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[color:var(--shop-border)] bg-[color:var(--shop-card)] transition duration-200 hover:-translate-y-1 hover:border-[color:var(--shop-border-mid)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100 p-4">
        <Link to={`/product/${product.id}`}>
          <img
            alt={product.name}
            className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.02]"
            src={product.image}
          />
        </Link>

        <div className="absolute left-3 top-3 z-10 rounded-full border border-white/70 bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-gray-600 backdrop-blur-sm">
          {product.brand}
        </div>

        <button
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className={`absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border backdrop-blur-sm transition ${
            isFavorite
              ? "border-rose-200 bg-rose-50 text-rose-500"
              : "border-white/60 bg-white/90 text-gray-400 hover:text-rose-400"
          }`}
          onClick={() => setIsFavorite((current) => !current)}
          type="button"
        >
          <Heart
            className={`h-3.5 w-3.5 ${isFavorite ? "fill-rose-500" : ""}`}
          />
        </button>

        <div className="absolute inset-0 z-10 flex items-end justify-center pb-4 opacity-0 transition duration-200 group-hover:opacity-100">
          <button
            className="inline-flex items-center gap-1.5 rounded-xl border border-[color:var(--shop-border)] bg-[color:var(--shop-card)] px-4 py-2 text-xs font-semibold text-[color:var(--shop-ink)] backdrop-blur-sm transition hover:bg-[color:var(--shop-surface)]"
            onClick={() => onQuickView(product)}
            type="button"
          >
            <Eye className="h-3.5 w-3.5" />
            Quick view
          </button>
        </div>

        {saving > 0 && (
          <div className="absolute bottom-3 right-3 z-10 rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-accent-soft)] px-2 py-0.5 text-[10px] font-semibold text-[color:var(--shop-accent)]">
            Save {formatPrice(saving)}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            {product.category ?? "Product"}
          </span>
          <StarRating rating={product.rating ?? 4.8} />
        </div>

        <h3 className="text-sm font-semibold leading-snug text-gray-900">
          <Link
            className="transition hover:text-indigo-600"
            to={`/product/${product.id}`}
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-0.5 text-xs text-gray-400">
          By <span className="text-gray-500">{product.seller ?? product.brand}</span>
        </p>

        {product.colors?.length > 0 && (
          <div className="mt-3 flex gap-1.5">
            {product.colors.slice(0, 4).map((color, index) => (
              <span
                className="h-3.5 w-3.5 rounded-full border-2 border-[color:var(--shop-card)] ring-[0.5px] ring-[color:var(--shop-border)]"
                key={index}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {formatPrice(product.price)}
            </p>
            {product.oldPrice && (
              <p className="text-xs text-gray-400 line-through">
                {formatPrice(product.oldPrice)}
              </p>
            )}
          </div>
          <button
            className="inline-flex items-center gap-1.5 rounded-xl bg-[color:var(--shop-accent)] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[color:var(--shop-accent-hover)] active:scale-95"
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
}
