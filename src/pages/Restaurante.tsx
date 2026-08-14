import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, CheckCircle, MapPin, Clock, Award, ChevronLeft, ChevronRight, BookOpen, User } from "lucide-react";

interface RestauranteProps {
  view: "inicio" | "menu" | "nosotros" | "experiencias" | "reservas";
}

const Restaurante = ({ view }: RestauranteProps) => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("2 Personas");
  const [date, setDate] = useState("");
  const [selectedZone, setSelectedZone] = useState("Terraza Vista al Mar");

  // Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Recipe Flip State (indices of flipped cards)
  const [flippedRecipes, setFlippedRecipes] = useState<number[]>([]);

  const toggleRecipeFlip = (index: number) => {
    setFlippedRecipes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !date) return;

    setModalText(
      `Estimado(a) <strong>${name}</strong>, hemos registrado su solicitud de reserva para <strong>${guests}</strong> el día <strong>${date}</strong> en la zona de <strong>${selectedZone}</strong> de MISTRAL. Nos pondremos en contacto para reconfirmar su mesa.`
    );
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setName("");
    setDate("");
  };

  const foodCarousel = [
    { src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80", title: "Ensalada Templada del Huerto", desc: "Hortalizas frescas cosechadas en la mañana con vinagreta de jerez." },
    { src: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80", title: "Pasta Rústica con Mariscos", desc: "Hecha a mano diariamente en nuestro bistró." },
    { src: "https://images.unsplash.com/photo-1534080391025-097d5c11be50?auto=format&fit=crop&w=800&q=80", title: "Cazuela de Pulpo y Langostinos", desc: "Cocidos a fuego lento con oliva y romero." },
    { src: "https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=800&q=80", title: "Bruschettas de Jamón Serrano e Higo", desc: "Pan de masa madre tostado a la leña." },
  ];

  const galleryPhotos = [
    { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80", label: "Terraza Principal" },
    { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80", label: "Salón Central" },
    { src: "https://images.unsplash.com/photo-1533777857889-4fa7c7274395?auto=format&fit=crop&w=600&q=80", label: "Terraza Exterior" },
    { src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80", label: "Nuestra Cocina" },
    { src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80", label: "Ensaladas del Huerto" },
    { src: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80", label: "Pastas Frescas" },
    { src: "https://images.unsplash.com/photo-1534080391025-097d5c11be50?auto=format&fit=crop&w=600&q=80", label: "Pescados Asados" },
    { src: "https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=600&q=80", label: "Aperitivos" },
    { src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80", label: "Nuestra Cava" },
    { src: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80", label: "Repostería Artesanal" },
    { src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&q=80", label: "Coctelería de Autor" },
    { src: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80", label: "Olivos y Especias" },
  ];

  const chefRecipes = [
    {
      title: "Bruschetta de Higo y Ricota",
      desc: "Pan de campo crujiente con higos frescos y ricota batida.",
      ingredients: ["Pan rústico de masa madre", "Higos maduros", "Ricota fresca", "Miel de tomillo", "Hojas de albahaca"],
      steps: "Tostar el pan con oliva. Untar la ricota batida. Disponer los higos en rodajas. Rociar con miel y albahaca fresca.",
    },
    {
      title: "Spaghetti con Mariscos",
      desc: "Pasta fresca estirada a mano salteada con vino blanco y ajo.",
      ingredients: ["Pasta fresca", "Langostinos limpios", "Mejillones frescos", "Ajo y Peperoncino", "Vino blanco seco"],
      steps: "Hervir la pasta al dente. En una sartén, dorar ajo y peperoncino en oliva. Añadir mariscos, desglasar con vino blanco. Mezclar con la pasta.",
    },
    {
      title: "Pulpo a la Parrilla Mistral",
      desc: "Pulpo tierno asado con pimentón y puré de garbanzos rústico.",
      ingredients: ["Tentáculo de pulpo cocido", "Pimentón dulce ahumado", "Garbanzos cocidos", "Diente de ajo confitado", "Limón"],
      steps: "Asar el pulpo a fuego alto hasta dorar los bordes. Licuar los garbanzos con ajo confitado y oliva. Servir el pulpo sobre el puré con pimentón.",
    },
  ];

  const tableZones = [
    { name: "Terraza Vista al Mar", desc: "Brisa marina, ideal para atardeceres y veladas íntimas.", status: "Disponible" },
    { name: "Salón del Olivo Central", desc: "Alrededor de nuestro olivo centenario, música suave.", status: "Disponible" },
    { name: "Jardín Rústico Secreto", desc: "Rodeado de flores de terracota y parras de uvas.", status: "Pocas Mesas" },
    { name: "Mesa Privada de la Cava", desc: "Ambiente reservado y fresco dentro de la cava.", status: "Reservación Previa" },
  ];

  const sublinks = [
    { to: "/restaurante", label: "Inicio", activeView: "inicio" },
    { to: "/restaurante/menu", label: "Carta/Menú", activeView: "menu" },
    { to: "/restaurante/nosotros", label: "Nosotros", activeView: "nosotros" },
    { to: "/restaurante/experiencias", label: "Experiencias", activeView: "experiencias" },
    { to: "/restaurante/reservas", label: "Reservas", activeView: "reservas" },
  ];

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev === foodCarousel.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev === 0 ? foodCarousel.length - 1 : prev - 1));
  };

  return (
    <div className="bg-[#faf6f0] text-[#2c2c2c] min-h-screen font-sans selection:bg-[#e2725b] selection:text-white">
      {/* Sub-Header */}
      <div className="w-full bg-[#f4ece1] border-b border-[#e2725b]/20 sticky top-20 z-40">
        <div className="flex gap-6 max-w-6xl mx-auto px-6 py-4 justify-center md:justify-start">
          {sublinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                view === link.activeView
                  ? "text-[#e2725b] border-b-2 border-[#e2725b] pb-1"
                  : "text-gray-500 hover:text-[#556b2f]"
              }`}
            >
              {link.label}
            </Link>
          ))}
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
              <div className="relative h-[65vh] flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1533777857889-4fa7c7274395?auto=format&fit=crop&w=1200&q=80"
                  alt="Mistral Terraza"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center gap-4">
                  <span className="text-[#e2725b] font-bold text-xs uppercase tracking-widest bg-white/95 px-4 py-1.5 rounded-full">
                    Sabor del Mediterráneo
                  </span>
                  <h2 className="font-serif text-5xl md:text-7xl text-white tracking-tight uppercase">
                    MISTRAL
                  </h2>
                  <p className="text-gray-200 text-lg md:text-xl font-medium tracking-wide">
                    Terraza, Bistró &amp; Cocina Honesta
                  </p>
                  <Link
                    to="/restaurante/reservas"
                    className="mt-4 bg-[#e2725b] hover:bg-[#556b2f] text-white text-xs font-bold uppercase px-8 py-3.5 rounded-xl transition-all shadow-md"
                  >
                    Reservar una Mesa
                  </Link>
                </div>
              </div>

              {/* Presentación */}
              <div className="max-w-4xl mx-auto px-6 text-center py-20 flex flex-col gap-6">
                <h3 className="font-serif text-3xl text-[#556b2f] font-bold">Bienvenidos a la Terraza</h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  Ubicado en una terraza soleada, **MISTRAL** rinde homenaje a los bistrós de la costa mediterránea. Fusionamos ingredientes frescos locales, hierbas aromáticas, aceites artesanales y pescados del día para crear platos saludables llenos de vitalidad. Nuestro espacio combina detalles de madera rústica, olivos y flores de terracota.
                </p>
                <div className="flex justify-center gap-8 text-xs text-gray-500 mt-6 font-semibold uppercase tracking-wider flex-wrap">
                  <span className="flex items-center gap-2 text-[#556b2f]">
                    <MapPin className="w-4 h-4 text-[#e2725b]" /> Av. del Sol 450, Terraza
                  </span>
                  <span className="flex items-center gap-2 text-[#556b2f]">
                    <Clock className="w-4 h-4 text-[#e2725b]" /> 12:00 PM - 11:00 PM
                  </span>
                </div>
              </div>

              {/* Food Carousel */}
              <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="text-center mb-8">
                  <span className="text-[#e2725b] font-bold text-xs uppercase tracking-widest">Nuestra Cocina en Fotos</span>
                  <h4 className="font-serif text-2xl text-[#556b2f] font-bold mt-1">Especialidades de Temporada</h4>
                </div>
                
                <div className="relative rounded-2xl overflow-hidden h-[400px] shadow-lg group border border-[#e2725b]/10 bg-white">
                  <img
                    src={foodCarousel[carouselIndex].src}
                    alt={foodCarousel[carouselIndex].title}
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-8 text-white" />
                  
                  <div className="absolute bottom-8 left-8 right-8 z-10 text-white">
                    <h5 className="font-serif text-xl md:text-2xl text-[#f2ca50] font-bold">{foodCarousel[carouselIndex].title}</h5>
                    <p className="text-sm text-gray-300 mt-2 leading-relaxed">{foodCarousel[carouselIndex].desc}</p>
                  </div>

                  <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-sm transition-colors z-20">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-sm transition-colors z-20">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {view === "menu" && (
            <div className="max-w-5xl mx-auto px-6 py-12">
              <div className="text-center mb-16">
                <span className="text-[#e2725b] font-bold uppercase tracking-widest text-xs">Nuestra Carta</span>
                <h3 className="font-serif text-3xl md:text-4xl text-[#556b2f] mt-2">Menú Fresco Mediterráneo</h3>
                <div className="h-1 w-20 bg-[#e2725b] mx-auto mt-4 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                  <h4 className="font-serif text-2xl text-[#e2725b] mb-8 border-b border-[#e2725b]/20 pb-4">Entradas &amp; Tapas</h4>
                  <ul className="space-y-6">
                    <li className="flex justify-between items-center group cursor-pointer hover:text-[#e2725b] transition-colors">
                      <div>
                        <span className="font-bold text-gray-800">Bruschetta de Higo y Prosciutto</span>
                        <p className="text-xs text-gray-500 mt-1">Con queso ricota batido y miel de lavanda.</p>
                      </div>
                      <span className="font-bold text-[#556b2f] ml-4">$18</span>
                    </li>
                    <li className="flex justify-between items-center group cursor-pointer hover:text-[#e2725b] transition-colors">
                      <div>
                        <span className="font-bold text-gray-800">Flores de Calabaza Rellenas</span>
                        <p className="text-xs text-gray-500 mt-1">Rellenas de queso cabra y fritas en tempura ligera.</p>
                      </div>
                      <span className="font-bold text-[#556b2f] ml-4">$22</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-serif text-2xl text-[#e2725b] mb-8 border-b border-[#e2725b]/20 pb-4">Platos Fuertes</h4>
                  <ul className="space-y-6">
                    <li className="flex justify-between items-center group cursor-pointer hover:text-[#e2725b] transition-colors">
                      <div>
                        <span className="font-bold text-gray-800">Pulpo Asado al Carbón</span>
                        <p className="text-xs text-gray-500 mt-1">Sobre puré de garbanzos rústico y aceite de pimentón ahumado.</p>
                      </div>
                      <span className="font-bold text-[#556b2f] ml-4">$38</span>
                    </li>
                    <li className="flex justify-between items-center group cursor-pointer hover:text-[#e2725b] transition-colors">
                      <div>
                        <span className="font-bold text-gray-800">Pasta Frita de Langosta</span>
                        <p className="text-xs text-gray-500 mt-1">Spaghetti casero con langosta y salsa de tomate confitado.</p>
                      </div>
                      <span className="font-bold text-[#556b2f] ml-4">$42</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {view === "nosotros" && (
            <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-16">
              <div className="text-center">
                <span className="text-[#e2725b] font-bold uppercase tracking-widest text-xs">Nuestra Historia</span>
                <h3 className="font-serif text-4xl text-[#556b2f] mt-2">La Cocina del Chef</h3>
                <div className="h-1 w-20 bg-[#e2725b] mx-auto mt-4 rounded-full"></div>
              </div>

              {/* Libro de Recetas Interactivo de Chef (3 Tarjetas Flip) */}
              <div>
                <div className="text-center mb-8 flex justify-center items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#e2725b]" />
                  <span className="font-bold text-xs uppercase tracking-wider text-gray-500">Recetario del Chef (Haz clic para voltear)</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {chefRecipes.map((recipe, idx) => {
                    const isFlipped = flippedRecipes.includes(idx);
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleRecipeFlip(idx)}
                        className="h-72 cursor-pointer relative w-full perspective-1000"
                      >
                        <div
                          className={`w-full h-full duration-500 transform-style-3d relative transition-all ${
                            isFlipped ? "rotate-y-180" : ""
                          }`}
                        >
                          {/* Cara Frontal */}
                          <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-2xl border border-[#e2725b]/20 p-6 flex flex-col justify-between shadow-sm">
                            <div>
                              <span className="text-[10px] text-[#e2725b] font-bold uppercase tracking-wider">Receta {idx + 1}</span>
                              <h4 className="font-serif text-xl text-[#556b2f] font-bold mt-2">{recipe.title}</h4>
                              <p className="text-xs text-gray-500 mt-2 leading-relaxed">{recipe.desc}</p>
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hacer clic para ver ingredientes</span>
                          </div>

                          {/* Cara Trasera */}
                          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#f4ece1] rounded-2xl border border-[#556b2f]/30 p-6 flex flex-col justify-between shadow-sm text-left">
                            <div>
                              <h5 className="font-bold text-xs text-[#556b2f] uppercase tracking-wider mb-2">Ingredientes:</h5>
                              <ul className="list-disc pl-4 text-xs text-gray-700 space-y-0.5">
                                {recipe.ingredients.map((ing, i) => (
                                  <li key={i}>{ing}</li>
                                ))}
                              </ul>
                              <h5 className="font-bold text-xs text-[#556b2f] uppercase tracking-wider mt-3 mb-1">Paso a paso:</h5>
                              <p className="text-[10px] text-gray-600 leading-normal">{recipe.steps}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {view === "experiencias" && (
            <div className="max-w-6xl mx-auto px-6 py-12">
              <div className="text-center mb-16">
                <span className="text-[#e2725b] font-bold uppercase tracking-widest text-xs">Galería de Fotos</span>
                <h3 className="font-serif text-4xl text-[#556b2f] mt-2">La Vida en Mistral</h3>
                <p className="text-sm text-gray-500 mt-2">Explora los momentos, platos y rincones de nuestra terraza.</p>
                <div className="h-1 w-20 bg-[#e2725b] mx-auto mt-4 rounded-full"></div>
              </div>

              {/* 12 HD Photos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {galleryPhotos.map((photo, i) => (
                  <div key={i} className="relative overflow-hidden rounded-2xl shadow-sm border border-gray-200 group h-64">
                    <img
                      src={photo.src}
                      alt={photo.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-xs font-semibold uppercase tracking-wider">{photo.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "reservas" && (
            <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 items-center">
              {/* Selector de zona de mesa */}
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <div>
                  <span className="text-[#e2725b] font-bold uppercase tracking-widest text-xs">Distribución</span>
                  <h3 className="font-serif text-3xl text-[#556b2f] font-bold mt-1">Selecciona tu Zona</h3>
                  <p className="text-xs text-gray-500 mt-1">Haz clic para elegir la zona que deseas reservar.</p>
                </div>
                
                <div className="flex flex-col gap-4">
                  {tableZones.map((zone) => (
                    <div
                      key={zone.name}
                      onClick={() => setSelectedZone(zone.name)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedZone === zone.name
                          ? "border-[#e2725b] bg-white shadow-sm"
                          : "border-gray-200 bg-[#f4ece1]/30 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-gray-800">{zone.name}</span>
                        <span className="text-[10px] bg-white border border-gray-200 text-[#556b2f] px-2 py-0.5 font-bold rounded">
                          {zone.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{zone.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formulario */}
              <div className="w-full lg:w-1/2 bg-white p-8 md:p-12 rounded-3xl border border-[#e2725b]/10 shadow-sm text-center">
                <h3 className="font-serif text-2xl text-[#556b2f] mb-4 uppercase">Confirmar Reserva</h3>
                <p className="text-xs text-gray-400 mb-8 uppercase tracking-widest">
                  Zona seleccionada: <span className="text-[#e2725b] font-bold">{selectedZone}</span>
                </p>

                <form onSubmit={handleReserve} className="flex flex-col gap-5 text-left">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#556b2f] uppercase" htmlFor="name">
                      Nombre Completo
                    </label>
                    <input
                      className="w-full bg-[#faf6f0] border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#e2725b] focus:ring-1 focus:ring-[#e2725b] transition-all"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre completo"
                      required
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#556b2f] uppercase" htmlFor="guests">
                      Número de Personas
                    </label>
                    <select
                      className="w-full bg-[#faf6f0] border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#e2725b] focus:ring-1 focus:ring-[#e2725b] transition-all"
                      id="guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                    >
                      <option>1 Persona</option>
                      <option>2 Personas</option>
                      <option>4 Personas</option>
                      <option>6 Personas o más</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#556b2f] uppercase" htmlFor="date">
                      Fecha de Reserva
                    </label>
                    <input
                      className="w-full bg-[#faf6f0] border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#e2725b] focus:ring-1 focus:ring-[#e2725b] transition-all"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      type="date"
                    />
                  </div>
                  <button
                    className="bg-[#e2725b] hover:bg-[#556b2f] text-white font-semibold py-4 w-full rounded-xl uppercase tracking-widest transition-colors mt-2"
                    type="submit"
                  >
                    Confirmar Mesa
                  </button>
                </form>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-[#f4ece1] border-t border-[#e2725b]/10 py-16 text-center text-xs text-gray-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-serif text-lg font-bold text-[#e2725b]">MISTRAL</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#e2725b] transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="hover:text-[#e2725b] transition-colors">
              Términos del Servicio
            </a>
          </div>
          <p>© 2026 MISTRAL TERRAZA &amp; BISTRÓ. TODOS LOS DERECHOS RESERVADOS.</p>
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
              <CheckCircle className="w-16 h-16 text-[#e2725b] mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-gray-900 mb-2">¡Reserva Solicitada!</h3>
              <p
                className="text-sm text-gray-600 mb-6"
                dangerouslySetInnerHTML={{ __html: modalText }}
              />
              <button
                onClick={closeModal}
                className="w-full bg-[#e2725b] hover:bg-[#556b2f] text-white font-semibold py-3 rounded-xl transition-colors uppercase tracking-widest text-xs"
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

export default Restaurante;
