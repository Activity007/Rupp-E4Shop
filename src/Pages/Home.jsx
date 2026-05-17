import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/product.js";
import { ArrowUpRight, ShoppingCart, Eye } from "lucide-react";

/* ─── Breakpoint hook ───────────────────────────────────────────────────── */
// sm < 640  |  md 640–1023  |  lg 1024+
function useBreakpoint() {
  const get = () => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    if (w < 640) return "sm";
    if (w < 1024) return "md";
    return "lg";
  };
  const [bp, setBp] = useState(get);
  useEffect(() => {
    const fn = () => setBp(get());
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return bp;
}

/* ─── Slides ────────────────────────────────────────────────────────────── */
const SLIDES = [
  {
    src: "https://www.zdnet.com/a/img/2024/09/24/fe5ec4b2-dd6e-45b7-9f9e-efc043ca5523/dsc02537.jpg",
    alt: "Phone banner",
    tag: "New Arrival",
    label: "Mobile",
    title: "Next-Gen\nSmartphones",
    subtitle: "Raw power. Refined design. Yours.",
    cta: "Shop Phones",
    accent: "#3B5BDB",
  },
  {
    src: "https://rotarywatches.com/cdn/shop/files/Rotary_seamatic_yellow_dial_desktop_banner.png?v=1729177044&width=3200",
    alt: "Watch banner",
    tag: "Bestseller",
    label: "Wearables",
    title: "Elite\nWristwear",
    subtitle: "Precision crafted for every moment.",
    cta: "Shop Watches",
    accent: "#C84B2F",
  },
  {
    src: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=80",
    alt: "Laptop banner",
    tag: "Editor's Pick",
    label: "Computing",
    title: "Pro\nLaptops",
    subtitle: "Built for creators, coders & beyond.",
    cta: "Shop Laptops",
    accent: "#2B9348",
  },
];

/* ─── Design tokens ─────────────────────────────────────────────────────── */
const T = {
  ink: "#1A1713",
  inkMid: "#4A4540",
  inkLight: "#9A948D",
  accent: "#C84B2F",
  border: "rgba(26,23,19,0.10)",
  borderMid: "rgba(26,23,19,0.22)",
  card: "#FFFFFF",
  surface: "#F0EDE8",
};

/* ─── Helpers ───────────────────────────────────────────────────────────── */
function Divider({ label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        marginBottom: 32,
      }}
    >
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: T.inkLight,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: T.border }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO SLIDER
═══════════════════════════════════════════════════════════════════════════ */
function Hero({ activeSlide, setActiveSlide, bp }) {
  const sm = bp === "sm";
  const md = bp === "md";
  const stacked = sm || md; // mobile + tablet: image fills full, text overlaid

  return (
    <div style={{ marginBottom: sm ? 44 : 68 }}>
      {/* ── Main panel ── */}
      <div
        style={{
          position: "relative",
          height: sm ? 440 : md ? 400 : 520,
          borderRadius: sm ? 16 : 22,
          overflow: "hidden",
          border: `1px solid ${T.border}`,
        }}
      >
        {/* Image layers */}
        {SLIDES.map((s, i) => (
          <div
            key={`img${i}`}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: stacked ? 0 : "50%",
              right: 0,
              overflow: "hidden",
              opacity: i === activeSlide ? 1 : 0,
              transform: i === activeSlide ? "scale(1)" : "scale(1.04)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <img
              src={s.src}
              alt={s.alt}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* Stacked mode: dark gradient so text is readable */}
            {stacked && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(8,6,4,0.9) 0%, rgba(8,6,4,0.25) 55%, transparent 100%)",
                }}
              />
            )}
            {/* Desktop: fade left edge to blend with text panel */}
            {!stacked && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(to right, ${T.card} 0%, transparent 22%)`,
                }}
              />
            )}
          </div>
        ))}

        {/* Text layers */}
        {SLIDES.map((s, i) => (
          <div
            key={`txt${i}`}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: stacked ? "100%" : "50%",
              padding: sm ? "24px 22px" : md ? "32px 36px" : "50px 46px",
              display: "flex",
              flexDirection: "column",
              justifyContent: stacked ? "flex-end" : "space-between",
              background: stacked ? "transparent" : T.card,
              opacity: i === activeSlide ? 1 : 0,
              transform:
                i === activeSlide ? "translateX(0)" : "translateX(-16px)",
              transition: "opacity 0.55s ease, transform 0.55s ease",
              pointerEvents: i === activeSlide ? "auto" : "none",
              zIndex: 3,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: sm ? 10 : 16,
              }}
            >
              {/* Tag row */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#fff",
                    background: s.accent,
                    padding: "4px 10px",
                    borderRadius: 4,
                  }}
                >
                  {s.tag}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: stacked ? "rgba(255,255,255,0.5)" : T.inkLight,
                  }}
                >
                  {s.label}
                </span>
              </div>

              {/* Title */}
              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: sm
                    ? "1.9rem"
                    : md
                      ? "2.3rem"
                      : "clamp(2.3rem, 3.2vw, 3.3rem)",
                  fontWeight: 700,
                  lineHeight: 1.08,
                  margin: 0,
                  letterSpacing: "-0.02em",
                  whiteSpace: "pre-line",
                  color: stacked ? "#fff" : T.ink,
                }}
              >
                {s.title}
              </h1>

              {/* Subtitle — hide on sm to keep it clean */}
              {!sm && (
                <p
                  style={{
                    fontSize: 14,
                    margin: 0,
                    lineHeight: 1.6,
                    maxWidth: 290,
                    color: stacked ? "rgba(255,255,255,0.65)" : T.inkMid,
                  }}
                >
                  {s.subtitle}
                </p>
              )}
            </div>

            {/* CTA */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginTop: sm ? 18 : 0,
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/shop"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: stacked ? "#fff" : T.ink,
                  color: stacked ? T.ink : "#fff",
                  padding: sm ? "10px 18px" : "12px 24px",
                  borderRadius: 100,
                  fontWeight: 700,
                  fontSize: 13,
                  textDecoration: "none",
                  letterSpacing: "0.03em",
                }}
              >
                {s.cta} <ArrowUpRight size={14} />
              </Link>
              {!sm && (
                <span
                  style={{
                    fontSize: 12,
                    color: stacked ? "rgba(255,255,255,0.45)" : T.inkLight,
                  }}
                >
                  Free shipping over $99
                </span>
              )}
            </div>
          </div>
        ))}

        {/* Dots */}
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            bottom: 18,
            ...(sm
              ? { left: "50%", transform: "translateX(-50%)" }
              : { right: 22 }),
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              style={{
                width: idx === activeSlide ? 28 : 8,
                height: 8,
                borderRadius: 4,
                border: "none",
                cursor: "pointer",
                padding: 0,
                background:
                  idx === activeSlide ? "#fff" : "rgba(255,255,255,0.38)",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>

        {/* Counter — md + lg only */}
        {!sm && (
          <div
            style={{
              position: "absolute",
              top: 18,
              right: 18,
              zIndex: 10,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.8)",
              background: "rgba(0,0,0,0.2)",
              backdropFilter: "blur(6px)",
              padding: "4px 12px",
              borderRadius: 100,
            }}
          >
            {String(activeSlide + 1).padStart(2, "0")} /{" "}
            {String(SLIDES.length).padStart(2, "0")}
          </div>
        )}
      </div>

      {/* Thumbnail strip — md + lg */}
      {!sm && (
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          {SLIDES.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              style={{
                flex: 1,
                height: md ? 58 : 70,
                borderRadius: 12,
                overflow: "hidden",
                border:
                  idx === activeSlide
                    ? `2px solid ${s.accent}`
                    : `1px solid ${T.border}`,
                cursor: "pointer",
                padding: 0,
                position: "relative",
                transition: "border-color 0.25s",
              }}
            >
              <img
                src={s.src}
                alt={s.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter:
                    idx === activeSlide
                      ? "none"
                      : "grayscale(55%) brightness(0.8)",
                  transition: "filter 0.3s",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 55%)",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CATEGORIES
═══════════════════════════════════════════════════════════════════════════ */
function Categories({ bp }) {
  const sm = bp === "sm";
  const md = bp === "md";

  return (
    <section style={{ marginBottom: sm ? 48 : 72 }}>
      <Divider label="Browse by category" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: sm
            ? "1fr"
            : md
              ? "repeat(2, 1fr)"
              : "repeat(4, 1fr)",
          gap: sm ? 10 : 14,
        }}
      >
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/${cat.id}`}
            style={{
              textDecoration: "none",
              color: T.ink,
              background: T.card,
              border: `1px solid ${T.border}`,
              borderRadius: sm ? 13 : 16,
              padding: sm ? 12 : 18,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              transition: "border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = T.borderMid;
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = T.border;
              e.currentTarget.style.transform = "none";
            }}
          >
            <div
              style={{
                aspectRatio: "4/3",
                borderRadius: 9,
                overflow: "hidden",
                background: T.surface,
              }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "saturate(0.75)",
                  transition: "transform 0.4s, filter 0.4s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.06)";
                  e.target.style.filter = "saturate(1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.filter = "saturate(0.75)";
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: sm ? 13 : 15,
                    fontWeight: 700,
                    margin: "0 0 1px",
                  }}
                >
                  {cat.name}
                </p>
                {!sm && (
                  <p style={{ fontSize: 12, color: T.inkLight, margin: 0 }}>
                    {cat.description}
                  </p>
                )}
              </div>
              <ArrowUpRight size={14} color={T.inkLight} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCT CARD
