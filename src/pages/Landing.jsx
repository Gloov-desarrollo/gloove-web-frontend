import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faClock, faExclamationTriangle, faFileAlt, faSearch, faStar, faArrowUp, faPlus, faMinus, faLightbulb, faPalette, faBoxOpen, faHandshake } from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './../assets/css/booking/LandingPage.css';

// --- SECCIÓN 1: HERO ---
const HeroSection = () => {
    // Lista de logos actualizada
    const logos = [
        "/images/airbnb.png", // Logo de Airbnb reemplazado
        "/images/Booking.com_logo.svg.png",
        "/images/19001166-0-Muchosol-2016-RGB-Tr.webp",
        "/images/Holidu-Logo-Horizontal.png",
        "/images/Homeaway.png"
    ];
    const extendedLogos = [...logos, ...logos, ...logos, ...logos];

    const heroTitle = "Maximiza la rentabilidad de tu vivienda sin mover un dedo.";
    const heroSubtitle = "Te instalamos domótica valorada en 400€ gratis y solo cobramos cuando tú ganas. Empieza a rentabilizar tu propiedad con riesgo cero.";

    // --- Animación de Texto Palabra por Palabra ---
    const sentenceVariant = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.5,
                staggerChildren: 0.08,
            },
        },
    };

    const wordVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            },
        },
    };
    
    // --- Animación de Flotación ---
    const floatingVariant = {
        animate: {
            y: ["-5px", "5px"],
            transition: {
                delay: 2.5, // Empieza después de que el texto aparece
                repeat: Infinity,
                repeatType: "reverse",
                duration: 4,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section className="hero-section">
            <video autoPlay loop muted className="hero-video">
                <source src="https://assets.mixkit.co/videos/preview/mixkit-happy-family-in-a-vacation-home-4856-large.mp4" type="video/mp4" />
            </video>
            <div className="hero-overlay"></div>
            <div className="container hero-content">

                <motion.div variants={floatingVariant} animate="animate">
                    {/* Título animado */}
                    <motion.h1
                        className="hero-title"
                        variants={sentenceVariant}
                        initial="hidden"
                        animate="visible"
                        aria-label={heroTitle}
                    >
                        {heroTitle.split(" ").map((word, index) => (
                            <motion.span
                                key={index}
                                variants={wordVariant}
                                style={{ display: 'inline-block', marginRight: '0.5rem' }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.h1>

                    {/* Subtítulo animado */}
                    <motion.h2
                        className="hero-subtitle"
                        variants={sentenceVariant} // Reutilizamos la misma variante, pero ajustamos el delay en la transición
                        initial="hidden"
                        animate="visible"
                        aria-label={heroSubtitle}
                    >
                         {heroSubtitle.split(" ").map((word, index) => (
                            <motion.span
                                key={index}
                                variants={wordVariant}
                                style={{ display: 'inline-block', marginRight: '0.4rem' }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.h2>
                </motion.div>

                {/* Botón CTA */}
                <motion.a
                    href="#calculator"
                    className="hero-cta-button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3, duration: 0.8 }}>
                    Calcula tus ingresos potenciales (Gratis)
                </motion.a>
            </div>
            <div className="logo-scroller">
                <div className="scroller-title"></div>
                <div className="scroller__inner">
                    {extendedLogos.map((logo, index) => (
                         <div key={index} className="logo-item">
                            <img src={logo} alt={`logo-${index}`} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
// --- SECCIÓN 2: PROBLEMA Y PROMESA ---
const ProblemPromiseSection = () => (
    <section className="landing-page-section">
        <div className="container text-center">
            <h2 className="mb-4">¿Cansado de la gestión de tu alquiler?</h2>
            <div className="row">
                <div className="col-md-3 problem-item"><FontAwesomeIcon icon={faChartLine} className="icon" /><h4>Ingresos Inestables</h4><p>Precios fijos que no se adaptan a la demanda real del mercado y te hacen perder dinero.</p></div>
                <div className="col-md-3 problem-item"><FontAwesomeIcon icon={faClock} className="icon" /><h4>Pérdida de Tiempo</h4><p>Horas interminables respondiendo mensajes, coordinando limpiezas y gestionando check-ins.</p></div>
                <div className="col-md-3 problem-item"><FontAwesomeIcon icon={faExclamationTriangle} className="icon" /><h4>Huéspedes Problemáticos</h4><p>El miedo constante a daños en tu propiedad, fiestas no autorizadas y malas reseñas.</p></div>
                <div className="col-md-3 problem-item"><FontAwesomeIcon icon={faFileAlt} className="icon" /><h4>Complejidad Legal</h4><p>La incertidumbre y el estrés de cumplir con normativas, licencias e impuestos.</p></div>
            </div>
            <p className="lead mt-4">Gloove es la solución integral que convierte estos problemas en rentabilidad y tranquilidad.</p>
        </div>
    </section>
);

// --- SECCIÓN 3: LA SOLUCIÓN (PESTAÑAS) ---
const SolutionSection = () => {
    const [activeTab, setActiveTab] = useState('tech');
    return (
        <section className="landing-page-section bg-light">
            <div className="container">
                <div className="solution-tabs">
                    <button className={`tab-button ${activeTab === 'tech' ? 'active' : ''}`} onClick={() => setActiveTab('tech')}>Tecnología de Vanguardia</button>
                    <button className={`tab-button ${activeTab === 'management' ? 'active' : ''}`} onClick={() => setActiveTab('management')}>Gestión Profesional 360°</button>
                    <button className={`tab-button ${activeTab === 'advice' ? 'active' : ''}`} onClick={() => setActiveTab('advice')}>Asesoramiento Personalizado y Local</button>
                </div>
                <div className="tab-content">
                    {activeTab === 'tech' && <div><h4>Automatización y control total en la palma de tu mano.</h4><p>Instalamos domótica de última generación, como cerraduras inteligentes, para mejorar la seguridad y la experiencia del huésped. Accede a nuestro Panel de Propietario y consulta tus ingresos y ocupación en tiempo real. El sistema de Auto Check-in ofrece comodidad y eficiencia, mientras nuestro motor de Revenue Management ajusta los precios dinámicamente para maximizar tus beneficios.</p></div>}
                    {activeTab === 'management' && <div><h4>Nos encargamos de todo, para que tú no te encargues de nada.</h4><p>Nuestro equipo se encarga de la comunicación con huéspedes 24/7. Seguimos protocolos de limpieza y mantenimiento profesional, usando textiles de calidad hotelera para garantizar la máxima satisfacción. Maximizamos la visibilidad de tu propiedad publicándola en una amplia red de portales líderes en el sector.</p></div>}
                    {activeTab === 'advice' && <div><h4>Un equipo experto a tu lado, en tu ciudad.</h4><p>Te ofrecemos una asesoría inicial y servicio de Home Staging para preparar tu propiedad para el éxito. Solicita un Estudio de Mercado Gratuito sin compromiso. Además, te damos soporte en la gestión de requisitos legales y licencias turísticas. Confía en un equipo cercano, visítanos en nuestra oficina local en Elda.</p></div>}
                </div>
            </div>
        </section>
    );
};

// --- NUEVA SECCIÓN: SERVICIOS EXCLUSIVOS ---
const ExclusiveServicesSection = () => {
    const services = [
        {
            icon: faChartLine,
            title: "Revenue de Precios",
            description: "Utilizamos sistemas expertos y análisis de mercado para maximizar cada reserva. Te garantizamos el 100% de optimización para que obtengas siempre el máximo beneficio."
        },
        {
            icon: faLightbulb,
            title: "Asesoramiento Energético",
            description: "Nuestro equipo de sostenibilidad analiza y optimiza los consumos de tu vivienda, reduciendo costes y aumentando la eficiencia energética para un mayor rendimiento neto."
        },
        {
            icon: faPalette,
            title: "Home Staging y Diseño",
            description: "Creamos espacios irresistibles. Un equipo especializado en diseño de interiores potencia la estética de tu propiedad para atraer a más huéspedes y mejorar su experiencia."
        },
        {
            icon: faBoxOpen,
            title: "Gestión de Compras y Montaje",
            description: "Nos encargamos de todo el proceso de puesta a punto: desde la compra y logística del mobiliario hasta el montaje final. Tu vivienda, lista para alquilar sin que te muevas de casa."
        }
    ];

    return (
        <section className="landing-page-section exclusive-services-section bg-light">
            <div className="container">
                <h2 className="text-center mb-5">Servicios Exclusivos para todos nuestros clientes</h2>
                <div className="row">
                    {services.map((service, index) => (
                        <div key={index} className="col-lg-3 col-md-6 mb-4">
                            <motion.div 
                                className="service-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="service-icon-container">
                                    <FontAwesomeIcon icon={service.icon} className="service-icon" />
                                </div>
                                <h4>{service.title}</h4>
                                <p>{service.description}</p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


// --- SECCIÓN 4: PRUEBA SOCIAL ---
const ProofSection = () => {
    const testimonials = [
        {
            quote: "Desde que estoy con Gloove, mi ocupación ha subido un 20% y mis ingresos un 35%. La tranquilidad de la gestión integral no tiene precio.",
            author: "Carlos Gómez",
            location: "Apartamento de 2 habitaciones en Altea",
            img: "https://randomuser.me/api/portraits/men/32.jpg",
            metrics: ["+35% Ingresos Anuales", "+20% Ocupación"],
            stars: 5
        },
        {
            quote: "El equipo de Gloove es increíblemente profesional. Se encargan de todo y mi apartamento nunca ha estado en mejores manos. ¡Totalmente recomendados!",
            author: "Laura Pérez",
            location: "Estudio en Benidorm",
            img: "https://randomuser.me/api/portraits/women/44.jpg",
            metrics: ["+40% Ingresos", "98% Ocupación"],
            stars: 5
        },
        {
            quote: "La tecnología que utilizan es fantástica. La cerradura inteligente y el panel de propietario me dan una tranquilidad y un control que antes no tenía.",
            author: "Javier Martínez",
            location: "Chalet en Calpe",
            img: "https://randomuser.me/api/portraits/men/46.jpg",
            metrics: ["+25% Beneficios", "Gestión Simplificada"],
            stars: 4
        }
    ];

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
    };

    return (
        <section className="landing-page-section proof-section">
            <div className="container">
                <h2 className="text-center mb-5">Propietarios como tú ya están ganando más con Gloove</h2>
                <Carousel
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={5000}
                    keyBoardControl={true}
                    showDots={true}
                    containerClass="testimonial-carousel"
                    dotListClass="custom-dot-list-style"
                    itemClass="testimonial-item"
                >
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            <img src={testimonial.img} alt={testimonial.author} className="testimonial-img" />
                            <div className="star-rating">
                                {[...Array(testimonial.stars)].map((_, i) => <FontAwesomeIcon key={i} icon={faStar} />)}
                                {[...Array(5 - testimonial.stars)].map((_, i) => <FontAwesomeIcon key={i} icon={faStar} className="star-empty" />)}
                            </div>
                            <p className="testimonial-quote">"{testimonial.quote}"</p>
                            <div className="testimonial-author">
                                <strong>{testimonial.author}</strong><br />
                                <span>{testimonial.location}</span>
                            </div>
                            <div className="testimonial-metrics">
                                {testimonial.metrics.map((metric, i) => <span key={i} className="metric-tag">{metric}</span>)}
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    );
};

// --- SECCIÓN 5: EL PROCESO ---
const ProcessSection = () => (
    <section className="landing-page-section bg-light">
        <div className="container text-center">
            <h2 className="mb-5">Así de fácil es empezar a ganar</h2>
            <div className="row">
                <div className="col-md-4 process-step"><FontAwesomeIcon icon={faSearch} className="icon" /><h4>Paso 1: Estudio y Plan Gratuito</h4><p>Solicita tu estudio de rentabilidad sin compromiso. Analizamos tu propiedad, el mercado y te presentamos una proyección de ingresos clara y realista.</p></div>
                <div className="col-md-4 process-step"><FontAwesomeIcon icon={faStar} className="icon" /><h4>Paso 2: Puesta a Punto Profesional</h4><p>Te asesoramos con nuestro servicio de home staging, realizamos la sesión de fotos profesional y nuestro equipo técnico instala la cerradura domótica sin coste para ti.</p></div>
                <div className="col-md-4 process-step"><FontAwesomeIcon icon={faArrowUp} className="icon" /><h4>Paso 3: Relájate y Gana</h4><p>Publicamos tu anuncio en más de 25 portales, gestionamos cada detalle y tú recibes tus beneficios cada mes. Controla todo desde tu panel de propietario.</p></div>
            </div>
        </div>
    </section>
);

// --- SECCIÓN 6: OFERTA (CARTAS DE PRECIOS) ---
const OfferSection = () => {
    const plans = [
        {
            name: "Gestión Esencial",
            price: "15%",
            description: "La solución ideal para gestionar tu presencia online y comunicarte con los huéspedes sin esfuerzo.",
            features: [
                { name: "Fotografía Profesional", included: true },
                { name: "Creación y Gestión de Anuncios", included: true },
                { name: "Publicación en +25 Portales", included: true },
                { name: "Atención al Huésped 24/7", included: true },
                { name: "Instalación Domótica (Valor 400€)", included: true },
                { name: "Panel de Propietario en Tiempo Real", included: true },
                { name: "Registro de Viajeros (Policía)", included: true },
                { name: "Gestión de Limpieza y Lavandería", included: false },
                { name: "Gestión de Mantenimiento", included: false },
            ],
            cta: "Empezar con Esencial"
        },
        {
            name: "Gestión Integral",
            price: "20%",
            description: "Delega todo en nosotros. La opción perfecta para una tranquilidad total y cero preocupaciones.",
            features: [
                { name: "Fotografía Profesional", included: true },
                { name: "Creación y Gestión de Anuncios", included: true },
                { name: "Publicación en +25 Portales", included: true },
                { name: "Atención al Huésped 24/7", included: true },
                { name: "Instalación Domótica (Valor 400€)", included: true },
                { name: "Panel de Propietario en Tiempo Real", included: true },
                { name: "Registro de Viajeros (Policía)", included: true },
                { name: "Gestión de Limpieza y Lavandería", included: true, highlight: "Tranquilidad Total" },
                { name: "Gestión de Mantenimiento", included: true, highlight: "Cero Preocupaciones" },
            ],
            cta: "Elegir Gestión Integral",
            featured: true
        }
    ];

    return (
        <section className="landing-page-section offer-section">
            <div className="container">
                <h2 className="text-center mb-5">Planes transparentes para cada necesidad</h2>
                <div className="row justify-content-center">
                    {plans.map((plan, index) => (
                        <div key={index} className="col-lg-5 col-md-6 mb-4">
                            <div className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
                                {plan.featured && <div className="featured-badge">Más Popular</div>}
                                <h3>{plan.name}</h3>
                                <p className="price">{plan.price}<span>/ de los ingresos</span></p>
                                <p className="description">{plan.description}</p>
                                <ul className="features-list">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className={feature.included ? 'included' : 'excluded'}>
                                            <FontAwesomeIcon icon={feature.included ? faPlus : faMinus} className="feature-icon" />
                                            {feature.name}
                                            {feature.highlight && <span className="highlight-text">{feature.highlight}</span>}
                                        </li>
                                    ))}
                                </ul>
                                <a href="#calculator" className="btn-cta">{plan.cta}</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
// --- SECCIÓN 7: CALCULADORA ---
const CalculatorSection = () => (
    <section id="calculator" className="landing-page-section bg-light">
       <div className="container">
           <div className="row justify-content-center">
               <div className="col-lg-8 text-center">
                   <h2>Descubre el potencial de tu vivienda en 60 segundos.</h2>
                   <form className="row g-3 mt-3">
                       <div className="col-md-6"><input type="text" className="form-control" placeholder="Ubicación (Ciudad/Zona)" /></div>
                       <div className="col-md-6"><input type="text" className="form-control" placeholder="Tipo de Propiedad" /></div>
                       <div className="col-md-6"><input type="number" className="form-control" placeholder="Número de Habitaciones" /></div>
                       <div className="col-md-6"><input type="email" className="form-control" placeholder="Tu correo electrónico" /></div>
                       <div className="col-12"><button type="submit" className="btn btn-primary" style={{backgroundColor: '#156B7A', border: 'none', padding: '10px 25px'}}>Calcular mis beneficios ahora</button></div>
                   </form>
               </div>
           </div>
       </div>
   </section>
);

// --- SECCIÓN 8: FAQ (ACORDEÓN) ---
const FAQItem = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="faq-item">
            <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
                <span>{q}</span>
                <FontAwesomeIcon icon={isOpen ? faMinus : faPlus} />
            </button>
            {isOpen && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="faq-answer"><p>{a}</p></motion.div>}
        </div>
    );
};
const FAQSection = () => (
    <section className="landing-page-section">
        <div className="container">
            <h2 className="text-center mb-4">Preguntas Frecuentes</h2>
            <div className="accordion">
                <FAQItem q="¿Tengo que pagar algo por adelantado para empezar?" a="No. Nuestros servicios de gestión solo se cobran como una comisión sobre los ingresos que generas. La única inversión inicial es la adecuación de tu vivienda con textil y menaje de calidad profesional para asegurar la satisfacción de los huéspedes y obtener las mejores reseñas." />
                <FAQItem q="¿Qué ocurre si hay una avería o un gasto de mantenimiento?" a="Para agilizar las soluciones, gestionamos directamente los mantenimientos menores a 100€. Para gastos superiores, te contactamos siempre con un presupuesto para tu aprobación. Todos los gastos se detallan de forma transparente en tu liquidación mensual." />
                <FAQItem q="¿Tengo algún tipo de contrato de permanencia?" a="Nuestro acuerdo tiene una duración inicial de 1 año, prorrogable automáticamente. Este periodo nos permite realizar la inversión inicial en tu propiedad (domótica, fotos) y desarrollar una estrategia a medio plazo para maximizar tu rentabilidad." />
                <FAQItem q="¿Cómo y cuándo cobro mis beneficios?" a="Recibirás una liquidación detallada de ingresos y gastos durante los primeros 10 días de cada mes, con el ingreso de tus beneficios directamente en tu cuenta bancaria." />
            </div>
        </div>
    </section>
);

// --- SECCIÓN 9: PITCH FINAL ---
const FinalPitchSection = () => (
    <section className="landing-page-section text-center" style={{backgroundColor: '#156B7A', color: 'white'}}>
        <div className="container">
            <h2 style={{ color: 'white' }}>¿Listo para empezar a ganar más con menos esfuerzo?</h2>
            <p className="lead my-4" style={{ color: 'white' }}>Deja que nuestro equipo de expertos locales y nuestra tecnología de vanguardia trabajen para ti.</p>
            <a href="#calculator" className="hero-cta-button">Solicitar mi estudio gratuito ahora</a>
        </div>
    </section>
);


// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---
function LandingPage() {
    return (
        <>
            <HeroSection />
            <ProblemPromiseSection />
            <SolutionSection />
            <ExclusiveServicesSection />
            <ProofSection />
            <ProcessSection />
            <OfferSection />
            <CalculatorSection />
            <FAQSection />
            <FinalPitchSection />
        </>
    );
}

export default LandingPage;
