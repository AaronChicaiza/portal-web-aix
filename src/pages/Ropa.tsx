import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shirt, ShoppingBag, Plus, Sparkles, MapPin, Send, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { toast } from "sonner";

interface RopaProps {
  view: "inicio" | "colecciones" | "tienda" | "filosofia" | "contacto";
}

const Ropa = ({ view }: RopaProps) => {
  const [cartCount, setCartCount] = useState(0);
  const [emailInput, setEmailInput] = useState("");

  // Closet State
  const [closetOpen, setClosetOpen] = useState(false);

  // Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);

  const fashionCarousel = [
    { src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80", title: "Abrigos y Cortes Masculinos", desc: "Sastrería estructural de lana pesada." },
    { src: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80", title: "Texturas Lino y Seda Cruda", desc: "Suavidad orgánica de caída geométrica." },
    { src: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80", title: "Línea Alabastro Primavera", desc: "Tonos crudos minimalistas para el día." },
    { src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80", title: "Monocromos Vanguardia", desc: "El negro absoluto como declaración de forma." },
  ];

  const galleryPhotos = [
    { src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80", label: "Lookbook Otoño" },
    { src: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80", label: "Sastrería Onyx" },
    { src: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80", label: "Vestidos Ligeros" },
    { src: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80", label: "Pantalones Rígidos" },
    { src: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80", label: "Camisería de Popelina" },
    { src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80", label: "Colección Vanguardia" },
    { src: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80", label: "Estilo Esencial" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80", label: "Línea Arquitectónica" },
    { src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80", label: "Abrigo Editorial" },
    { src: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80", label: "Detalles del Estudio" },
    { src: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80", label: "Telas e Hilados" },
    { src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80", label: "Boutique Principal" },
  ];

  const closetProducts = [
    { id: "c1", name: "Saco Estructural Onyx", price: "$1,150", img: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80", desc: "100% Lana virgen con hombros marcados." },
    { id: "c2", name: "Blusa Popelina Asimétrica", price: "$490", img: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80", desc: "Corte drapeado asimétrico de algodón rígido." },
    { id: "c3", name: "Vestido Alabastro Lino", price: "$980", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80", desc: "Caída recta de lino orgánico texturizado." },
    { id: "c4", name: "Pantalón Cortado Negro", price: "$690", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80", desc: "Sastrería de tiro alto y bota ancha." },
  ];

  const products = [
    { id: 1, name: "Blazer Negro Estructurado", price: "$890", img: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80", desc: "Líneas limpias, lana virgen premium." },
    { id: 2, name: "Vestido Alabastro Asimétrico", price: "$1,200", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80", desc: "Silueta asimétrica de lino orgánico." },
    { id: 3, name: "Pantalón Ancho Obsidiana", price: "$650", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80", desc: "Sastrería fluida con pliegues frontales." },
    { id: 4, name: "Camisa Popelina Arquitectónica", price: "$420", img: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80", desc: "Corte geométrico de algodón rígido." },
    { id: 5, name: "Abrigo Gabardina Minimalista", price: "$1,450", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80", desc: "Lana de doble cara con hombros caídos." },
    { id: 6, name: "Suéter Hilo Algodón Crudo", price: "$380", img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80", desc: "Punto acanalado en hilo crudo sustentable." },
  ];

  const sublinks = [
    { to: "/ropa", label: "Inicio", activeView: "inicio" },
    { to: "/ropa/colecciones", label: "Colecciones", activeView: "colecciones" },
    { to: "/ropa/tienda", label: "Tienda", activeView: "tienda" },
    { to: "/ropa/filosofia", label: "Filosofía", activeView: "filosofia" },
    { to: "/ropa/contacto", label: "Contacto", activeView: "contacto" },
  ];

  const handleAddToCart = (productName: string) => {
    setCartCount((prev) => prev + 1);
    toast.success(`"${productName}" añadido al carrito`, {
      description: "Puedes revisar tu bolsa en la cabecera.",
      duration: 3000,
    });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    toast.success("¡Suscripción exitosa!", {
      description: `Hemos registrado el correo: ${emailInput} para acceso anticipado.`,
    });
    setEmailInput("");
  };

  const openCart = () => {
    if (cartCount === 0) {
      toast("Tu bolsa de compras está vacía", {
        description: "Explora la tienda para agregar artículos.",
      });
    } else {
      toast.info(`Bolsa de Compras`, {
        description: `Tienes ${cartCount} prendas seleccionadas para la facturación.`,
      });
    }
  };

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev === fashionCarousel.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev === 0 ? fashionCarousel.length - 1 : prev - 1));
  };

  return (
    <div className="bg-[#f9f9f9] text-[#000000] min-h-screen font-sans selection:bg-black selection:text-white rounded-none">
      {/* Sub-Header */}
      <div className="w-full bg-[#f9f9f9] border-b border-gray-200 sticky top-20 z-40">
        <div className="flex justify-between items-center max-w-6xl mx-auto px-6 py-4">
          <div className="flex gap-6 justify-center md:justify-start">
            {sublinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                  view === link.activeView
                    ? "text-black border-b-2 border-black pb-1"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <button
            onClick={openCart}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors text-xs font-semibold uppercase tracking-wider rounded-none"
          >
            <ShoppingBag className="w-4 h-4" />
            Bolsa ({cartCount})
          </button>
        </div>
      </div>

      {/* Vistas dinámicas */}
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="pb-24"
        >
          {view === "inicio" && (
            <div>
              {/* Hero Banner */}
              <section className="w-full min-h-[65vh] flex flex-col justify-center items-center text-center px-6 relative">
                <div className="absolute inset-0 -z-10 bg-gray-200">
                  <img
                    alt="Hero Background"
                    className="w-full h-full object-cover opacity-90"
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
                  />
                </div>
                <div className="absolute inset-0 bg-black/35 -z-10" />
                <h2 className="font-outfit font-extrabold text-4xl md:text-6xl text-white uppercase tracking-tighter mb-4">
                  VESTIMENTA
                </h2>
                <p className="text-base text-gray-200 max-w-xl mb-8">
                  Diseño de corte riguroso, geometría pura y una visión monocromática elegante para el cuerpo moderno.
                </p>
                <Link
                  to="/ropa/tienda"
                  className="bg-white text-black font-semibold text-xs px-10 py-4 hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-widest rounded-none border border-white"
                >
                  Explorar Tienda
                </Link>
              </section>

              {/* CLÓSET PRIVADO INTERACTIVO 3D */}
              <div className="max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Experiencia Interactiva</span>
                <h3 className="font-outfit font-extrabold text-2xl uppercase mb-6">Abre tu Clóset de Sastrería</h3>
                <p className="text-xs text-gray-500 mb-10 max-w-md">Interactúa abriendo las puertas en 3D para revelar las piezas exclusivas de la temporada colgadas en nuestro perchero virtual.</p>

                {/* Cabinet Closets Box */}
                <div className="relative w-full max-w-lg aspect-[4/3] bg-[#111] border-2 border-black overflow-hidden shadow-2xl flex items-center justify-center perspective-1000">
                  
                  {/* Detrás del Clóset: Perchero con ropa */}
                  <div className="absolute inset-0 w-full h-full bg-[#1c1c1c] flex flex-col justify-between p-6 z-0">
                    <div className="w-full h-1 bg-[#444] rounded-full relative flex justify-around items-end pt-8">
                      {/* Línea del gancho */}
                      {closetProducts.map((p) => (
                        <div key={p.id} className="flex flex-col items-center group cursor-pointer w-20">
                          {/* Colgador de ropa */}
                          <div className="w-6 h-6 border-2 border-gray-400 rounded-full border-b-0 -mb-1 transform group-hover:scale-105 transition-transform" />
                          <div className="w-16 aspect-[3/4] bg-gray-900 border border-gray-700 overflow-hidden relative shadow-md">
                            <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Eye className="w-5 h-5 text-white" />
                            </div>
                          </div>
                          <span className="text-[9px] text-gray-300 font-bold uppercase mt-2 truncate w-full text-center">{p.name}</span>
                          <button
                            onClick={() => handleAddToCart(p.name)}
                            className="mt-1 bg-white text-black px-1.5 py-0.5 text-[8px] font-bold uppercase hover:bg-black hover:text-white"
                          >
                            + Añadir
                          </button>
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest text-center">Colección Sastrería Otoño - Invierno</span>
                  </div>

                  {/* Puertas del Clóset en 3D */}
                  {/* Puerta Izquierda */}
                  <div
                    onClick={() => setClosetOpen(!closetOpen)}
                    style={{ transformOrigin: "left center" }}
                    className={`absolute top-0 left-0 w-1/2 h-full bg-[#0a0a0a] border-r border-[#333] z-10 cursor-pointer flex items-center justify-end pr-4 text-white transition-all duration-1000 ${
                      closetOpen ? "-rotate-y-110 shadow-lg opacity-90" : "rotate-y-0"
                    }`}
                  >
                    <div className="w-1.5 h-16 bg-zinc-800 rounded-sm" /> {/* Manija */}
                  </div>

                  {/* Puerta Derecha */}
                  <div
                    onClick={() => setClosetOpen(!closetOpen)}
                    style={{ transformOrigin: "right center" }}
                    className={`absolute top-0 right-0 w-1/2 h-full bg-[#0a0a0a] border-l border-[#333] z-10 cursor-pointer flex items-center justify-start pl-4 text-white transition-all duration-1000 ${
                      closetOpen ? "rotate-y-110 shadow-lg opacity-90" : "rotate-y-0"
                    }`}
                  >
                    <div className="w-1.5 h-16 bg-zinc-800 rounded-sm" /> {/* Manija */}
                  </div>
                </div>

                <button
                  onClick={() => setClosetOpen(!closetOpen)}
                  className="mt-8 px-8 py-3 bg-black text-white hover:bg-gray-800 text-xs font-bold uppercase tracking-wider rounded-none border border-black"
                >
                  {closetOpen ? "CERRAR CLÓSET" : "ABRIR CLÓSET"}
                </button>
              </div>

              {/* Minimalist Carousel */}
              <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="text-center mb-8">
                  <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Lookbook en Movimiento</span>
                  <h4 className="font-outfit font-extrabold text-2xl uppercase mt-1">Línea del Estudio</h4>
                </div>
                
                <div className="relative rounded-none overflow-hidden h-[400px] bg-white border border-gray-200">
                  <img
                    src={fashionCarousel[carouselIndex].src}
                    alt={fashionCarousel[carouselIndex].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 text-white" />
                  
                  <div className="absolute bottom-8 left-8 right-8 z-10 text-white text-left">
                    <h5 className="font-outfit font-extrabold text-2xl uppercase tracking-tighter text-white">{fashionCarousel[carouselIndex].title}</h5>
                    <p className="text-sm text-gray-300 mt-2">{fashionCarousel[carouselIndex].desc}</p>
                  </div>

                  <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-none bg-black/20 hover:bg-black/80 text-white flex items-center justify-center border border-white/20 transition-colors z-20">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-none bg-black/20 hover:bg-black/80 text-white flex items-center justify-center border border-white/20 transition-colors z-20">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {view === "colecciones" && (
            <div className="max-w-6xl mx-auto px-6 py-12">
              <div className="text-center mb-16">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Lookbook Editorial</span>
                <h3 className="font-outfit font-bold text-3xl uppercase tracking-tight mt-2">Nuestras Líneas de Diseño</h3>
                <div className="h-[1px] w-20 bg-black mx-auto mt-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="relative overflow-hidden h-[400px] group cursor-pointer border border-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80"
                    alt="Vanguardia"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h4 className="font-outfit font-bold text-xl uppercase">Vanguardia</h4>
                  </div>
                </div>
                <div className="relative overflow-hidden h-[400px] group cursor-pointer border border-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80"
                    alt="Esencial"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h4 className="font-outfit font-bold text-xl uppercase">Esencial</h4>
                  </div>
                </div>
                <div className="relative overflow-hidden h-[400px] group cursor-pointer border border-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"
                    alt="Arquitectónico"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h4 className="font-outfit font-bold text-xl uppercase">Arquitectónico</h4>
                  </div>
                </div>
              </div>

              {/* 12 HD Photos */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryPhotos.map((photo, i) => (
                  <div key={i} className="relative overflow-hidden h-48 border border-gray-200 group">
                    <img src={photo.src} alt={photo.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                      <span className="text-white text-[10px] font-bold uppercase tracking-wider">{photo.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "tienda" && (
            <div className="max-w-6xl mx-auto px-6 py-12">
              <div className="text-center mb-16">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Catálogo Completo</span>
                <h3 className="font-outfit font-bold text-3xl uppercase tracking-tight mt-2">Comprar Artículos</h3>
                <div className="h-[1px] w-20 bg-black mx-auto mt-4"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {products.map((product) => (
                  <div key={product.id} className="flex flex-col justify-between group border border-gray-200/50 p-4 bg-white">
                    <div>
                      <div className="w-full aspect-[3/4] bg-gray-100 mb-6 overflow-hidden">
                        <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500" />
                      </div>
                      <h4 className="font-bold text-sm uppercase">{product.name}</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{product.desc}</p>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-outfit font-bold text-lg">{product.price}</span>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product.name)}
                        className="w-full bg-black text-white hover:bg-gray-800 py-3 text-xs uppercase font-semibold transition-colors flex items-center justify-center gap-2 rounded-none"
                      >
                        <Plus className="w-4 h-4" />
                        Añadir al Carrito
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "filosofia" && (
            <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-12">
              <div className="text-center">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Identidad Rígida</span>
                <h3 className="font-outfit font-bold text-3xl uppercase mt-2">La Belleza en la Moderación</h3>
                <div className="h-[1px] w-20 bg-black mx-auto mt-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <img
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80"
                  alt="Estudio VESTIMENTA"
                  className="w-full h-[400px] object-cover border border-gray-200"
                />
                <div className="flex flex-col gap-4">
                  <p className="text-gray-600 leading-relaxed text-sm">
                    VESTIMENTA strips away the superfluous to reveal the essence of form. We believe that true luxury lies in restraint—in precise cuts, uncompromising materials, and a stark monochromatic vision.
                  </p>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Nuestros abrigos, camisas y sastrería son fabricados localmente en pequeños talleres ecológicos, bajo condiciones laborales certificadas y con telas biodegradables, garantizando una huella de carbono neutral.
                  </p>
                </div>
              </div>
            </div>
          )}

          {view === "contacto" && (
            <div className="max-w-xl mx-auto px-6 py-12">
              <div className="bg-white p-8 md:p-12 border border-gray-200 shadow-sm text-center">
                <h3 className="font-outfit font-bold text-2xl uppercase mb-2">Únete al Círculo</h3>
                <p className="text-xs text-gray-500 mb-8 leading-relaxed uppercase tracking-wider">
                  Suscríbete para recibir invitaciones exclusivas de preventa de nuestras colecciones editoriales.
                </p>

                <form onSubmit={handleSubscribe} className="flex flex-col gap-4 text-left">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-gray-700 uppercase" htmlFor="email">
                      Dirección de Correo
                    </label>
                    <input
                      className="w-full bg-[#f9f9f9] border border-gray-300 rounded-none px-4 py-3 focus:outline-none focus:border-black transition-all"
                      id="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="correo@ejemplo.com"
                      required
                      type="email"
                    />
                  </div>
                  <button
                    className="bg-black hover:bg-gray-800 text-white font-semibold py-4 w-full uppercase tracking-widest transition-colors flex items-center justify-center gap-2 mt-2 rounded-none"
                    type="submit"
                  >
                    <Send className="w-4 h-4" /> Suscribirse
                  </button>
                </form>

                <div className="flex flex-col gap-2 mt-12 text-xs text-gray-500 pt-6 border-t border-gray-100">
                  <span className="flex items-center gap-2 justify-center">
                    <MapPin className="w-4 h-4 text-black" /> Showroom: París - Nueva York
                  </span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-black text-white py-16 text-center text-xs text-gray-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-outfit font-bold text-xl tracking-tighter text-white">VESTIMENTA</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Sostenibilidad</a>
            <a href="#" className="hover:text-white transition-colors">Envíos</a>
          </div>
          <p>© 2026 VESTIMENTA. TODOS LOS DERECHOS RESERVADOS.</p>
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
    </div>
  );
};

export default Ropa;
