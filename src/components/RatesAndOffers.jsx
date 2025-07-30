import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Importar el nuevo fichero CSS
import './../assets/css/booking/RatesAndOffers.css';

// --- Helper para formatear la fecha ---
const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
};

// --- Sub-componente para la cuadrícula de precios ---
function RatesGrid({ seasons }) {
    return (
        <div className="rates-grid">
            {seasons.map((season, index) => (
                <div key={index} className="rate-item">
                    <p className="date-range">
                        Del {formatDate(season.from)} al {formatDate(season.to)}
                    </p>
                    <p className="price">
                        {season.regimes.onlyAccommodation.amount} {season.regimes.onlyAccommodation.currency === 'EUR' ? '€' : '$'}
                    </p>
                </div>
            ))}
        </div>
    );
}

// --- Sub-componente para la lista de ofertas ---
function SpecialOffers({ offers }) {
    return (
        <div className="special-offers-list">
            {offers.map((offer, index) => (
                <div key={index} className="offer-card">
                    <div className="offer-details">
                        <h3 className="offer-title">{offer.title}</h3>
                        <div className="offer-validity">
                            <span>📅</span>
                            <p>
                                Válido del {formatDate(offer.from)} al {formatDate(offer.to)}
                            </p>
                        </div>
                    </div>
                    {offer.visual.value && (
                       <div className="offer-visual">
                           <p className="value">{offer.visual.value}</p>
                           <p className="label">{offer.visual.label}</p>
                       </div>
                    )}
                </div>
            ))}
        </div>
    );
}


// --- Componente Principal ---
export function RatesAndOffers({ accommodationId }) {
    const [ratesData, setRatesData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // La URL base de tu API ahora se obtiene de una variable de entorno.
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://gloove-api-avantio.onrender.com';

    useEffect(() => {
        if (!accommodationId) {
            setLoading(false);
            setError("No se ha proporcionado un ID de alojamiento.");
            return;
        }

        const fetchRates = async () => {
            try {
                setLoading(true);
                // La llamada ahora es dinámica y no está "hardcodeada"
                const response = await axios.get(`${API_BASE_URL}/accommodations/${accommodationId}/rate`);
                setRatesData(response.data.data);
                setError(null);
            } catch (err) {
                setError("No se pudieron cargar las tarifas y ofertas. Inténtalo de nuevo más tarde.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
    }, [accommodationId]);

    if (loading) {
        return <div className="p-4 text-center">Cargando tarifas...</div>;
    }

    if (error) {
        return <div className="p-4 text-center" style={{ color: '#E53E3E', backgroundColor: '#FED7D7', borderRadius: '0.5rem' }}>{error}</div>;
    }

    if (!ratesData) {
        return null;
    }

    return (
        <div className="rates-offers-container">
            <h1 className="main-title">Tarifas y Ofertas para: {ratesData.name}</h1>
            
            <div className="rates-section">
                <h2 className="section-title">Precios por noche</h2>
                <RatesGrid seasons={ratesData.seasons} />
            </div>

            <div className="offers-section">
                <h2 className="section-title">Ofertas especiales</h2>
                {ratesData.modifiers && ratesData.modifiers.length > 0 ? (
                    <SpecialOffers offers={ratesData.modifiers} />
                ) : (
                    <p style={{color: '#A0AEC0'}}>No hay ofertas especiales disponibles en este momento.</p>
                )}
            </div>
        </div>
    );
}
