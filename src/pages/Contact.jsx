import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './../assets/css/booking/ContactPage.css';
import { faUser } from '@fortawesome/free-solid-svg-icons';

// Componente para un campo del formulario
const FormInput = ({ type, name, placeholder, icon, value, onChange }) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div className={`form-field ${isFocused || value ? 'is-focused' : ''}`}>
            <label htmlFor={name}>
                <FontAwesomeIcon icon={icon} className="field-icon" />
                {placeholder}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                required
            />
        </div>
    );
};

// Página de Contacto
function ContactPage() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar el formulario
        console.log("Formulario enviado:", formData);
        alert("¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.");
    };

    return (
        <div className="contact-page">
            {/* --- HERO SECTION --- */}
            <section className="contact-hero">
                <div className="contact-hero-overlay"></div>
                <div className="container text-center">
                    <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        Ponte en Contacto
                    </motion.h1>
                    <motion.p className="lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
                        ¿Tienes alguna pregunta o quieres empezar a maximizar tus ingresos? Estamos aquí para ayudarte.
                    </motion.p>
                </div>
            </section>

            {/* --- CONTENIDO PRINCIPAL --- */}
            <section className="contact-main-content">
                <div className="container">
                    <div className="row">
                        {/* --- Información de Contacto --- */}
                        <motion.div className="col-lg-5 mb-5 mb-lg-0" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                            <div className="contact-info-wrapper">
                                <h3>Información de Contacto</h3>
                                <p>No dudes en visitarnos, llamarnos o enviarnos un correo. ¡Nos encantará saber de ti!</p>
                                <div className="contact-item">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
                                    <div>
                                        <strong>Dirección</strong>
                                        <span>Av. de Ronda, 54, 03600 Elda, Alicante</span>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <FontAwesomeIcon icon={faPhone} className="contact-icon" />
                                    <div>
                                        <strong>Teléfono</strong>
                                        <span>623 48 57 22</span>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                                    <div>
                                        <strong>Email</strong>
                                        <span>info@gloove.me</span>
                                    </div>
                                </div>
                                <div className="contact-map">
                                   <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3121.848529323497!2d-0.7828858846614402!3d38.4883839796357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63c3d8e57c0619%3A0x6e09525d1a55f751!2sAv.%20de%20Ronda%2C%2054%2C%2003600%20Elda%2C%20Alicante!5e0!3m2!1ses!2ses!4v1633534578112!5m2!1ses!2ses" width="100%" height="250" style={{ border: 0, borderRadius: '10px' }} allowFullScreen="" loading="lazy"></iframe>
                                </div>
                            </div>
                        </motion.div>

                        {/* --- Formulario de Contacto --- */}
                        <motion.div className="col-lg-7" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                            <div className="contact-form-wrapper">
                                <h3>Envíanos un Mensaje</h3>
                                <form onSubmit={handleSubmit}>
                                    <FormInput type="text" name="nombre" placeholder="Nombre" icon={faUser} value={formData.nombre} onChange={handleChange} />
                                    <FormInput type="email" name="email" placeholder="Correo Electrónico" icon={faEnvelope} value={formData.email} onChange={handleChange} />
                                    <FormInput type="tel" name="telefono" placeholder="Teléfono" icon={faPhone} value={formData.telefono} onChange={handleChange} />
                                    <FormInput type="text" name="asunto" placeholder="Asunto" icon={faPaperPlane} value={formData.asunto} onChange={handleChange} />
                                    
                                    <div className={`form-field ${formData.mensaje ? 'is-focused' : ''}`}>
                                        <label htmlFor="mensaje">Mensaje</label>
                                        <textarea id="mensaje" name="mensaje" rows="5" value={formData.mensaje} onChange={handleChange} required></textarea>
                                    </div>

                                    <motion.button type="submit" className="btn-submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        Enviar Mensaje
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ContactPage;
