import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HeartPulse, Calendar, Stethoscope, Activity, Baby, CheckCircle2, Phone, ShieldAlert, Award, ChevronLeft, ChevronRight, HelpCircle } from "lucide-react";

interface MedicoProps {
  view: "inicio" | "servicios" | "equipo" | "instalaciones" | "citas";
}

const Medico = ({ view }: MedicoProps) => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [department, setDepartment] = useState("Medicina General");
  const [date, setDate] = useState("");

  // Symptom Evaluator State
  const [evalStep, setEvalStep] = useState(1);
  const [evalSymptom, setEvalSymptom] = useState("");
  const [evalType, setEvalType] = useState("");
  const [recommendation, setRecommendation] = useState<{ doctor: string; dept: string } | null>(null);

  // Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);

  const medicalCarousel = [
    { src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80", title: "Consultorios de Especialidades", desc: "Ambientes asépticos y climatizados para tu seguridad." },
    { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80", title: "Recepción y Admisión Clínica", desc: "Atención rápida y simplificada con salas de espera cómodas." },
    { src: "https://images.unsplash.com/photo-1551076805-e1869f36369c?auto=format&fit=crop&w=800&q=80", title: "Quirófanos de Tecnología Avanzada", desc: "Equipos de cirugía mínimamente invasiva de última generación." },
    { src: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80", title: "Laboratorio de Análisis Clínico", desc: "Resultados en tiempo récord con precisión automatizada." },
  ];

  const galleryPhotos = [
    { src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80", label: "Consultorio de Especialidades" },
    { src: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80", label: "Médico de Turno" },
    { src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80", label: "Evaluación Diagnóstica" },
    { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80", label: "Lobby de Admisión" },
    { src: "https://images.unsplash.com/photo-1551076805-e1869f36369c?auto=format&fit=crop&w=600&q=80", label: "Quirófano de Cirugía Menor" },
    { src: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80", label: "Equipamiento Clínico" },
    { src: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80", label: "Laboratorio de Análisis" },
    { src: "https://images.unsplash.com/photo-1536640712247-3a97c64f75b5?auto=format&fit=crop&w=600&q=80", label: "Área de Pediatría" },
    { src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80", label: "Unidad Dental" },
    { src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80", label: "Chequeo Preventivo" },
    { src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80", label: "Unidad de Imagenología" },
    { src: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80", label: "Salas de Recuperación" },
  ];

  const specialties = [
    {
      icon: Stethoscope,
      title: "Medicina General",
      description: "Evaluaciones de salud integrales, atención preventiva y planes de tratamiento personalizados para tu bienestar general.",
    },
    {
      icon: Activity,
      title: "Cardiología",
      description: "Atención cardíaca avanzada, diagnósticos, electrocardiogramas y programas de rehabilitación cardiovascular.",
    },
    {
      icon: Baby,
      title: "Pediatría",
      description: "Atención experta, delicada y personalizada para el sano desarrollo de lactantes, niños y adolescentes.",
    },
  ];

  const sublinks = [
    { to: "/medico", label: "Inicio", activeView: "inicio" },
    { to: "/medico/servicios", label: "Especialidades", activeView: "servicios" },
    { to: "/medico/equipo", label: "Médicos", activeView: "equipo" },
    { to: "/medico/instalaciones", label: "Instalaciones", activeView: "instalaciones" },
    { to: "/medico/citas", label: "Citas", activeView: "citas" },
  ];

  const handleAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstname || !lastname || !date) return;

    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    setModalText(
      `Estimado(a) <strong>${firstname} ${lastname}</strong>, su solicitud de cita para <strong>${department}</strong> el día <strong>${formattedDate}</strong> ha sido registrada con éxito en Clínica Santé. Nos comunicaremos a la brevedad para confirmar la hora.`
    );
    setShowModal(true);
  };

  const calculateEvaluation = () => {
    if (evalSymptom === "cardiac") {
      setRecommendation({ doctor: "Dr. Carlos Mendoza", dept: "Cardiología" });
    } else if (evalSymptom === "kids") {
      setRecommendation({ doctor: "Dra. Elena Rivas", dept: "Pediatría" });
    } else {
      setRecommendation({ doctor: "Dra. Laura Montes", dept: "Medicina General" });
    }
    setEvalStep(3);
  };

  const handleApplyEvaluation = () => {
    if (recommendation) {
      setDepartment(recommendation.dept);
      toast(`Especialidad seleccionada: ${recommendation.dept}`, {
        description: `Se ha fijado con el médico ${recommendation.doctor}.`,
      });
      // Reset quiz
      setEvalStep(1);
      setEvalSymptom("");
      setEvalType("");
      setRecommendation(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFirstname("");
    setLastname("");
    setDate("");
  };

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev === medicalCarousel.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev === 0 ? medicalCarousel.length - 1 : prev - 1));
  };

  return (
    <div className="bg-[#f8f9ff] text-[#0d1c2e] min-h-screen font-sans selection:bg-[#008080] selection:text-white">
      {/* Sub-Header */}
      <div className="w-full bg-[#eef2f7] border-b border-gray-200 sticky top-20 z-40">
        <div className="flex gap-6 max-w-6xl mx-auto px-6 py-4 justify-center md:justify-start">
          {sublinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                view === link.activeView
                  ? "text-[#008080] border-b-2 border-[#008080] pb-1"
                  : "text-gray-500 hover:text-[#008080]"
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
              <section className="relative py-20 px-6 max-w-6xl mx-auto min-h-[70vh] flex items-center">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center w-full">
                  <div className="md:col-span-6 z-10 flex flex-col gap-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-teal-500/20 bg-teal-500/5 text-[#008080] font-semibold text-xs uppercase tracking-wider self-start">
                      Atención Médica Acreditada
                    </div>
                    <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-[#006565] leading-tight">
                      Cuidado Compasivo,<br />Excelencia Clínica
                    </h2>
                    <p className="text-base text-gray-600">
                      Brindamos experiencia médica de clase mundial con un toque humano. Tu salud es nuestra prioridad y la precisión es nuestra promesa.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        className="bg-[#008080] text-white hover:bg-[#006565] transition-colors px-6 py-3.5 rounded-full font-semibold text-xs uppercase text-center inline-flex items-center justify-center gap-2 shadow-lg shadow-teal-700/10"
                        to="/medico/citas"
                      >
                        <Calendar className="w-4 h-4" />
                        Reservar Cita
                      </Link>
                    </div>
                  </div>
                  <div className="md:col-span-6 relative h-[350px] md:h-[450px] w-full rounded-2xl overflow-hidden shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"
                      alt="Doctora Santé"
                      className="object-cover w-full h-full absolute inset-0"
                    />
                  </div>
                </div>
              </section>

              {/* INTERACTIVE CLINICAL FINDER QUIZ */}
              <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col gap-6 text-center">
                  <div className="flex justify-center items-center gap-2 text-[#008080]">
                    <HelpCircle className="w-5 h-5" />
                    <span className="font-bold text-xs uppercase tracking-wider">Asistente Virtual de Especialidad Médica</span>
                  </div>

                  {evalStep === 1 && (
                    <div className="flex flex-col gap-6">
                      <h4 className="font-bold text-sm text-[#0d1c2e]">¿Cuál es el motivo principal de tu consulta de hoy?</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                        <button
                          onClick={() => { setEvalSymptom("cardiac"); setEvalStep(2); }}
                          className="p-4 rounded-2xl border border-gray-200 hover:border-[#008080] hover:bg-teal-50/10 text-xs font-bold text-gray-800 text-left transition-all"
                        >
                          💓 Molestias Cardíacas o Presión Arterial
                        </button>
                        <button
                          onClick={() => { setEvalSymptom("kids"); setEvalStep(2); }}
                          className="p-4 rounded-2xl border border-gray-200 hover:border-[#008080] hover:bg-teal-50/10 text-xs font-bold text-gray-800 text-left transition-all"
                        >
                          👶 Control de Bebé o Atención Infantil
                        </button>
                        <button
                          onClick={() => { setEvalSymptom("general"); setEvalStep(2); }}
                          className="p-4 rounded-2xl border border-gray-200 hover:border-[#008080] hover:bg-teal-50/10 text-xs font-bold text-gray-800 text-left transition-all"
                        >
                          🩺 Chequeo Anual o Dolores Generales
                        </button>
                        <button
                          onClick={() => { setEvalSymptom("general"); setEvalStep(2); }}
                          className="p-4 rounded-2xl border border-gray-200 hover:border-[#008080] hover:bg-teal-50/10 text-xs font-bold text-gray-800 text-left transition-all"
                        >
                          🏥 Certificado de Salud o Receta Médica
                        </button>
                      </div>
                    </div>
                  )}

                  {evalStep === 2 && (
                    <div className="flex flex-col gap-6 animate-fade-in">
                      <h4 className="font-bold text-sm text-[#0d1c2e]">¿Prefieres atención presencial o videoconsulta remota?</h4>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                          onClick={() => { setEvalType("presencial"); calculateEvaluation(); }}
                          className="px-6 py-4 rounded-full border border-gray-200 hover:border-[#008080] hover:bg-teal-50/10 text-xs font-bold text-gray-800 transition-all"
                        >
                          🏥 Presencial en la Clínica
                        </button>
                        <button
                          onClick={() => { setEvalType("tele"); calculateEvaluation(); }}
                          className="px-6 py-4 rounded-full border border-gray-200 hover:border-[#008080] hover:bg-teal-50/10 text-xs font-bold text-gray-800 transition-all"
                        >
                          💻 Telemedicina por Videollamada
                        </button>
                      </div>
                      <button onClick={() => setEvalStep(1)} className="text-xs text-gray-400 hover:underline">Atrás</button>
                    </div>
                  )}

                  {evalStep === 3 && recommendation && (
                    <div className="flex flex-col gap-6 animate-scale-in text-center items-center">
                      <div className="w-14 h-14 bg-teal-50 text-[#008080] rounded-full flex items-center justify-center border border-teal-100">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-500 uppercase tracking-widest">Recomendación Médica</h4>
                        <p className="font-montserrat font-extrabold text-xl text-[#006565] mt-2">
                          {recommendation.doctor} ({recommendation.dept})
                        </p>
                        <p className="text-xs text-gray-500 mt-2 max-w-sm">
                          El especialista idóneo para dar seguimiento a tus requerimientos en modalidad {evalType === "presencial" ? "Presencial" : "Virtual"}.
                        </p>
                      </div>
                      <div className="flex gap-4 w-full justify-center mt-2">
                        <button
                          onClick={handleApplyEvaluation}
                          className="px-8 py-3 bg-[#008080] hover:bg-[#006565] text-white text-xs font-bold uppercase rounded-full transition-colors"
                        >
                          Pre-Seleccionar en Formulario
                        </button>
                        <button
                          onClick={() => setEvalStep(1)}
                          className="px-6 py-3 border border-gray-200 hover:bg-gray-50 text-xs font-bold uppercase rounded-full transition-colors text-gray-500"
                        >
                          Reiniciar Evaluador
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Medical Image Carousel */}
              <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="text-center mb-8">
                  <span className="text-[#008080] font-bold text-xs uppercase tracking-widest">Nuestra Clínica en Fotos</span>
                  <h4 className="font-montserrat font-bold text-2xl text-[#006565] mt-1">Nuestra Infraestructura</h4>
                </div>
                
                <div className="relative rounded-3xl overflow-hidden h-[400px] shadow-sm bg-white border border-gray-200">
                  <img
                    src={medicalCarousel[carouselIndex].src}
                    alt={medicalCarousel[carouselIndex].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex flex-col justify-end p-8 text-white" />
                  
                  <div className="absolute bottom-8 left-8 right-8 z-10 text-white text-left">
                    <h5 className="font-montserrat font-bold text-xl md:text-2xl text-teal-400">{medicalCarousel[carouselIndex].title}</h5>
                    <p className="text-sm text-gray-200 mt-2">{medicalCarousel[carouselIndex].desc}</p>
                  </div>

                  <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-sm transition-colors z-20">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-sm transition-colors z-20">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Números de Contacto Urgencias */}
              <div className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 mt-12 text-center md:text-left">
                <div>
                  <h4 className="font-bold text-lg text-[#006565]">Línea de Atención de Urgencias</h4>
                  <p className="text-xs text-gray-500 mt-1">Disponible las 24 horas del día, los 7 días de la semana.</p>
                </div>
                <a href="tel:1234567" className="bg-[#cd5c5c] text-white font-bold text-sm px-6 py-3 rounded-full flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Urgencias: +57 (300) 000-0000
                </a>
              </div>
            </div>
          )}

          {view === "servicios" && (
            <div className="max-w-6xl mx-auto px-6 py-12">
              <div className="text-center mb-16">
                <span className="text-[#008080] font-bold uppercase tracking-widest text-xs">Especialidades</span>
                <h3 className="font-montserrat font-bold text-3xl text-[#006565] mt-2">Servicios Médicos Integrales</h3>
                <div className="h-1 w-20 bg-[#008080] mx-auto mt-4 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {specialties.map((spec, idx) => {
                  const Icon = spec.icon;
                  return (
                    <div
                      key={spec.title}
                      className="bg-white rounded-2xl p-8 border border-gray-200 flex flex-col gap-4 shadow-sm"
                    >
                      <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-[#008080]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h4 className="font-montserrat font-bold text-xl text-[#006565]">{spec.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{spec.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {view === "equipo" && (
            <div className="max-w-5xl mx-auto px-6 py-12">
              <div className="text-center mb-16">
                <span className="text-[#008080] font-bold uppercase tracking-widest text-xs">Staff de Médicos</span>
                <h3 className="font-montserrat font-bold text-3xl text-[#006565] mt-2">Nuestros Especialistas</h3>
                <div className="h-1 w-20 bg-[#008080] mx-auto mt-4 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 bg-gray-100">
                    <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80" alt="Médico" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-lg text-[#006565]">Dr. Carlos Mendoza</h4>
                  <p className="text-xs text-[#008080] font-semibold uppercase tracking-wider mt-1">Cardiólogo Clínico</p>
                  <p className="text-xs text-gray-500 mt-4 leading-relaxed">Especialista en cirugía cardiovascular y rehabilitación cardíaca con 12 años de trayectoria.</p>
                </div>
                <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 bg-gray-100">
                    <img src="https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=200&q=80" alt="Médica" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-lg text-[#006565]">Dra. Elena Rivas</h4>
                  <p className="text-xs text-[#008080] font-semibold uppercase tracking-wider mt-1">Pediatra Neonatóloga</p>
                  <p className="text-xs text-gray-500 mt-4 leading-relaxed">Atención de lactantes y cuidados intensivos pediátricos con un trato cálido y gentil.</p>
                </div>
                <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 bg-gray-100">
                    <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80" alt="Médica" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-lg text-[#006565]">Dra. Laura Montes</h4>
                  <p className="text-xs text-[#008080] font-semibold uppercase tracking-wider mt-1">Médico Familiar</p>
                  <p className="text-xs text-gray-500 mt-4 leading-relaxed">Medicina preventiva y control de salud integral para toda la familia.</p>
                </div>
              </div>
            </div>
          )}

          {view === "instalaciones" && (
            <div className="max-w-6xl mx-auto px-6 py-12">
              <div className="text-center mb-16">
                <span className="text-[#008080] font-bold uppercase tracking-widest text-xs">Infraestructura</span>
                <h3 className="font-montserrat font-bold text-3xl text-[#006565] mt-2">Nuestras Instalaciones</h3>
                <p className="text-sm text-gray-500 mt-2">Salas de consulta, laboratorios y quirófanos equipados con tecnología de punta.</p>
                <div className="h-1 w-20 bg-[#008080] mx-auto mt-4 rounded-full"></div>
              </div>

              {/* 12 HD Photos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {clinicPhotos.map((photo, i) => (
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

          {view === "citas" && (
            <div className="max-w-xl mx-auto px-6 py-12">
              <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-sm text-center">
                <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-[#006565] mb-2">Reserva tu Cita Médica</h3>
                <p className="text-sm text-gray-500 mb-8">Agende su visita rápidamente en la especialidad requerida.</p>

                <form onSubmit={handleAppointment} className="flex flex-col gap-5 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-[#006565] uppercase" htmlFor="firstname">
                        Nombre
                      </label>
                      <input
                        className="w-full bg-[#f8f9ff] border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#008080] focus:ring-1 focus:ring-[#008080] transition-all"
                        id="firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        placeholder="Juan"
                        required
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-[#006565] uppercase" htmlFor="lastname">
                        Apellido
                      </label>
                      <input
                        className="w-full bg-[#f8f9ff] border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#008080] focus:ring-1 focus:ring-[#008080] transition-all"
                        id="lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder="Pérez"
                        required
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#006565] uppercase" htmlFor="department">
                      Especialidad
                    </label>
                    <select
                      className="w-full bg-[#f8f9ff] border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#008080] focus:ring-1 focus:ring-[#008080] transition-all"
                      id="department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <option>Medicina General</option>
                      <option>Cardiología</option>
                      <option>Pediatría</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#006565] uppercase" htmlFor="date">
                      Fecha de Preferencia
                    </label>
                    <input
                      className="w-full bg-[#f8f9ff] border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#008080] focus:ring-1 focus:ring-[#008080] transition-all"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      type="date"
                    />
                  </div>
                  <button
                    className="bg-[#008080] hover:bg-[#006565] text-white font-semibold py-4 w-full rounded-full uppercase tracking-widest transition-colors mt-2"
                    type="submit"
                  >
                    Confirmar Cita Médica
                  </button>
                </form>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 text-center text-xs text-gray-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-montserrat text-lg font-bold text-[#006565]">Clínica Santé</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#008080] transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="hover:text-[#008080] transition-colors">
              Términos del Servicio
            </a>
          </div>
          <p>© 2026 Clínica Santé. Precisión Clínica con Calidez Humana.</p>
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
              <div className="w-16 h-16 bg-teal-50 text-[#008080] rounded-full flex items-center justify-center mx-auto mb-4 border border-teal-100">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-montserrat font-bold text-2xl text-gray-900 mb-2">¡Cita Solicitada!</h3>
              <p
                className="text-sm text-gray-600 mb-6"
                dangerouslySetInnerHTML={{ __html: modalText }}
              />
              <button
                onClick={closeModal}
                className="w-full bg-[#008080] hover:bg-[#006565] text-white font-semibold py-3 rounded-full transition-colors uppercase tracking-widest text-xs"
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

export default Medico;
