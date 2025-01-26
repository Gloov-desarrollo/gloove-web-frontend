import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faPhone, faBars, faBed } from "@fortawesome/free-solid-svg-icons"; 
import { useNavigate, useLocation } from "react-router-dom";
import "./../assets/css/booking/bootstrap.min.css";
import "./../assets/css/booking/mdb.min.css";
import "./../assets/css/booking/plugins.css";
import "./../assets/css/booking/style.css";
import "./../assets/css/booking/coloring.css";
import "./../assets/css/booking/colors/scheme-01.css";
import { getAccomodations, getDescriptions } from "apis/apis";
import Header from "components/Header";
import BookingCardGroup from "components/BookingCardGroup";
import Footer from "components/Footer";

import {
  faUtensils,
  faWifi,
  faSwimmer,
  faParking,
  faDumbbell,
  faHotTub,
  // Añade más iconos según tus necesidades
} from "@fortawesome/free-solid-svg-icons";

function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [accommodations, setAccommodations] = useState(null);
  const [descriptions, setDescriptions] = useState(null);
  const [criteria, setCriteria] = useState({
    company: {
      list: [],
      checked: [],
    },
    features: {
      list: ["Gym", "Parking", "HeatedSwimmingPool", "Restaurant", "InternetAccess", "Jacuzzi"],
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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [accom, desc] = await Promise.all([
        getAccomodations(),
        getDescriptions(),
      ]);
      setAccommodations(accom["data"]);
      setDescriptions(desc["data"]);
      setFilteredAccommodations(accom["data"]); // Mostrar todas inicialmente
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
    if (accommodations && descriptions) {
      // Extract unique companies and locations
      const companies = [...new Set(accommodations.map((item) => item["Company"]))];
      const localizations = [...new Set(accommodations.map((item) => item["LocalizationData"]["Region"]["Name"]))];

      // Update criteria with companies and locations
      setCriteria((prev) => ({
        ...prev,
        company: {
          ...prev.company,
          list: companies,
        },
        location: {
          list: localizations,
          selected: "",
        },
      }));

      // Store data in localStorage
      localStorage.setItem("accom", JSON.stringify(accommodations));
      localStorage.setItem("desc", JSON.stringify(descriptions));

      // Parse query parameters
      const queryParams = new URLSearchParams(location.search);
      const destination = queryParams.get('destination') || '';
      const rooms = queryParams.get('rooms') || '';
      const adults = queryParams.get('adults') || '';
      const children = queryParams.get('children') || '';

      // Check if the destination from query params exists in the location list
      const isValidDestination = destination && localizations.includes(destination);

      // Update criteria with query parameters
      setCriteria((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          selected: isValidDestination ? destination : '',
        },
        rooms,
        adults,
        children,
      }));
    }
  }, [accommodations, descriptions, location.search]);

  // Apply filters whenever criteria changes
  useEffect(() => {
    if (accommodations && descriptions) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [criteria]);

  const handleCheckboxChange = (item) => {
    setCriteria((prevCriteria) => {
      const { checked } = prevCriteria.company;
      if (checked.includes(item)) {
        // Remover el item si ya está seleccionado
        return {
          ...prevCriteria,
          company: {
            ...prevCriteria.company,
            checked: checked.filter((c) => c !== item),
          },
        };
      } else {
        // Agregar el item si no está seleccionado
        return {
          ...prevCriteria,
          company: {
            ...prevCriteria.company,
            checked: [...checked, item],
          },
        };
      }
    });
  };

  const handleFeatureChange = (feature) => {
    setCriteria((prevCriteria) => {
      const { checked } = prevCriteria.features;
      if (checked.includes(feature)) {
        // Remover la característica si ya está seleccionada
        return {
          ...prevCriteria,
          features: {
            ...prevCriteria.features,
            checked: checked.filter((f) => f !== feature),
          },
        };
      } else {
        // Agregar la característica si no está seleccionada
        return {
          ...prevCriteria,
          features: {
            ...prevCriteria.features,
            checked: [...checked, feature],
          },
        };
      }
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
    if (!accommodations) return;

    const { company, features, location, rooms, adults, children } = criteria;

    const filtered = accommodations.filter((item) => {
      // Filtrar por compañía
      if (
        company.checked.length > 0 &&
        !company.checked.includes(item["Company"])
      ) {
        return false;
      }

      // Filtrar por localización
      if (
        location.selected &&
        !item["LocalizationData"]["Region"]["Name"]
          .toLowerCase()
          .includes(location.selected.toLowerCase())
      ) {
        return false;
      }

      // Filtrar por número de habitaciones
      if (
        rooms &&
        item["Features"]["Distribution"]["Bedrooms"] <
          parseInt(rooms, 10)
      ) {
        return false;
      }

      // Filtrar por adultos
      if (
        adults &&
        item["Features"]["Distribution"]["PeopleCapacity"] <
          parseInt(adults, 10)
      ) {
        return false;
      }

      // Filtrar por niños (si tienes esta información)
      // Por ejemplo, si tienes un campo "ChildrenCapacity"
      /*
      if (
        children &&
        item["Features"]["Distribution"]["ChildrenCapacity"] <
          parseInt(children, 10)
      ) {
        return false;
      }
      */

      // Filtrar por características
      if (features.checked.length > 0) {
        const hotelFeatures = item["HotelFeatures"];
        const featureMap = {
          Gym: hotelFeatures?.Gym !== "no",
          Parking: hotelFeatures?.Parking !== "no",
          HeatedSwimmingPool: hotelFeatures?.HeatedSwimmingPool !== "no",
          Restaurant: hotelFeatures?.Restaurant !== "no",
          InternetAccess: hotelFeatures?.InternetAccess !== "no",
          Jacuzzi: hotelFeatures?.Jacuzzi !== "no",
        };

        // Verificar que todas las características seleccionadas estén presentes
        for (let feature of features.checked) {
          if (!featureMap[feature]) {
            return false;
          }
        }
      }

      // Puedes agregar más criterios de filtrado aquí

      return true;
    });

    setFilteredAccommodations(filtered);
  };

  return (
    <div id="wrapper">
      <Header />
      <div className="no-bottom pt-4 zebra" id="content">
        <div id="top" />
        {/* Carousel y demás contenido */}
        <section id="section-cars" style={{paddingTop: "100px"}}>
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

              {/* Filtros como Offcanvas en pantallas pequeñas */}
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
                  {/* Aquí va el contenido de los filtros */}
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
                        {criteria.location.list.map((location, index) => (
                          <option key={`location_${index}`} value={location}>
                            {location}
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
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* Filtros por Características */}
                    <div className="mb-3">
                      <h5>Características</h5>
                      {criteria.features.list.map((feature, index) => (
                        <div className="form-check" key={`feature_${index}`} style={{paddingTop: "12px"}}>
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
                    {/* Botón Buscar */}
                    {/* <button
                      type="button"
                      className="btn btn-success w-100 py-2"
                      style={{fontSize: "16px"}}
                      onClick={() => {
                        handleSearch();
                        // Cerrar el Offcanvas después de buscar
                        const offcanvasElement = document.getElementById("offcanvasFilters");
                        const offcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasElement);
                        if (offcanvas) {
                          offcanvas.hide();
                        }
                      }}
                    >
                      Buscar
                    </button> */}
                  </form>
                </div>
              </div>

              {/* Filtros como barra lateral en pantallas grandes */}
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
                        {criteria.location.list.map((location, index) => (
                          <option key={`location_${index}`} value={location}>
                            {location}
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
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* Filtros por Características */}
                    <div className="mb-3">
                      <h4 style={{ color: "white" }}>Características</h4>
                      {criteria.features.list.map((feature, index) => (
                        <div className="form-check" key={`feature_${index}`} style={{paddingTop: "12px"}}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`feature_${index}`}
                            checked={criteria.features.checked.includes(feature)}
                            onChange={() => handleFeatureChange(feature)}
                            style={{
                              background: "none",
                              border: "1px solid white",
                              borderRadius: "5px"
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
                    {/* Botón Buscar */}
                    {/* <button
                      type="button"
                      className="btn btn-danger w-100"
                      onClick={handleSearch}
                      style={{
                        color: "white",
                        backgroundColor: "#EE3388",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                    >
                      Buscar
                    </button> */}
                  </form>
                </div>
              </div>

              {/* Lista de Viviendas */}
              <div className="col-lg-9">
                <div className="row">
                  {loading ? (
                    <p>Cargando...</p>
                  ) : (
                    filteredAccommodations.length > 0 ? (
                      filteredAccommodations.map((accom, index) => {
                        // Asegúrate de que 'descriptions' esté sincronizado con 'accommodations'
                        const desc = descriptions[index];
                        return (
                          <div className="col-xl-4 col-lg-6 mb-4" key={`accom_${index}`}>
                            <div className="de-item mb30">
                              <div className="d-img">
                                <img
                                  src={
                                    desc &&
                                    desc["Pictures"] &&
                                    desc["Pictures"]["Picture"] &&
                                    desc["Pictures"]["Picture"].length > 0
                                      ? desc["Pictures"]["Picture"][0]["AdaptedURI"]
                                      : ""
                                  }
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <div className="d-info">
                                <div className="d-text">
                                  <div className="d-atr-group">
                                    <div
                                      className=""
                                      style={{
                                        width: "100%",
                                        float: "left",
                                        marginLeft: "80%",
                                      }}
                                    >
                                      <FontAwesomeIcon icon={faUserGroup} />
                                      <span style={{ marginLeft: "3px" }}>
                                        {accom["Features"]["Distribution"]["PeopleCapacity"]}
                                      </span>
                                      <FontAwesomeIcon
                                        icon={faBed}
                                        style={{ marginLeft: "10px" }}
                                      />
                                      <span style={{ marginLeft: "3px" }}>
                                        {accom["Features"]["Distribution"]["Bedrooms"]}
                                      </span>
                                    </div>
                                    <h4>{accom["AccommodationName"]}</h4>
                                    <span className="d-atr">
                                      <p
                                        style={{
                                          float: "left",
                                          fontWeight: "500",
                                        }}
                                      >
                                        {accom["LocalizationData"]["Region"]["Name"]} -{" "}
                                        {accom["UserKind"]}
                                      </p>
                                    </span>
                                  </div>
                                  {/* Iconos de Características */}
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
                                    {accom["HotelFeatures"]?.Restaurant !== "no" && (
                                      <FontAwesomeIcon icon={faUtensils} />
                                    )}
                                    {accom["HotelFeatures"]?.InternetAccess !== "no" && (
                                      <FontAwesomeIcon icon={faWifi} />
                                    )}
                                    {accom["HotelFeatures"]?.HeatedSwimmingPool !== "no" && (
                                      <FontAwesomeIcon icon={faSwimmer} />
                                    )}
                                    {accom["HotelFeatures"]?.Parking !== "no" && (
                                      <FontAwesomeIcon icon={faParking} />
                                    )}
                                    {accom["HotelFeatures"]?.Gym !== "no" && (
                                      <FontAwesomeIcon icon={faDumbbell} />
                                    )}
                                    {accom["HotelFeatures"]?.Jacuzzi !== "no" && (
                                      <FontAwesomeIcon icon={faHotTub} />
                                    )}
                                  </div>
                                  {/* Precio e Información */}
                                  <div className="d-price mt-3">
                                    {desc &&
                                    desc["InternationalizedItem"] &&
                                    desc["InternationalizedItem"][0]["ExtrasSummary"] &&
                                    desc["InternationalizedItem"][0]["ExtrasSummary"]["ObligatoryOrIncluded"] &&
                                    desc["InternationalizedItem"][0]["ExtrasSummary"]["ObligatoryOrIncluded"]["Extra"] &&
                                    desc["InternationalizedItem"][0]["ExtrasSummary"]["ObligatoryOrIncluded"]["Extra"][1]
                                      ? desc["InternationalizedItem"][0]["ExtrasSummary"]["ObligatoryOrIncluded"]["Extra"][1]["Name"]
                                      : "Undefined"}
                                    <span style={{ fontSize: "14px" }}>
                                      {desc &&
                                      desc["InternationalizedItem"] &&
                                      desc["InternationalizedItem"][0]["ExtrasSummary"] &&
                                      desc["InternationalizedItem"][0]["ExtrasSummary"]["ObligatoryOrIncluded"] &&
                                      desc["InternationalizedItem"][0]["ExtrasSummary"]["ObligatoryOrIncluded"]["Extra"] &&
                                      desc["InternationalizedItem"][0]["ExtrasSummary"]["ObligatoryOrIncluded"]["Extra"][1]
                                        ? desc["InternationalizedItem"][0]["ExtrasSummary"]["ObligatoryOrIncluded"]["Extra"][1]["Description"]
                                        : "Undefined"}
                                    </span>
                                    <div
                                      className="btn-main mt-2"
                                      onClick={() => {
                                        window.location.href = `/car-single?index=${index}`;
                                      }}
                                      style={{
                                        cursor: "pointer",
                                        backgroundColor: "#156B7A",
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
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <BookingCardGroup />
        <Footer/>
      </div>
    </div>
  );
}

export default Booking;