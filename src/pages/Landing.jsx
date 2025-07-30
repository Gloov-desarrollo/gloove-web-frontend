import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faClock, faExclamationTriangle, faFileAlt, faSearch, faStar, faArrowUp, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './../assets/css/booking/LandingPage.css';

// --- SECCIÓN 1: HERO ---
const HeroSection = () => (
    <section className="hero-section">
        <video autoPlay loop muted className="hero-video">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-happy-family-in-a-vacation-home-4856-large.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
            <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                Maximiza la rentabilidad de tu vivienda sin mover un dedo.
            </motion.h1>
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
                Te instalamos domótica valorada en 400€ gratis y solo cobramos cuando tú ganas. Empieza a rentabilizar tu propiedad con riesgo cero.
            </motion.h2>
            <motion.a href="#calculator" className="hero-cta-button" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}>
                Calcula tus ingresos potenciales (Gratis)
            </motion.a>
        </div>
        <div className="trust-bar">
            <span>Publicamos en:</span>
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" alt="Airbnb" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Booking.com-logo.svg" alt="Booking.com" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/Vrbo_logo.svg" alt="Vrbo" />
        </div>
    </section>
);

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

// --- SECCIÓN 4: PRUEBA SOCIAL ---
const ProofSection = () => (
    <section className="landing-page-section">
        <div className="container">
            <h2 className="text-center mb-5">Propietarios como tú ya están ganando más con Gloove.</h2>
            {/* Aquí iría un Carrusel de Testimonios. Por simplicidad, se muestra uno estático */}
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="testimonial-card">
                        <img src="https://picsum.photos/seed/owner1/100/100" alt="Propietario" className="testimonial-img" />
                        <p className="testimonial-quote">"Desde que estoy con Gloove, mi ocupación ha subido un 20% y mis ingresos un 35%. La tranquilidad de la gestión integral no tiene precio."</p>
                        <div className="testimonial-author">
                            <strong>Carlos Gómez</strong><br/>
                            <span>Apartamento de 2 habitaciones en Altea</span>
                        </div>
                        <div className="testimonial-metrics">
                            <span>+35% Ingresos Anuales</span>
                            <span>+20% Ocupación</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

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

// --- SECCIÓN 6: OFERTA (TABLA DE PRECIOS) ---
const OfferSection = () => (
    <section className="landing-page-section">
        <div className="container">
            <h2 className="text-center mb-4">Planes y Precios Transparentes</h2>
            <table className="table pricing-table">
                <thead>
                    <tr>
                        <th className="feature-name">Característica</th>
                        <th>Gestión Básica (15%)</th>
                        <th>Gestión Integral (20%)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td colSpan="3" className="text-center bg-light"><strong>GESTIÓN ONLINE Y HUÉSPEDES</strong></td></tr>
                    <tr><td className="feature-name">Fotografía Profesional</td><td className="check">✅</td><td className="check">✅</td></tr>
                    <tr><td className="feature-name">Creación y Gestión de Anuncios</td><td className="check">✅</td><td className="check">✅</td></tr>
                    <tr><td className="feature-name">Publicación en +25 Portales</td><td className="check">✅</td><td className="check">✅</td></tr>
                    <tr><td className="feature-name">Atención al Huésped 24/7</td><td className="check">✅</td><td className="check">✅</td></tr>
                    <tr><td colSpan="3" className="text-center bg-light"><strong>TECNOLOGÍA Y SEGURIDAD</strong></td></tr>
                    <tr><td className="feature-name">Instalación Domótica (Valor 400€)</td><td className="check">✅</td><td className="check">✅</td></tr>
                    <tr><td className="feature-name">Panel de Propietario en Tiempo Real</td><td className="check">✅</td><td className="check">✅</td></tr>
                    <tr><td className="feature-name">Registro de Viajeros (Policía)</td><td className="check">✅</td><td className="check">✅</td></tr>
                    <tr><td colSpan="3" className="text-center bg-light"><strong>GESTIÓN FÍSICA DE LA PROPIEDAD</strong></td></tr>
                    <tr><td className="feature-name">Gestión de Limpieza y Lavandería</td><td className="cross">❌</td><td className="check">✅ (Tranquilidad Total)</td></tr>
                    <tr><td className="feature-name">Gestión de Mantenimiento</td><td className="cross">❌</td><td className="check">✅ (Cero Preocupaciones)</td></tr>
                </tbody>
            </table>
        </div>
    </section>
);

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
            {isOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="faq-answer"><p>{a}</p></motion.div>}
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
            <h2>¿Listo para empezar a ganar más con menos esfuerzo?</h2>
            <p className="lead my-4">Deja que nuestro equipo de expertos locales y nuestra tecnología de vanguardia trabajen para ti.</p>
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
