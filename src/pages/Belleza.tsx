import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Flower, Heart, Check, Users, Sparkles, MapPin, ChevronLeft, ChevronRight, Calculator, Calendar } from "lucide-react";

interface BellezaProps {
  view: "inicio" | "servicios" | "equipo" | "instalaciones" | "reservas";
}

const Belleza = ({ view }: BellezaProps) => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  // Custom Spa Day State
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showItinerary, setShowItinerary] = useState(false);

  // Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);

  const spaCarousel = [
    { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80", title: "Masaje de Relajación Profunda", desc: "Aromas botánicos para calmar el sistema nervioso." },
    { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80", title: "Limpieza y Luminosidad Facial", desc: "Terapia exfoliante con extractos de rosas." },
    { src: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80", title: "Sauna Privada y Aromaterapia", desc: "Desintoxicación y purificación de la piel." },
    { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80", title: "Tina de Jacuzzi con Pétalos", desc: "Ritual terapéutico de inmersión en agua tibia." },
  ];

  const galleryPhotos = [
    { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80", label: "Lobby Lumina" },
    { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80", label: "Cabinas de Masaje" },
    { src: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=600&q=80", label: "Salas de Reposo" },
    { src: "https://images.unsplash.com/photo-1519735797-402a78f2441f?auto=format&fit=crop&w=600&q=80", label: "Aceites Esenciales" },
    { src: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80", label: "Baño Facial de Vapor" },
    { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80", label: "Tina Terapéutica" },
    { src: "https://images.unsplash.com/photo-1598901861138-648b440964fb?auto=format&fit=crop&w=600&q=80", label: "Sauna Caliente" },
    { src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80", label: "Terraza Zen" },
    { src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80", label: "Manicure" },
    { src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80", label: "Pedicure" },
    { src: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&w=600&q=80", label: "Flor de Loto" },
    { src: "https://images.unsplash.com/photo-1600334189155-8152136653f8?auto=format&fit=crop&w=600&q=80", label: "Espejos Orgánicos" },
  ];

  const packageCreatorList = [
    { id: "facial", name: "Tratamiento Facial Luminosidad", price: 185, duration: 60 },
    { id: "massage", name: "Masaje de Piedras Calientes", price: 165, duration: 75 },
    { id: "scrub", name: "Exfoliación con Sal del Himalaya", price: 120, duration: 45 },
    { id: "jacuzzi", name: "Jacuzzi Privado con Rosas", price: 95, duration: 30 },
    { id: "tea", name: "Sesión de Té & Aromas Detóx", price: 40, duration: 30 },
  ];

  const sublinks = [
    { to: "/belleza", label: "Inicio", activeView: "inicio" },
    { to: "/belleza/servicios", label: "Servicios/Spa", activeView: "servicios" },
    { to: "/belleza/equipo", label: "Terapeutas", activeView: "equipo" },
    { to: "/belleza/instalaciones", label: "Instalaciones", activeView: "instalaciones" },
    { to: "/belleza/reservas", label: "Citas", activeView: "reservas" },
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !date) return;

    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    setModalText(
      `Estimada(o) <strong>${name}</strong>, su cita ha sido reservada para el <strong>${formattedDate}</strong> en Lumina Spa. Le enviaremos un SMS para reconfirmar.`
    );
    setShowModal(true);
  };

  const togglePackageService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const calculatePackage = () => {
    let totalPrice = 0;
    let totalTime = 0;
    selectedServices.forEach((id) => {
      const service = packageCreatorList.find((s) => s.id === id);
      if (service) {
        totalPrice += service.price;
        totalTime += service.duration;
      }
    });
    return { price: totalPrice, time: totalTime };
  };

  const packageResult = calculatePackage();

  const handleBookCustomPackage = () => {
    if (selectedServices.length === 0) return;
    const serviceNames = selectedServices
      .map((id) => packageCreatorList.find((s) => s.id === id)?.name)
      .join(", ");
    
    setModalText(
      `¡Tu Paquete de Spa Personalizado ha sido pre-reservado! Has seleccionado: <strong>${serviceNames}</strong> por un valor total de <strong>$${packageResult.price} USD</strong>. Te contactaremos telefónicamente para fijar el horario de tu itinerario.`
    );
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setName("");
    setDate("");
    setSelectedServices([]);
    setShowItinerary(false);
  };

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev === spaCarousel.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev === 0 ? spaCarousel.length - 1 : prev - 1));
  };

  return (
    <div className="bg-[#fff8f5] text-[#735850] min-h-screen font-sans selection:bg-[#f4d0c5] selection:text-gray-950">
      {/* Sub-Header */}
      <div className="w-full bg-[#fbf2ed] border-b border-[#735850]/10 sticky top-20 z-40">
        <div className="flex gap-6 max-w-6xl mx-auto px-6 py-4 justify-center md:justify-start">
          {sublinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                view === link.activeView
                  ? "text-[#b76e79] border-b-2 border-[#b76e79] pb-1"
                  : "text-gray-500 hover:text-[#735850]"
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
              <div className="relative min-h-[60vh] flex items-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80"
                  alt="Spa Interior"
                  className="absolute inset-0 w-full h-full object-cover opacity-45"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#fff8f5] via-[#fff8f5]/60 to-transparent" />
                <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full flex flex-col items-center md:items-start text-center md:text-left">
                  <span className="text-xs font-semibold text-[#b76e79] uppercase tracking-[0.2em] mb-4">
                    Sanación Cuerpomente
                  </span>
                  <h2 className="font-serif text-4xl md:text-6xl text-[#735850] mb-4 leading-tight">
                    LUMINA SPA
                  </h2>
                  <p className="text-base text-gray-600 max-w-lg mb-8">
                    Tratamientos estéticos faciales, corporales y rituales holísticos que te regresan a tu estado de armonía original.
                  </p>
                  <Link
                    to="/belleza/reservas"
                    className="bg-[#735850] text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-[#b76e79] transition-all shadow-md"
                  >
                    Agendar Tratamiento
                  </Link>
                </div>
              </div>

              {/* Presentación Organica con Fotos Circulares */}
              <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 py-20 items-center">
                <div className="flex justify-center">
                  <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-[#f4d0c5] shadow-sm relative">
                    <img
                      src="https://images.unsplash.com/photo-1519735797-402a78f2441f?auto=format&fit=crop&w=600&q=80"
                      alt="Tratamiento Facial"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-6 text-center md:text-left">
                  <span className="text-[#b76e79] font-bold text-xs uppercase tracking-widest">Rituales Holísticos</span>
                  <h3 className="font-serif text-3xl text-[#735850]">El Arte del Cuidado Propio</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    En Lumina Spa creemos que la belleza externa es un reflejo de la calma interior. Nuestras terapeutas expertas utilizan aceites botánicos orgánicos e ingredientes marinos, combinados con técnicas de masaje orientales y tecnología estética avanzada, para brindar resultados duraderos y una relajación reparadora.
                  </p>
                </div>
              </div>

              {/* Image Carousel */}
              <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="text-center mb-8">
                  <span className="text-[#b76e79] font-bold text-xs uppercase tracking-widest">Bienestar en Fotos</span>
                  <h4 className="font-serif text-2xl text-[#735850] font-bold mt-1">Tratamientos Exclusivos</h4>
                </div>
                
                <div className="relative rounded-3xl overflow-hidden h-[400px] shadow-md bg-white border border-[#f4d0c5]/20">
                  <img
                    src={spaCarousel[carouselIndex].src}
                    alt={spaCarousel[carouselIndex].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 text-white" />
                  
                  <div className="absolute bottom-8 left-8 right-8 z-10 text-white">
                    <h5 className="font-serif text-xl md:text-2xl text-[#f4d0c5] font-bold">{spaCarousel[carouselIndex].title}</h5>
                    <p className="text-sm text-gray-200 mt-2">{spaCarousel[carouselIndex].desc}</p>
                  </div>

                  <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 text-white flex items-center justify-center backdrop-blur-sm transition-colors z-20">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 text-white flex items-center justify-center backdrop-blur-sm transition-colors z-20">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {view === "servicios" && (
            <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-20">
              <div className="text-center">
                <span className="text-[#b76e79] font-bold uppercase tracking-widest text-xs">Menú de Spa</span>
                <h3 className="font-serif text-3xl md:text-4xl text-[#735850] mt-2">Nuestras Tarifas</h3>
                <div className="h-1 w-20 bg-[#b76e79] mx-auto mt-4 rounded-full"></div>
              </div>

              {/* Diseño interactivo: Personalizador de Día de Spa */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl p-8 border border-[#f4d0c5]/20 shadow-sm">
                <div>
                  <div className="flex items-center gap-2 mb-4 text-[#b76e79]">
                    <Calculator className="w-5 h-5" />
                    <span className="font-bold text-xs uppercase tracking-wider">Diseña tu Día de Spa Personalizado</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-6">Marca los servicios que deseas recibir de forma continua. Calcularemos el costo e itinerario completo.</p>
                  
                  <div className="flex flex-col gap-3">
                    {packageCreatorList.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => togglePackageService(service.id)}
                        className={`flex items-center justify-between p-4 rounded-full border cursor-pointer transition-all ${
                          selectedServices.includes(service.id)
                            ? "border-[#b76e79] bg-[#fff8f5] shadow-xs"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            selectedServices.includes(service.id) ? "bg-[#b76e79] border-[#b76e79] text-white" : "border-gray-300"
                          }`}>
                            {selectedServices.includes(service.id) && <Check className="w-3 h-3" />}
                          </div>
                          <span className="text-xs font-bold text-gray-800">{service.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-[#b76e79] block">${service.price} USD</span>
                          <span className="text-[10px] text-gray-400">{service.duration} mins</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#fff8f5] rounded-2xl p-6 flex flex-col justify-between border border-[#f4d0c5]/20 text-center lg:text-left">
                  <div>
                    <h4 className="font-serif text-xl text-[#735850] font-bold mb-4 border-b border-[#f4d0c5] pb-2">Tu Presupuesto Especial</h4>
                    <div className="flex justify-between items-center py-2 text-xs text-gray-600">
                      <span>Servicios seleccionados:</span>
                      <span className="font-bold text-gray-800">{selectedServices.length}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 text-xs text-gray-600">
                      <span>Duración total estimada:</span>
                      <span className="font-bold text-gray-800">{packageResult.time} minutos ({Math.round(packageResult.time / 60 * 10) / 10} h)</span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-t border-dashed border-gray-300 mt-4 text-[#735850]">
                      <span className="font-bold">Total Estimado:</span>
                      <span className="font-serif text-2xl font-extrabold text-[#b76e79]">${packageResult.price} USD</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleBookCustomPackage}
                    disabled={selectedServices.length === 0}
                    className="w-full bg-[#b76e79] hover:bg-[#a35e69] disabled:bg-gray-300 text-white font-semibold py-4 rounded-full uppercase tracking-widest text-xs transition-colors mt-6"
                  >
                    Reservar este Paquete
                  </button>
                </div>
              </div>
            </div>
          )}

          {view === "equipo" && (
            <div className="max-w-5xl mx-auto px-6 py-12">
              <div className="text-center mb-16">
                <span className="text-[#b76e79] font-bold uppercase tracking-widest text-xs">Expertos en Bienestar</span>
                <h3 className="font-serif text-3xl text-[#735850] mt-2">Nuestras Terapeutas</h3>
                <div className="h-1 w-20 bg-[#b76e79] mx-auto mt-4 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 bg-gray-100">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" alt="Terapeuta" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-lg text-[#735850]">Sofía Valenzuela</h4>
                  <p className="text-xs text-[#b76e79] font-semibold uppercase tracking-wider mt-1">Especialista en Aromaterapia</p>
                  <p className="text-xs text-gray-500 mt-4 leading-relaxed">Con más de 8 años de experiencia internacional en masajes orientales e hidroterapia.</p>
                </div>
                <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 bg-gray-100">
                    <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80" alt="Terapeuta" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-lg text-[#735850]">Lucía Ortega</h4>
                  <p className="text-xs text-[#b76e79] font-semibold uppercase tracking-wider mt-1">Esteticista Facial Certificada</p>
                  <p className="text-xs text-gray-500 mt-4 leading-relaxed">Especialista en técnicas avanzadas de micro-escultura facial y rejuvenecimiento orgánico.</p>
                </div>
                <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 bg-gray-100">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" alt="Terapeuta" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-lg text-[#735850]">Valeria Ceballos</h4>
                  <p className="text-xs text-[#b76e79] font-semibold uppercase tracking-wider mt-1">Directora Médica Spa</p>
                  <p className="text-xs text-gray-500 mt-4 leading-relaxed">Supervisa todos los tratamientos cosméticos y médicos del centro con rigor clínico y calidez.</p>
                </div>
              </div>
            </div>
          )}

          {view === "instalaciones" && (
            <div className="max-w-6xl mx-auto px-6 py-12">
              <div className="text-center mb-16">
                <span className="text-[#b76e79] font-bold uppercase tracking-widest text-xs">Instalaciones</span>
                <h3 className="font-serif text-3xl text-[#735850] mt-2">Galería del Spa</h3>
                <div className="h-1 w-20 bg-[#b76e79] mx-auto mt-4 rounded-full"></div>
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
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-xs font-semibold uppercase tracking-wider">{photo.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "reservas" && (
            <div className="max-w-xl mx-auto px-6 py-12">
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-200/50 text-center">
                <h3 className="font-serif text-3xl text-[#735850] mb-4">RESERVA TU EXPERIENCIA</h3>
                <p className="text-xs text-gray-500 mb-8 uppercase tracking-widest">Programa tu momento de relajación hoy.</p>

                <form onSubmit={handleBooking} className="flex flex-col gap-5 text-left">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#735850] uppercase" htmlFor="name">
                      Nombre Completo
                    </label>
                    <input
                      className="w-full bg-[#fff8f5] border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:border-[#b76e79] focus:ring-1 focus:ring-[#b76e79] transition-all"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre"
                      required
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#735850] uppercase" htmlFor="treatment">
                      Tratamiento
                    </label>
                    <select
                      className="w-full bg-[#fff8f5] border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:border-[#b76e79] focus:ring-1 focus:ring-[#b76e79] transition-all"
                      id="treatment"
                      value={treatment}
                      onChange={(e) => setTreatment(e.target.value)}
                    >
                      <option>Luminosidad Exclusiva Lumina ($185)</option>
                      <option>Efecto Tensor Botánico ($150)</option>
                      <option>Masaje Fusión Aromaterapia ($140)</option>
                      <option>Armonía de Piedras Calientes ($165)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#735850] uppercase" htmlFor="date">
                      Fecha y Hora
                    </label>
                    <input
                      className="w-full bg-[#fff8f5] border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:border-[#b76e79] focus:ring-1 focus:ring-[#b76e79] transition-all"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      type="datetime-local"
                    />
                  </div>
                  <button
                    className="bg-[#b76e79] hover:bg-[#a35e69] text-white font-semibold py-4 w-full rounded-full uppercase tracking-widest transition-colors mt-2"
                    type="submit"
                  >
                    Confirmar Cita
                  </button>
                </form>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <footer className="w-full py-16 bg-[#fbf2ed] border-t border-[#735850]/10 text-center text-xs text-gray-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-serif text-xl text-[#735850] font-bold">LUMINA SPA</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#735850] transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="hover:text-[#735850] transition-colors">
              Términos del Servicio
            </a>
          </div>
          <p>© 2026 Lumina Premium Beauty &amp; Spa. Todos los derechos reservados.</p>
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
              <div className="w-16 h-16 bg-[#fff8f5] text-[#b76e79] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#f4d0c5]">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-gray-900 mb-2">¡Cita Programada!</h3>
              <p
                className="text-sm text-gray-600 mb-6"
                dangerouslySetInnerHTML={{ __html: modalText }}
              />
              <button
                onClick={closeModal}
                className="w-full bg-[#b76e79] hover:bg-[#a35e69] text-white font-semibold py-3 rounded-full transition-colors uppercase tracking-widest text-xs"
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

export default Belleza;
