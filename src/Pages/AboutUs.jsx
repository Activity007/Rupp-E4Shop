import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Eye,
  Target,
  HeartHandshake,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";

import cholna from "../assets/cholna.jpg";
import sopheak from "../assets/sopheak.jpg";
import mazer from "../assets/mazer.JPG";
import liminh from "../assets/liminh.jpg";
import pisey from "../assets/pisey.jpg";
import poieng from "../assets/poieng.png";
import chantra from "../assets/chantra.jpg";

// isDarkMode is passed automatically from Layout via React.cloneElement
export default function AboutUs({ isDarkMode = true }) {
  const values = [
    {
      icon: ShieldCheck,
      title: "Trusted Products",
      description:
        "We focus on reliable tech products that customers can use with confidence every day.",
    },
    {
      icon: Truck,
      title: "Simple Shopping",
      description:
        "Our goal is to make browsing, choosing, and ordering products simple and comfortable.",
    },
    {
      icon: Sparkles,
      title: "Modern Experience",
      description:
        "We design E4Shop to feel clean, fast, and easy to use on every device.",
    },
  ];

  const teamMembers = [
    { name: "Tith Cholna", role: "Frontend Developer", image: cholna },
    { name: "Phorn Sopheak", role: "Frontend Developer", image: sopheak },
    { name: "Proeun Ratha", role: "Database Administration", image: mazer },
    { name: "Math Liminh", role: "Frontend Developer", image: liminh },
    { name: "Pov Pisey", role: "Frontend Developer", image: pisey },
    { name: "Seng Poieang", role: "Backend Developer", image: poieng },
    { name: "Phieng Chantrea", role: "Backend Developer", image: chantra },
    {
      name: "Pheakdey",
      role: "Database Administration",
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=600&auto=format&fit=crop",
    },
  ];

  // Mirror Layout's exact color tokens
  const text = isDarkMode ? "text-slate-100" : "text-slate-800";
  const textMuted = isDarkMode ? "text-slate-400" : "text-slate-500";
  const cardBg = isDarkMode ? "bg-slate-900/60" : "bg-white";
  const cardBdr = isDarkMode ? "border-slate-700/50" : "border-slate-200";
  const iconBg = isDarkMode ? "bg-slate-800" : "bg-[#3839af]/10";
  const iconClr = isDarkMode ? "text-indigo-300" : "text-[#3839af]";
  const sectionBg = isDarkMode ? "bg-slate-800/40" : "bg-slate-100/60";

  return (
    <div
      className={`transition-colors duration-300 ${isDarkMode ? "" : "bg-slate-50"}`}
    >
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#3839af] px-4 py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_40%)]" />
        <div className="relative mx-auto w-[80%] text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-indigo-200">
            About E4Shop
          </p>
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Building a better way to shop for modern technology.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-indigo-100/80 sm:text-lg">
            E4Shop is created to help customers discover phones, computers,
            watches, and everyday tech products through a simple, trusted, and
            enjoyable experience.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="rounded-xl bg-white/10 border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-[#3839af]"
            >
              Shop Now
            </Link>
            <Link
              to="/contact"
              className="rounded-xl border border-white/40 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Vision / Mission / Purpose */}
      <section className="mx-auto w-[80%] py-20">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3839af]">
            Who We Are
          </p>
          <h2
            className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl ${text}`}
          >
            Our Vision, Mission & Purpose
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: <Eye size={26} />,
              solid: false,
              title: "Our Vision",
              body: "To become a trusted online tech store where customers can easily find high-quality products that support work, study, entertainment, and everyday life.",
            },
            {
              icon: <Target size={26} />,
              solid: true,
              title: "Our Mission",
              body: "To provide a smooth shopping experience with clear product information, simple navigation, fair prices, and helpful service from the moment customers visit until they complete their order.",
            },
            {
              icon: <HeartHandshake size={26} />,
              solid: false,
              title: "Our Purpose",
              body: "To connect people with technology that makes life easier. We want every customer to feel confident, informed, and satisfied when choosing products from E4Shop.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className={`rounded-2xl border p-8 transition hover:-translate-y-1 ${cardBg} ${cardBdr}`}
            >
              <div
                className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${
                  card.solid
                    ? isDarkMode
                      ? "bg-slate-100 text-[#3839af]"
                      : "bg-slate-900 text-white"
                    : `${iconBg} ${iconClr}`
                }`}
              >
                {card.icon}
              </div>
              <h3 className={`text-xl font-extrabold ${text}`}>{card.title}</h3>
              <p className={`mt-4 text-sm leading-7 ${textMuted}`}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className={`py-20 ${sectionBg}`}>
        <div className="mx-auto grid w-[80%] gap-12 lg:grid-cols-2 lg:items-center">
          <div className={`overflow-hidden rounded-2xl border ${cardBdr}`}>
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop"
              alt="Customer shopping online"
              className="h-[400px] w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3839af]">
              Our Story
            </p>
            <h2
              className={`mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl ${text}`}
            >
              Designed for customers who want shopping to be simple.
            </h2>
            <p className={`mt-5 text-sm leading-7 ${textMuted}`}>
              E4Shop was built with one clear idea: buying tech should not feel
              complicated. Customers should be able to browse categories, view
              product details, add items to cart, and make decisions with
              confidence.
            </p>
            <p className={`mt-4 text-sm leading-7 ${textMuted}`}>
              That is why our platform focuses on a clean layout, clear
              categories, simple product cards, and a smooth cart experience.
            </p>
            <Link
              to="/contact"
              className={`mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition hover:opacity-80 ${
                isDarkMode
                  ? "bg-slate-100 text-slate-900"
                  : "bg-slate-900 text-white"
              }`}
            >
              Learn More <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto w-[80%] py-20">
        <div className="mb-12">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3839af]">
            What We Value
          </p>
          <h2
            className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl ${text}`}
          >
            The principles behind our shop.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className={`rounded-2xl border p-7 transition hover:-translate-y-1 ${cardBg} ${cardBdr}`}
              >
                <div
                  className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} ${iconClr}`}
                >
                  <Icon size={22} />
                </div>
                <h3 className={`text-lg font-extrabold ${text}`}>
                  {value.title}
                </h3>
                <p className={`mt-3 text-sm leading-7 ${textMuted}`}>
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Team */}
      <section className={`py-20 ${sectionBg}`}>
        <div className="mx-auto w-[80%]">
          <div className="mb-12 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3839af]">
              Our Team
            </p>
            <h2
              className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl ${text}`}
            >
              Meet the people behind E4Shop
            </h2>
            <p
              className={`mx-auto mt-4 max-w-2xl text-sm leading-7 ${textMuted}`}
            >
              Our team works together to create a simple, reliable, and
              enjoyable shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className={`group overflow-hidden rounded-2xl border p-4 transition duration-300 hover:-translate-y-1 ${cardBg} ${cardBdr}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-extrabold text-[#3839af] backdrop-blur-sm">
                    E4Shop
                  </div>
                </div>
                <div className="pt-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className={`text-lg font-extrabold ${text}`}>
                        {member.name}
                      </h3>
                      <p className={`mt-1 text-sm font-semibold ${iconClr}`}>
                        {member.role}
                      </p>
                    </div>
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-black ${iconBg} ${iconClr}`}
                    >
                      {member.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  </div>
                  <div className={`mt-5 border-t pt-4 ${cardBdr}`}>
                    <p className={`text-xs font-semibold uppercase tracking-widest ${textMuted}`}>
                      Team Member
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-[80%] py-20">
        <div
          className={`rounded-2xl border px-8 py-14 text-center ${cardBg} ${cardBdr}`}
        >
          <h2
            className={`mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl ${text}`}
          >
            Ready to explore products that match your lifestyle?
          </h2>
          <p className={`mx-auto mt-4 max-w-xl text-sm leading-7 ${textMuted}`}>
            Browse our product categories and find the right tech for your
            needs.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/phone"
              className="rounded-xl bg-[#3839af] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4648cc]"
            >
              Phones
            </Link>
            <Link
              to="/computer"
              className={`rounded-xl border px-6 py-2.5 text-sm font-semibold transition hover:opacity-80 ${cardBdr} ${text}`}
            >
              Computers
            </Link>
            <Link
              to="/watch"
              className={`rounded-xl border px-6 py-2.5 text-sm font-semibold transition hover:opacity-80 ${cardBdr} ${text}`}
            >
              Watches
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
