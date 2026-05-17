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

export default function AboutUs() {
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
    {
      name: "Sokna Meng",
      role: "Founder & Project Lead",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Dara Kim",
      role: "Frontend Developer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Lina Chan",
      role: "UI/UX Designer",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Rithy Long",
      role: "Backend Developer",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Malis Sun",
      role: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Vannak Prak",
      role: "Marketing Specialist",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Sophea Yin",
      role: "Customer Support",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Rotha Lim",
      role: "Quality Checker",
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <main className="min-h-screen transition-colors duration-500 dark:bg-gray-900 dark:text-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#3839af] px-4 py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_35%)]" />

        <div className="relative mx-auto w-[80%] text-center">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-white/80">
            About E4Shop
          </p>

          <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl">
            Building a better way to shop for modern technology.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-8 text-white/85 sm:text-lg">
            E4Shop is created to help customers discover phones, computers,
            watches, and everyday tech products through a simple, trusted, and
            enjoyable shopping experience.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="rounded-full bg-slate-950 px-7 py-3 text-sm font-black uppercase tracking-wider text-white transition hover:bg-slate-800"
            >
              Shop Now
            </Link>

            <Link
              to="/contact"
              className="rounded-full border-2 border-white/60 px-7 py-3 text-sm font-black uppercase tracking-wider text-white transition hover:bg-white hover:text-[#3839af]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Vision Mission Purpose */}
      <section className="mx-auto w-[80%] py-20">
        <div className="mb-12 text-center">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#3839af]">
            Who We Are
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            Our Vision, Mission & Purpose
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-gray-800">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3839af]/10 text-[#3839af] dark:bg-white/10 dark:text-white">
              <Eye size={28} />
            </div>

            <h3 className="text-2xl font-black text-slate-950 dark:text-white">
              Our Vision
            </h3>

            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-white/60">
              To become a trusted online tech store where customers can easily
              find high-quality products that support work, study,
              entertainment, and everyday life.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-gray-800">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-[#3839af]">
              <Target size={28} />
            </div>

            <h3 className="text-2xl font-black text-slate-950 dark:text-white">
              Our Mission
            </h3>

            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-white/60">
              To provide a smooth shopping experience with clear product
              information, simple navigation, fair prices, and helpful service
              from the moment customers visit until they complete their order.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-gray-800">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3839af]/10 text-[#3839af] dark:bg-white/10 dark:text-white">
              <HeartHandshake size={28} />
            </div>

            <h3 className="text-2xl font-black text-slate-950 dark:text-white">
              Our Purpose
            </h3>

            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-white/60">
              To connect people with technology that makes life easier. We want
              every customer to feel confident, informed, and satisfied when
              choosing products from E4Shop.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white py-20 transition-colors duration-500 dark:bg-gray-900">
        <div className="mx-auto grid w-[80%] gap-12 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-[2rem] bg-slate-100 dark:bg-gray-800">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop"
              alt="Customer shopping online"
              className="h-[420px] w-full object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#3839af]">
              Our Story
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Designed for customers who want shopping to be simple.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-white/60">
              E4Shop was built with one clear idea: buying tech should not feel
              complicated. Customers should be able to browse categories, view
              product details, add items to cart, and make decisions with
              confidence.
            </p>

            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-white/60">
              That is why our platform focuses on a clean layout, clear
              categories, simple product cards, and a smooth cart experience.
            </p>

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-3 text-sm font-black uppercase tracking-wider text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              Learn More <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto w-[80%] py-20">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#3839af]">
            What We Value
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            The principles behind our shop.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <div
                key={value.title}
                className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-gray-800"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3839af]/10 text-[#3839af] dark:bg-white/10 dark:text-white">
                  <Icon size={24} />
                </div>

                <h3 className="text-xl font-black text-slate-950 dark:text-white">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/60">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Team Members */}
      <section className="bg-white py-20 transition-colors duration-500 dark:bg-gray-900">
        <div className="mx-auto w-[80%]">
          <div className="mb-12 text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#3839af]">
              Our Team
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Meet the people behind E4Shop
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-white/60">
              Our team works together to create a simple, reliable, and
              enjoyable shopping experience for every customer.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-gray-800"
              >
                <div className="relative h-72 overflow-hidden bg-slate-100 dark:bg-gray-700">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-xl font-black text-white">
                      {member.name}
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-white/80">
                      {member.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between px-5 py-4">
                  <span className="text-sm font-bold text-slate-500 dark:text-white/60">
                    E4Shop Team
                  </span>

                  <div className="flex gap-2">
                    <a
                      href="/#"
                      aria-label={`${member.name} Facebook`}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-[#3839af] hover:text-white dark:bg-white/10 dark:text-white/60"
                    >
                      <i className="fa-brands fa-facebook-f text-xs"></i>
                    </a>

                    <a
                      href="/#"
                      aria-label={`${member.name} Instagram`}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-[#3839af] hover:text-white dark:bg-white/10 dark:text-white/60"
                    >
                      <i className="fa-brands fa-instagram text-xs"></i>
                    </a>

                    <a
                      href="/#"
                      aria-label={`${member.name} Telegram`}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-[#3839af] hover:text-white dark:bg-white/10 dark:text-white/60"
                    >
                      <i className="fa-brands fa-telegram text-xs"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-[80%] py-20">
        <div className="rounded-[2rem] bg-slate-950 px-6 py-14 text-center text-white sm:px-10 dark:bg-gray-800">
          <h2 className="mx-auto max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
            Ready to explore products that match your lifestyle?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/70">
            Browse our product categories and find the right tech for your
            needs.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/phone"
              className="rounded-full bg-[#3839af] px-7 py-3 text-sm font-black uppercase tracking-wider text-white transition hover:bg-indigo-800"
            >
              Phones
            </Link>

            <Link
              to="/computer"
              className="rounded-full bg-white px-7 py-3 text-sm font-black uppercase tracking-wider text-slate-950 transition hover:bg-slate-100"
            >
              Computers
            </Link>

            <Link
              to="/watch"
              className="rounded-full border border-white/30 px-7 py-3 text-sm font-black uppercase tracking-wider text-white transition hover:bg-white hover:text-slate-950"
            >
              Watches
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
