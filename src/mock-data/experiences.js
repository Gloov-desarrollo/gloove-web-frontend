// src/mock-data/experiences.js
export const experienceCategories = [
    {
      category: "Restauración",
      experiences: [
        { 
          id: 1, 
          title: "Cena de Tapas en el Casco Antiguo", 
          image: "https://picsum.photos/seed/restaurant1/800/600",
          price: 45,
          description: "Embárcate en un viaje culinario por el corazón histórico de la ciudad. Nuestro guía local te llevará a tres de las bodegas y bares de tapas más emblemáticos, donde degustarás una selección de delicias locales maridadas con los mejores vinos de la región. Una experiencia auténtica para saborear la cultura local.",
          duration: "3 horas",
          location: "Centro Histórico",
          includes: ["Guía experto", "3 bebidas (vino o cerveza)", "6 tapas variadas"],
          requirements: "Apto para mayores de 18 años. Se recomienda calzado cómodo."
        },
        { 
          id: 2, 
          title: "Marisquería Fresca del Día", 
          image: "https://picsum.photos/seed/restaurant2/800/600",
          price: 75,
          description: "Disfruta de una selección premium del mejor marisco fresco, directamente de la lonja a tu mesa. Nuestro menú degustación incluye ostras, gambas, almejas y mucho más, preparado por chefs expertos para resaltar el sabor natural del mar.",
          duration: "2 horas",
          location: "Zona del Puerto",
          includes: ["Menú degustación de marisco", "Botella de vino blanco", "Postre casero"],
          requirements: "Se recomienda reservar con antelación."
        },
      ],
    },
    {
      category: "Actividades Acuáticas",
      experiences: [
        { 
          id: 10, 
          title: "Paseo en Kayak por los Cortados", 
          image: "https://picsum.photos/seed/water1/800/600",
          price: 35,
          description: "Navega en kayak por las aguas tranquilas del río y descubre paisajes impresionantes de acantilados y naturaleza virgen. Una aventura refrescante apta para todos los niveles, ideal para disfrutar en familia o con amigos.",
          duration: "2.5 horas",
          location: "Embarcadero del Río Verde",
          includes: ["Equipo completo de kayak (chaleco, pala)", "Monitor cualificado", "Seguro de actividad"],
          requirements: "Saber nadar. Apto para niños mayores de 8 años."
        },
        { 
          id: 11, 
          title: "Clase de Paddle Surf al Atardecer", 
          image: "https://picsum.photos/seed/water2/800/600",
          price: 40,
          description: "Aprende a deslizarte sobre el agua con una tabla de paddle surf mientras el sol se pone en el horizonte. Una experiencia mágica y relajante que combina deporte y naturaleza en un entorno espectacular.",
          duration: "2 horas",
          location: "Playa de Poniente",
          includes: ["Tabla de paddle surf y remo", "Instructor certificado", "Neopreno si es necesario"],
          requirements: "No se requiere experiencia previa."
        },
      ],
    },
    {
        category: "Relax y Bienestar",
        experiences: [
            { 
              id: 17, 
              title: "Masaje Relajante a Domicilio", 
              image: "https://picsum.photos/seed/relax1/800/600",
              price: 60,
              description: "No te muevas de tu alojamiento. Un masajista profesional acudirá a tu puerta con todo lo necesario para ofrecerte un masaje relajante que aliviará el estrés y las tensiones musculares. Elige entre diferentes técnicas y aceites esenciales.",
              duration: "60 minutos",
              location: "En tu alojamiento",
              includes: ["Masajista profesional", "Camilla de masaje", "Aceites y toallas"],
              requirements: "Espacio suficiente para la camilla."
            }
        ]
    }
];
