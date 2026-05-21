import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownUp,
  BatteryCharging,
  Camera,
  Check,
  Eye,
  Filter,
  Heart,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

const priceRanges = [
  { label: "All prices", value: "all", min: 0, max: Infinity },
  { label: "$150 - $500", value: "mid", min: 150, max: 500 },
  { label: "$500 - $900", value: "premium", min: 500, max: 900 },
  { label: "$900+", value: "ultra", min: 900, max: Infinity },
];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Lowest price", value: "low" },
  { label: "Highest price", value: "high" },
  { label: "A to Z", value: "az" },
];

const highlights = [
  {
    icon: Camera,
    label: "Pro cameras",
    value: "Night mode ready",
  },
  {
    icon: BatteryCharging,
    label: "Long battery",
    value: "All-day power",
  },
  {
    icon: ShieldCheck,
    label: "Trusted picks",
    value: "Warranty support",
  },
];

function PhoneSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          key={item}
        >
          <div className="h-56 animate-pulse rounded-2xl bg-slate-100" />
          <div className="mt-5 h-4 w-2/3 animate-pulse rounded-full bg-slate-100" />
          <div className="mt-3 h-3 w-full animate-pulse rounded-full bg-slate-100" />
          <div className="mt-2 h-3 w-4/5 animate-pulse rounded-full bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(price);
}

