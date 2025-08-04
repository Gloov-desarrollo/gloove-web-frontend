import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
            {season.regimes.onlyAccommodation.amount}{' '}
            {season.regimes.onlyAccommodation.currency === 'EUR' ? '€' : '$'}
          </p>
        </div>
      ))}
    </div>
  );
}

// --- Sub-componente para la lista de ofertas especiales ---
function SpecialOffers({ modifiers }) {
  if (!modifiers || modifiers.length === 0) {
    return (
      <p style={{ color: '#A0AEC0' }}>
        No hay ofertas especiales disponibles en este momento.
      </p>
    );
  }

  return (
    <div className="special-offers-list">
      {modifiers.map((mod, index) => {
        const nights = mod.condition?.stayNights?.nights;
        const criteriaText =
          mod.condition?.stayNights?.criteria === 'ABOVE'
            ? `más de ${nights} noches`
            : `${nights} noches`;
        return (
          <div key={index} className="offer-card">
            <div className="offer-details">
              <h3 className="offer-title">{mod.name}</h3>
              {mod.amountType === 'PERCENTAGE' && (
                <p className="offer-description">
                  Descuento del {mod.percentage}% por estancias de {criteriaText}
                </p>
              )}
              {/* Si hubiera otros amountType, puedes añadir más casos aquí */}
              <div className="offer-validity">
                <span>📅</span>
                <p>
                  Válido del {formatDate(mod.from)} al {formatDate(mod.to)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --- Componente Principal ---
export function RatesAndOffers({ accommodationId }) {
  const [ratesData, setRatesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL =
    process.env.REACT_APP_API_URL || 'https://gloove-api-avantio-4gf3.onrender.com';

  useEffect(() => {
    if (!accommodationId) {
      setError('No se ha proporcionado un ID de alojamiento.');
      setLoading(false);
      return;
    }

    const fetchRates = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/accommodations/rate/${accommodationId}`
        );
        setRatesData(response.data.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(
          'No se pudieron cargar las tarifas y ofertas. Inténtalo de nuevo más tarde.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [accommodationId, API_BASE_URL]);

  if (loading) {
    return <div className="p-4 text-center">Cargando tarifas...</div>;
  }

  if (error) {
    return (
      <div
        className="p-4 text-center"
        style={{ color: '#E53E3E', backgroundColor: '#FED7D7', borderRadius: '0.5rem' }}
      >
        {error}
      </div>
    );
  }

  if (!ratesData) {
    return null;
  }

  return (
    <div className="rates-offers-container">
      <h1 className="main-title">Tarifas y Ofertas para: {ratesData.name}</h1>

      <section className="rates-section">
        <h2 className="section-title">Precios por noche</h2>
        <RatesGrid seasons={ratesData.seasons} />
      </section>

      <section className="offers-section">
        <h2 className="section-title">Ofertas especiales</h2>
        <SpecialOffers modifiers={ratesData.modifiers} />
      </section>
    </div>
  );
}