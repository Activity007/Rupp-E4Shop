import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  Zap,
  Shield,
} from "lucide-react";

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(price || 0);
}

export default function SingleProduct({
  loading,
  onAddToCart,
  products,
}) {
  const { productId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find(
    (item) => String(item.id) === String(productId),
  );

  const relatedProducts = product
    ? products
        .filter(
          (item) =>
            item.category === product.category && item.id !== product.id,
        )
        .slice(0, 4)
    : [];

  if (loading) {
    return (
      <div className="flex min-h-[600px] items-center justify-center bg-slate-50 dark:bg-[#090e1a]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900 dark:border-slate-700 dark:border-[#3839af]" />
          <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
            Loading product information...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-semibold text-slate-900 dark:text-white">
          We couldn't find that product.
        </p>
        <Link
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-[#3839af]/80 dark:text-slate-950 dark:hover:bg-[#3839af]/70"
          to="/"
        >
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const images = product.images?.length
    ? product.images
    : [product.image, product.image, product.image].filter(Boolean);
  const activeImage = images[selectedImage] || product.image;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16 antialiased text-slate-900 transition-colors duration-200 dark:bg-[#090e1a] dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav className="mb-8">
          <Link
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 dark:border-white/10 dark:bg-[#121b2e] dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            to={product.category === "phone" ? "/phone" : "/"}
          >
            <ArrowLeft className="h-4 w-4 text-slate-400 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-white" />
            Back to Catalog
          </Link>
        </nav>

        {/* Product Workspace Grid */}
        <section className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Premium Media Showcase */}
          <div className="grid gap-4 lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-sm lg:aspect-square dark:border-white/10 dark:bg-[#121b2e]">
              <img
                alt={product.name}
                className="h-full w-full object-contain p-6 lg:p-12 mix-blend-normal dark:brightness-95"
                src={activeImage}
              />
              {product.brand && (
                <span className="absolute left-6 top-6 rounded-full border border-slate-200/80 bg-white/90 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-800 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-slate-950/80 dark:text-slate-200">
                  {product.brand}
                </span>
              )}
            </div>

            {/* Thumbnail Navigation Strip */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-1">
                {images.slice(0, 4).map((image, index) => (
                  <button
                    className={`aspect-square h-20 flex-none overflow-hidden rounded-2xl border-2 bg-white p-1.5 transition dark:bg-[#121b2e] ${
                      selectedImage === index
                        ? "border-slate-900 ring-2 ring-slate-900/10 dark:border-[#3839af]/50 dark:ring-[#3839af]/25"
                        : "border-slate-200 hover:border-slate-400 dark:border-white/10 dark:hover:border-slate-500"
                    }`}
                    key={`${image}-${index}`}
                    onClick={() => setSelectedImage(index)}
                    type="button"
                  >
                    <img
                      alt={`${product.name} segment ${index + 1}`}
                      className="h-full w-full rounded-xl object-cover"
                      src={image}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Structured Details Panel */}
          <div className="flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 lg:col-span-5 dark:border-white/10 dark:bg-[#121b2e]">
            <div>
              <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#3839af]/70 dark:text-[#3839af]">
                {product.category || "General Gear"}
              </span>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                {product.name}
              </h1>
            </div>

            {/* Price Metric Row */}
            <div className="mt-5 flex items-baseline gap-3 border-b border-slate-100 pb-5 dark:border-white/5">
              <span className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && product.oldPrice > product.price && (
                <>
                  <span className="text-lg font-medium text-slate-400 line-through dark:text-slate-500">
                    {formatPrice(product.oldPrice)}
                  </span>
                  <span className="rounded-full bg-orange-50 border border-orange-200/60 px-2.5 py-0.5 text-xs font-extrabold text-orange-700 dark:bg-orange-500/10 dark:border-orange-500/30 dark:text-orange-400">
                    Save {formatPrice(product.oldPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Product Meta Specifications Segment */}
            <div className="mt-5 space-y-4">
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  Overview
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {product.description}
                </p>
              </div>

              {/* Color Configuration Switcher */}
              {product.colors && product.colors.length > 0 && (
                <div className="pt-2">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    Finish Options
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {product.colors.map((color, index) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(index)}
                        className={`group relative flex h-9 w-9 items-center justify-center rounded-full border-2 p-0.5 transition ${
                          selectedColor === index
                            ? "border-slate-900 scale-105 dark:border-[#3839af]"
                            : "border-slate-200 dark:border-white/10"
                        }`}
                      >
                        <span
                          className="block h-full w-full rounded-full border border-black/10 dark:border-white/10"
                          style={{ backgroundColor: color }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Counter Input Blocks */}
              <div className="pt-2">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  Select Quantity
                </h3>
                <div className="mt-3 inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-white/10 dark:bg-slate-900/50">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-200/60 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <input
                    readOnly
                    type="text"
                    value={quantity}
                    className="w-12 bg-transparent text-center text-sm font-bold text-slate-900 focus:outline-none dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-200/60 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Purchase Execution Block */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5">
              <button
                className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/10 transition hover:bg-slate-800 active:scale-[0.99] dark:bg-[#3839af] dark:text-slate-950 dark:shadow-cyan-500/5 dark:hover:bg-[#3839af]"
                onClick={() => onAddToCart({ ...product, quantity })}
                type="button"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </section>

        {/* Feature Value Stream Row */}
        <section className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Truck,
              title: "On-Demand Shipping",
              text: "Expedited processing routes optimized directly for quick fulfillment.",
            },
            {
              icon: Zap,
              title: "Engineered Architecture",
              text: "Finely tuned structure designed purposefully for rigorous daily performance.",
            },
            {
              icon: Shield,
              title: "Extended Security",
              text: "Complete protection protocols verified through secure transaction guarantees.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#121b2e]"
              key={title}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-[#3839af]">
                <Icon className="h-4 w-4" />
              </span>
              <h2 className="mt-4 text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                {title}
              </h2>
              <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                {text}
              </p>
            </div>
          ))}
        </section>

        {/* Recommendation Grid Block */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 border-t border-slate-200 pt-12 dark:border-white/10">
            <div className="mb-8">
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-800 dark:text-cyan-400">
                Handpicked Network
              </span>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Related Discoveries
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              {relatedProducts.map((item) => (
                <article
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:border-slate-300 dark:border-white/10 dark:bg-[#121b2e] dark:hover:border-slate-700"
                  key={item.id}
                >
                  <div className="aspect-square w-full overflow-hidden rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-900/50 dark:border-white/5">
                    <img
                      alt={item.name}
                      className="h-full w-full object-contain p-4 dark:brightness-95"
                      src={item.image}
                    />
                  </div>
                  <div className="flex flex-1 flex-col pt-4">
                    <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm font-extrabold text-blue-800 dark:text-cyan-400">
                      {formatPrice(item.price)}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Link
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-[#090e1a] dark:text-slate-300 dark:hover:bg-slate-800"
                        to={`/product/${item.id}`}
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Explore
                      </Link>
                      <button
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800 dark:bg-[#3839af] dark:text-slate-950 dark:hover:bg-[#3839af]/90"
                        onClick={() => onAddToCart(item)}
                        type="button"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        Grab
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
