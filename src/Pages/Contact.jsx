import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

export default function Contact({ isDarkMode = true }) {
  const text = isDarkMode ? "text-slate-100" : "text-slate-900";
  const textMuted = isDarkMode ? "text-slate-400" : "text-slate-500";
  const cardBg = isDarkMode ? "bg-slate-900/60" : "bg-white";
  const cardBdr = isDarkMode ? "border-slate-700/50" : "border-slate-200";
  const fieldBg = isDarkMode ? "bg-slate-950/40" : "bg-slate-50";
  const iconBg = isDarkMode ? "bg-slate-800" : "bg-[#3839af]/10";
  const iconClr = isDarkMode ? "text-indigo-300" : "text-[#3839af]";

  const contactMethods = [
    {
      icon: Phone,
      label: "Phone",
      value: "+855 12 345 678",
      helper: "Mon - Sat, 8:00 AM - 6:00 PM",
    },
    {
      icon: Mail,
      label: "Email",
      value: "sales@e4shop.com",
      helper: "We usually reply within one business day.",
    },
    {
      icon: MapPin,
      label: "Store",
      value: "659 Kampuchea Krom Blvd (128)",
      helper: "Phnom Penh, Cambodia",
    },
  ];

  return (
    <div className="transition-colors duration-300">
      <section className="rounded-3xl border border-[color:var(--shop-border)] bg-[#3839af] px-5 py-16 text-white sm:px-10 lg:px-14">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-indigo-200">
            Contact E4Shop
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Need help choosing the right tech?
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-indigo-100/85">
            Send us a message about products, orders, or support. Our team will
            help you find the right phone, computer, watch, or accessory.
          </p>
        </div>
      </section>

      <section className="grid gap-6 py-10 lg:grid-cols-3">
        {contactMethods.map(({ icon: Icon, label, value, helper }) => (
          <article
            className={`rounded-2xl border p-6 transition hover:-translate-y-1 ${cardBg} ${cardBdr}`}
            key={label}
          >
            <div
              className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} ${iconClr}`}
            >
              <Icon size={22} />
            </div>
            <p className={`text-sm font-bold uppercase tracking-widest ${iconClr}`}>
              {label}
            </p>
            <h2 className={`mt-2 text-lg font-extrabold ${text}`}>{value}</h2>
            <p className={`mt-2 text-sm leading-6 ${textMuted}`}>{helper}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-8 pb-16 lg:grid-cols-[1.15fr_0.85fr]">
        <form className={`rounded-2xl border p-6 sm:p-8 ${cardBg} ${cardBdr}`}>
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#3839af]">
              Message Us
            </p>
            <h2 className={`mt-3 text-3xl font-extrabold ${text}`}>
              Tell us what you need.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold">
              <span className={text}>Full name</span>
              <input
                className={`rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-[#3839af] ${fieldBg} ${cardBdr} ${text}`}
                placeholder="Your name"
                type="text"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              <span className={text}>Email address</span>
              <input
                className={`rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-[#3839af] ${fieldBg} ${cardBdr} ${text}`}
                placeholder="you@example.com"
                type="email"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold sm:col-span-2">
              <span className={text}>Subject</span>
              <input
                className={`rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-[#3839af] ${fieldBg} ${cardBdr} ${text}`}
                placeholder="Product question, order support, or feedback"
                type="text"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold sm:col-span-2">
              <span className={text}>Message</span>
              <textarea
                className={`min-h-36 resize-none rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-[#3839af] ${fieldBg} ${cardBdr} ${text}`}
                placeholder="Write your message..."
              />
            </label>
          </div>

          <button
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#3839af] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#4648cc]"
            type="button"
          >
            Send Message <Send size={16} />
          </button>
        </form>

        <aside className={`rounded-2xl border p-6 sm:p-8 ${cardBg} ${cardBdr}`}>
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} ${iconClr}`}>
            <MessageCircle size={22} />
          </div>
          <h2 className={`mt-5 text-2xl font-extrabold ${text}`}>
            Customer support
          </h2>
          <p className={`mt-3 text-sm leading-7 ${textMuted}`}>
            Our team can help with product details, availability, delivery
            questions, and order support.
          </p>

          <div className={`mt-7 rounded-2xl border p-5 ${cardBdr}`}>
            <div className="flex items-start gap-3">
              <Clock className={`mt-0.5 shrink-0 ${iconClr}`} size={18} />
              <div>
                <h3 className={`text-sm font-extrabold ${text}`}>
                  Opening Hours
                </h3>
                <p className={`mt-2 text-sm leading-6 ${textMuted}`}>
                  Monday - Saturday: 8:00 AM - 6:00 PM
                  <br />
                  Sunday: 9:00 AM - 3:00 PM
                </p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
