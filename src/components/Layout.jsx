import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  MapPin,
  Menu,
  Moon,
  ShoppingBag,
  Sun,
  X,
} from "lucide-react";

import LogoDark from "../assets/LightLogo.png";
import LogoLight from "../assets/logoLight.png";

export default function Layout({
  cartItems = [],
  children,
  isDarkMode,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onRemoveFromCart,
  onToggleTheme,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Phone", to: "/phone" },
    { label: "Computer", to: "/computer" },
    { label: "Watch", to: "/watch" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  const socialLinks = [
    { icon: "fa-brands fa-facebook-f", label: "Facebook" },
    { icon: "fa-brands fa-telegram", label: "Telegram" },
    { icon: "fa-brands fa-instagram", label: "Instagram" },
    { icon: "fa-brands fa-x-twitter", label: "Twitter" },
  ];

  const layoutWidth = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";
  const pageWidth = "mx-auto w-[80%]";
  const navLinkClass = ({ isActive }) =>
    `block rounded-xl px-3.5 py-2 text-md font-bold transition duration-200 ${
      isActive
        ? "bg-[color:var(--shop-accent-soft)] text-[color:var(--shop-accent)]"
        : "text-[color:var(--shop-ink-mid)] hover:bg-[color:var(--shop-surface)] hover:text-[color:var(--shop-ink)]"
    }`;

  return (
    <div className="min-h-screen bg-[color:var(--shop-bg)] text-[color:var(--shop-ink)] transition-colors duration-300">
      <header className="sticky top-0 z-50 border-b border-[color:var(--shop-border)] bg-[color:var(--shop-nav)] shadow-sm backdrop-blur-xl transition-colors duration-300">
        <nav className={layoutWidth}>
          <div className="flex min-h-[4.5rem] items-center justify-between gap-4 py-3">
            <NavLink
              className="flex shrink-0 items-center gap-3 rounded-2xl transition-transform active:scale-95"
              to="/"
            >
              <img
                alt="E4Shop logo"
                className="h-11 w-11 object-contain"
                src={isDarkMode ? LogoDark : LogoLight}
              />
              <span className="text-xl font-black tracking-normal text-[color:var(--shop-ink)]">
                E4<span className="text-[color:var(--shop-accent)]">SHOP</span>
              </span>
            </NavLink>

            <div className="hidden items-center gap-1 rounded-2xl border border-[color:var(--shop-border)] bg-[color:var(--shop-card)] p-1 md:flex">
              {navLinks.map((link) => (
                <NavLink className={navLinkClass} key={link.to} to={link.to}>
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                aria-label={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
                className="theme-toggle"
                onClick={onToggleTheme}
                type="button"
              >
                <span className="theme-toggle-thumb">
                  {isDarkMode ? <Moon size={15} /> : <Sun size={15} />}
                </span>
              </button>

              <button
                className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[color:var(--shop-border)] bg-[color:var(--shop-card)] text-[color:var(--shop-ink)] transition hover:-translate-y-0.5 hover:border-[color:var(--shop-border-mid)] active:scale-95"
                onClick={() => setIsCartOpen(true)}
                type="button"
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--shop-accent)] text-[10px] font-bold text-white shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>

              <div className="hidden items-center gap-2 border-l border-[color:var(--shop-border)] pl-3 lg:flex">
                <button
                  className="rounded-xl px-4 py-2 text-sm font-bold text-[color:var(--shop-ink-mid)] transition hover:bg-[color:var(--shop-surface)] hover:text-[color:var(--shop-ink)]"
                  type="button"
                >
                  Login
                </button>
                <button
                  className="rounded-xl bg-[color:var(--shop-accent)] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-950/20 transition hover:-translate-y-0.5 hover:bg-[color:var(--shop-accent-hover)] active:scale-95"
                  type="button"
                >
                  Sign Up
                </button>
              </div>

              <button
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[color:var(--shop-border)] bg-[color:var(--shop-card)] text-[color:var(--shop-ink)] md:hidden"
                onClick={() => setIsMenuOpen((current) => !current)}
                type="button"
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </nav>

        <div
          className={`overflow-hidden bg-[color:var(--shop-nav)] transition-all duration-300 md:hidden ${
            isMenuOpen
              ? "max-h-96 border-t border-[color:var(--shop-border)]"
              : "max-h-0"
          }`}
        >
          <div className={`${layoutWidth} space-y-2 py-4`}>
            {navLinks.map((link) => (
              <NavLink
                className={navLinkClass}
                key={link.to}
                onClick={() => setIsMenuOpen(false)}
                to={link.to}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="flex gap-3 border-t border-[color:var(--shop-border)] pt-4">
              <button
                className="flex-1 rounded-xl border border-[color:var(--shop-border)] py-2.5 text-sm font-bold"
                type="button"
              >
                Login
              </button>
              <button
                className="flex-1 rounded-xl bg-[color:var(--shop-accent)] py-2.5 text-sm font-bold text-white"
                type="button"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className={`flex-1 py-8 sm:py-10 ${pageWidth}`}>{children}</main>

      {isCartOpen && (
        <div className="fixed inset-0 z-[80]" role="presentation">
          <button
            aria-label="Close cart"
            className="absolute inset-0 h-full w-full bg-black/50 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
            type="button"
          />
          <aside
            aria-label="Shopping cart"
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-[color:var(--shop-border)] bg-[color:var(--shop-card)] p-5 text-[color:var(--shop-ink)] shadow-2xl transition-colors"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--shop-accent)]">
                  Cart
                </p>
                <h2 className="text-xl font-extrabold">Shopping Bag</h2>
              </div>
              <button
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] text-[color:var(--shop-ink)]"
                onClick={() => setIsCartOpen(false)}
                type="button"
              >
                <X size={18} />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-[color:var(--shop-border-mid)] text-sm text-[color:var(--shop-ink-mid)]">
                Your cart is empty.
              </div>
            ) : (
              <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <article
                    className="grid grid-cols-[72px_1fr] gap-3 rounded-2xl border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] p-3"
                    key={item.id}
                  >
                    <img
                      alt={item.name}
                      className="h-16 w-16 rounded-xl object-cover"
                      src={item.image}
                    />
                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-bold">
                            {item.name}
                          </h3>
                          <p className="text-xs text-[color:var(--shop-ink-light)]">
                            ${item.price} each
                          </p>
                        </div>
                        <button
                          aria-label={`Remove ${item.name}`}
                          className="text-[color:var(--shop-ink-light)] transition hover:text-red-500"
                          onClick={() => onRemoveFromCart(item.id)}
                          type="button"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center rounded-xl border border-[color:var(--shop-border)]">
                          <button
                            className="px-3 py-1.5 text-sm font-bold"
                            onClick={() => onDecreaseQuantity(item.id)}
                            type="button"
                          >
                            -
                          </button>
                          <span className="min-w-8 text-center text-sm font-bold">
                            {item.quantity}
                          </span>
                          <button
                            className="px-3 py-1.5 text-sm font-bold"
                            onClick={() => onIncreaseQuantity(item.id)}
                            type="button"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-sm font-extrabold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="mt-5 border-t border-[color:var(--shop-border)] pt-4">
              <div className="mb-4 flex items-center justify-between text-base font-extrabold">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button
                className="w-full rounded-xl bg-[color:var(--shop-accent)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[color:var(--shop-accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={cartItems.length === 0}
                type="button"
              >
                Checkout
              </button>
            </div>
          </aside>
        </div>
      )}

      <footer className="border-t border-[color:var(--shop-border)] bg-[color:var(--shop-footer)] py-12 text-white">
        <div
          className={`${layoutWidth} grid grid-cols-1 gap-x-12 gap-y-10 text-left sm:grid-cols-2 lg:grid-cols-4`}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                alt="E4Shop logo"
                className="h-10 w-10 object-contain"
                src={LogoDark}
              />
              <span className="text-xl font-extrabold tracking-normal text-white">
                E4<span className="text-indigo-100">SHOP</span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-7 text-indigo-100/80">
              A focused tech shop for phones, computers, watches, and everyday
              accessories.
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map(({ icon, label }) => (
                <a
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white hover:text-[color:var(--shop-accent)]"
                  href="/#"
                  key={label}
                >
                  <i aria-hidden="true" className={`${icon} text-base`} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-200">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.to}>
                  <NavLink
                    className="block transition hover:text-white"
                    to={link.to}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-200">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm text-white/80">
              <a
                className="flex items-center gap-3 transition hover:text-white"
                href="mailto:sales@e4shop.com"
              >
                <Mail className="shrink-0 text-indigo-200" size={16} />
                <span className="truncate">sales@e4shop.com</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 shrink-0 text-indigo-200" size={16} />
                <span>659 Kampuchea Krom Blvd (128)</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-200">
              Newsletter
            </h4>
            <p className="text-sm text-indigo-100/70">
              Get product drops and simple discount updates.
            </p>
            <div className="flex max-w-xs rounded-xl border border-white/10 bg-black/20 p-1 transition focus-within:border-white">
              <input
                className="w-full bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-indigo-200/50"
                placeholder="Your email address"
                type="email"
              />
              <button
                aria-label="Subscribe"
                className="shrink-0 rounded-lg bg-white p-2 text-[color:var(--shop-accent)] transition hover:bg-indigo-50 active:scale-95"
                type="button"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
          <div
            className={`${layoutWidth} flex flex-col items-center justify-between gap-4 text-xs text-indigo-200/60 sm:flex-row`}
          >
            <p>Copyright 2026 E4SHOP. All rights reserved.</p>
            <div className="flex gap-6">
              <a className="transition hover:text-white" href="/#">
                Privacy Policy
              </a>
              <a className="transition hover:text-white" href="/#">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
