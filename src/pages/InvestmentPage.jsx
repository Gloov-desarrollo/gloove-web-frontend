import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Cambiado a useNavigate
import { investmentProperties } from '../mock-data/real-estate';
import './../assets/css/booking/InvestmentPage.css'; // Renombrado
import { motion } from 'framer-motion';

// --- Sub-componente para la Calculadora ---
const InvestmentCalculator = () => {
    // ... (El código de la calculadora no necesita cambios)
    const [inputs, setInputs] = useState({
        price: '250000',
        rent: '1200',
        expenses: '250',
    });

    const [results, setResults] = useState({
        netProfit: 0,
        roi: 0,
    });

    useEffect(() => {
        const price = parseFloat(inputs.price) || 0;
        const rent = parseFloat(inputs.rent) || 0;
        const expenses = parseFloat(inputs.expenses) || 0;

        if (price > 0) {
            const annualRent = rent * 12;
            const annualExpenses = expenses * 12;
            const netProfit = annualRent - annualExpenses;
            const roi = (netProfit / price) * 100;
            
            setResults({
                netProfit: netProfit,
                roi: roi.toFixed(2),
            });
        } else {
            setResults({ netProfit: 0, roi: 0 });
        }
    }, [inputs]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };
    
    return (
        <div className="calculator-section">
            <h2>Calculadora de Rentabilidad</h2>
            <div className="row">
                <div className="col-md-4">
                    <label htmlFor="price" className="form-label">Precio de Compra (€)</label>
                    <input type="number" name="price" id="price" className="form-control" value={inputs.price} onChange={handleInputChange} />
                </div>
                <div className="col-md-4">
                    <label htmlFor="rent" className="form-label">Alquiler Mensual Estimado (€)</label>
                    <input type="number" name="rent" id="rent" className="form-control" value={inputs.rent} onChange={handleInputChange} />
                </div>
                <div className="col-md-4">
                    <label htmlFor="expenses" className="form-label">Gastos Mensuales (€)</label>
                    <input type="number" name="expenses" id="expenses" className="form-control" value={inputs.expenses} onChange={handleInputChange} />
                </div>
            </div>
            <div className="results-section">
                <h3>Resultados de la Inversión</h3>
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <p className="mb-0">Beneficio Neto Anual</p>
                        <p className="net-profit">{results.netProfit.toLocaleString('es-ES')} €</p>
                    </div>
                    <div className="col-md-6">
                        <p className="mb-0">Rentabilidad (ROI)</p>
                        <p className="roi">{results.roi} %</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Sub-componente para Tarjeta de Propiedad ---
const PropertyCard = ({ property }) => {
    const navigate = useNavigate();
    const roi = (((property.estimatedMonthlyRent * 12 - property.monthlyExpenses * 12) / property.price) * 100).toFixed(2);

    return (
        <motion.div 
            className="col-md-6 col-lg-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
        >
            <div className="property-card" onClick={() => navigate(`/investment/${property.id}`)} style={{cursor: 'pointer'}}>
                <img src={property.image} alt={property.title} />
                <div className="property-card-body">
                    <h4>{property.title}</h4>
                    <p className="location">{property.location}</p>
                    <div className="property-metrics">
                        <div className="metric">
                            <span className="value">{property.price.toLocaleString('es-ES')} €</span>
                            <span className="label">Precio</span>
                        </div>
                        <div className="metric">
                            <span className="value">{property.estimatedMonthlyRent} €/mes</span>
                            <span className="label">Alquiler Est.</span>
                        </div>
                        <div className="metric">
                            <span className="value">{roi}%</span>
                            <span className="label">ROI Est.</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};


// --- Componente Principal de la Página ---
function InvestmentPage() {
    return (
        <div className="investment-page"> {/* Renombrada clase */}
            <section className="hero-section">
                <div className="container">
                    <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        Si eres inversor y buscas rentabilidades, estas son nuestras oportunidades
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
                        Analizamos el mercado para ofrecerte propiedades con un alto potencial de retorno. Utiliza nuestra calculadora para simular tu inversión.
                    </motion.p>
                </div>
            </section>

            <div className="container">
                <h2 className="text-center mb-4" style={{fontWeight: 'bold'}}>Oportunidades de Inversión Destacadas</h2>
                <div className="row">
                    {investmentProperties.map(prop => (
                        <PropertyCard key={prop.id} property={prop} />
                    ))}
                </div>

                <hr className="my-5" />

                <InvestmentCalculator />
                
                <hr className="my-5" />

                {/* Formulario de Contacto para Propietarios */}
                <section className="contact-invest-section">
                    <h2>¿Tienes una propiedad y buscas rentabilidad?</h2>
                    <p>Déjanos tus datos y nuestro equipo de expertos se pondrá en contacto contigo para valorar tu propiedad como una oportunidad de inversión.</p>
                    <form className="row g-3 mt-3">
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Nombre y Apellidos" />
                        </div>
                        <div className="col-md-6">
                            <input type="email" className="form-control" placeholder="Email de Contacto" />
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Teléfono" />
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Dirección de la Propiedad" />
                        </div>
                        <div className="col-12 text-center">
                            <button type="submit" className="btn btn-primary" style={{backgroundColor: '#156B7A', border: 'none'}}>Enviar Información</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default InvestmentPage;
