import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "components/Header";
import BookingCardGroup from "components/BookingCardGroup";
import Footer from "components/Footer";
import LoaderFullScreen from "components/LoaderFullScreen/LoaderFullScreen";
import Swal from "sweetalert2";

function AccommodationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [accommodation, setAccommodation] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [availabilities, setAvailabilities] = useState([]);

  // Estados para el formulario de reserva
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  // Estados para la hora se mantienen en selects
  // const [pickupTime, setPickupTime] = useState("");
  // const [returnTime, setReturnTime] = useState("");
  // Estado para controlar si la descripción está expandida
  const [isExpanded, setIsExpanded] = useState(false);

  // Computamos los rangos de fechas no disponibles usando la propiedad "availabilities"
  const unavailableRanges =
    availabilities.length > 0
      ? availabilities
        .filter((a) => a.status === "UNAVAILABLE")
        .map((a) => ({
          start: new Date(a.from),
          end: new Date(a.to),
        }))
      : [];

  // Funciones de traducción para distribución
  const translateBathroomType = (type) => {
    const translations = {
      WITH_SHOWER: "Con ducha",
      WITHOUT_SHOWER: "Sin ducha",
    };
    return translations[type] || type;
  };

  const translateKitchenType = (type) => {
    const translations = {
      AMERICAN: "Americana",
      UNKNOWN: "Desconocida",
    };
    return translations[type] || type;
  };

  const translateCooktop = (cooktop) => {
    const translations = {
      VITROCERAMIC_HOB: "Vitrocerámica",
      UNKNOWN: "Desconocida",
    };
    return translations[cooktop] || cooktop;
  };

  // Traducción para dormitorios
  const translateBedroomType = (type) => {
    const translations = {
      BEDROOM: "Dormitorio",
      COMMON_AREA: "Living",
    };
    return translations[type] || type;
  };

  // Traducción para tipos de cama (se añade "SOFA")
  const translateBedType = (type) => {
    const translations = {
      INDIVIDUAL: "Individual",
      DOUBLE: "Doble",
      SOFA: "Sofá",
    };
    return translations[type] || type;
  };

  const translateAppliance = (appliance) => {
    const translations = {
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
    };
    return translations[appliance] || appliance;
  };

  // Funciones de traducción para servicios
  const translateServiceType = (type) => {
    const translations = {
      HEATING: "Calefacción",
      AIR_CONDITIONED: "Aire acondicionado",
      PARKING: "Estacionamiento",
      SWIMMING_POOL: "Piscina",
      BEDCLOTHES: "Ropa de cama",
      TOWELS: "Toallas",
      INTERNET_ACCESS: "Acceso a Internet",
      FINAL_CLEAN: "Limpieza final",
      DEPOSIT: "Depósito",
    };
    return translations[type] || type;
  };

  const translateHeatingType = (heatingType) => {
    const translations = {
      CENTRAL_HEATING: "Calefacción central",
    };
    return translations[heatingType] || heatingType;
  };

  const translateAccessType = (accessType) => {
    const translations = {
      WIFI: "Wi‑Fi",
    };
    return translations[accessType] || accessType;
  };

  const translateParkingType = (parkingType) => {
    const translations = {
      OUTDOORS_PARKING: "Estacionamiento exterior",
    };
    return translations[parkingType] || parkingType;
  };

  const translateParkingLocation = (location) => {
    const translations = {
      SAME_BUILDING: "Mismo edificio",
    };
    return translations[location] || location;
  };

  // Función de traducción para características destacadas
  const translateFeature = (feature) => {
    const translations = {
      EVENTS_NOT_ALLOWED: "No se permiten eventos",
      PING_PONG_TABLE: "Mesa de ping pong",
      ALL_SPACES_NON_SMOKING_PUBLIC_AND_PRIVATE: "Espacios no fumadores",
      NOISE_DISCLAIMER: "Aviso de ruidos",
      CHILDREN_AREA: "Área para niños",
      IRON: "Plancha",
      HAIR_DRYER: "Secador de pelo",
    };
    return translations[feature] || feature;
  };

  // Función para renderizar un servicio (sólo muestra lo disponible sin etiquetas de "Tipo")
  const renderService = (service) => {
    switch (service.type) {
      case "HEATING":
        return translateHeatingType(service.heatingType) || translateServiceType(service.type);
      case "AIR_CONDITIONED":
        return translateServiceType(service.type);
      case "PARKING":
        {
          let details = [];
          if (service.maxAmount !== undefined) details.push(service.maxAmount);
          if (service.parkingType) details.push(translateParkingType(service.parkingType));
          if (service.location) details.push(translateParkingLocation(service.location));
          return details.join(", ");
        }
      case "SWIMMING_POOL":
        return translateServiceType(service.type);
      case "BEDCLOTHES":
        // (service.renewalFrequency !== undefined ? `, Renovación: ${service.renewalFrequency}` : "")
        return translateServiceType(service.type);
      case "TOWELS":
        // + (service.renewalFrequency !== undefined ? `, Renovación: ${service.renewalFrequency}` : "")
        return translateServiceType(service.type);
      case "INTERNET_ACCESS":
        return translateServiceType(service.type) + (service.accessType ? `, ${translateAccessType(service.accessType)}` : "");
      case "FINAL_CLEAN":
        return translateServiceType(service.type);
      case "DEPOSIT":
        return translateServiceType(service.type);
      default:
        return translateServiceType(service.type);
    }
  };

  useEffect(() => {
    axios
      .get(`https://gloove-api-avantio.onrender.com/accommodations-add/${id}`)
      .then((response) => {
        console.log("Response", response);
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

  const responsive = {
    superLarge: { breakpoint: { max: 4000, min: 1024 }, items: 1 },
    large: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    medium: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const handleBookNowClick = (e) => {
    e.preventDefault();

    if (
      !adults.trim() ||
      !children.trim() ||
      !pickupDate ||
      !returnDate
    ) {
      Swal.fire("Completa todos los datos", "", "warning");
      return;
    }

    if (returnDate < pickupDate) {
      Swal.fire("La fecha de salida debe ser igual o posterior a la de ingreso", "", "error");
      return;
    }

    navigate("/checkout", {
      state: { id, accommodation, adults, children, pickupDate, returnDate },
    });
  };


  const descriptionText = gallery?.description?.[0].text || "";
  const truncateText = (text, limit) =>
    text.length <= limit ? text : text.substring(0, limit) + "...";

  // Agrupamos la información de dormitorios para mostrarlos en una sola línea por grupo
  const aggregatedBedrooms = {};
  if (accommodation?.distribution?.bedrooms) {
    accommodation.distribution.bedrooms.forEach((bedroom) => {
      const groupType = translateBedroomType(bedroom.type);
      if (!aggregatedBedrooms[groupType]) {
        aggregatedBedrooms[groupType] = {};
      }
      if (bedroom.beds) {
        bedroom.beds.forEach((bed) => {
          const bedType = translateBedType(bed.type);
          if (!aggregatedBedrooms[groupType][bedType]) {
            aggregatedBedrooms[groupType][bedType] = 0;
          }
          aggregatedBedrooms[groupType][bedType] += bed.amount;
        });
      }
    });
  }

  return (
    <div id="wrapper">
      {loading && <LoaderFullScreen />}
      <Header />
      <section id="section-car-details" style={{ marginTop: "30px" }}>
        <div className="container">
          <div className="row">
            {/* Galería - Carousel */}
            <div className="col-lg-6">
              <Carousel
                responsive={responsive}
                infinite
                autoPlay
                autoPlaySpeed={3000}
                keyBoardControl
                showDots={false}
                swipeable
              >
                {gallery && gallery.images && gallery.images.length > 0 ? (
                  gallery.images.map((item) => (
                    <div key={item.id}>
                      <img
                        src={item.url}
                        alt={item.name}
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                  ))
                ) : (
                  <div>
                    <img
                      src="default_image.jpg"
                      alt="No image available"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                )}
              </Carousel>
            </div>

            {/* Información y Especificaciones */}
            <div className="col-lg-3">
              <h3>{accommodation?.name}</h3>
              <p>
                {isExpanded
                  ? descriptionText
                  : truncateText(descriptionText, 250)}
                {descriptionText.length > 250 && (
                  <span
                    style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? " Ver menos" : " Ver más"}
                  </span>
                )}
              </p>
              <h4>Especificaciones</h4>
              {accommodation?.distribution && (
                <div>
                  {/* Baños */}
                  {accommodation?.distribution?.bathrooms && (
                    <div>
                      <h5>Baños:</h5>
                      {accommodation.distribution.bathrooms.map((bathroom, index) => (
                        <p key={index}>
                          Tipo: {translateBathroomType(bathroom.type)} - Cantidad: {bathroom.count}
                        </p>
                      ))}
                    </div>
                  )}
                  {/* Cocina */}
                  {accommodation?.distribution?.kitchens && (
                    <div>
                      <h5>Cocina:</h5>
                      <p>
                        {accommodation.distribution.kitchens.count}{" "}
                        {translateKitchenType(accommodation.distribution.kitchens.type)} con cocina de{" "}
                        {translateCooktop(accommodation.distribution.kitchens.cooktop)}
                      </p>
                      {accommodation.distribution.kitchens.appliances &&
                        accommodation.distribution.kitchens.appliances.length > 0 && (
                          <p>
                            Equipamiento:{" "}
                            {accommodation.distribution.kitchens.appliances.map((appliance, index) => (
                              <span key={index}>
                                {translateAppliance(appliance)}
                                {index < accommodation.distribution.kitchens.appliances.length - 1 ? ", " : ""}
                              </span>
                            ))}
                          </p>
                        )}
                    </div>
                  )}
                  {/* Exteriores */}
                  {accommodation?.distribution?.outdoors &&
                    accommodation.distribution.outdoors.balconies && (
                      <div>
                        <h5>Exteriores:</h5>
                        <p>Balcones: {accommodation.distribution.outdoors.balconies.count}</p>
                      </div>
                    )}
                </div>
              )}
            </div>

            {/* Formulario de reserva */}
            <div className="col-lg-3">
              <h4>Formulario de reserva</h4>
              <div className="de-box mb25">
                <form id="contact_form" method="post">
                  <div className="spacer-20" />
                  <div className="row">
                    <div className="col-lg-12 mb20">
                      <h5>Adultos</h5>
                      <input
                        type="text"
                        name="PickupLocation"
                        placeholder="Cantidad de adultos"
                        id="autocomplete"
                        autoComplete="off"
                        className="form-control"
                        value={adults}
                        onChange={(e) => setAdults(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-12 mb20">
                      <h5>Niños</h5>
                      <input
                        type="text"
                        name="DropoffLocation"
                        placeholder="Cantidad de niños"
                        id="autocomplete2"
                        autoComplete="off"
                        className="form-control"
                        value={children}
                        onChange={(e) => setChildren(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-12 mb20">
                      <h5>Fecha &amp; Hora de ingreso</h5>
                      <div className="date-time-field">
                        <DatePicker
                          selected={pickupDate}
                          onChange={(date) => setPickupDate(date)}
                          excludeDateIntervals={unavailableRanges}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Seleccione la fecha de ingreso"
                          className="form-control w-100"
                          minDate={new Date()}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 mb20">
                      <h5>Fecha &amp; Hora de salida</h5>
                      <div className="date-time-field">
                        <DatePicker
                          selected={returnDate}
                          onChange={(date) => setReturnDate(date)}
                          excludeDateIntervals={unavailableRanges}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Seleccione la fecha de salida"
                          className="form-control w-100"
                          minDate={pickupDate || new Date()}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    id="send_message"
                    className="btn-main btn-fullwidth"
                    style={{ backgroundColor: "#156B7A" }}
                    onClick={handleBookNowClick}
                  >
                    Reservar alojamiento
                  </button>
                  <div className="clearfix" />
                </form>
              </div>
            </div>
          </div>

          {/* Características más destacadas */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              width: "500px",
              marginLeft: "18%",
              borderTop: "1px solid #ddd",
              paddingTop: "20px",
            }}
          >
            <h3 style={{ width: "50%", float: "left", marginTop: "20px" }}>
              Características más destacadas
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: "20px",
                width: "100%",
                flexWrap: "wrap",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              {accommodation?.features && (
                <>
                  {accommodation.features.facilities &&
                    accommodation.features.facilities.map((facility, index) => (
                      <span
                        key={`facility-${index}`}
                        style={{ marginLeft: "10px", display: "flex", alignItems: "center" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ width: "15px", color: "green", marginRight: "7px", paddingTop: "3px" }}
                          viewBox="0 0 448 512"
                        >
                          <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                        </svg>
                        <p style={{ margin: 0 }}>{translateFeature(facility)}</p>
                      </span>
                    ))}
                  {accommodation.features.accessories &&
                    accommodation.features.accessories.map((accessory, index) => (
                      <span
                        key={`accessory-${index}`}
                        style={{ marginLeft: "20px", display: "flex", alignItems: "center" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ width: "15px", color: "green", marginRight: "7px", paddingTop: "3px" }}
                          viewBox="0 0 448 512"
                        >
                          <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                        </svg>
                        <p style={{ margin: 0 }}>{translateFeature(accessory.type)}</p>
                      </span>
                    ))}
                </>
              )}
            </div>
          </div>

          {/* Distribución de dormitorios */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              width: "50%",
              marginLeft: "18%",
              borderTop: "1px solid #ddd",
              paddingTop: "20px",
            }}
          >
            <h3 style={{ width: "50%", float: "left", marginTop: "20px" }}>
              Distribución de dormitorios
            </h3>
            <div>
              {Object.entries(aggregatedBedrooms).map(([group, beds], groupIndex) => (
                <p key={groupIndex}>
                  {group}:{" "}
                  {Object.entries(beds).map(([bedType, count], idx, arr) => (
                    <span key={bedType}>
                      {count} {count === 1 ? "cama" : "camas"} de tipo {bedType}
                      {idx < arr.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>

          {/* Servicios incluidos (solo los disponibles y sin etiquetas adicionales) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              width: "50%",
              marginLeft: "18%",
              borderTop: "1px solid #ddd",
              paddingTop: "20px",
            }}
          >
            <h3 style={{ width: "50%", float: "left", marginTop: "20px" }}>
              Servicios incluidos
            </h3>
            <div>
              {accommodation?.services
                .filter((service) => service.available === undefined || service.available === true)
                .map((service, index) => (
                  <p key={index}>{renderService(service)}</p>
                ))}
            </div>
          </div>

          {/* Observaciones / Reglas */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              width: "50%",
              marginLeft: "18%",
              borderTop: "1px solid #ddd",
            }}
          >
            <h3 style={{ width: "50%", float: "left", marginTop: "20px" }}>
              Observaciones
            </h3>
            <div
              style={{
                marginLeft: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "20px",
              }}
            >
              <p>- Este alquiler no acepta grupos de jóvenes (Hasta 18 años)</p>
              <p>- No se permite fumar</p>
              <p>
                - En este alojamiento se admiten animales, salvo razas peligrosas.
                Se admiten animales con peso menor a 5Kg. - Alojamiento accesible.
              </p>
            </div>
          </div>
        </div>
        {/* Booking Card Group */}
        {/* <BookingCardGroup /> */}
      </section>
      <Footer />
    </div>
  );
}

export default AccommodationDetails;