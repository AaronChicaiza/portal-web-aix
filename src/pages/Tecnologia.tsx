import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Laptop, ShoppingCart, Plus, CheckCircle, Shield, BatteryCharging, Cpu, Smartphone, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { toast } from "sonner";

interface TecnologiaProps {
  view: "inicio" | "laptops" | "telefonos" | "especificaciones" | "pre-compra";
}

const Tecnologia = ({ view }: TecnologiaProps) => {
  const [cartCount, setCartCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [model, setModel] = useState("Nexus AirBook Pro 16 ($1,499)");

  // X-Ray Slider State (percent split)
  const [xrayPercent, setXrayPercent] = useState(50);

  // Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);

  const techCarousel = [
    { src: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80", title: "Nexus AirBook Pro 16", desc: "Monocasco de aluminio espacial con refrigeración activa." },
    { src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80", title: "Nexus Phone 15 Pro", desc: "Chasis de titanio de grado aeroespacial." },
    { src: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80", title: "Nexus Watch Pro Series", desc: "Pantalla OLED siempre activa de cristal zafiro." },
    { src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80", title: "Nexus SoundPods ANC", desc: "Cancelación activa de ruido neural integrada." },
  ];

  const laptops = [
    { id: 1, name: "Nexus AirBook Pro 16", price: "$1,499", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80", desc: "Procesador M2 Pro, 16GB RAM, 512GB SSD. Pantalla Liquid Retina XDR de 16\"." },
    { id: 2, name: "Nexus AirBook Air 13", price: "$1,099", img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80", desc: "Procesador M2 Ultra-Thin, 8GB RAM, 256GB SSD. Pantalla Retina de 13.3\"." },
    { id: 3, name: "Nexus Pro Station 17", price: "$2,299", img: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=600&q=80", desc: "Estación de trabajo, 32GB RAM, 1TB NVMe SSD. GPU dedicada Neural Pro 8GB." },
  ];

  const phones = [
    { id: 4, name: "Nexus Phone 15 Pro", price: "$999", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80", desc: "Cámara triple de 48MP, Chip A17 Bionic, Pantalla OLED de 6.7\", Titanio." },
    { id: 5, name: "Nexus Phone 15 Lite", price: "$699", img: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80", desc: "Cámara dual de 12MP, Chip A16, Pantalla Retina OLED de 6.1\", Colores Pastel." },
    { id: 6, name: "Nexus Phone Fold 1", price: "$1,799", img: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80", desc: "Pantalla flexible interna de 7.6\", externa de 6.2\", bisagra ultrarresistente." },
  ];

  const specsPhotos = [
    { src: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80", label: "Carcasas CNC" },
    { src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80", label: "Teclados Mecánicos" },
    { src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80", label: "Pruebas de Caída" },
    { src: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80", label: "Giroscopios" },
    { src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80", label: "Altavoces ANC" },
    { src: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80", label: "Pantallas OLED" },
    { src: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80", label: "Microprocesadores" },
    { src: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80", label: "Carga Inalámbrica" },
    { src: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=600&q=80", label: "Conductores de Calor" },
    { src: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80", label: "Sensor de Pulso" },
    { src: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80", label: "Retroiluminación" },
    { src: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80", label: "Testing del Sistema" },
  ];

  const sublinks = [
    { to: "/tecnologia", label: "Inicio", activeView: "inicio" },
    { to: "/tecnologia/laptops", label: "Portátiles", activeView: "laptops" },
    { to: "/tecnologia/telefonos", label: "Teléfonos", activeView: "telefonos" },
    { to: "/tecnologia/especificaciones", label: "Ficha Técnica", activeView: "especificaciones" },
    { to: "/tecnologia/pre-compra", label: "Pre-compra", activeView: "pre-compra" },
  ];

  const handleAddToCart = (productName: string) => {
    setCartCount((prev) => prev + 1);
    toast.success(`"${productName}" añadido al carrito`, {
      description: "Puedes revisar tu carrito en la cabecera.",
      duration: 3000,
    });
  };

  const openCart = () => {
    if (cartCount === 0) {
      toast("Tu carrito está vacío", {
        description: "Explora la tienda para agregar laptops o smartphones.",
      });
    } else {
      toast.info("Carrito de Compras", {
        description: `Tienes ${cartCount} dispositivos listos para procesar la orden.`,
      });
    }
  };

  const handlePreOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setModalText(
      `Hola <strong>${name}</strong>, hemos registrado tu reserva para el dispositivo <strong>${model}</strong>. Nos comunicaremos contigo al correo <strong>${email}</strong> a la brevedad para coordinar la entrega.`
    );
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setName("");
    setEmail("");
  };

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev === techCarousel.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev === 0 ? techCarousel.length - 1 : prev - 1));
  };

  return (
    <div className="bg-[#f5f5f7] text-gray-900 font-sans selection:bg-blue-600 selection:text-white min-h-screen">
      {/* Sub-Header */}
      <div className="w-full bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="flex justify-between items-center max-w-6xl mx-auto px-6 py-4">
          <div className="flex gap-6 justify-center md:justify-start">
            {sublinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                  view === link.activeView
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-400 hover:text-blue-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <button
            onClick={openCart}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white transition-all text-xs font-semibold uppercase tracking-wider rounded-xl shadow-md"
          >
            <ShoppingCart className="w-4 h-4" />
            Carrito ({cartCount})
          </button>
        </div>
      </div>

      {/* Vistas dinámicas */}
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="pb-24"
        >
          {view === "inicio" && (
            <div>
              {/* Hero Banner */}
              <div className="relative min-h-[60vh] bg-black text-white flex items-center justify-center overflow-hidden px-6 md:px-12">
                <img
                  src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80"
                  alt="Nexus Hero"
                  className="absolute inset-0 w-full h-full object-cover opacity-45"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center gap-4">
                  <span className="bg-blue-600/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full">
                    Tecnología de Vanguardia
                  </span>
                  <h2 className="font-outfit font-extrabold text-4xl md:text-6xl text-white tracking-tight uppercase leading-tight">
                    NEXUS DEVICES
                  </h2>
                  <p className="text-gray-300 text-base md:text-lg max-w-xl">
                    Portátiles de fibra de carbono y smartphones de titanio diseñados bajo estrictas metodologías de eficiencia y potencia.
                  </p>
                  <Link
                    to="/tecnologia/pre-compra"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase px-8 py-3.5 rounded-xl transition-all shadow-md"
                  >
                    Pre-comprar Dispositivo
                  </Link>
                </div>
              </div>

              {/* INTERACTIVE DEVICE X-RAY SLIDER */}
              <div className="max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Ingeniería por Dentro</span>
                <h3 className="font-outfit font-extrabold text-2xl uppercase mb-6">Radiografía de Componentes</h3>
                <p className="text-xs text-gray-500 mb-10 max-w-md">Desliza el controlador para despegar la carcasa de aluminio espacial del Nexus AirBook y revelar los circuitos del procesador.</p>
                
                {/* Visual Slider Wrapper */}
                <div className="relative w-full max-w-2xl aspect-[16/10] bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                  {/* Capa Trasera: Circuitos Internos */}
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80"
                      alt="Circuiteria Interna"
                      className="w-full h-full object-cover select-none"
                    />
                    <div className="absolute top-4 right-4 bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      Chip Neural Nexus M2
                    </div>
                  </div>

                  {/* Capa Frontal: Laptop Casing Exterior */}
                  <div
                    style={{ clipPath: `inset(0 ${100 - xrayPercent}% 0 0)` }}
                    className="absolute inset-0 w-full h-full transition-all duration-75 z-10"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
                      alt="Laptop Exterior"
                      className="w-full h-full object-cover select-none"
                    />
                    <div className="absolute top-4 left-4 bg-zinc-800 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      Carcasa Monocasco CNC
                    </div>
                  </div>

                  {/* Línea Divisoria del Slider */}
                  <div
                    style={{ left: `${xrayPercent}%` }}
                    className="absolute top-0 bottom-0 w-[2px] bg-blue-600 z-20 cursor-ew-resize pointer-events-none"
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg pointer-events-auto">
                      <Cpu className="w-4 h-4 animate-spin-slow" />
                    </div>
                  </div>
                </div>

                {/* Input Slider */}
                <div className="w-full max-w-md mt-6 flex flex-col gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={xrayPercent}
                    onChange={(e) => setXrayPercent(Number(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    <span>Carcasa Metálica</span>
                    <span>{xrayPercent}% X-Ray</span>
                    <span>Circuitos Placa Madre</span>
                  </div>
                </div>
              </div>

              {/* Bento Grid Introducción */}
              <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 py-20 items-center">
                <div className="flex flex-col gap-6">
                  <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Ingeniería Avanzada</span>
                  <h3 className="font-outfit font-extrabold text-3xl text-gray-900">Diseñado con Precisión Física</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Tanto la serie de laptops AirBook como los celulares Nexus Phone son labrados a partir de bloques de aluminio reciclado y titanio aeroespacial. La ventilación de cámara de vapor y la pantalla XDR unificada aseguran una experiencia de visualización ininterrumpida y libre de fatiga ocular.
                  </p>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=600&q=80"
                  alt="Ingeniería Nexus"
                  className="rounded-2xl w-full h-[350px] object-cover shadow-sm border border-gray-200"
                />
              </div>

              {/* Tech Slide Carousel */}
              <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="text-center mb-8">
                  <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Dispositivos en Movimiento</span>
                  <h4 className="font-outfit font-extrabold text-2xl text-gray-900 mt-1">Ecosistema Nexus</h4>
                </div>
                
                <div className="relative rounded-2xl overflow-hidden h-[400px] shadow-md bg-white border border-gray-200">
                  <img
                    src={techCarousel[carouselIndex].src}
                    alt={techCarousel[carouselIndex].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-8 text-white" />
                  
                  <div className="absolute bottom-8 left-8 right-8 z-10 text-white text-left">
                    <h5 className="font-outfit font-extrabold text-2xl uppercase tracking-tighter text-blue-400">{techCarousel[carouselIndex].title}</h5>
                    <p className="text-sm text-gray-200 mt-2">{techCarousel[carouselIndex].desc}</p>
                  </div>

                  <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/50 text-white flex items-center justify-center backdrop-blur-sm transition-colors z-20">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/50 text-white flex items-center justify-center backdrop-blur-sm transition-colors z-20">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {view === "laptops" && (
            <div className="max-w-6xl mx-auto px-6 py-12">
              <div className="text-center mb-16">
                <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">Portabilidad sin Límites</span>
                <h3 className="font-outfit font-extrabold text-3xl text-gray-900 mt-2">Línea Nexus AirBook</h3>
                <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {laptops.map((laptop) => (
                  <div key={laptop.id} className="bg-white rounded-2xl p-5 border border-gray-200 flex flex-col justify-between hover:border-blue-600 hover:shadow-lg transition-all duration-300">
                    <div>
                      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-gray-100">
                        <img src={laptop.img} alt={laptop.name} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="font-outfit font-bold text-lg text-gray-900">{laptop.name}</h4>
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed">{laptop.desc}</p>
                    </div>
                    <div className="mt-6 flex justify-between items-center border-t border-gray-100 pt-4">
                      <span className="font-outfit font-extrabold text-xl text-gray-900">{laptop.price}</span>
                      <button
                        onClick={() => handleAddToCart(laptop.name)}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 text-xs font-semibold uppercase flex items-center gap-1.5 transition-colors"
                      >
                        <Plus className="w-4 h-4" /> Añadir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "telefonos" && (
            <div className="max-w-6xl mx-auto px-6 py-12">
              <div className="text-center mb-16">
                <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">Conectividad Total</span>
                <h3 className="font-outfit font-extrabold text-3xl text-gray-900 mt-2">Nexus Phone Series</h3>
                <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {phones.map((phone) => (
                  <div key={phone.id} className="bg-white rounded-2xl p-5 border border-gray-200 flex flex-col justify-between hover:border-blue-600 hover:shadow-lg transition-all duration-300">
                    <div>
                      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-gray-100">
                        <img src={phone.img} alt={phone.name} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="font-outfit font-bold text-lg text-gray-900">{phone.name}</h4>
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed">{phone.desc}</p>
                    </div>
                    <div className="mt-6 flex justify-between items-center border-t border-gray-100 pt-4">
                      <span className="font-outfit font-extrabold text-xl text-gray-900">{phone.price}</span>
                      <button
                        onClick={() => handleAddToCart(phone.name)}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 text-xs font-semibold uppercase flex items-center gap-1.5 transition-colors"
                      >
                        <Plus className="w-4 h-4" /> Añadir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "especificaciones" && (
            <div className="max-w-6xl mx-auto px-6 py-12">
              <div className="text-center mb-16">
                <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">Especificaciones</span>
                <h3 className="font-outfit font-extrabold text-3xl text-gray-900 mt-2">Ficha Técnica e Ingeniería</h3>
                <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
              </div>

              {/* 12 HD Photos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {specsPhotos.map((photo, i) => (
                  <div key={i} className="relative overflow-hidden rounded-2xl shadow-sm border border-gray-200 group h-64">
                    <img
                      src={photo.src}
                      alt={photo.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-xs font-semibold uppercase tracking-wider">{photo.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "pre-compra" && (
            <div className="max-w-xl mx-auto px-6 py-12">
              <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-200/80 shadow-sm text-center">
                <h3 className="font-outfit font-extrabold text-2xl md:text-3xl text-gray-900 mb-2">RESERVA TU DISPOSITIVO</h3>
                <p className="text-sm text-gray-500 mb-8">Completa la orden para asegurar tu envío priorizado.</p>

                <form onSubmit={handlePreOrder} className="flex flex-col gap-5 text-left">
                  <div className="flex flex-col gap-2">
                    <label className="font-outfit text-xs font-semibold text-gray-700" htmlFor="name">
                      Nombre Completo
                    </label>
                    <input
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 font-sans focus:border-blue-600 focus:ring-1 focus:ring-blue-600/50 bg-[#f5f5f7] outline-none transition-all"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. Juan Pérez"
                      required
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-outfit text-xs font-semibold text-gray-700" htmlFor="email">
                      Correo Electrónico
                    </label>
                    <input
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 font-sans focus:border-blue-600 focus:ring-1 focus:ring-blue-600/50 bg-[#f5f5f7] outline-none transition-all"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ej. juan@correo.com"
                      required
                      type="email"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-outfit text-xs font-semibold text-gray-700" htmlFor="model">
                      Dispositivo a Reservar
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 font-sans focus:border-blue-600 focus:ring-1 focus:ring-blue-600/50 bg-[#f5f5f7] outline-none transition-all"
                      id="model"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                    >
                      <option>Nexus AirBook Pro 16 ($1,499)</option>
                      <option>Nexus Phone 15 Pro ($999)</option>
                      <option>Nexus Watch Ultra ($399)</option>
                      <option>Nexus SoundPods ($249)</option>
                    </select>
                  </div>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-2"
                    type="submit"
                  >
                    Iniciar Reserva
                  </button>
                </form>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-12 border-t border-white/10 mt-auto text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="font-outfit font-extrabold text-white text-lg tracking-tight flex items-center gap-2">
              <Laptop className="w-5 h-5 text-blue-500" /> NEXUS TECH
            </div>
            <p className="text-xs text-gray-600">© 2026 NEXUS TECH. TODOS LOS DERECHOS RESERVADOS.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
          </div>
        </div>
      </footer>

      {/* Botón de WhatsApp - Verde Oficial y Estático */}
      <a
        href="https://wa.me/573000000000"
        target="_blank"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform duration-300"
        aria-label="WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966C16.634 1.974 14.164.95 11.533.95 6.095.95 1.672 5.32 1.668 10.749c-.001 1.693.455 3.348 1.32 4.793l-.99 3.61 3.738-.971.05.029zm11.758-6.844c-.28-.14-1.654-.816-1.91-.908-.255-.093-.44-.139-.626.14-.185.279-.715.908-.876 1.093-.16.186-.322.21-.602.07-2.585-1.293-4.22-2.317-5.834-5.093-.28-.48-.08-.738.12-.936.18-.179.4-.467.6-.7.2-.234.267-.393.4-.656.133-.262.067-.492-.033-.679-.1-.186-.626-1.507-.856-2.061-.225-.54-.452-.467-.626-.476-.16-.008-.346-.01-.533-.01-.187 0-.493.07-.751.35-.258.28-.985.962-.985 2.343 0 1.38.1 2.719.14 2.906.04.186 2.012 3.073 4.876 4.31.68.295 1.21.47 1.62.601.68.216 1.3.186 1.79.112.55-.082 1.654-.675 1.884-1.327.23-.653.23-1.214.16-1.327-.07-.113-.255-.186-.534-.327z" />
        </svg>
      </a>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-gray-200"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="font-outfit font-extrabold text-2xl text-gray-900 mb-2">¡Reserva Registrada!</h3>
              <p
                className="text-sm text-gray-600 mb-6"
                dangerouslySetInnerHTML={{ __html: modalText }}
              />
              <button
                onClick={closeModal}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Aceptar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tecnologia;
