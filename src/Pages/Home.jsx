import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/product.js";
import { ArrowUpRight, ShoppingCart, Eye, Heart } from "lucide-react"; // Added Heart icon

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
    to: "/phone",
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
    to: "/watch",
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
    to: "/computer",
  },
];

/* ─── Design tokens ─────────────────────────────────────────────────────── */
const T = {
  ink: "var(--shop-ink, #1F2937)",
  inkMid: "var(--shop-ink-mid, #4B5563)",
  inkLight: "var(--shop-ink-light, #9CA3AF)",
  accent: "#C84B2F",
  border: "var(--shop-border, #E5E7EB)",
  borderMid: "var(--shop-border-mid, #D1D5DB)",
  card: "var(--shop-card, #FFFFFF)",
  surface: "var(--shop-surface, #F9FAFB)",
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
  const stacked = sm || md;

  return (
    <div style={{ marginBottom: sm ? 44 : 68 }}>
      <div
        style={{
          position: "relative",
          height: sm ? 440 : md ? 400 : 520,
          borderRadius: sm ? 16 : 22,
          overflow: "hidden",
          border: `1px solid ${T.border}`,
        }}
      >
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
                to={s.to}
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

/* ─── CUSTOM MARGIN TO INTEGRATE GOOGLE-LIKE STYLE ──────────────────────── */
const cardStyle = {
  background: "#FFFFFF",
  border: "1px solid #EDEDED",
  borderRadius: "24px",
  padding: "14px",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  fontFamily: "'DM Sans', sans-serif",
  boxShadow: "0px 1px 3px rgba(0,0,0,0.02)",
};

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCT CARD (UPDATED TO MATCH IMAGE DESIGN)
═══════════════════════════════════════════════════════════════════════════ */
function ProductCard({ product, onAddToCart, onQuickView }) {
  const [hov, setHov] = useState(false);
  const [fav, setFav] = useState(false);

  // Fallbacks to secure visual fields from your data mockup or your screenshot
  const brand = product.brand || "Google";
  const categoryLabel = product.category || "PHONE";
  const currentPrice = product.price || 540;
  const originalPrice = product.oldPrice || 700;
  const ratingValue = product.rating || 4.8;
  const colorOptions = product.colors || ["#0F172A", "#FED7AA", "#F472B6"];

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={cardStyle}
    >
      {/* ── Image Container Area ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1.05/1",
          borderRadius: "18px",
          overflow: "hidden",
          background: "#F8F9FA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={
            product.image ||
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
          }
          alt={product.name}
          style={{
            maxWidth: "92%",
            maxHeight: "92%",
            objectFit: "contain",
            transform: hov ? "scale(1.03)" : "scale(1)",
            transition: "transform 0.4s ease",
          }}
        />

        {/* Brand pill (Top-Left) */}
        <span
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(8px)",
            color: "#374151",
            fontSize: "11px",
            fontWeight: "600",
            padding: "5px 12px",
            borderRadius: "100px",
          }}
        >
          {brand}
        </span>

        {/* Favorite Heart Button (Top-Right) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setFav(!fav);
          }}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(8px)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.08)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <Heart
            size={16}
            fill={fav ? "#EF4444" : "transparent"}
            color={fav ? "#EF4444" : "#6B7280"}
          />
        </button>

        {/* Quick View trigger layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: hov ? 1 : 0,
            transition: "opacity 0.25s",
            pointerEvents: hov ? "auto" : "none",
          }}
        >
          <button
            onClick={() => onQuickView?.(product)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "#FFFFFF",
              color: "#1F2937",
              fontSize: "13px",
              fontWeight: "600",
              padding: "8px 16px",
              borderRadius: "100px",
              border: "1px solid #E5E7EB",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              cursor: "pointer",
            }}
          >
            <Eye size={14} /> Quick view
          </button>
        </div>

        {/* Save Badge Label (Bottom Right Overlay) */}
        {originalPrice && currentPrice && (
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              right: "12px",
              background: "#EEF2FF",
              color: "#4338CA",
              fontSize: "11px",
              fontWeight: "700",
              padding: "4px 10px",
              borderRadius: "100px",
            }}
          >
            Save ${originalPrice - currentPrice}
          </div>
        )}
      </div>

      {/* ── Details Panel ── */}
      <div style={{ padding: "14px 4px 4px" }}>
        {/* Category & Rating Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "6px",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: "700",
              color: "#9CA3AF",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {categoryLabel}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <span style={{ color: "#FBBF24", fontSize: "14px" }}>★</span>
            <span
              style={{ fontSize: "12px", fontWeight: "700", color: "#F97316" }}
            >
              {ratingValue}
            </span>
          </div>
        </div>

        {/* Title / Name */}
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "700",
            color: "#111827",
            margin: "0 0 4px 0",
            lineHeight: "1.3",
          }}
        >
          {product.name || "Pixel 9"}
        </h3>

        {/* Author / Creator text structure */}
        <p style={{ fontSize: "13px", color: "#6B7280", margin: "0 0 12px 0" }}>
          By <span style={{ color: "#4B5563" }}>{brand}</span>
        </p>

        {/* Color Switchers Swatch Mock */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
          {colorOptions.map((color, cIdx) => (
            <span
              key={cIdx}
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                backgroundColor: color,
                display: "inline-block",
                border: cIdx === 2 ? "1px solid #E5E7EB" : "none",
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            />
          ))}
        </div>

        {/* Divider line style */}
        <div
          style={{ height: "1px", background: "#F3F4F6", marginBottom: "14px" }}
        />

        {/* Price Tag Row + Add to Cart Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{ fontSize: "20px", fontWeight: "700", color: "#0F172A" }}
            >
              ${currentPrice}
            </span>
            {originalPrice && (
              <span
                style={{
                  fontSize: "13px",
                  color: "#9CA3AF",
                  textDecoration: "line-through",
                  marginTop: "1px",
                }}
              >
                ${originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart?.(product)}
            style={{
              background: "#4F46E5", // Beautiful Deep Indigo Blue button
              color: "#FFFFFF",
              border: "none",
              borderRadius: "100px",
              padding: "10px 22px",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#4338CA")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#4F46E5")}
          >
            <ShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CATEGORY SECTION
═══════════════════════════════════════════════════════════════════════════ */
function Spinner() {
  return (
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
}

function Categories({ bp }) {
  const sm = bp === "sm";
  const md = bp === "md";

  return (
    <section style={{ marginBottom: sm ? 48 : 68 }}>
      <Divider label="Shop by category" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: sm
            ? "1fr"
            : md
              ? "repeat(3, 1fr)"
              : "repeat(3, minmax(0, 1fr))",
          gap: sm ? 16 : 20,
        }}
      >
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/${cat.id}`}
            style={{
              minHeight: sm ? 220 : 260,
              borderRadius: sm ? 16 : 20,
              overflow: "hidden",
              position: "relative",
              display: "flex",
              alignItems: "flex-end",
              padding: sm ? 18 : 24,
              textDecoration: "none",
              color: "#fff",
              border: `1px solid ${T.border}`,
              background: T.ink,
            }}
          >
            <img
              src={cat.image}
              alt={cat.name}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.35s ease",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.12) 58%, transparent 100%)",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: sm ? 24 : 30,
                  lineHeight: 1,
                  margin: "0 0 8px",
                }}
              >
                {cat.name}
              </h2>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.5,
                  margin: "0 0 14px",
                  maxWidth: 260,
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                {cat.description}
              </p>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                Browse <ArrowUpRight size={13} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

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

      {/* Grid wrapper dynamic configs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: sm
            ? "1fr"
            : md
              ? "repeat(2, 1fr)"
              : "repeat(4, 1fr)",
          gap: sm ? "16px" : "20px", // cleaner spacing for modern cards
        }}
      >
        {loading ? (
          <div style={{ gridColumn: "1 / -1" }}>
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
