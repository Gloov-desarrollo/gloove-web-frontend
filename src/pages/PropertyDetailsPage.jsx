import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { investmentProperties } from '../mock-data/real-estate';
import './../assets/css/booking/PropertyDetailsPage.css';

// Datos de ejemplo para el gráfico de proyecciones
const generateProjections = (initialValue) => {
    const data = [];
    let currentValue = initialValue;
    for (let i = 0; i < 10; i++) {
        data.push({
            year: `Año ${i + 1}`,
            value: Math.round(currentValue),
        });
        currentValue *= 1.05; // Asumimos una revalorización del 5% anual
    }
    return data;
};

function PropertyDetailsPage() {
    const { id } = useParams();
    const property = investmentProperties.find(p => p.id === parseInt(id));

    if (!property) {
        return <div>Propiedad no encontrada.</div>;
    }

    const projectionData = generateProjections(property.price);

    return (
        <div className="property-details-page">
            <div className="container">
                <img src={property.image} alt={property.title} className="property-details-image" />
                
                <div className="investment-summary-card">
                    <div className="property-details-header">
                        <h1>{property.title}</h1>
                        <p className="location">{property.location}</p>
                    </div>
                    <div className="investment-metrics">
                        <div className="metric-item">
                            <span className="value">{property.price.toLocaleString('es-ES')} €</span>
                            <span className="label">Precio de Compra</span>
                        </div>
                        <div className="metric-item">
                            <span className="value">{property.estimatedMonthlyRent} €/mes</span>
                            <span className="label">Alquiler Estimado</span>
                        </div>
                        <div className="metric-item">
                            <span className="value">{(((property.estimatedMonthlyRent * 12 - property.monthlyExpenses * 12) / property.price) * 100).toFixed(2)}%</span>
                            <span className="label">ROI Estimado</span>
                        </div>
                    </div>
                </div>

                <div className="property-description">
                    <div className="row">
                        <div className="col-md-7">
                            <h3>Descripción de la Propiedad</h3>
                            <p>
                                Excelente oportunidad de inversión en {property.location}. Este {property.title.toLowerCase()} ofrece una combinación perfecta de ubicación, calidad y potencial de revalorización. Ideal para inversores que buscan un activo sólido con un flujo de caja constante a través del alquiler turístico o tradicional.
                            </p>
                            <h3>Proyección de Revalorización (10 años)</h3>
                            <p>
                                Basado en el crecimiento histórico de la zona y las tendencias del mercado, se estima una revalorización anual conservadora del 5%.
                            </p>
                             <div className="projection-chart">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={projectionData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="year" />
                                        <YAxis tickFormatter={(value) => `${(value / 1000)}k €`} />
                                        <Tooltip formatter={(value) => [`${value.toLocaleString('es-ES')} €`, "Valor estimado"]}/>
                                        <Legend />
                                        <Line type="monotone" dataKey="value" name="Valor Estimado" stroke="#156B7A" strokeWidth={3} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <h3>Interesado en esta propiedad?</h3>
                            <p>
                                Nuestro equipo de expertos puede proporcionarte un dossier completo, análisis de mercado y asesoramiento personalizado.
                            </p>
                            <Link to="/contacto" className="btn btn-primary" style={{backgroundColor: '#156B7A', border: 'none'}}>Contactar a un Asesor</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropertyDetailsPage;