export default function PhoneProducts({
  loading,
  onAddToCart,
  products,
}) {
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [activePhone, setActivePhone] = useState(null);

  const phoneProducts = useMemo(
    () => products.filter((product) => product.category === "phone"),
    [products],
  );

  const brands = useMemo(
    () => ["all", ...new Set(phoneProducts.map((product) => product.brand))],
    [phoneProducts],
  );

  const filteredProducts = useMemo(() => {
    const range = priceRanges.find((price) => price.value === selectedPrice);

    return [...phoneProducts]
      .filter(
        (product) => selectedBrand === "all" || product.brand === selectedBrand,
      )
      .filter(
        (product) =>
          !range || (product.price >= range.min && product.price <= range.max),
      )
      .sort((a, b) => {
        if (sortBy === "low") {
          return a.price - b.price;
        }

        if (sortBy === "high") {
          return b.price - a.price;
        }

        if (sortBy === "az") {
          return a.name.localeCompare(b.name);
        }

        return 0;
      });
  }, [phoneProducts, selectedBrand, selectedPrice, sortBy]);

  const heroProduct = phoneProducts[0];
  const averagePrice =
    phoneProducts.length > 0
      ? Math.round(
          phoneProducts.reduce((total, product) => total + product.price, 0) /
            phoneProducts.length,
        )
      : 0;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-3 pb-12 text-slate-950 sm:px-4 lg:px-0">
      <section className="phone-aurora phone-glow phone-reveal phone-shine relative isolate overflow-hidden rounded-[2rem] bg-[#08111f] px-5 py-10 text-white shadow-2xl shadow-cyan-950/20 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(34,211,238,0.32),transparent_28%),radial-gradient(circle_at_88%_20%,rgba(251,146,60,0.28),transparent_30%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(8,17,31,0.98))]" />
        <div className="absolute -right-20 top-10 h-60 w-60 animate-pulse rounded-full border border-cyan-300/20" />
        <div className="absolute bottom-8 left-8 hidden h-24 w-24 animate-bounce rounded-full border border-orange-300/30 lg:block" />

        <div className="relative grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <div className="phone-soft-float inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              New season phone collection
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Find the phone that feels fast before you even tap it.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              Fresh smartphones, smooth performance, sharp cameras, and clean
              prices in one focused phone shop.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="inline-flex items-center gap-2 rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-extrabold text-slate-950 shadow-lg shadow-cyan-950/30 transition duration-300 hover:-translate-y-1 hover:bg-white"
                href="#phone-grid"
              >
                <ShoppingBag className="h-4 w-4" />
                Shop phones
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/20"
                href="#phone-filters"
              >
                <Filter className="h-4 w-4" />
                Tune filters
              </a>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {highlights.map(({ icon: Icon, label, value }, index) => (
                <div
                  className="phone-reveal rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/15"
                  key={label}
                  style={{ animationDelay: `${index * 120 + 120}ms` }}
                >
                  <Icon className="h-5 w-5 text-cyan-200" />
                  <p className="mt-3 text-sm font-bold">{label}</p>
                  <p className="mt-1 text-xs text-slate-300">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[420px]">
            <div className="absolute inset-x-6 top-14 h-72 rounded-full bg-cyan-300/20 blur-3xl" />
            <div className="relative mx-auto flex h-[420px] max-w-sm items-center justify-center">
              <div className="absolute h-72 w-72 animate-pulse rounded-full border border-white/15" />
              <div className="phone-float absolute h-96 w-52 rounded-[2.5rem] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/40 backdrop-blur transition duration-700 hover:[animation-play-state:paused]">
                <div className="h-full overflow-hidden rounded-[2rem] bg-slate-950">
                  {heroProduct?.image && (
                    <img
                      alt={heroProduct.name}
                      className="h-full w-full object-cover opacity-95"
                      src={heroProduct.image}
                    />
                  )}
                  <div className="absolute inset-x-8 bottom-10 rounded-2xl border border-white/15 bg-black/45 p-4 backdrop-blur-md">
                    <p className="text-xs font-bold uppercase text-cyan-200">
                      Featured pick
                    </p>
                    <p className="mt-1 text-lg font-black">
                      {heroProduct?.name || "Phone collection"}
                    </p>
                    <p className="text-sm font-bold text-orange-200">
                      {heroProduct ? formatPrice(heroProduct.price) : "Ready"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="phone-soft-float absolute left-0 top-12 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
                <p className="text-xs text-slate-300">Phones</p>
                <p className="text-2xl font-black">{phoneProducts.length}</p>
              </div>
              <div className="phone-soft-float absolute bottom-16 right-0 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur [animation-delay:1.2s]">
                <p className="text-xs text-slate-300">Avg price</p>
                <p className="text-2xl font-black">
                  {averagePrice ? formatPrice(averagePrice) : "$0"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="phone-reveal grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/70 lg:grid-cols-[1fr_auto_auto]"
        id="phone-filters"
      >
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase text-slate-500">
            <Filter className="h-4 w-4" />
            Brand
          </div>
          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => (
              <button
                className={`rounded-2xl border px-4 py-2 text-sm font-bold transition duration-300 ${
                  selectedBrand === brand
                    ? "border-cyan-400 bg-cyan-300 text-slate-950 shadow-md shadow-cyan-200"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
                }`}
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                type="button"
              >
                {brand === "all" ? "All brands" : brand}
              </button>
            ))}
          </div>
        </div>

        <label className="block min-w-48">
          <span className="mb-3 flex items-center gap-2 text-sm font-black uppercase text-slate-500">
            <Zap className="h-4 w-4" />
            Budget
          </span>
          <select
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-cyan-400 focus:bg-white"
            onChange={(event) => setSelectedPrice(event.target.value)}
            value={selectedPrice}
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block min-w-48">
          <span className="mb-3 flex items-center gap-2 text-sm font-black uppercase text-slate-500">
            <ArrowDownUp className="h-4 w-4" />
            Sort
          </span>
          <select
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-cyan-400 focus:bg-white"
            onChange={(event) => setSortBy(event.target.value)}
            value={sortBy}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="grid gap-8 lg:grid-cols-[260px_1fr]" id="phone-grid">
        <aside className="phone-reveal phone-glow h-fit rounded-3xl bg-slate-950 p-5 text-white shadow-xl shadow-slate-200">
          <p className="text-sm font-black uppercase text-cyan-200">
            Phone finder
          </p>
          <h2 className="mt-2 text-2xl font-black">Built for daily speed.</h2>
          <div className="mt-6 space-y-4">
            {["Fast checkout", "Fresh phone picks", "Clean product preview"].map(
              (item) => (
                <div className="flex items-center gap-3" key={item}>
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-300 text-slate-950">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-slate-200">
                    {item}
                  </span>
                </div>
              ),
            )}
          </div>
        </aside>

        <div>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase text-cyan-300">
                {filteredProducts.length} phones available
              </p>
              <h2 className="text-3xl font-black text-white">
                Shop smartphones
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-300">
              Compare styles, prices, and quick actions without leaving the
              phone page.
            </p>
          </div>

          {loading ? (
            <PhoneSkeleton />
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <p className="text-lg font-black text-slate-900">
                No phones matched those filters.
              </p>
              <button
                className="mt-4 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-cyan-700"
                onClick={() => {
                  setSelectedBrand("all");
                  setSelectedPrice("all");
                }}
                type="button"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product, index) => (
                <article
                  className="phone-reveal group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-200/80 transition duration-500 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-2xl hover:shadow-cyan-100"
                  key={product.id}
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      src={product.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent opacity-70" />
                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-950 shadow-sm backdrop-blur">
                      {product.brand}
                    </div>
                    <button
                      aria-label={`Favorite ${product.name}`}
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-sm backdrop-blur transition hover:scale-110 hover:text-rose-500"
                      type="button"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-black leading-tight text-slate-950">
                          <Link
                            className="transition hover:text-cyan-700"
                            to={`/product/${product.id}`}
                          >
                            {product.name}
                          </Link>
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                          {product.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-slate-950">
                          {formatPrice(product.price)}
                        </p>
                        <p className="text-xs font-bold text-slate-400 line-through">
                          {formatPrice(product.oldPrice)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {product.colors?.slice(0, 3).map((color, index) => (
                          <span
                            className="h-7 w-7 rounded-full border-2 border-white shadow-sm"
                            key={`${product.id}-${color}-${index}`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <div className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-700">
                        Save{" "}
                        {formatPrice(
                          Math.max((product.oldPrice || 0) - product.price, 0),
                        )}
                      </div>
                    </div>

                    <div className="mt-5 grid gap-2 sm:grid-cols-2">
                      <button
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white transition duration-300 hover:-translate-y-1 hover:bg-cyan-700"
                        onClick={() => onAddToCart(product)}
                        type="button"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        Add
                      </button>
                      <button
                        aria-label={`Quick view ${product.name}`}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-700 transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:text-cyan-700"
                        onClick={() => setActivePhone(product)}
                        type="button"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {activePhone && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/75 px-4 py-6 backdrop-blur-md">
          <div
            aria-modal="true"
            className="phone-reveal relative grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-cyan-950/40 lg:grid-cols-[0.92fr_1.08fr]"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <button
              aria-label="Close phone preview"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md transition hover:scale-105 hover:bg-slate-950 hover:text-white"
              onClick={() => setActivePhone(null)}
              type="button"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative min-h-80 bg-slate-100">
              <img
                alt={activePhone.name}
                className="h-full min-h-80 w-full object-cover"
                src={activePhone.image}
              />
              <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-950 backdrop-blur">
                {activePhone.brand}
              </div>
            </div>

            <div className="overflow-y-auto p-6 sm:p-8">
              <p className="text-sm font-black uppercase text-cyan-700">
                Quick preview
              </p>
              <h3 className="mt-2 text-3xl font-black leading-tight text-slate-950">
                {activePhone.name}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {activePhone.description}
              </p>

              <div className="mt-6 flex flex-wrap items-end gap-4">
                <div>
                  <p className="text-xs font-black uppercase text-slate-400">
                    Price
                  </p>
                  <p className="text-3xl font-black text-slate-950">
                    {formatPrice(activePhone.price)}
                  </p>
                </div>
                <p className="pb-1 text-sm font-bold text-slate-400 line-through">
                  {formatPrice(activePhone.oldPrice)}
                </p>
                <span className="mb-1 rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-700">
                  Save{" "}
                  {formatPrice(
                    Math.max((activePhone.oldPrice || 0) - activePhone.price, 0),
                  )}
                </span>
              </div>

              <div className="mt-6">
                <p className="text-xs font-black uppercase text-slate-400">
                  Colors
                </p>
                <div className="mt-3 flex gap-2">
                  {activePhone.colors?.map((color, index) => (
                    <span
                      className="h-9 w-9 rounded-full border-2 border-white shadow ring-1 ring-slate-200"
                      key={`${activePhone.id}-preview-${color}-${index}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition duration-300 hover:-translate-y-1 hover:bg-cyan-700"
                  onClick={() => onAddToCart(activePhone)}
                  type="button"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to cart
                </button>
                <Link
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:text-cyan-700"
                  onClick={() => setActivePhone(null)}
                  to={`/product/${activePhone.id}`}
                >
                  View details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
