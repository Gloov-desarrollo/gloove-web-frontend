import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from 'components/Header';
import Footer from 'components/Footer';
import axios from 'axios';
import Swal from 'sweetalert2';
import './../assets/css/booking/PaymentPage.css';

function PaymentPage() {
    const { state } = useLocation();
    const { customerDetails, cartItems } = state || { cartItems: [] }; // Asegurar que cartItems es un array
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Separar alojamientos de experiencias
    const accommodations = cartItems.filter(item => item.type !== 'experience');
    const experiences = cartItems.filter(item => item.type === 'experience');

    const accommodationTotal = accommodations.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const experienceTotal = experiences.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleFinalPayment = async () => {
        setLoading(true);
        Swal.fire({
            title: 'Procesando tu reserva...',
            text: 'Por favor, espera.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        // 1. Ejecutar la reserva del alojamiento (si hay alguno)
        if (accommodations.length > 0) {
            const booking = accommodations[0];
            const params = {
                arrival_date: new Date(booking.bookingDetails.startDate).toISOString().split("T")[0],
                departure_date: new Date(booking.bookingDetails.endDate).toISOString().split("T")[0],
                accommodation_id: booking.id,
                adults_number: booking.bookingDetails.adults,
                children_number: booking.bookingDetails.children,
                client_name: customerDetails.clientName,
                client_surname: customerDetails.clientSurname,
                client_dni: customerDetails.clientDni,
                client_address: customerDetails.clientAddress,
                client_locality: customerDetails.clientLocality,
                client_postcode: customerDetails.clientPostcode,
                client_city: customerDetails.clientCity,
                client_country: customerDetails.clientCountry,
                client_iso_country_code: 'ES',
                client_phone: customerDetails.clientPhone,
                client_email: customerDetails.clientEmail,
                client_language: 'ES',
            };
            
            try {
                await axios.post("https://gloove-api-avantio.onrender.com/set-booking", params);

                if (experiences.length > 0) {
                    console.log("Simulando pago de", experienceTotal.toFixed(2), "€ con Stripe");
                }

                Swal.fire('¡Reserva Confirmada!', 'Tu alojamiento ha sido reservado. Las experiencias han sido pagadas.', 'success');
                navigate('/tour-confirm');

            } catch (err) {
                Swal.fire('Error en la Reserva', 'No se pudo confirmar la reserva del alojamiento. Por favor, inténtalo de nuevo.', 'error');
                console.error(err);
            } finally {
                setLoading(false);
            }
        } else if (experiences.length > 0) {
            console.log("Simulando pago de", experienceTotal.toFixed(2), "€ con Stripe");
            Swal.fire('¡Pago Realizado!', 'Tus experiencias han sido pagadas con éxito.', 'success');
            navigate('/tour-confirm');
            setLoading(false);
        }
    };

    return (
        <div id="wrapper">
            <Header />
            <div className="payment-page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            {/* SECCIÓN DE ALOJAMIENTOS */}
                            {accommodations.length > 0 && (
                                <div className="payment-section">
                                    <h3>Alojamientos</h3>
                                    {accommodations.map(item => (
                                        <div className="payment-item" key={item.cartId}>
                                            <div className="payment-item-details">
                                                <h5>{item.name}</h5>
                                                <p>{new Date(item.bookingDetails.startDate).toLocaleDateString()} - {new Date(item.bookingDetails.endDate).toLocaleDateString()}</p>
                                            </div>
                                            <div className="payment-item-price">
                                                {item.price.toFixed(2)} €
                                            </div>
                                        </div>
                                    ))}
                                    <div className="payment-notice">
                                        <strong>Aviso:</strong> La reserva para tu alojamiento se confirmará ahora, pero el pago se realizará en el destino.
                                    </div>
                                </div>
                            )}

                            {/* SECCIÓN DE EXPERIENCIAS (DINÁMICO) */}
                            {experiences.length > 0 && (
                                <div className="payment-section">
                                    <h3>Experiencias</h3>
                                    {experiences.map(item => (
                                        <div className="payment-item" key={item.cartId}>
                                            <div className="payment-item-details">
                                                <h5>{item.name}</h5>
                                                <p>Fecha: {new Date(item.bookingDetails.date).toLocaleDateString()} - {item.quantity} persona(s)</p>
                                            </div>
                                            <div className="payment-item-price">
                                                {(item.price * item.quantity).toFixed(2)} €
                                            </div>
                                        </div>
                                    ))}
                                    <div className="payment-notice" style={{backgroundColor: '#fffbe6', borderColor: '#ffe58f', color: '#8a6d3b'}}>
                                        <strong>Aviso:</strong> El pago de las experiencias se realizará a continuación.
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="col-lg-4">
                            <div className="order-summary payment-summary">
                                <h3>Confirmar y Pagar</h3>
                                <div className="summary-row">
                                    <span>Total Alojamientos</span>
                                    <span>{accommodationTotal.toFixed(2)} €</span>
                                </div>
                                <div className="summary-row">
                                    <span>Total Experiencias</span>
                                    <span>{experienceTotal.toFixed(2)} €</span>
                                </div>
                                <hr />
                                <div className="summary-row total">
                                    <span>Pago en destino</span>
                                    <span>{accommodationTotal.toFixed(2)} €</span>
                                </div>
                                <div className="summary-row total" style={{ color: '#156B7A' }}>
                                    <span>A Pagar Ahora</span>
                                    <span>{experienceTotal.toFixed(2)} €</span>
                                </div>
                                <button className="btn-checkout mt-4" onClick={handleFinalPayment} disabled={loading || cartItems.length === 0}>
                                    {loading ? 'Procesando...' : 'Pagar Ahora y Confirmar Reserva'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PaymentPage;
