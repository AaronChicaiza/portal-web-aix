(() => {
  "use strict";

  const pathParts = location.pathname.split("/").filter(Boolean);
  const isRootPage = pathParts.length === 0 || pathParts[0] === "index.html" || pathParts[0] === "dist";
  const site = isRootPage ? "inicio" : pathParts[0];

  const contactPages = {
    restaurante: "contact.html",
    belleza: "contact.html",
    ropa: "contact.html",
    tecnologia: "store.html",
    medico: "contacto.html",
  };
  const shopPages = {
    restaurante: "menu.html",
    belleza: "treatments.html",
    ropa: "shop.html",
    tecnologia: "store.html",
    medico: "servicios.html",
  };
  let toastTimer;

  const translations = [
    [/\bContactoo\b/gi, "Contacto"],
    [/\bContact\s+Us\b/gi, "Contáctanos"],
    [/\bContact\s+Information\b/gi, "Información de contacto"],
    [/\bPopular\s+Links\b/gi, "Enlaces destacados"],
    [/\bSee\s+the\s+latest\s+photos\b/gi, "Mira nuestras fotos más recientes"],
    [/\bMake\s+a\s+Reservation\b/gi, "Hacer una reserva"],
    [/\bSomething\s+new\b/gi, "Una propuesta especial"],
    [/\bMeet\s+the\s+Chefs\b/gi, "Conoce a nuestro equipo de cocina"],
    [/\bWhat\s+they\s+say\b/gi, "Lo que opinan nuestros clientes"],
    [/\bTestimonials\b/gi, "Testimonios"],
    [/\bTop\s+Chef\b/gi, "Chef principal"],
    [/\bSauce\s+Chef\b/gi, "Chef de salsas"],
    [/\bClient\b/gi, "Cliente"],
    [/\bSee\s+more\b/gi, "Ver más"],
    [/\bRead\s+more\b/gi, "Leer más"],
    [/\bLearn\s+more\b/gi, "Conocer más"],
    [/\bView\s+all\b/gi, "Ver todo"],
    [/\bAdd\s+to\s+cart\b/gi, "Añadir al carrito"],
    [/\bShopping\s+Cart\b/gi, "Carrito de compras"],
    [/\bCart\b/gi, "Carrito"],
    [/\bCheckout\b/gi, "Finalizar compra"],
    [/\bBilling\s+address\b/gi, "Dirección de facturación"],
    [/\bShipping\s+address\b/gi, "Dirección de envío"],
    [/\bShip\s+to\s+a\s+diffrent\s+address\?/gi, "¿Enviar a una dirección diferente?"],
    [/\bCreate\s+Account\?/gi, "¿Crear una cuenta?"],
    [/\bEmail\s+Address\b/gi, "Correo electrónico"],
    [/\bStreet\s+Address\b/gi, "Dirección"],
    [/\bAddress\b/gi, "Dirección"],
    [/\bCategories\b/gi, "Categorías"],
    [/\bCategory\b/gi, "Categoría"],
    [/\bSearch\b/gi, "Buscar"],
    [/\bShop\b/gi, "Tienda"],
    [/\bHome\b/gi, "Inicio"],
    [/\bAbout\b/gi, "Nosotros"],
    [/\bDelivery\b/gi, "Envíos"],
    [/\bFree\s+shipping\b/gi, "Envío gratis"],
    [/\bAll\s+rights\s+reserved\b/gi, "Todos los derechos reservados"],
    [/\bThis\s+template\s+is\s+made\s+with\b/gi, "Sitio elaborado con"],
  ];

  const decodeMojibake = (value) => {
    if (!/[\u00c2\u00c3\u00e2\u00f0]/.test(value)) return value;
    try {
      const bytes = Uint8Array.from(value, (character) => character.charCodeAt(0));
      const repaired = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
      return repaired.includes("") ? value : repaired;
    } catch {
      return value;
    }
  };

  const translateText = (value) => {
    let translated = value;
    translations.forEach(([expression, replacement]) => {
      translated = translated.replace(expression, replacement);
    });
    if (/\blorem ipsum\b/i.test(translated)) {
      return "Información seleccionada para brindarte una experiencia clara, cercana y de calidad.";
    }
    const englishWords = translated.match(/\b(the|and|with|your|our|about|this|that|from|what|they|latest|popular|create|ship|different|reserved)\b/gi) || [];
    return englishWords.length >= 2
      ? "Conoce nuestra propuesta y disfruta una experiencia pensada para ti."
      : translated;
  };

  const normalizeText = (root = document) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        return parent && !["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    });
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach((node) => {
      const repaired = translateText(decodeMojibake(node.nodeValue || ""));
      if (repaired !== node.nodeValue) node.nodeValue = repaired;
    });
    root.querySelectorAll?.("[title], [alt], [placeholder], [aria-label], [value]").forEach((element) => {
      ["title", "alt", "placeholder", "aria-label", "value"].forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;
        const original = element.getAttribute(attribute);
        const repaired = translateText(decodeMojibake(original || ""));
        if (repaired !== original) element.setAttribute(attribute, repaired);
      });
    });
    document.documentElement.lang = "es";
  };

  const showToast = (message) => {
    let toast = document.querySelector(".portal-aix-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "portal-aix-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.append(toast);
    }
    toast.textContent = message;
    toast.dataset.visible = "true";
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.dataset.visible = "false";
    }, 3600);
  };

  const setHeaderHeight = () => {
    const header = document.getElementById("global-portal-header");
    if (!header) {
      document.body.style.setProperty("padding-top", "0px", "important");
      return;
    }
    const height = Math.max(64, Math.ceil(header.getBoundingClientRect().height));
    document.documentElement.style.setProperty("--portal-header-height", `${height}px`);
    document.body.style.setProperty("padding-top", `${height}px`, "important");
    document.querySelectorAll(".header, .header_area, .header-section, .navigation, .main_header, .hamburger_bar, .ftco_navbar, #top-header").forEach((element) => {
      element.style.setProperty("top", `${height}px`, "important");
    });
    document.querySelectorAll(".menu").forEach((element) => {
      element.style.setProperty("top", `${height}px`, "important");
      element.style.setProperty("height", `calc(100vh - ${height}px)`, "important");
    });
  };

  const addWhatsAppButton = () => {
    // REMOVE WhatsApp button from root portal landing page
    if (isRootPage) {
      document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"], #whatsapp-official-btn, .portal-whatsapp').forEach((el) => el.remove());
      return;
    }

    const existingButtons = [...document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"], #whatsapp-official-btn, .portal-whatsapp')];
    const button = existingButtons.shift() || document.createElement("a");
    existingButtons.forEach((btn) => btn.remove());

    button.id = "whatsapp-official-btn";
    button.className = "portal-whatsapp";
    button.href = "https://wa.me/593992514730?text=" + encodeURIComponent("Hola, deseo recibir información.");
    button.target = "_blank";
    button.rel = "noopener noreferrer";
    button.setAttribute("aria-label", "Contactar por WhatsApp");
    button.title = "Contactar por WhatsApp";
    button.setAttribute("style", "position: fixed !important; bottom: 24px !important; right: 24px !important; width: 60px !important; height: 60px !important; background-color: #25D366 !important; color: #ffffff !important; border-radius: 50% !important; display: flex !important; align-items: center !important; justify-content: center !important; box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4), 0 2px 6px rgba(0, 0, 0, 0.2) !important; z-index: 999998 !important; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important; text-decoration: none !important; padding: 0 !important; border: none !important; margin: 0 !important;");
    
    // Crisp, perfectly centered HD Vector SVG icon with zero clipping
    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 175.216 175.552" fill="#ffffff" style="width: 32px !important; height: 32px !important; min-width: 32px !important; min-height: 32px !important; max-width: 32px !important; max-height: 32px !important; flex: 0 0 32px !important; display: block !important; margin: auto !important; transform: none !important; stroke: none !important; outline: none !important;">
  <path d="M 90.75 0 C 40.713 0 0.1 40.613 0.1 90.65 C 0.1 110.575 6.55 129.013 17.513 144.013 L 0 175.552 L 32.788 158.425 C 47.163 169.113 65.075 175.552 84.538 175.552 C 134.575 175.552 175.216 134.938 175.216 84.9 C 175.216 34.863 134.575 0 90.75 0 Z M 84.538 160.85 C 67.875 160.85 52.488 155.338 40.088 146.063 L 34.95 142.238 L 14.525 152.925 L 25.438 133.325 L 21.275 127.975 C 11.238 115.113 5.3 98.925 5.3 84.9 C 5.3 43.688 41.213 7.775 84.538 7.775 C 127.863 7.775 163.775 43.688 163.775 84.9 C 163.775 126.113 127.863 160.85 84.538 160.85 Z" fill="#ffffff"/>
  <path d="M 128.538 106.638 C 126.313 105.513 115.425 100.15 113.388 99.413 C 111.35 98.675 109.863 98.313 108.375 100.538 C 106.888 102.763 102.625 107.788 101.325 109.275 C 100.025 110.763 98.725 110.95 96.5 109.838 C 94.275 108.725 87.113 106.375 78.625 98.8 C 72 92.9 67.525 85.613 66.225 83.388 C 64.925 81.163 66.088 79.963 67.2 78.85 C 68.2 77.85 69.425 76.25 70.538 74.95 C 71.65 73.65 72.025 72.725 72.763 71.238 C 73.5 69.75 73.125 68.45 72.563 67.338 C 72 66.225 67.538 55.263 65.675 50.788 C 63.863 46.425 62.013 47.013 60.675 46.938 C 59.413 46.863 57.925 46.863 56.438 46.863 C 54.95 46.863 52.538 47.425 50.488 49.65 C 48.438 51.875 42.688 57.263 42.688 68.213 C 42.688 79.163 50.663 89.738 51.775 91.225 C 52.888 92.713 67.5 115.025 89.925 124.688 C 95.263 126.988 99.4 128.35 102.638 129.388 C 107.988 131.088 112.863 130.85 116.713 130.275 C 121.013 129.638 129.938 124.875 131.8 119.675 C 133.663 114.475 133.663 110.013 133.1 109.088 C 132.538 108.163 131.05 107.6 128.538 106.638 Z" fill="#ffffff"/>
</svg>`;
    
    if (!button.isConnected) document.body.append(button);
  };

  const destinationFor = (label) => {
    const text = label.toLocaleLowerCase("es");
    if (/(contact|reserv|cita|agenda|env[ií]o|consulta|escr[ií]benos)/.test(text)) return contactPages[site];
    if (/(tienda|compr|producto|servicio|tratamiento|men[uú]|cat[aá]logo|shop)/.test(text)) return shopPages[site];
    return null;
  };

  const wireInteractions = () => {
    document.querySelectorAll('a[href="#"], a[href=""]').forEach((link) => {
      const destination = destinationFor(link.textContent || link.getAttribute("aria-label") || "");
      if (destination) link.setAttribute("href", destination);
    });

    document.addEventListener("click", (event) => {
      const actionable = event.target.closest("button, a");
      if (!actionable || actionable.matches(".portal-whatsapp, #whatsapp-official-btn")) return;
      const label = (actionable.textContent || actionable.getAttribute("aria-label") || "").trim();
      const text = label.toLocaleLowerCase("es");
      if (actionable.tagName === "A" && actionable.getAttribute("href") === "#") {
        event.preventDefault();
        const destination = destinationFor(label);
        if (destination) location.href = destination;
        else showToast("Esta opción estará disponible muy pronto.");
      }
      if (/(a[ñn]adir al carrito|agregar al carrito|comprar ahora)/.test(text)) {
        event.preventDefault();
        showToast("Producto añadido al carrito.");
      }
    });

    document.querySelectorAll("form").forEach((form) => {
      form.addEventListener("submit", (event) => {
        const action = form.getAttribute("action");
        if (action && action !== "#") return;
        event.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        form.reset();
        showToast("Recibimos tu información. Nos comunicaremos contigo pronto.");
      });
    });
  };

  const start = () => {
    normalizeText();
    addWhatsAppButton();
    setHeaderHeight();
    wireInteractions();

  new ResizeObserver(setHeaderHeight).observe(document.getElementById("global-portal-header") || document.body);
    new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) normalizeText(node.parentElement || document);
      }));
    }).observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
