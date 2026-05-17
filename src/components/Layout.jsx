import { useState } from "react";
import { NavLink } from "react-router-dom";

// 1. Import both logo versions here
import LogoDark from "../assets/LightLogo.png"; // For dark mode
import LogoLight from "../assets/logolight.jpg"; // For light mode

import {
  ShoppingBag,
  Menu,
  X,
  Sun,
  Moon,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function Layout({
  cartItems = [],
  children,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onRemoveFromCart,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Phone", to: "/phone" },
    { label: "Computer", to: "/computer" },
    { label: "Watch", to: "/watch" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  // Specific Deep Royal Blue Color and strict 80% Layout Constraints
  const brandBg = "bg-[#3839af] text-slate-100";
  const layoutWidth = "w-[80%] mx-auto px-4 sm:px-6 lg:px-8";

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode
          ? "bg-slate-900 text-slate-100"
          : "bg-slate-50 text-slate-800"
      }`}
    >
      {/* --- PREMIUM NAVBAR --- */}
      <header
        className={`sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors ${
          isDarkMode
            ? "bg-slate-900/80 border-slate-800"
            : "bg-white/80 border-slate-200"
        }`}
      >
        {/* Constraining header elements to 80% */}
        <nav className={layoutWidth}>
          <div className="flex h-20 items-center justify-between gap-4">
            {/* Logo - Dynamically shifts image source based on theme */}
            <NavLink
              to="/"
              className="flex flex-shrink-0 items-center gap-3 transition-transform active:scale-95"
            >
              <img
                src={isDarkMode ? LogoDark : LogoLight}
                alt="E4Shop logo"
                className="h-12 w-12 object-contain"
              />
              <span
                className={`text-xl font-extrabold tracking-wider ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                E4<span className="text-[#3839af]">SHOP</span>
              </span>
            </NavLink>

            {/* Desktop Center Navigation */}
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-md font-semibold tracking-wide transition-all duration-200 ${
                      isActive
                        ? "bg-[#3839af]/10 text-[#3839af] font-bold"
                        : isDarkMode
                          ? "text-slate-400 hover:text-white hover:bg-slate-800/50"
                          : "text-slate-600 hover:text-[#3839af] hover:bg-slate-100"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Desktop Right Actions */}
            <div className="flex items-center justify-end gap-3">
              {/* Theme Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2.5 rounded-xl transition-all border ${
                  isDarkMode
                    ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-amber-400"
                    : "bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-600"
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className={`relative p-2.5 rounded-xl transition-all border ${
                  isDarkMode
                    ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200"
                    : "bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700"
                } active:scale-95`}
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#3839af] text-white text-[10px] font-bold shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Authentication Buttons */}
              <div className="hidden lg:flex items-center gap-2 ml-2 border-l pl-4 border-slate-700/30">
                <button
                  className={`text-md font-semibold px-4 py-2 rounded-lg transition-colors ${
                    isDarkMode
                      ? "text-slate-300 hover:text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Login
                </button>
                <button className="bg-[#3839af] text-white px-5 py-2 rounded-lg text-md font-semibold hover:bg-[#4648cc] active:scale-95 transition-all shadow-md shadow-indigo-950/20">
                  Sign Up
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-2.5 rounded-xl border ${
                  isDarkMode
                    ? "bg-slate-800 border-slate-700 text-white"
                    : "bg-slate-100 border-slate-200 text-slate-800"
                }`}
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 border-t border-slate-800" : "max-h-0"
          } ${isDarkMode ? "bg-slate-900" : "bg-white"}`}
        >
          <div className="px-4 py-4 space-y-2 w-[80%] mx-auto">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-400 hover:bg-[#3839af]/10 hover:text-[#3839af] transition-colors"
              >
                {l.label}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-slate-800/30 flex gap-4 px-4">
              <button className="flex-1 text-center py-2.5 rounded-xl text-md font-semibold border border-slate-700">
                Login
              </button>
              <button className="flex-1 text-center py-2.5 rounded-xl text-md font-semibold bg-[#3839af] text-white">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className={`flex-1 py-12 ${layoutWidth}`}>{children}</main>

      {/* --- MODERN ROYAL BLUE FOOTER --- */}
      <footer
        className={`${brandBg} border-t border-indigo-950/40 bg-gradient-to-b from-[#3839af] to-[#1e1f5e] pt-16 pb-8`}
      >
        {/* Constraining footer elements to 80% and enforcing clean grid column parameters */}
        <div
          className={`${layoutWidth} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10 mb-12 text-left`}
        >
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={LogoDark}
                alt="E4Shop logo"
                className="h-10 w-10 object-contain"
              />
              <span className="font-extrabold tracking-wider text-xl text-white">
                E4<span className="text-indigo-200">SHOP</span>
              </span>
            </div>
            <p className="text-md leading-relaxed text-indigo-100/80 max-w-xs">
              The world's most vibrant tech destination. We deliver performance,
              power, and unmatched style directly to your doorstep.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              {["facebook-f", "telegram", "instagram", "twitter"].map(
                (platform) => (
                  <a
                    key={platform}
                    href="/#"
                    aria-label={platform}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition-all hover:bg-white hover:text-[#3839af]"
                  >
                    <i className={`fa-brands fa-${platform} text-md`}></i>
                  </a>
                ),
              )}
            </div>
          </div>

          {/* Quick Links / Categories */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-200 h-6 flex items-center">
              Categories
            </h4>
            <ul className="space-y-2.5 text-md text-indigo-100/70">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className="hover:text-white transition-colors duration-200 block"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-200 h-6 flex items-center">
              Contact Us
            </h4>
            <div className="space-y-3 text-md text-indigo-100/70 w-full flex flex-col">
              <a
                href="mailto:sales@e4shop.com"
                className="flex items-center gap-3 hover:text-white transition-colors group"
              >
                <Mail
                  size={16}
                  className="text-indigo-200 group-hover:scale-110 transition-transform flex-shrink-0"
                />
                <span className="truncate">sales@e4shop.com</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="text-indigo-200 mt-0.5 flex-shrink-0"
                />
                <span className="leading-tight">
                  659 Kampuchea Krom Blvd (128)
                </span>
              </div>
            </div>
          </div>

          {/* Elegant Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-200 h-6 flex items-center">
              Newsletter
            </h4>
            <p className="text-xs text-indigo-100/70">
              Get 10% off your first order and stay updated.
            </p>
            <div className="flex bg-black/20 border border-white/10 rounded-xl p-1 focus-within:border-white transition-all max-w-xs">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-transparent w-full px-3 py-2 text-md text-white placeholder:text-indigo-200/50 outline-none"
              />
              <button className="bg-white text-[#3839af] p-2 rounded-lg hover:bg-indigo-50 transition-all active:scale-95 flex-shrink-0">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-8 border-t border-white/10">
          <div
            className={`${layoutWidth} flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-indigo-200/50`}
          >
            <p>© 2026 E4SHOP. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
