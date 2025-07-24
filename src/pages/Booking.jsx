
import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faBed,
  faWifi,
  faSwimmer,
  faParking,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "./../assets/css/booking/NewBooking.css";
import { getAccomodations } from "apis/apis";
import Header from "components/Header";
import Footer from "components/Footer";
import BookingCardSkeleton from "components/BookingCardSkeleton";
import Stepper from "components/Stepper";
import Chip from "components/Chip";

function Booking() {
  const navigate = useNavigate();
  const location = useLocation();

  const [accommodations, setAccommodations] = useState([]);
  const [criteria, setCriteria] = useState({
    features: {
      list: ["Parking", "SwimmingPool", "InternetAccess"],
      checked: [],
    },
    location: {
      list: [],
      selected: "",
    },
    rooms: 1,
    adults: 1,
    children: 0,
  });
  const [loading, setLoading] = useState(false);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAccomodations();
      setAccommodations(response.data);
      setFilteredAccommodations(response.data);
      localStorage.setItem("accom", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (accommodations.length > 0) {
      const locations = [
        ...new Set(
          accommodations
            .map((item) => item?.self?.data?.location?.cityName || "")
            .filter((city) => city !== "")
        ),
      ];
      const queryParams = new URLSearchParams(location.search);
      const destination = queryParams.get("destination") || "";
      const rooms = queryParams.get("rooms") || 1;
      const adults = queryParams.get("adults") || 1;
      const children = queryParams.get("children") || 0;
      const isValidDestination = destination && locations.includes(destination);
      setCriteria((prev) => ({
        ...prev,
        location: {
          list: locations,
          selected: isValidDestination ? destination : "",
        },
        rooms: parseInt(rooms),
        adults: parseInt(adults),
        children: parseInt(children),
      }));
    }
  }, [accommodations, location.search]);

  useEffect(() => {
    if (accommodations.length > 0) {
      handleSearch();
    }
  }, [criteria]);

  const handleFeatureChange = (feature) => {
    setCriteria((prev) => {
      const { checked } = prev.features;
      return {
        ...prev,
        features: {
          ...prev.features,
          checked: checked.includes(feature)
            ? checked.filter((f) => f !== feature)
            : [...checked, feature],
        },
      };
    });
  };

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setCriteria((prev) => ({ ...prev, location: { ...prev.location, selected: selectedLocation } }));
  };

  const handleSearch = () => {
    const { features, location: locCriteria, rooms, adults, children } = criteria;
    const filtered = accommodations.filter((item) => {
      const data = item?.self?.data || {};
      if (locCriteria.selected && !data?.location?.cityName.toLowerCase().includes(locCriteria.selected.toLowerCase())) return false;
      if (rooms && (data?.distribution?.bedrooms?.length || 0) < parseInt(rooms, 10)) return false;
      if (adults && (data?.capacity?.maxAdults || 0) < parseInt(adults, 10)) return false;
      if (children && (data?.capacity?.maxChildren || 0) < parseInt(children, 10)) return false;
      if (features.checked.length > 0) {
        for (let feature of features.checked) {
          let isAvailable = false;
          switch (feature) {
            case "Parking":
              isAvailable = data.services?.some((s) => s.type === "PARKING");
              break;
            case "SwimmingPool":
              isAvailable = data.services?.some((s) => s.type === "SWIMMING_POOL");
              break;
            case "InternetAccess":
              isAvailable = data.services?.some((s) => s.type === "INTERNET_ACCESS");
              break;
            default:
              isAvailable = false;
          }
          if (!isAvailable) return false;
        }
      }
      return true;
    });
    setFilteredAccommodations(filtered);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div id="wrapper">
      <Header />
      <div className="no-bottom pt-4 zebra booking-page" id="content">
        <div id="top" />
        <section id="section-cars" style={{ paddingTop: "100px" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="booking-filters">
                  <form name="contactForm" id="contact_form" method="post">
                    <div className="mb-3">
                      <h5>Localización</h5>
                      <select name="Localizacion" id="localizacion-select" value={criteria.location.selected} onChange={handleLocationChange} className="form-control">
                        <option value="">Selecciona una localización</option>
                        {criteria.location.list.map((loc, index) => (<option key={`loc_${index}`} value={loc}>{loc}</option>))}
                      </select>
                    </div>
                    <Stepper
                      label="Habitaciones"
                      value={criteria.rooms}
                      onIncrease={() => setCriteria(prev => ({ ...prev, rooms: prev.rooms + 1 }))}
                      onDecrease={() => setCriteria(prev => ({ ...prev, rooms: Math.max(1, prev.rooms - 1) }))}
                    />
                    <Stepper
                      label="Adultos"
                      value={criteria.adults}
                      onIncrease={() => setCriteria(prev => ({ ...prev, adults: prev.adults + 1 }))}
                      onDecrease={() => setCriteria(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                    />
                    <Stepper
                      label="Niños"
                      value={criteria.children}
                      onIncrease={() => setCriteria(prev => ({ ...prev, children: prev.children + 1 }))}
                      onDecrease={() => setCriteria(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                    />
                    <div className="mb-3">
                      <h5>Características</h5>
                      <div className="d-flex flex-wrap">
                        {criteria.features.list.map((feature, index) => (
                          <Chip
                            key={index}
                            label={feature}
                            selected={criteria.features.checked.includes(feature)}
                            onClick={() => handleFeatureChange(feature)}
                          />
                        ))}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="row">
                  {loading ? (
                    Array.from({ length: 6 }).map((_, index) => <BookingCardSkeleton key={index} />)
                  ) : filteredAccommodations.length > 0 ? (
                    filteredAccommodations.map((accom, index) => {
                      const data = accom?.self?.data || {};
                      const imageUrl = accom?.gallery?.data?.images?.[0]?.url || "";
                      const descriptionObj = accom?.gallery?.data?.description?.find((d) => d.language === "es_ES");
                      const descriptionText = descriptionObj ? descriptionObj.text : "Sin descripción";
                      const hasInternet = data.services?.some((s) => s.type === "INTERNET_ACCESS");
                      const hasParking = data.services?.some((s) => s.type === "PARKING");
                      const hasPool = data.services?.some((s) => s.type === "SWIMMING_POOL");
                      return (
                        <motion.div
                          className="col-lg-6 mb-4"
                          key={`accom_${index}`}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="de-item booking-card h-100">
                            <img src={imageUrl} className="card-img-top" alt={data.name || "imagen"} />
                            <div className="card-body d-flex flex-column">
                              <h5 className="card-title">{accom.name}</h5>
                              <p className="card-text text-muted">{data.location?.cityName || "Sin ciudad"} - {data.type || ""}</p>
                              
                              <div className="icon-group my-3">
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <FontAwesomeIcon icon={faUserGroup} className="me-2 text-primary" />
                                        <span>{data.capacity?.maxAdults || "-"} Adultos</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <FontAwesomeIcon icon={faBed} className="me-2 text-primary" />
                                        <span>{data.distribution?.bedrooms?.length || "-"} Hab.</span>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-start align-items-center gap-3 mt-3">
                                    {hasInternet && (<div className="d-flex align-items-center"><FontAwesomeIcon icon={faWifi} title="Internet" className="me-1 text-success" /> <small>Wifi</small></div>)}
                                    {hasPool && (<div className="d-flex align-items-center"><FontAwesomeIcon icon={faSwimmer} title="Piscina" className="me-1 text-info" /> <small>Piscina</small></div>)}
                                    {hasParking && (<div className="d-flex align-items-center"><FontAwesomeIcon icon={faParking} title="Parking" className="me-1 text-secondary" /> <small>Parking</small></div>)}
                                </div>
                              </div>

                              <p className="card-description mt-2 flex-grow-1">{descriptionText}</p>
                              
                              <button className="btn btn-primary w-100 mt-auto" onClick={() => navigate(`/accommodation/${accom.id}`)}>
                                Ver Detalles
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  ) : (
                    <p>No se encontraron viviendas con los filtros seleccionados.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}

export default Booking;
