import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faPhone,
  faBars,
  faBed,
  faWifi,
  faSwimmer,
  faParking,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import "./../assets/css/booking/bootstrap.min.css";
import "./../assets/css/booking/mdb.min.css";
import "./../assets/css/booking/plugins.css";
import "./../assets/css/booking/style.css";
import "./../assets/css/booking/coloring.css";
import "./../assets/css/booking/colors/scheme-01.css";
import { getAccomodations } from "apis/apis";
import Header from "components/Header";
import BookingCardGroup from "components/BookingCardGroup";
import Footer from "components/Footer";

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
    rooms: "",
    adults: "",
    children: "",
  });
  const [loading, setLoading] = useState(false);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAccomodations();
      console.log("Accommodations: ", response.data);
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

  // Extraer las ciudades (localización) usando encadenamiento opcional
  useEffect(() => {
    if (accommodations.length > 0) {
      const locations = [
        ...new Set(
          accommodations
            .map((item) => item?.self?.data?.location?.cityName || "")
            .filter((city) => city !== "")
        ),
      ];
      // Leer parámetros de query (destination, rooms, adults, children)
      const queryParams = new URLSearchParams(location.search);
      const destination = queryParams.get("destination") || "";
      const rooms = queryParams.get("rooms") || "";
      const adults = queryParams.get("adults") || "";
      const children = queryParams.get("children") || "";
      const isValidDestination = destination && locations.includes(destination);
      setCriteria((prev) => ({
        ...prev,
        location: {
          list: locations,
          selected: isValidDestination ? destination : "",
        },
        rooms,
        adults,
        children,
      }));
    }
  }, [accommodations, location.search]);

  // Aplicar filtros cada vez que cambian los criterios
  useEffect(() => {
    if (accommodations.length > 0) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setCriteria((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        selected: selectedLocation,
      },
    }));
  };

  const handleRoomsChange = (e) => {
    setCriteria((prev) => ({
      ...prev,
      rooms: e.target.value,
    }));
  };

  const handleAdultsChange = (e) => {
    setCriteria((prev) => ({
      ...prev,
      adults: e.target.value,
    }));
  };

  const handleChildrenChange = (e) => {
    setCriteria((prev) => ({
      ...prev,
      children: e.target.value,
    }));
  };

  const handleSearch = () => {
    const { features, location: locCriteria, rooms, adults, children } = criteria;
    const filtered = accommodations.filter((item) => {
      const data = item?.self?.data || {};
      // Filtrar por localización (ciudad)
      if (
        locCriteria.selected &&
        !data?.location?.cityName
          .toLowerCase()
          .includes(locCriteria.selected.toLowerCase())
      ) {
        return false;
      }
      // Filtrar por habitaciones (cantidad de bedrooms)
      if (rooms && (data?.distribution?.bedrooms?.length || 0) < parseInt(rooms, 10)) {
        return false;
      }
      // Filtrar por adultos
      if (adults && (data?.capacity?.maxAdults || 0) < parseInt(adults, 10)) {
        return false;
      }
      // Filtrar por niños
      if (children && (data?.capacity?.maxChildren || 0) < parseInt(children, 10)) {
        return false;
      }
      // Filtrar por características (servicios)
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

  return (
    <div id="wrapper">
      <Header />
      <div className="no-bottom pt-4 zebra" id="content">
        <div id="top" />
        <section id="section-cars" style={{ paddingTop: "100px" }}>
          <div className="container">
            <div className="row">
              {/* Botón para abrir el menú de filtros en pantallas pequeñas */}
              <div className="col-12 d-lg-none mb-3">
                <button
                  className="btn btn-primary"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasFilters"
                  aria-controls="offcanvasFilters"
                >
                  <FontAwesomeIcon icon={faBars} /> Filtros
                </button>
              </div>

              {/* Offcanvas en pantallas pequeñas */}
              <div
                className="offcanvas offcanvas-start d-lg-none"
                tabIndex="-1"
                id="offcanvasFilters"
                aria-labelledby="offcanvasFiltersLabel"
              >
                <div className="offcanvas-header">
                  <h5 id="offcanvasFiltersLabel">Filtros</h5>
                  <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Cerrar"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <form name="contactForm" id="contact_form" method="post">
                    {/* Localización */}
                    <div className="mb-3">
                      <h5>Localización</h5>
                      <select
                        name="Localizacion"
                        id="localizacion-select"
                        value={criteria.location.selected}
                        onChange={handleLocationChange}
                        className="form-control"
                      >
                        <option value="">Selecciona una localización</option>
                        {criteria.location.list.map((loc, index) => (
                          <option key={`loc_${index}`} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Habitaciones, Adultos, Niños */}
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-4">
                          <h6>Habitaciones</h6>
                          <select
                            name="Habitaciones"
                            id="pickup-time-habitaciones"
                            value={criteria.rooms}
                            onChange={handleRoomsChange}
                            className="form-control"
                          >
                            <option disabled value="">
                              -
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>
                        <div className="col-4">
                          <h6>Adultos</h6>
                          <select
                            name="Adultos"
                            id="pickup-time-adultos"
                            value={criteria.adults}
                            onChange={handleAdultsChange}
                            className="form-control"
                          >
                            <option disabled value="">
                              -
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>
                        <div className="col-4">
                          <h6>Niños</h6>
                          <select
                            name="Niños"
                            id="pickup-time-ninos"
                            value={criteria.children}
                            onChange={handleChildrenChange}
                            className="form-control"
                          >
                            <option disabled value="">
                              -
                            </option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* Filtros por Características */}
                    <div className="mb-3">
                      <h5>Características</h5>
                      {criteria.features.list.map((feature, index) => (
                        <div
                          className="form-check"
                          key={`feature_${index}`}
                          style={{ paddingTop: "12px" }}
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`feature_${index}`}
                            checked={criteria.features.checked.includes(feature)}
                            onChange={() => handleFeatureChange(feature)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`feature_${index}`}
                          >
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                  </form>
                </div>
              </div>

              {/* Barra lateral de filtros en pantallas grandes */}
              <div className="col-lg-3 d-none d-lg-block">
                <div
                  className="item_filter_group"
                  style={{
                    backgroundColor: "#156B7A",
                    padding: "15px",
                    borderRadius: "5px",
                  }}
                >
                  <form name="contactForm" id="contact_form" method="post">
                    {/* Localización */}
                    <div className="mb-3">
                      <h5 style={{ color: "white" }}>Localización</h5>
                      <select
                        name="Localizacion"
                        id="localizacion-select"
                        value={criteria.location.selected}
                        onChange={handleLocationChange}
                        className="form-control"
                        style={{ width: "100%", borderRadius: "5px" }}
                      >
                        <option value="">Selecciona una localización</option>
                        {criteria.location.list.map((loc, index) => (
                          <option key={`loc_${index}`} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Habitaciones, Adultos, Niños */}
                    <div className="mb-3">
                      <div className="col-12 mb-3 p-0">
                        <h6 style={{ color: "white" }}>Habitaciones</h6>
                        <select
                          name="Habitaciones"
                          id="pickup-time-habitaciones"
                          value={criteria.rooms}
                          onChange={handleRoomsChange}
                          className="form-control"
                          style={{
                            padding: "1px",
                            borderRadius: "5px",
                            height: "30px",
                          }}
                        >
                          <option disabled value="">
                            Habitaciones
                          </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <h6 style={{ color: "white" }}>Adultos</h6>
                          <select
                            name="Adultos"
                            id="pickup-time-adultos"
                            value={criteria.adults}
                            onChange={handleAdultsChange}
                            className="form-control"
                            style={{
                              padding: "1px",
                              borderRadius: "5px",
                              height: "30px",
                            }}
                          >
                            <option disabled value="">
                              Adultos
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>
                        <div className="col-6">
                          <h6 style={{ color: "white" }}>Niños</h6>
                          <select
                            name="Niños"
                            id="pickup-time-ninos"
                            value={criteria.children}
                            onChange={handleChildrenChange}
                            className="form-control"
                            style={{
                              padding: "1px",
                              borderRadius: "5px",
                              height: "30px",
                            }}
                          >
                            <option disabled value="">
                              Niños
                            </option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* Filtros por Características */}
                    <div className="mb-3">
                      <h4 style={{ color: "white" }}>Características</h4>
                      {criteria.features.list.map((feature, index) => (
                        <div
                          className="form-check"
                          key={`feature_${index}`}
                          style={{ paddingTop: "12px" }}
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`feature_${index}`}
                            checked={criteria.features.checked.includes(feature)}
                            onChange={() => handleFeatureChange(feature)}
                            style={{
                              background: "none",
                              border: "1px solid white",
                              borderRadius: "5px",
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`feature_${index}`}
                            style={{ color: "white" }}
                          >
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                  </form>
                </div>
              </div>

              {/* Lista de viviendas */}
              <div className="col-lg-9">
                <div className="row">
                  {loading ? (
                    <p>Cargando...</p>
                  ) : filteredAccommodations.length > 0 ? (
                    filteredAccommodations.map((accom, index) => {
                      const data = accom?.self?.data || {};
                      const imageUrl =
                        accom?.gallery?.data?.images?.[0]?.url || "";
                      const descriptionObj =
                        accom?.gallery?.data?.description?.find(
                          (d) => d.language === "es_ES"
                        );
                      const descriptionText = descriptionObj
                        ? descriptionObj.text
                        : "Sin descripción";
                      const hasInternet = data.services?.some(
                        (s) => s.type === "INTERNET_ACCESS"
                      );
                      const hasParking = data.services?.some(
                        (s) => s.type === "PARKING"
                      );
                      const hasPool = data.services?.some(
                        (s) => s.type === "SWIMMING_POOL"
                      );
                      return (
                        <div
                          className="col-xl-4 col-lg-6 mb-4"
                          key={`accom_${index}`}
                        >
                          <div className="de-item mb30">
                            <div className="d-img">
                              <img
                                src={imageUrl}
                                className="img-fluid"
                                alt={data.name || "imagen"}
                              />
                            </div>
                            <div className="d-info">
                              <div className="d-text">
                                <div className="d-atr-group">
                                  <div
                                    style={{
                                      width: "100%",
                                      float: "left",
                                      marginLeft: "80%",
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faUserGroup} />
                                    <span style={{ marginLeft: "3px" }}>
                                      {data.capacity?.maxAdults || "-"}
                                    </span>
                                    <FontAwesomeIcon
                                      icon={faBed}
                                      style={{ marginLeft: "10px" }}
                                    />
                                    <span style={{ marginLeft: "3px" }}>
                                      {data.distribution?.bedrooms?.length || "-"}
                                    </span>
                                  </div>
                                  <h4>{accom.name}</h4>
                                  <span className="d-atr">
                                    <p
                                      style={{
                                        float: "left",
                                        fontWeight: "500",
                                      }}
                                    >
                                      {data.location?.cityName || "Sin ciudad"} - {data.type || ""}
                                    </p>
                                  </span>
                                </div>
                                <div
                                  className="d-atr-group"
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-evenly",
                                    marginTop: "15px",
                                    gap: "12px",
                                  }}
                                >
                                  {hasInternet && (
                                    <FontAwesomeIcon icon={faWifi} />
                                  )}
                                  {hasPool && (
                                    <FontAwesomeIcon icon={faSwimmer} />
                                  )}
                                  {hasParking && (
                                    <FontAwesomeIcon icon={faParking} />
                                  )}
                                </div>
                                <div className="d-price mt-3">
                                  <span style={{ fontSize: "14px", fontWeight: "400" }}>
                                    {descriptionText.substring(0, 100)}...
                                  </span>
                                  <div
                                    className="btn-main mt-2"
                                    onClick={() =>
                                      navigate(`/accommodation/${accom.id}`)
                                    }
                                    style={{
                                      cursor: "pointer",
                                      backgroundColor: "#156B7A",
                                      position: "relative"
                                    }}
                                  >
                                    + INFO
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
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
        <BookingCardGroup />
        <Footer />
      </div>
    </div>
  );
}

export default Booking;