═══════════════════════════════════════════════════════════════════════════ */
function ProductCard({ product, onAddToCart, onQuickView, compact }) {
  const [hov, setHov] = useState(false);
  const disc = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: T.card,
        border: `1px solid ${hov ? T.borderMid : T.border}`,
        borderRadius: 14,
        overflow: "hidden",
        transition: "border-color 0.2s, transform 0.2s",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "1/1",
          overflow: "hidden",
          background: T.surface,
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hov ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.5s",
          }}
        />
        {disc && (
          <span
            style={{
              position: "absolute",
              top: 9,
              left: 9,
              background: T.accent,
              color: "#fff",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.06em",
              padding: "3px 7px",
              borderRadius: 4,
            }}
          >
            −{disc}%
          </span>
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(26,23,19,0.34)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            opacity: hov ? 1 : 0,
            transition: "opacity 0.25s",
          }}
        >
          <button
            onClick={() => onQuickView?.(product)}
            style={{
              width: compact ? 36 : 42,
              height: compact ? 36 : 42,
              borderRadius: 10,
              background: "#fff",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Eye size={compact ? 15 : 17} color={T.ink} />
          </button>
          <button
            onClick={() => onAddToCart(product)}
            style={{
              width: compact ? 36 : 42,
              height: compact ? 36 : 42,
              borderRadius: 10,
              background: T.accent,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShoppingCart size={compact ? 15 : 17} color="#fff" />
          </button>
        </div>
      </div>
      <div style={{ padding: compact ? "11px 13px 14px" : "14px 16px 18px" }}>
        <p
          style={{
            fontSize: compact ? 12 : 14,
            fontWeight: 600,
            margin: "0 0 4px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.name}
        </p>
        <div style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
          <span
            style={{
              fontSize: compact ? 14 : 16,
              fontWeight: 700,
              color: T.accent,
            }}
          >
            ${product.price}
          </span>
          {product.oldPrice && (
            <span
              style={{
                fontSize: 11,
                color: T.inkLight,
                textDecoration: "line-through",
              }}
            >
              ${product.oldPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CATEGORY SECTION
═══════════════════════════════════════════════════════════════════════════ */
function CategorySection({
  cat,
  idx,
  products,
  loading,
  onAddToCart,
  onQuickView,
  bp,
}) {
  const sm = bp === "sm";
  const md = bp === "md";

  const catProducts = products
    .filter((p) => p.category?.toLowerCase() === cat.id.toLowerCase())
    .slice(0, 4);
  if (catProducts.length === 0) return null;

  const Spinner = () => (
    <div
      style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}
    >
      <div
        style={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          border: `2px solid ${T.surface}`,
          borderTop: `2px solid ${T.accent}`,
          animation: "spin 0.8s linear infinite",
        }}
      />
    </div>
  );

  return (
    <div style={{ marginBottom: sm ? 48 : 60 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderBottom: `1px solid ${T.border}`,
          paddingBottom: 14,
          marginBottom: 22,
        }}
      >
        <div>
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: T.accent,
              display: "block",
              marginBottom: 3,
            }}
          >
            Index / 0{idx + 1}
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: sm ? 20 : 25,
              fontWeight: 700,
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            {cat.name}
          </h2>
        </div>
        <Link
          to={`/${cat.id}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontSize: 12,
            fontWeight: 600,
            color: T.inkMid,
            textDecoration: "none",
            border: `1px solid ${T.border}`,
            padding: sm ? "6px 12px" : "7px 16px",
            borderRadius: 100,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = T.ink;
            e.currentTarget.style.color = T.ink;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = T.border;
            e.currentTarget.style.color = T.inkMid;
          }}
        >
          {sm ? "All" : "View all"} <ArrowUpRight size={12} />
        </Link>
      </div>

      {/* sm: 1-col */}
      {sm && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
          {loading ? (
            <Spinner />
          ) : (
            catProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                compact
              />
            ))
          )}
        </div>
      )}

      {/* md: 2-col */}
      {md && (
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          {loading ? (
            <div style={{ gridColumn: "span 2" }}>
              <Spinner />
            </div>
          ) : (
            catProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))
          )}
        </div>
      )}

      {/* lg: 4-col */}
      {!sm && !md && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
        >
          {loading ? (
            <div style={{ gridColumn: "span 4" }}>
              <Spinner />
            </div>
          ) : (
            catProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════════════════ */
export default function Home({ loading, products, onAddToCart, onQuickView }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const bp = useBreakpoint();
  const sm = bp === "sm";

  useEffect(() => {
    const t = setInterval(
      () => setActiveSlide((p) => (p + 1) % SLIDES.length),
      6000,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;600;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        a { -webkit-tap-highlight-color: transparent; }
      `}</style>
      <main
        style={{
          minHeight: "100vh",
          color: T.ink,
          fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
          overflowX: "hidden",
        }}
      >
        <div
          style={{
            width: sm ? "92%" : "80%",
            margin: "0 auto",
            padding: sm ? "1.5rem 0 3.5rem" : "3rem 0 5rem",
          }}
        >
          <Hero
            activeSlide={activeSlide}
            setActiveSlide={setActiveSlide}
            bp={bp}
          />
          <Categories bp={bp} />

          <section>
            <Divider label="Product catalog" />
            {categories.map((cat, idx) => (
              <CategorySection
                key={cat.id}
                cat={cat}
                idx={idx}
                products={products}
                loading={loading}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                bp={bp}
              />
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
