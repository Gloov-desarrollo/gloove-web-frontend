import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock, faUsers, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import { experienceCategories } from '../mock-data/experiences';
import { useCart } from '../context/CartContext';
import './../assets/css/booking/ExperienceDetails.css';

function ExperienceDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [experience, setExperience] = useState(null);
    const [loading, setLoading] = useState(true);

    // Estado para el formulario de reserva
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    useEffect(() => {
        // Encontrar la experiencia en nuestros datos de ejemplo
        let foundExperience = null;
        for (const category of experienceCategories) {
            foundExperience = category.experiences.find(exp => exp.id === parseInt(id));
            if (foundExperience) break;
        }
        setExperience(foundExperience);
        setLoading(false);
    }, [id]);

    const handleAddToCart = () => {
        if (!selectedDate) {
            Swal.fire('Por favor, selecciona una fecha', '', 'warning');
            return;
        }

        const newItem = {
            id: experience.id,
            name: experience.title,
            type: 'experience', // Tipo para diferenciarlo de los alojamientos
            price: experience.price,
            quantity: adults + children,
            image: experience.image,
            bookingDetails: {
                date: selectedDate.toISOString(),
                adults,
                children,
            }
        };

        addToCart(newItem);

        Swal.fire({
            title: '¡Experiencia añadida!',
            text: `${experience.title} ha sido añadido a tu carrito.`,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
        });
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!experience) {
        return <div>Experiencia no encontrada.</div>;
    }

    return (
        <div className="experience-details-page">
            <div className="container">
                <div className="experience-header">
                    <h1>{experience.title}</h1>
                    <p className="location">{experience.location}</p>
                </div>
                <div className="row">
                    {/* Columna principal con detalles */}
                    <div className="col-lg-8">
                        <img src={experience.image} alt={experience.title} className="experience-image-gallery" />
                        <div className="experience-main-content mt-4">
                            <h3><FontAwesomeIcon icon={faCalendarAlt} className="me-2" /> Descripción de la Experiencia</h3>
                            <p>{experience.description}</p>

                            <h3><FontAwesomeIcon icon={faCheckCircle} className="me-2" /> ¿Qué incluye?</h3>
                            <ul>
                                {experience.includes.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>

                            <h3><FontAwesomeIcon icon={faClock} className="me-2" /> Duración</h3>
                            <p>{experience.duration}</p>

                            <h3><FontAwesomeIcon icon={faExclamationCircle} className="me-2" /> Requisitos</h3>
                            <p>{experience.requirements}</p>
                        </div>
                    </div>

                    {/* Sidebar de reserva */}
                    <div className="col-lg-4">
                        <div className="booking-sidebar">
                            <div className="price-display">
                                <span className="price-value">{experience.price}€</span>
                                <span className="price-label"> / por persona</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Fecha</label>
                                <DatePicker id="date" selected={selectedDate} onChange={date => setSelectedDate(date)} className="form-control" dateFormat="dd/MM/yyyy" minDate={new Date()} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="adults">Adultos</label>
                                <input type="number" id="adults" className="form-control" value={adults} onChange={e => setAdults(Math.max(1, parseInt(e.target.value)))} min="1" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="children">Niños</label>
                                <input type="number" id="children" className="form-control" value={children} onChange={e => setChildren(Math.max(0, parseInt(e.target.value)))} min="0" />
                            </div>
                            <button className="btn-add-cart mt-3" onClick={handleAddToCart}>
                                Añadir al Carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExperienceDetails;
