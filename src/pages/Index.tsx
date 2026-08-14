import { motion } from "framer-motion";
import { ArrowRight, Flower, HeartPulse, Laptop, Shirt, Utensils } from "lucide-react";

const Index = () => {
  const cards = [
    {
      href: "/restaurante/index.html",
      title: "El Rincón de la Mitad del Mundo",
      subtitle: "Alta Gastronomía Ecuatoriana",
      price: "$350 USD",
      description: "Atmósfera elegante, menú gourmet exclusivo con ingredientes locales, reservas directas y menú digital interactivo.",
      color: "from-amber-600 to-amber-900",
      accent: "#d4af37",
      icon: Utensils,
      bg: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600",
    },
    {
      href: "/belleza/index.html",
      title: "LUMINA BELLEZA & SPA",
      subtitle: "Centro de Estética Ecuatoriano",
      price: "$380 USD",
      description: "Tratamientos estéticos exclusivos, agenda de citas online, catálogo de servicios y experiencia visual relajante.",
      color: "from-rose-400 to-rose-700",
      accent: "#b76e79",
      icon: Flower,
      bg: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600",
    },
    {
      href: "/ropa/index.html",
      title: "VESTIMENTA",
      subtitle: "Moda y Sastrería de Autor",
      price: "$450 USD",
      description: "Tienda e-commerce de moda completa, catálogo interactivo con filtros por prendas, carrito de compras y diseño.",
      color: "from-gray-700 to-gray-900",
      accent: "#ffffff",
      icon: Shirt,
      bg: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600",
    },
    {
      href: "/tecnologia/index.html",
      title: "NEXUS TECNOLOGÍA",
      subtitle: "Dispositivos y Laptops en Ecuador",
      price: "$480 USD",
      description: "E-commerce multicategoría (Laptops, Celulares, Cámaras, Accesorios), ofertas especiales y carrito de compras.",
      color: "from-blue-600 to-indigo-900",
      accent: "#3b82f6",
      icon: Laptop,
      bg: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600",
    },
    {
      href: "/medico/index.html",
      title: "HOSPITAL",
      subtitle: "Sanidad Digital y Clínica",
      price: "$500 USD",
      description: "Portal médico especializado, agendamiento interactivo de citas por WhatsApp y directorio de especialistas.",
      color: "from-teal-600 to-emerald-950",
      accent: "#008080",
      icon: HeartPulse,
      bg: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col items-center">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-3xl flex flex-col items-center gap-4 mb-12"
      >
        <h2 className="font-outfit font-black text-4xl md:text-6xl text-white tracking-tight uppercase leading-tight">
          PORTAL WEB
        </h2>
        <p className="text-gray-300 text-sm md:text-base max-w-xl">
          Selección de plantillas web profesionales para negocios, costos de diseño y desarrollo.
        </p>
      </motion.div>

      {/* Bento Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
              className="relative rounded-3xl overflow-hidden group border border-white/10 h-[400px] flex flex-col justify-end p-8 cursor-pointer shadow-2xl"
              onClick={() => {
                window.location.href = card.href;
              }}
            >
              {/* Card Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={card.bg}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-40 group-hover:opacity-50"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${card.color} via-black/85 to-transparent opacity-85`} />
              </div>

              {/* Card Content */}
              <div className="relative z-10 flex flex-col gap-3.5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-inner"
                      style={{ backgroundColor: card.accent + "33", border: `1px solid ${card.accent}` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: card.accent }} />
                    </div>
                    <span className="text-[10px] bg-white/10 text-white font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {idx + 1}
                    </span>
                  </div>

                  {/* Price Tag Badge */}
                  <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-400/50 text-emerald-300 font-extrabold px-3 py-1.5 rounded-xl text-sm shadow-md flex items-center gap-1.5">
                    <span className="text-[9px] text-emerald-400 font-medium uppercase tracking-wider">Diseño:</span>
                    <span className="text-white font-black">{card.price}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-outfit font-extrabold text-2xl text-white group-hover:text-gray-200 transition-colors uppercase leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider mt-1 opacity-90" style={{ color: card.accent }}>
                    {card.subtitle}
                  </p>
                  <p className="text-xs text-gray-300 mt-2 leading-relaxed line-clamp-3">
                    {card.description}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-1 pt-3 border-t border-white/10">
                  <a
                    href={card.href}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:text-emerald-300 transition-colors"
                  >
                    Visitar Sitio
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <span className="text-[11px] text-emerald-400/90 font-semibold">
                    Cotización sugerida
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
