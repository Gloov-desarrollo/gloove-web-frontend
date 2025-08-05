import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faBuilding, faChartPie, faSackDollar, faShieldAlt, faStar,
    faChartLine, faArrowTrendUp, faRulerCombined, faHandshake, faSearchDollar
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { investmentProperties } from '../mock-data/real-estate.js';
import './../assets/css/booking/InvestmentPage.css';

// --- SECCIÓN 1: HERO ---
const HeroSection = () => (
    <section className="hero-section">
        <div className="container">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
                style={{ color: 'white', textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)' }}
            >
                Si eres inversor y buscas rentabilidades, estas son nuestras oportunidades
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{ color: 'white', textShadow: '1px 1px 6px rgba(0, 0, 0, 0.7)' }}
            >
                Analizamos el mercado para ofrecerte propiedades con un alto potencial de retorno. Utiliza nuestra calculadora para simular tu inversión.
            </motion.p>
        </div>
    </section>
);

// --- SECCIÓN 2: OPORTUNIDADES DE INVERSIÓN ---
const InvestmentOpportunitiesSection = () => {
    const properties = investmentProperties || [];

    const getProfitability = (property) => {
        if (!property.price || !property.estimatedMonthlyRent || property.monthlyExpenses === undefined) {
            return 'N/A';
        }
        const netAnnualRent = (property.estimatedMonthlyRent - property.monthlyExpenses) * 12;
        const profitability = (netAnnualRent / property.price) * 100;
        return profitability.toFixed(2);
    };

    if (!Array.isArray(properties) || properties.length === 0) {
        return (
            <section className="investment-opportunities-section">
                <div className="container">
                    <p>Cargando propiedades...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="investment-opportunities-section">
            <div className="container">
                <div className="row">
                    {properties.map((property, index) => (
                        <motion.div 
                            className="col-lg-4 col-md-6 mb-4" 
                            key={property.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="property-card">
                                <Link to={`/investment/${property.id}`} className="property-image-link">
                                    <img src={property.image} alt={property.title} className="property-image"/>
                                    <div className="property-price-tag">{property.price.toLocaleString('es-ES')}€</div>
                                </Link>
                                <div className="property-card-body">
                                    <h5 className="property-title">
                                        <Link to={`/investment/${property.id}`}>{property.title}</Link>
                                    </h5>
                                    <p className="property-location">{property.location}</p>
                                    <div className="property-metrics">
                                        <div className="metric-item">
                                            <FontAwesomeIcon icon={faChartLine} />
                                            <strong>{getProfitability(property)}%</strong>
                                            <span>Rentabilidad Neta</span>
                                        </div>
                                        <div className="metric-item">
                                            <FontAwesomeIcon icon={faArrowTrendUp} />
                                            <strong>~5%</strong>
                                            <span>Revalorización</span>
                                        </div>
                                        <div className="metric-item">
                                            <FontAwesomeIcon icon={faRulerCombined} />
                                            <strong>{property.area || 'N/A'} m²</strong>
                                            <span>Superficie</span>
                                        </div>
                                    </div>
                                    <Link to={`/investment/${property.id}`} className="btn-details">Ver Detalles</Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};


// --- SECCIÓN 3: VENTAJAS DE INVERTIR CON GLOOVE ---
const AdvantagesSection = () => (
    <section className="advantages-section">
        <div className="container text-center">
            <h2 className="mb-5">Ventajas de Invertir con Nosotros</h2>
            <div className="row">
                <div className="col-md-3 advantage-item">
                    <FontAwesomeIcon icon={faBuilding} className="icon" />
                    <h4>Acceso Exclusivo</h4>
                    <p>Oportunidades de inversión seleccionadas y analizadas por nuestro equipo, que no encontrarás en otro lugar.</p>
                </div>
                <div className="col-md-3 advantage-item">
                    <FontAwesomeIcon icon={faChartPie} className="icon" />
                    <h4>Análisis de Datos</h4>
                    <p>Tomamos decisiones basadas en datos para maximizar la rentabilidad y minimizar los riesgos de cada inversión.</p>
                </div>
                <div className="col-md-3 advantage-item">
                    <FontAwesomeIcon icon={faSackDollar} className="icon" />
                    <h4>Gestión Integral</h4>
                    <p>Nos encargamos de todo: desde la reforma y decoración hasta la gestión del alquiler, para que tú solo te preocupes de recibir los beneficios.</p>
                </div>
                <div className="col-md-3 advantage-item">
                    <FontAwesomeIcon icon={faShieldAlt} className="icon" />
                    <h4>Seguridad y Transparencia</h4>
                    <p>Accede a toda la información de tu inversión en tiempo real a través de nuestro panel de propietario.</p>
                </div>
            </div>
        </div>
    </section>
);

// --- SECCIÓN 4: PRUEBA SOCIAL (TESTIMONIOS) ---
const SocialProofSection = () => {
    const testimonials = [
        {
            quote: "Invertí en una propiedad con Gloove y en menos de un año ya estaba generando una rentabilidad neta del 8%. Su gestión es impecable y transparente.",
            author: "Marcos Villanueva",
            location: "Inversor en Alicante",
            img: "https://randomuser.me/api/portraits/men/62.jpg",
            metrics: ["+8% Rentabilidad Neta", "100% Ocupación"],
            stars: 5
        },
        {
            quote: "El equipo de Gloove me asesoró en todo el proceso. Encontraron la propiedad ideal, la reformaron y ahora me genera ingresos pasivos cada mes. ¡Increíble!",
            author: "Sofía Lorente",
            location: "Inversora en Benidorm",
            img: "https://randomuser.me/api/portraits/women/71.jpg",
            metrics: ["Gestión sin preocupaciones", "Ingresos Pasivos"],
            stars: 5
        }
    ];

    const responsive = {
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
    };

    return (
        <section className="investment-testimonial-section">
            <div className="container">
                <h2 className="text-center mb-5">Historias de Éxito de Nuestros Inversores</h2>
                <Carousel
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={6000}
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

// --- SECCIÓN 5: CALCULADORA DE INVERSIÓN ---
const InvestmentCalculatorSection = () => {
    const [price, setPrice] = useState(150000);
    const [rent, setRent] = useState(900);
    const [expenses, setExpenses] = useState(150);
    const [results, setResults] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        const annualRent = (rent - expenses) * 12;
        const profitability = (annualRent / price) * 100;
        setResults({
            annualRent: annualRent.toLocaleString('es-ES'),
            profitability: profitability.toFixed(2)
        });
    };

    return (
        <section className="calculator-section">
            <div className="container">
                <h2 className="text-center mb-5">Calcula la Rentabilidad de tu Inversión</h2>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <form onSubmit={handleCalculate} className="calculator-form">
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="price" className="form-label">Precio de Compra (€)</label>
                                    <input type="number" className="form-control" id="price" value={price} onChange={e => setPrice(Number(e.target.value))} />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="rent" className="form-label">Alquiler Mensual (€)</label>
                                    <input type="number" className="form-control" id="rent" value={rent} onChange={e => setRent(Number(e.target.value))} />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="expenses" className="form-label">Gastos Mensuales (€)</label>
                                    <input type="number" className="form-control" id="expenses" value={expenses} onChange={e => setExpenses(Number(e.target.value))} />
                                </div>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn-calculate">Calcular Rentabilidad</button>
                            </div>
                        </form>

                        {results && (
                            <motion.div 
                                className="results-section"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h3>Resultados de la Simulación</h3>
                                <p>Beneficio Anual Neto: <span className="net-profit">{results.annualRent}€</span></p>
                                <p>Rentabilidad Neta: <span className="roi">{results.profitability}%</span></p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- SECCIÓN 6: FORMULARIO DE CONTACTO PARA INVERSORES ---
const InvestorContactSection = () => {
    const [interest, setInterest] = useState('buy');

    return (
        <section className="investor-contact-section">
            <div className="container">
                <h2 className="text-center mb-4">Contacta con Nuestro Equipo de Inversiones</h2>
                <p className="text-center lead mb-4">
                    ¿Listo para dar el siguiente paso? Déjanos tus datos y nos pondremos en contacto contigo.
                </p>
                
                <div className="disclaimer-box">
                    <strong>Nota importante:</strong> Solo seleccionamos y gestionamos propiedades que cumplen con nuestros estrictos criterios de inversión, asegurando rentabilidades potenciales superiores al 7% para nuestros socios.
                </div>

                <form className="investor-form mt-5">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <div className="form-group interest-group">
                                <label>Tu interés principal es:</label>
                                <div>
                                    <button type="button" className={`btn-interest ${interest === 'buy' ? 'active' : ''}`} onClick={() => setInterest('buy')}>
                                        <FontAwesomeIcon icon={faSearchDollar} /> Comprar una vivienda
                                    </button>
                                    <button type="button" className={`btn-interest ${interest === 'manage' ? 'active' : ''}`} onClick={() => setInterest('manage')}>
                                        <FontAwesomeIcon icon={faHandshake} /> Gestionar mi vivienda
                                    </button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <input type="text" className="form-control" placeholder="Nombre completo" required />
                                </div>
                                <div className="col-md-6 form-group">
                                    <input type="email" className="form-control" placeholder="Correo electrónico" required />
                                </div>
                            </div>
                             <div className="form-group">
                                <input type="tel" className="form-control" placeholder="Teléfono" required />
                            </div>
                            <div className="form-group">
                                <textarea className="form-control" rows="4" placeholder="Cuéntanos un poco más sobre tu proyecto o consulta..."></textarea>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn-submit-investor">Enviar Consulta</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};


// --- Componente Principal de la Página ---
function InvestmentPage() {
    return (
        <div className="investment-page">
            <HeroSection />
            <InvestmentOpportunitiesSection />
            <AdvantagesSection />
            <SocialProofSection />
            <InvestmentCalculatorSection />
            <InvestorContactSection />
        </div>
    );
}

export default InvestmentPage;
