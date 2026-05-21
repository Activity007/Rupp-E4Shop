import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BatteryCharging,
  Camera,
  Check,
  Eye,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  Zap,
} from "lucide-react";
import ProductGrid from "../components/ProductGrid.jsx";

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(price);
}

export default function SingleProduct({
  loading,
  onAddToCart,
  onQuickView,
  products,
}) {
  const { productId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const product = products.find((item) => String(item.id) === String(productId));
  const relatedProducts = product
    ? products
        .filter(
          (item) =>
            item.category === product.category && item.id !== product.id,
        )
        .slice(0, 4)
    : [];

  if (loading) {
    return <p className="empty-state">Loading product detail from API...</p>;
  }

  if (!product) {
    return (
      <div className="container mt-5">
        <p className="empty-state">Product not found.</p>
        <Link className="btn btn-primary" to="/">
          Back home
        </Link>
      </div>
    );
  }

  const images = product.images?.length
    ? product.images
    : [product.image, product.image, product.image];
  const activeImage = images[selectedImage] || images[0];

  if (product.category === "phone") {
    return (
      <div className="mx-auto w-full max-w-7xl space-y-10 px-3 pb-12 text-white sm:px-4 lg:px-0">
        <section className="phone-aurora phone-glow phone-reveal phone-shine relative overflow-hidden rounded-[2rem] bg-[#08111f] px-5 py-8 shadow-2xl shadow-cyan-950/20 sm:px-8 lg:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.28),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(251,146,60,0.22),transparent_28%)]" />
          <div className="absolute right-8 top-8 h-32 w-32 animate-pulse rounded-full border border-cyan-200/15" />

          <div className="relative mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              className="inline-flex w-fit items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-cyan-100 transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-slate-950"
              to="/phone"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to phones
            </Link>
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-sm font-black text-slate-950">
              <Sparkles className="h-4 w-4" />
              Phone detail
            </div>
          </div>

          <div className="relative grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div className="grid gap-4 lg:grid-cols-[88px_1fr]">
              <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col lg:overflow-visible">
                {images.slice(0, 4).map((image, index) => (
                  <button
                    className={`h-20 w-20 flex-none overflow-hidden rounded-2xl border-2 bg-white/10 p-1 transition duration-300 hover:-translate-y-1 ${
                      selectedImage === index
                        ? "border-cyan-300 shadow-lg shadow-cyan-950/30"
                        : "border-white/15"
                    }`}
                    key={`${image}-${index}`}
                    onClick={() => setSelectedImage(index)}
                    type="button"
                  >
                    <img
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="h-full w-full rounded-xl object-cover"
                      src={image}
                    />
                  </button>
                ))}
              </div>

              <div className="phone-soft-float order-1 overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/30 lg:order-2">
                <div className="relative h-[420px] overflow-hidden rounded-[1.5rem] bg-slate-950">
                  <img
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    src={activeImage}
                  />
                  <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-950 backdrop-blur">
                    {product.brand}
                  </div>
                </div>
              </div>
            </div>

            <div className="phone-reveal rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur lg:p-8 [animation-delay:120ms]">
              <p className="text-sm font-black uppercase text-cyan-200">
                Premium smartphone
              </p>
              <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-4 text-base leading-8 text-slate-200">
                {product.description}
              </p>

              <div className="mt-6 flex flex-wrap items-end gap-4">
                <p className="text-4xl font-black text-white">
                  {formatPrice(product.price)}
                </p>
                <p className="pb-1 text-base font-bold text-slate-400 line-through">
                  {formatPrice(product.oldPrice)}
                </p>
                <span className="mb-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-black text-orange-700">
                  Save{" "}
                  {formatPrice(
                    Math.max((product.oldPrice || 0) - product.price, 0),
                  )}
                </span>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Camera, label: "Camera", value: "Sharp shots" },
                  { icon: BatteryCharging, label: "Battery", value: "All day" },
                  { icon: ShieldCheck, label: "Support", value: "Trusted" },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    className="rounded-2xl border border-white/10 bg-white/10 p-4 transition duration-300 hover:-translate-y-1 hover:bg-white/15"
                    key={label}
                  >
                    <Icon className="h-5 w-5 text-cyan-200" />
                    <p className="mt-2 text-sm font-black">{label}</p>
                    <p className="text-xs text-slate-300">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7">
                <p className="text-xs font-black uppercase text-slate-300">
                  Colors
                </p>
                <div className="mt-3 flex gap-2">
                  {product.colors?.map((color) => (
                    <span
                      className="h-10 w-10 rounded-full border-2 border-white shadow-lg"
                      key={color}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 shadow-lg shadow-cyan-950/30 transition duration-300 hover:-translate-y-1 hover:bg-white"
                  onClick={() => onAddToCart(product)}
                  type="button"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to cart
                </button>
                <Link
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-slate-950"
                  to="/phone"
                >
                  Keep shopping
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Truck, title: "Fast delivery", text: "Ready for quick checkout." },
            { icon: Zap, title: "Smooth speed", text: "Picked for daily performance." },
            { icon: Check, title: "Easy choice", text: "Clear specs and pricing." },
          ].map(({ icon: Icon, title, text }, index) => (
            <div
              className="phone-reveal rounded-3xl border border-white/10 bg-white p-5 text-slate-950 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/10"
              key={title}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-lg font-black">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
            </div>
          ))}
        </section>

        {relatedProducts.length > 0 && (
          <section>
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-black uppercase text-cyan-300">
                  More phones
                </p>
                <h2 className="text-3xl font-black">Related picks</h2>
              </div>
              <Link
                className="inline-flex w-fit items-center rounded-2xl border border-white/15 px-4 py-2 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-white hover:text-slate-950"
                to="/phone"
              >
                View all phones
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {relatedProducts.map((item, index) => (
                <article
                  className="phone-reveal group overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-950 shadow-sm transition duration-500 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-2xl hover:shadow-cyan-950/10"
                  key={item.id}
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <div className="h-56 overflow-hidden bg-slate-100">
                    <img
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      src={item.image}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-black">{item.name}</h3>
                    <p className="mt-1 text-sm font-black text-cyan-700">
                      {formatPrice(item.price)}
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Link
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700"
                        to={`/product/${item.id}`}
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Link>
                      <button
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-cyan-700"
                        onClick={() => onAddToCart(item)}
                        type="button"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        Add
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <section className="row p-3 m-0 product-detail">
        <div className="col-lg-5 p-0 m-0 shadow-sm">
          <div
            className="carousel carousel-dark slide"
            data-bs-ride="carousel"
            id="productCarousel"
          >
            <div className="carousel-inner carousel-customize">
              {images.slice(0, 4).map((image, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  data-bs-interval="4000"
                  key={`${image}-${index}`}
                >
                  <img
                    alt={`${product.name} ${index + 1}`}
                    className="d-block w-100"
                    src={image}
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              data-bs-slide="prev"
              data-bs-target="#productCarousel"
              type="button"
            >
              <span aria-hidden="true" className="carousel-control-prev-icon" />
            </button>
            <button
              className="carousel-control-next"
              data-bs-slide="next"
              data-bs-target="#productCarousel"
              type="button"
            >
              <span aria-hidden="true" className="carousel-control-next-icon" />
            </button>
          </div>
          <div className="row p-2 m-0 mt-3">
            {images.slice(0, 4).map((image, index) => (
              <button
                className="col-3 small-product"
                data-bs-slide-to={index}
                data-bs-target="#productCarousel"
                key={`${image}-${index}`}
                type="button"
              >
                <img
                  alt={`${product.name} thumbnail ${index + 1}`}
                  src={image}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="col-lg-7">
          <div className="card border-0 rounded-0 shadow-sm p-3 product-info">
            <h4>{product.name}</h4>
            <p>
              <span className="badge bg-success">${product.price}</span> for
              sale
            </p>
            <p>{product.description}</p>
            <div className="d-flex align-items-center my-3">
              <h5>Quantity:</h5>
              <div className="qty-control my-2 mx-4">
                <button type="button">-</button>
                <input readOnly type="text" value="1" />
                <button type="button">+</button>
              </div>
            </div>
            <div className="d-flex align-items-center mt-2">
              <h5 className="opacity-75">Color:</h5>
              <div className="row p-0 ps-3">
                {product.colors.map((color) => (
                  <span
                    className="color"
                    key={color}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div className="d-flex align-items-center mt-3">
              <h5 className="opacity-75">Category:</h5>
              <p className="ms-4 mt-3 text-capitalize">{product.category}</p>
            </div>
            <div className="d-flex align-items-center">
              <h5 className="opacity-75">Brand:</h5>
              <p className="ms-4 mt-3">{product.brand}</p>
            </div>
            <button
              className="btn btn-primary detail-add-cart"
              onClick={() => onAddToCart(product)}
              type="button"
            >
              Add to cart
            </button>
          </div>
        </div>
      </section>

      <section className="all-product my-5">
        <h2 className="text-center mb-5">
          <u>Related products</u>
        </h2>
        <ProductGrid
          onAddToCart={onAddToCart}
          onQuickView={onQuickView}
          products={relatedProducts}
        />
      </section>
    </div>
  );
}
