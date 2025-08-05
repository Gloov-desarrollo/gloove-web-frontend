import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faEye, faGem, faUsers, faCogs, faHandshake } from '@fortawesome/free-solid-svg-icons';
import './../assets/css/booking/AboutPage.css';

// --- COMPONENTES VISUALES ---

// Tarjeta con efecto de "glassmorphism"
const GlassCard = ({ icon, title, text, delay }) => (
  <motion.div
    className="glass-card"
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.7, delay, ease: [0.25, 1, 0.5, 1] }}
  >
    <div className="card-icon-wrapper">
      <FontAwesomeIcon icon={icon} />
    </div>
    <h3>{title}</h3>
    <p>{text}</p>
  </motion.div>
);

// Hito de la línea de tiempo
const TimelineItem = ({ year, title, text, align }) => (
  <div className={`timeline-item-wrapper ${align}`}>
    <div className="timeline-dot"></div>
    <motion.div
      className="timeline-item-content"
      initial={{ opacity: 0, x: align === 'left' ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="timeline-year">{year}</div>
      <h4>{title}</h4>
      <p>{text}</p>
    </motion.div>
  </div>
);


// --- PÁGINA "SOBRE NOSOTROS" ---
function AboutPage() {
  return (
    <div className="about-page-reborn">

      {/* --- HERO SECTION --- */}
      <section className="about-hero-reborn">
        <div className="hero-background-image"></div>
        <div className="hero-overlay-reborn"></div>
        <div className="container text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            Nuestra Historia, Tu Futuro
          </motion.h1>
          <motion.p
            className="lead"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Descubre cómo Gloove fusiona la experiencia humana con la innovación tecnológica para maximizar el potencial de tu propiedad.
          </motion.p>
        </div>
      </section>

      {/* --- SECCIÓN MANIFIESTO (MISIÓN, VISIÓN, VALORES) --- */}
      <section className="about-page-section manifest-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-heading">Nuestro Manifiesto</h2>
            <p className="section-subheading">Los principios que impulsan cada una de nuestras acciones.</p>
          </div>
          <div className="row">
            <div className="col-lg-4 mb-4">
              <GlassCard
                icon={faBullseye}
                title="Misión"
                text="Maximizar la rentabilidad de los propietarios y garantizar experiencias inolvidables para los huéspedes a través de una gestión integral, eficiente y transparente."
                delay={0.1}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <GlassCard
                icon={faEye}
                title="Visión"
                text="Ser la empresa líder en gestión de alquileres vacacionales, reconocida por nuestra innovación, la confianza de nuestros clientes y nuestro impacto positivo en el sector."
                delay={0.2}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <GlassCard
                icon={faGem}
                title="Valores"
                text="Transparencia radical, compromiso con la excelencia y una pasión inquebrantable por la tecnología al servicio de las personas. Tu confianza es nuestro activo más valioso."
                delay={0.3}
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN LÍNEA DE TIEMPO --- */}
      <section className="about-page-section timeline-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-heading">Nuestra Trayectoria</h2>
            <p className="section-subheading">Un viaje de crecimiento e innovación constante.</p>
          </div>
          <div className="timeline-container">
            <TimelineItem
              year="2021"
              title="Nacimiento de Gloove"
              text="Fundamos Gloove con la misión de revolucionar la gestión de propiedades, combinando un equipo humano experto con la tecnología más avanzada."
              align="left"
            />
            <TimelineItem
              year="2022"
              title="Expansión Tecnológica"
              text="Implementamos nuestro sistema de domótica y el panel de propietario en tiempo real, ofreciendo un control y transparencia sin precedentes."
              align="right"
            />
            <TimelineItem
              year="2023"
              title="Consolidación del Mercado"
              text="Alcanzamos la gestión de más de 100 propiedades y cerramos acuerdos con los principales portales de reserva a nivel mundial."
              align="left"
            />
             <TimelineItem
              year="Hoy"
              title="Mirando al Futuro"
              text="Continuamos innovando con inteligencia artificial para la optimización de precios y expandiendo nuestros servicios para definir el futuro de la gestión de alquileres."
              align="right"
            />
          </div>
        </div>
      </section>

       {/* --- SECCIÓN DE LLAMADA A LA ACCIÓN --- */}
       <section className="about-page-section text-center cta-reborn">
            <div className="container">
                <h2 className="section-heading">Únete a la revolución de la gestión de alquileres</h2>
                <p className="section-subheading mb-4">Descubre por qué cientos de propietarios ya confían en nosotros.</p>
                <motion.a 
                    href="/investment" 
                    className="cta-button-reborn"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                >
                    Calcula tus Ingresos Potenciales
                </motion.a>
            </div>
        </section>
    </div>
  );
}

export default AboutPage;
