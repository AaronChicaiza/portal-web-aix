import { Link, useLocation } from "react-router-dom";
import { Sparkles, Utensils, Flower, Shirt, Laptop, ShieldAlert, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const GlobalHeader = () => {
  const location = useLocation();
  const path = location.pathname;

  // Determine active theme accent color and logo gradient
  const getThemeConfig = () => {
    switch (path) {
      case "/restaurante":
        return {
          activeClass: "text-[#d4af37] border-b-2 border-[#d4af37]",
          accent: "#d4af37",
          title: "Restaurante",
        };
      case "/belleza":
        return {
          activeClass: "text-[#b76e79] border-b-2 border-[#b76e79]",
          accent: "#b76e79",
          title: "Belleza/Spa",
        };
      case "/ropa":
        return {
          activeClass: "text-white border-b-2 border-white",
          accent: "#ffffff",
          title: "Moda/Ropa",
        };
      case "/tecnologia":
        return {
          activeClass: "text-blue-500 border-b-2 border-blue-500",
          accent: "#3b82f6",
          title: "Tecnología",
        };
      case "/medico":
        return {
          activeClass: "text-[#008080] border-b-2 border-[#008080]",
          accent: "#008080",
          title: "Clínica Médica",
        };
      default:
        return {
          activeClass: "text-blue-400 border-b-2 border-blue-400",
          accent: "#3b82f6",
          title: "Portal AIX",
        };
    }
  };

  const config = getThemeConfig();

  const links = [
    { href: "/", label: "Inicio", icon: Home, activePath: "/" },
    { href: "/restaurante/index.html", label: "Restaurante", icon: Utensils, activePath: "/restaurante" },
    { href: "/belleza/index.html", label: "Belleza", icon: Flower, activePath: "/belleza" },
    { href: "/ropa/index.html", label: "Moda/Ropa", icon: Shirt, activePath: "/ropa" },
    { href: "/tecnologia/index.html", label: "Tecnología", icon: Laptop, activePath: "/tecnologia" },
    { href: "/medico/index.html", label: "Médico", icon: ShieldAlert, activePath: "/medico" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-black/85 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300">
      {/* Logo */}
      <a href="/" className="flex items-center gap-3 group">
        <img
          src="/favicon.svg"
          alt="PaginasWebAIX Logo"
          className="w-10 h-10 rounded-xl shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300 border border-sky-400/30"
        />
        <div>
          <h1 className="font-outfit text-base font-extrabold leading-tight text-white group-hover:text-gray-300 transition-colors">
            PaginasWebAIX
          </h1>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">
            {config.title}
          </p>
        </div>
      </a>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-8">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = path.startsWith(link.href.replace("/", ""));
          return (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-all hover:scale-105 active:scale-95 duration-200",
                isActive && config.activeClass
              )}
            >
              <Icon className="w-4 h-4" />
              {link.label}
            </a>
          );
        })}
      </nav>

      {/* Mobile Selector */}
      <div className="lg:hidden">
        <select
          value={path}
          onChange={(e) => {
            window.location.href = e.target.value;
          }}
          className="bg-gray-900 border border-gray-700 text-white rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          <option value="/">Inicio</option>
          <option value="/restaurante/index.html">Restaurante</option>
          <option value="/belleza/index.html">Belleza</option>
          <option value="/ropa/index.html">Moda/Ropa</option>
          <option value="/tecnologia/index.html">Tecnología</option>
          <option value="/medico/index.html">Médico</option>
        </select>
      </div>
    </header>
  );
};

export default GlobalHeader;
