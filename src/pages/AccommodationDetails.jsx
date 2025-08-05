import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoaderFullScreen from "components/LoaderFullScreen/LoaderFullScreen";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi, faParking, faSwimmer, faDog, faSmokingBan, faExclamationTriangle, faBed, faSnowflake, faFire, faTv, faTshirt, faCouch, faUserFriends
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useCart } from '../context/CartContext'; 

import "./../assets/css/booking/bootstrap.min.css";
import "./../assets/css/booking/mdb.min.css";
import "./../assets/css/booking/plugins.css";
import "./../assets/css/booking/style.css";
import "./../assets/css/booking/coloring.css";
import "./../assets/css/booking/colors/scheme-01.css";
import "./../assets/css/booking/AccommodationDetails.css";
import "./../assets/css/booking/RatesAndOffers.css"; 
import { RatesAndOffers } from "components/RatesAndOffers";

const iconMap = {
  HEATING: faFire,
  AIR_CONDITIONED: faSnowflake,
  PARKING: faParking,
  SWIMMING_POOL: faSwimmer,
  BEDCLOTHES: faBed,
  TOWELS: faTshirt,
  INTERNET_ACCESS: faWifi,
  WIFI: faWifi,
  PETS_ALLOWED: faDog,
  SMOKING_NOT_ALLOWED: faSmokingBan,
  EVENTS_NOT_ALLOWED: faExclamationTriangle,
  TV: faTv,
  LIVING_ROOM: faCouch,
  YOUNG_GROUPS_NOT_ALLOWED: faUserFriends,
  DEFAULT: faBed,
};

function AccommodationDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [accommodation, setAccommodation] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [availabilities, setAvailabilities] = useState([]);
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const { addToCart } = useCart();

  const unavailableRanges =
    availabilities.length > 0
      ? availabilities
        .filter((a) => a.status === "UNAVAILABLE")
        .map((a) => ({
          start: new Date(a.from),
          end: new Date(a.to),
        }))
      : [];

  const translateText = (text, type = "default") => {
    const translations = {
      default: {
        WITH_SHOWER: "Con ducha",
        WITHOUT_SHOWER: "Sin ducha",
        AMERICAN: "Americana",
        UNKNOWN: "Desconocida",
        VITROCERAMIC_HOB: "Vitrocerámica",
        BEDROOM: "Dormitorio",
        COMMON_AREA: "Living",
        INDIVIDUAL: "Individual",
        DOUBLE: "Doble",
        SOFA: "Sofá",
        FRIDGE: "Refrigerador",
        WASHING_MACHINE: "Lavadora",
        KITCHEN_UTENSILS: "Utensilios de cocina",
        FREEZER: "Congelador",
        COFFEE_MACHINE: "Cafetera",
        OVEN: "Horno",
        DISHWASHER: "Lavavajillas",
        MICROWAVE: "Microondas",
        DISHES: "Vajilla",
        TOASTER: "Tostadora",
        JUICE_SQUEEZER: "Exprimidor",
        HEATING: "Calefacción",
        AIR_CONDITIONED: "Aire acondicionado",
        PARKING: "Estacionamiento",
        SWIMMING_POOL: "Piscina",
        BEDCLOTHES: "Ropa de cama",
        TOWELS: "Toallas",
        INTERNET_ACCESS: "Acceso a Internet",
        FINAL_CLEAN: "Limpieza final",
        DEPOSIT: "Depósito",
        CENTRAL_HEATING: "Calefacción central",
        WIFI: "Wi‑Fi",
        OUTDOORS_PARKING: "Estacionamiento exterior",
        SAME_BUILDING: "Mismo edificio",
        EVENTS_NOT_ALLOWED: "No se permiten eventos",
        PING_PONG_TABLE: "Mesa de ping pong",
        ALL_SPACES_NON_SMOKING_PUBLIC_AND_PRIVATE: "Espacios no fumadores",
        NOISE_DISCLAIMER: "Aviso de ruidos",
        CHILDREN_AREA: "Área para niños",
        IRON: "Plancha",
        HAIR_DRYER: "Secador de pelo",
        PETS_ALLOWED: "Mascotas permitidas",
      },
    };
    return translations[type][text] || text;
  };

  useEffect(() => {
    axios
      .get(`https://gloove-api-avantio.onrender.com/accommodations-add/${id}`)
      .then((response) => {
        setAccommodation(response.data.data);
        setGallery(response.data.gallery.data);
        setAvailabilities(response.data.availabilities.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching accommodation details:", error);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!adults.trim() || !pickupDate || !returnDate) {
      Swal.fire("Completa todos los datos", "Fechas y número de adultos son obligatorios.", "warning");
      return;
    }
    if (returnDate <= pickupDate) {
      Swal.fire("Fechas incorrectas", "La fecha de salida debe ser posterior a la de ingreso.", "error");
      return;
    }

    const newItem = {
        id: accommodation.id,
        name: accommodation.name,
        location: accommodation.location.cityName,
        price: 150, 
        quantity: 1,
        image: gallery?.images?.[0]?.url || '',
        bookingDetails: {
            adults: parseInt(adults),
            children: parseInt(children) || 0,
            startDate: pickupDate.toISOString(),
            endDate: returnDate.toISOString(),
        }
    };

    addToCart(newItem);

    Swal.fire({
      title: "¡Añadido!",
      text: `${accommodation.name} ha sido añadido a tu carrito.`,
      icon: "success",
      timer: 2000,
      showConfirmButton: false
    });
  };

  const descriptionText = gallery?.description?.[0].text || "";
  const truncateText = (text, limit) => (text.length <= limit ? text : text.substring(0, limit) + "...");
  const aggregatedBedrooms = {};
  if (accommodation?.distribution?.bedrooms) {
    accommodation.distribution.bedrooms.forEach((bedroom) => {
      const groupType = translateText(bedroom.type);
      if (!aggregatedBedrooms[groupType]) aggregatedBedrooms[groupType] = {};
      if (bedroom.beds) {
        bedroom.beds.forEach((bed) => {
          const bedType = translateText(bed.type);
          if (!aggregatedBedrooms[groupType][bedType]) aggregatedBedrooms[groupType][bedType] = 0;
          aggregatedBedrooms[groupType][bedType] += bed.amount;
        });
      }
    });
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <>
      {loading && <LoaderFullScreen />}
      <section id="section-car-details" style={{ marginTop: "30px" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
                <Carousel responsive={{desktop: {breakpoint: { max: 3000, min: 0 }, items: 1}}} infinite autoPlay autoPlaySpeed={3000} keyBoardControl showDots={false} swipeable>
                    {gallery && gallery.images && gallery.images.length > 0 ? (
                    gallery.images.map((item) => (
                        <div key={item.id}>
                        <img src={item.url} alt={item.name} style={{ width: "100%", height: "auto" }} />
                        </div>
                    ))
                    ) : (
                    <div>
                        <img src="default_image.jpg" alt="No image available" style={{ width: "100%", height: "auto" }} />
                    </div>
                    )}
                </Carousel>
            </div>
            <div className="col-lg-3">
              <h3>{accommodation?.name}</h3>
              <p>
                {isExpanded ? descriptionText : truncateText(descriptionText, 250)}
                {descriptionText.length > 250 && (
                  <span style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }} onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? " Ver menos" : " Ver más"}
                  </span>
                )}
              </p>
            </div>
            <div className="col-lg-3">
              <h4>Configura tu estancia</h4>
              <div className="de-box mb25">
                <form id="contact_form" method="post" onSubmit={handleAddToCart}>
                  <div className="spacer-20" />
                  <div className="row">
                    <div className="col-lg-12 mb20">
                      <h5>Adultos</h5>
                      <input type="number" name="adults" placeholder="Cantidad de adultos" className="form-control" value={adults} onChange={(e) => setAdults(e.target.value)} min="1" />
                    </div>
                    <div className="col-lg-12 mb20">
                      <h5>Niños</h5>
                      <input type="number" name="children" placeholder="Cantidad de niños" className="form-control" value={children} onChange={(e) => setChildren(e.target.value)} min="0" />
                    </div>
                    <div className="col-lg-12 mb20">
                      <h5>Fecha de ingreso</h5>
                      <DatePicker selected={pickupDate} onChange={(date) => setPickupDate(date)} excludeDateIntervals={unavailableRanges} dateFormat="yyyy-MM-dd" placeholderText="Seleccione la fecha" className="form-control w-100" minDate={new Date()} />
                    </div>
                    <div className="col-lg-12 mb20">
                      <h5>Fecha de salida</h5>
                      <DatePicker selected={returnDate} onChange={(date) => setReturnDate(date)} excludeDateIntervals={unavailableRanges} dateFormat="yyyy-MM-dd" placeholderText="Seleccione la fecha" className="form-control w-100" minDate={pickupDate || new Date()} />
                    </div>
                  </div>
                  <button type="submit" className="btn-main btn-fullwidth" style={{ backgroundColor: "#156B7A" }}>
                    Añadir al carrito
                  </button>
                  <div className="clearfix" />
                </form>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container details-container">
          <div className="row">
            <div className="col-12">
              {accommodation?.features?.facilities && (
                <motion.div className="detail-section" variants={sectionVariants} initial="hidden" animate="visible" custom={0}>
                  <h3>Características más destacadas</h3>
                  <div className="features-grid">
                    {accommodation.features.facilities.map((facility, index) => (
                      <div key={index} className="feature-item">
                        <FontAwesomeIcon icon={iconMap[facility] || iconMap.DEFAULT} className="icon" />
                        <span>{translateText(facility)}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
              <motion.div className="detail-section" variants={sectionVariants} initial="hidden" animate="visible" custom={1}>
                <h3>Distribución de dormitorios</h3>
                {Object.entries(aggregatedBedrooms).map(([group, beds], groupIndex) => (
                  <div key={groupIndex} className="feature-item">
                    <FontAwesomeIcon icon={faBed} className="icon" />
                    <span>
                      {group}:{" "}
                      {Object.entries(beds).map(([bedType, count], idx, arr) => (
                        <span key={bedType}>
                          {count} {count === 1 ? "cama" : "camas"} de tipo {bedType}
                          {idx < arr.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </motion.div>
              {accommodation?.services && (
                <motion.div className="detail-section" variants={sectionVariants} initial="hidden" animate="visible" custom={2}>
                  <h3>Servicios incluidos</h3>
                  <div className="services-grid">
                    {accommodation.services
                      .filter((service) => service.available === undefined || service.available === true)
                      .map((service, index) => (
                        <div key={index} className="feature-item">
                          <FontAwesomeIcon icon={iconMap[service.type] || iconMap.DEFAULT} className="icon" />
                          <span>{translateText(service.type)}</span>
                        </div>
                      ))}
                  </div>
                </motion.div>
              )}
              <motion.div className="detail-section" variants={sectionVariants} initial="hidden" animate="visible" custom={3}>
                <h3>Observaciones</h3>
                <div className="observations-section">
                  <p>- Este alquiler no acepta grupos de jóvenes (Hasta 18 años)</p>
                  <p>- No se permite fumar</p>
                  <p>- En este alojamiento se admiten animales, salvo razas peligrosas. Se admiten animales con peso menor a 5Kg. - Alojamiento accesible.</p>
                </div>
              </motion.div>
              <motion.div variants={sectionVariants} initial="hidden" animate="visible" custom={4}>
                <RatesAndOffers accommodationId={id} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AccommodationDetails;
