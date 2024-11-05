import React, { useEffect, useRef, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "./../assets/css/booking/bootstrap.min.css";
import "./../assets/css/booking/mdb.min.css";
import "./../assets/css/booking/plugins.css";
import "./../assets/css/booking/style.css";
import "./../assets/css/booking/coloring.css";
import "./../assets/css/booking/colors/scheme-01.css";
import { getAccomodations, getDescriptions } from "apis/apis";
import Header from "components/Header";
import BookingCardGroup from "components/BookingCardGroup";
import { flushSync } from "react-dom";

function Booking() {
  const navigate = useNavigate();
  const [accommodations, setAccommodations] = useState(null);
  const [filteredIndex, setFilteredIndex] = useState([]);
  const [descriptions, setDescriptions] = useState(null);
  const [criteria, setCriteria] = useState(null);
  const [loading, setLoading] = useState(false);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const fetch = async () => {
    setLoading(true); // Inicia el loading antes de la llamada
    try {
      const [accom, desc] = await Promise.all([
        getAccomodations(),
        getDescriptions(),
      ]);
      setAccommodations(accom["data"]);
      setDescriptions(desc["data"]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Finaliza el loading después de cargar los datos
    }
  };
  

  useEffect(() => {
    if (accommodations && descriptions) {
      const c = [];
      accommodations.forEach((item) => {
        if (!c.find((v) => v == item["Company"])) {
          c.push(item["Company"]);
        }
      });
      setCriteria({
        company: {
          list: c,
          checked: [],
        },
      });
      localStorage.setItem("accom", JSON.stringify(accommodations));
      localStorage.setItem("desc", JSON.stringify(descriptions));
    }
  }, [accommodations, descriptions]);

  useEffect(() => {
    if (accommodations) {
      const filter = [];
      accommodations.forEach((item, index) => {
        if (
          criteria.company.checked.length == 0 ||
          criteria.company.checked.find((c) => c == item["Company"])
        )
          filter.push(index);
      });
      setFilteredIndex(filter);
    }
  }, [criteria]);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div id="wrapper">
      {/* page preloader begin */}
      <Header />
      {/* header close */}
      {/* content begin */}
      <div className="no-bottom no-top zebra" id="content">
        <div id="top" />
        {/* section begin */}
        <section
          className="home-slider-section"
          style={{ padding: "0px", position: "relative" }}
        >
          <div className="home-slider">
            <Carousel
              className="home-slider"
              responsive={responsive}
              showDots={true}
              infinite={true}
              autoPlay={false}
              autoPlaySpeed={3500}
              dotListClass="custom-dot-list-style"
              slidesToSlide={1}
            >
              <div className="home-banner-items">
                <div
                  className="banner-inner-wrap"
                  style={{
                    backgroundImage: "url(./images/slider-1.png)",
                    backgroundSize: "cover !important",
                  }}
                ></div>
                <div className="banner-content-wrap">
                  <div className="container">
                    <div className="banner-content text-center">
                      <h2 className="banner-title" id="banner-title">
                        Maximiza el potencial de tu propiedad con Gloove
                      </h2>
                      <p>
                        Gestión experta, ingresos optimizados y tranquilidad
                        total
                      </p>
                      {/* <a href="#" className="button-primary">
                          CONTINUE READING
                        </a> */}
                    </div>
                  </div>
                </div>
                <div className="overlay"></div>
              </div>
              <div className="home-banner-items">
                <div
                  className="banner-inner-wrap"
                  style={{
                    backgroundImage: "url(./images/slider-2.png)",
                    backgroundSize: "cover !important",
                  }}
                ></div>
                <div className="banner-content-wrap">
                  <div className="container">
                    <div className="banner-content text-center">
                      <h2 className="banner-title">
                        Maximiza el potencial de tu propiedad con Gloove
                      </h2>
                      <p>
                        Gestión experta, ingresos optimizados y tranquilidad
                        total
                      </p>
                      {/* <a href="#" className="button-primary">
                          CONTINUE READING
                        </a> */}
                    </div>
                  </div>
                </div>
                <div className="overlay"></div>
              </div>
            </Carousel>
            {/* <img src="./images/happy (9).png" alt="" style={{width: "50px", height: "50px", backgroundColor: "rgb(21, 107, 122)"}}></img> */}
            <div
              className=""
              style={{
                position: "absolute",
                transform: "translate(-50%, -50%)",
                top: "50%",
                right: "0%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <a href="https://www.facebook.com/profile.php?id=100090425376184">
                <img
                  src="./images/happy (9).png"
                  alt=""
                  style={{
                    width: "70px",
                    height: "70px",
                  }}
                ></img>
              </a>
              <a href="https://www.linkedin.com/company/gloove-gestor-turistico/?viewAsMember=true">
                <img
                  src="./images/happy (6).png"
                  alt=""
                  style={{
                    width: "70px",
                    height: "70px",
                  }}
                ></img>
              </a>
              {/* <a href="#">
                <img
                  src="./images/happy (7).png"
                  alt=""
                  style={{
                    width: "70px",
                    height: "70px",
                  }}
                ></img>
              </a> */}
              <a href="https://www.instagram.com/gloove_me/">
                <img
                  src="./images/happy (8).png"
                  alt=""
                  style={{
                    width: "70px",
                    height: "70px",
                  }}
                ></img>
              </a>
            </div>
          </div>
        </section>
        <div
          className="trip-search-section shape-search-section"
          style={{ padding: "0px" }}
        >
          <div className="slider-shape" style={{ marginTop: "-110px" }}></div>
          {/* <div className="container">
              <div className="trip-search-inner white-bg d-flex">
                <div className="input-group">
                  <label> Search Destination* </label>
                  <input type="text" name="s" placeholder="Enter Destination" />
                </div>
                <div className="input-group">
                  <label> Pax Number* </label>
                  <input type="text" name="s" placeholder="No.of People" />
                </div>
                <div className="input-group width-col-3">
                  <label> Checkin Date* </label>
                  <i className="far fa-calendar"></i>
                  <input
                    className="input-date-picker"
                    type="text"
                    name="s"
                    placeholder="MM / DD / YY"
                    autoComplete="off"
                    readOnly="readonly"
                  />
                </div>
                <div className="input-group width-col-3">
                  <label> Checkout Date* </label>
                  <i className="far fa-calendar"></i>
                  <input
                    className="input-date-picker"
                    type="text"
                    name="s"
                    placeholder="MM / DD / YY"
                    autoComplete="off"
                    readOnly="readonly"
                  />
                </div>
                <div className="input-group width-col-3">
                  <label className="screen-reader-text"> Search </label>
                  <input
                    type="submit"
                    name="travel-search"
                    value="INQUIRE NOW"
                  />
                </div>
              </div>
            </div> */}
        </div>
        {/* section close */}
        <section id="section-cars">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div
                  className="item_filter_group"
                  style={{ backgroundColor: "#156B7A", padding: "15px", width: "320px", marginLeft: "-20px" }}
                >
                  {/* <div className="de-box mb25"> */}
                  <form name="contactForm" id="contact_form" method="post">
                    {/* <h4>Desde $265</h4>
                      <div className="spacer-20" /> */}
                    <div className="row">
                      {/* <div className="col-lg-12 mb20">
                          <h5>Adults</h5>
                          <input
                            type="text"
                            name="PickupLocation"
                            // onFocus="geolocate()"
                            placeholder="Enter your pickup location"
                            id="autocomplete"
                            autoComplete="off"
                            className="form-control"
                          />
                          <div className="jls-address-preview jls-address-preview--hidden">
                            <div className="jls-address-preview__header"></div>
                          </div>
                        </div> */}
                      <div className="col-lg-12 mb20">
                        <h5 style={{ color: "white" }}>Localización</h5>
                        <input
                          type="text"
                          name="DropoffLocation"
                          // onFocus="geolocate()"
                          placeholder="Localización"
                          id="autocomplete2"
                          autoComplete="off"
                          className="form-control"
                          style={{ width: "100%", borderRadius: "5px" }}
                        />
                        <div className="jls-address-preview jls-address-preview--hidden">
                          <div className="jls-address-preview__header"></div>
                        </div>
                      </div>
                      <div
                        className="col-lg-6 mb20"
                        style={{ paddingRight: "0px" }}
                      >
                        <h5 style={{ color: "white" }}>Fecha de check-in</h5>
                        <div className="date-time-field">
                          <input
                            type="text"
                            id="date-picker"
                            name="Check-in"
                            defaultValue=""
                            style={{ width: "100%", borderRadius: "5px" }}
                          />
                          {/* <select name="Pick Up Time" id="pickup-time">
                              <option disabled="" value="Select time">
                                Time
                              </option>
                              <option value="00:00">00:00</option>
                              <option value="00:30">00:30</option>
                              <option value="01:00">01:00</option>
                              <option value="01:30">01:30</option>
                              <option value="02:00">02:00</option>
                              <option value="02:30">02:30</option>
                              <option value="03:00">03:00</option>
                              <option value="03:30">03:30</option>
                              <option value="04:00">04:00</option>
                              <option value="04:30">04:30</option>
                              <option value="05:00">05:00</option>
                              <option value="05:30">05:30</option>
                              <option value="06:00">06:00</option>
                              <option value="06:30">06:30</option>
                              <option value="07:00">07:00</option>
                              <option value="07:30">07:30</option>
                              <option value="08:00">08:00</option>
                              <option value="08:30">08:30</option>
                              <option value="09:00">09:00</option>
                              <option value="09:30">09:30</option>
                              <option value="10:00">10:00</option>
                              <option value="10:30">10:30</option>
                              <option value="11:00">11:00</option>
                              <option value="11:30">11:30</option>
                              <option value="12:00">12:00</option>
                              <option value="12:30">12:30</option>
                              <option value="13:00">13:00</option>
                              <option value="13:30">13:30</option>
                              <option value="14:00">14:00</option>
                              <option value="14:30">14:30</option>
                              <option value="15:00">15:00</option>
                              <option value="15:30">15:30</option>
                              <option value="16:00">16:00</option>
                              <option value="16:30">16:30</option>
                              <option value="17:00">17:00</option>
                              <option value="17:30">17:30</option>
                              <option value="18:00">18:00</option>
                              <option value="18:30">18:30</option>
                              <option value="19:00">19:00</option>
                              <option value="19:30">19:30</option>
                              <option value="20:00">20:00</option>
                              <option value="20:30">20:30</option>
                              <option value="21:00">21:00</option>
                              <option value="21:30">21:30</option>
                              <option value="22:00">22:00</option>
                              <option value="22:30">22:30</option>
                              <option value="23:00">23:00</option>
                              <option value="23:30">23:30</option>
                            </select> */}
                        </div>
                      </div>
                      <div
                        className="col-lg-6 mb20"
                        tyle={{ paddingLeft: "0px" }}
                      >
                        <h5 style={{ color: "white" }}>Fecha de salida</h5>
                        <div className="date-time-field">
                          <input
                            type="text"
                            id="date-picker-2"
                            name="Collection Date"
                            defaultValue=""
                            style={{ width: "100%", borderRadius: "5px" }}
                          />
                          {/* <select name="Collection Time" id="collection-time">
                              <option disabled="" value="Select time">
                                Time
                              </option>
                              <option value="00:00">00:00</option>
                              <option value="00:30">00:30</option>
                              <option value="01:00">01:00</option>
                              <option value="01:30">01:30</option>
                              <option value="02:00">02:00</option>
                              <option value="02:30">02:30</option>
                              <option value="03:00">03:00</option>
                              <option value="03:30">03:30</option>
                              <option value="04:00">04:00</option>
                              <option value="04:30">04:30</option>
                              <option value="05:00">05:00</option>
                              <option value="05:30">05:30</option>
                              <option value="06:00">06:00</option>
                              <option value="06:30">06:30</option>
                              <option value="07:00">07:00</option>
                              <option value="07:30">07:30</option>
                              <option value="08:00">08:00</option>
                              <option value="08:30">08:30</option>
                              <option value="09:00">09:00</option>
                              <option value="09:30">09:30</option>
                              <option value="10:00">10:00</option>
                              <option value="10:30">10:30</option>
                              <option value="11:00">11:00</option>
                              <option value="11:30">11:30</option>
                              <option value="12:00">12:00</option>
                              <option value="12:30">12:30</option>
                              <option value="13:00">13:00</option>
                              <option value="13:30">13:30</option>
                              <option value="14:00">14:00</option>
                              <option value="14:30">14:30</option>
                              <option value="15:00">15:00</option>
                              <option value="15:30">15:30</option>
                              <option value="16:00">16:00</option>
                              <option value="16:30">16:30</option>
                              <option value="17:00">17:00</option>
                              <option value="17:30">17:30</option>
                              <option value="18:00">18:00</option>
                              <option value="18:30">18:30</option>
                              <option value="19:00">19:00</option>
                              <option value="19:30">19:30</option>
                              <option value="20:00">20:00</option>
                              <option value="20:30">20:30</option>
                              <option value="21:00">21:00</option>
                              <option value="21:30">21:30</option>
                              <option value="22:00">22:00</option>
                              <option value="22:30">22:30</option>
                              <option value="23:00">23:00</option>
                              <option value="23:30">23:30</option>
                            </select> */}
                        </div>
                      </div>
                      <div
                        style={{
                          paddingBottom: "20px",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <h5 style={{ color: "white", paddingBottom: "0px" }}>
                            Nro. habitaciones
                          </h5>
                          <select
                            name="Pick Up Time"
                            id="pickup-time"
                            style={{
                              padding: "1px",
                              borderRadius: "5px",
                              height: "30px",
                              width: "100%"
                            }}
                          >
                            <option disabled="" value="Select time">
                              Habitaciones
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>
                        <div>
                          <h5 style={{ color: "white", paddingBottom: "0px" }}>
                            Adultos
                          </h5>
                          <select
                            name="Pick Up Time"
                            id="pickup-time"
                            style={{
                              padding: "1px",
                              borderRadius: "5px",
                              height: "30px",
                            }}
                          >
                            <option disabled="" value="Select time">
                              Adultos
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>
                        <div>
                          <h5 style={{ color: "white", paddingBottom: "0px" }}>
                            Niños
                          </h5>
                          <select
                            name="Pick Up Time"
                            id="pickup-time"
                            style={{
                              padding: "1px",
                              borderRadius: "5px",
                              height: "30px",
                            }}
                          >
                            <option disabled="" value="Select time">
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
                    <h4 style={{ color: "white" }}>Filtros</h4>
                    <div className="de_form">
                      {criteria &&
                        criteria.company.list.map((item, index) => {
                          return (
                            <div className="de_checkbox">
                              <input
                                id={"company_type_" + index}
                                name={"company_type_" + index}
                                type="checkbox"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setCriteria({
                                      company: {
                                        ...criteria.company,
                                        checked: [
                                          ...criteria.company.checked,
                                          item,
                                        ],
                                      },
                                    });
                                  } else {
                                    const list = criteria.company.checked;
                                    const index = list.indexOf(item);
                                    if (index > -1) {
                                      list.splice(index, 1);
                                      setCriteria({
                                        company: {
                                          ...criteria.company,
                                          checked: list,
                                        },
                                      });
                                    }
                                  }
                                }}
                              />
                              <label
                                htmlFor={"company_type_" + index}
                                style={{ color: "white" }}
                              >
                                {item}
                              </label>
                            </div>
                          );
                        })}
                    </div>
                    <a
                      // type="Booking Now"
                      id="send_message"
                      // defaultValue="Book Now"
                      style={{
                        color: "white",
                        backgroundColor: "#EE3388",
                        cursor: "pointer",
                        fontSize: "20px"
                      }}
                      className="btn-main btn-fullwidth"
                    >
                      Buscar
                    </a>
                    <div className="clearfix" />
                  </form>
                  {/* </div> */}
                </div>
              </div>
              <div className="col-lg-9">
                <div className="row">
                {!accommodations || !descriptions ? (
                  <p>Cargando...</p> // Mostrar mensaje de carga
                ) : (
                    filteredIndex.filter((index) => {
                      const accom = accommodations[index];
                      const desc = descriptions[index];
                      return (
                        desc &&
                        desc["Pictures"] &&
                        desc["Pictures"]["Picture"] &&
                        desc["Pictures"]["Picture"].length > 0
                      )
                    }).map((index) => {
                      const accom = accommodations[index];
                      const desc = descriptions[index];
                      console.log(desc);
                      return (
                        <div className="col-xl-4 col-lg-6">
                          <div className="de-item mb30">
                            <div className="d-img">
                              <img
                                src={
                                  desc &&
                                    desc["Pictures"] &&
                                    desc["Pictures"]["Picture"]
                                    ? desc["Pictures"]["Picture"].length > 0
                                      ? desc["Pictures"]["Picture"][0][
                                      "AdaptedURI"
                                      ]
                                      : desc["Pictures"]["Picture"][
                                      "AdaptedURI"
                                      ]
                                    : ""
                                }
                                className="img-fluid"
                                alt=""
                              />
                            </div>
                            <div className="d-info">
                              <div className="d-text">
                                {/* <div className="d-item_like">
                                  <i className="fa fa-heart" />
                                  <span>{accom["UserKind"]}</span>
                                </div> */}
                                <div className="d-atr-group">
                                  <div className="" style={{ width: "100%", float: "left", marginLeft: "80%" }}>
                                    <i className="fa fa-user" />
                                    <span style={{ marginLeft: "3px" }}>{accom["Features"]["Distribution"]["PeopleCapacity"]}</span>
                                    <i className="fa fa-bed" style={{ marginLeft: "10px" }} />
                                    <span style={{ marginLeft: "3px" }}>{accom["Features"]["Distribution"]["Bedrooms"]}</span>
                                  </div>
                                  {/* <span className="d-atr">
                                    <p style={{float:"left"}} >People Capacity:</p>
                                    <p style={{float:"left"}}>{accom["Features"]["Distribution"]["PeopleCapacity"]}</p>
                                  </span> */}
                                  {/* <span className="d-atr">
                                    <p style={{float:"left"}}>Company Name:</p>
                                    <p style={{float:"left"}}>{accom["Company"]} </p>
                                  </span> */}
                                  <h4 style={{}}>{accom["AccommodationName"]}</h4>
                                  <span className="d-atr">
                                    {/* <p style={{float:"left"}}>Region:</p> */}
                                    <p style={{ float: "left", fontWeight: "500" }}>
                                      {accom["LocalizationData"]["Region"]["Name"]} - {accom["UserKind"]}
                                    </p>
                                  </span>
                                </div>
                                <div className="d-atr-group" style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: "15px", }}>
                                  {accom && accom["HotelFeatures"] && accom["HotelFeatures"]["Restaurant"] !== "no" && (
                                    <svg style={{ width: "20px", height: "20px", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z" /></svg>
                                  )}
                                  {accom && accom["HotelFeatures"] && accom["HotelFeatures"]["InternetAccess"] !== "no" && (
                                    <svg style={{ width: "20px", height: "20px", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z" /></svg>
                                  )}
                                  {accom && accom["HotelFeatures"] && accom["HotelFeatures"]["HeatedSwimmingPool"] !== "no" && (
                                    <svg style={{ width: "20px", height: "20px", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M309.5 178.4L447.9 297.1c-1.6 .9-3.2 2-4.8 3c-18 12.4-40.1 20.3-59.2 20.3c-19.6 0-40.8-7.7-59.2-20.3c-22.1-15.5-51.6-15.5-73.7 0c-17.1 11.8-38 20.3-59.2 20.3c-10.1 0-21.1-2.2-31.9-6.2C163.1 193.2 262.2 96 384 96h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-26.9 0-52.3 6.6-74.5 18.4zM160 160A64 64 0 1 1 32 160a64 64 0 1 1 128 0zM306.5 325.9C329 341.4 356.5 352 384 352c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 405.7 417 416 384 416c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.4 27.3-10.1 39.2-1.7l0 0C136.7 341.2 165.1 352 192 352c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0z" /></svg>
                                  )}
                                  {accom && accom["HotelFeatures"] && accom["HotelFeatures"]["Jacuzzi"] !== "no" && (
                                    <svg style={{ width: "20px", height: "20px", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M272 24c0-13.3-10.7-24-24-24s-24 10.7-24 24v5.2c0 34 14.4 66.4 39.7 89.2l16.4 14.8c15.2 13.7 23.8 33.1 23.8 53.5V200c0 13.3 10.7 24 24 24s24-10.7 24-24V186.8c0-34-14.4-66.4-39.7-89.2L295.8 82.8C280.7 69.1 272 49.7 272 29.2V24zM0 320v16V448c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H277.3c-13.8 0-27.3-4.5-38.4-12.8l-85.3-64C137 166.7 116.8 160 96 160c-53 0-96 43-96 96v64zm128 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V336c0-8.8 7.2-16 16-16s16 7.2 16 16zm80-16c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V336c0-8.8 7.2-16 16-16zm112 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V336c0-8.8 7.2-16 16-16s16 7.2 16 16zm80-16c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V336c0-8.8 7.2-16 16-16zM360 0c-13.3 0-24 10.7-24 24v5.2c0 34 14.4 66.4 39.7 89.2l16.4 14.8c15.2 13.7 23.8 33.1 23.8 53.5V200c0 13.3 10.7 24 24 24s24-10.7 24-24V186.8c0-34-14.4-66.4-39.7-89.2L407.8 82.8C392.7 69.1 384 49.7 384 29.2V24c0-13.3-10.7-24-24-24zM64 128A64 64 0 1 0 64 0a64 64 0 1 0 0 128z" /></svg>
                                  )}
                                  {accom && accom["HotelFeatures"] && accom["HotelFeatures"]["Parking"] !== "no" && (
                                    <svg style={{ width: "20px", height: "20px", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM192 256h48c17.7 0 32-14.3 32-32s-14.3-32-32-32H192v64zm48 64H192v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V288 168c0-22.1 17.9-40 40-40h72c53 0 96 43 96 96s-43 96-96 96z" /></svg>
                                  )}
                                  {accom && accom["HotelFeatures"] && accom["HotelFeatures"]["Garage"] !== "no" && (
                                    <svg style={{ width: "20px", height: "20px", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M0 488V171.3c0-26.2 15.9-49.7 40.2-59.4L308.1 4.8c7.6-3.1 16.1-3.1 23.8 0L599.8 111.9c24.3 9.7 40.2 33.3 40.2 59.4V488c0 13.3-10.7 24-24 24H568c-13.3 0-24-10.7-24-24V224c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32V488c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zm488 24l-336 0c-13.3 0-24-10.7-24-24V432H512l0 56c0 13.3-10.7 24-24 24zM128 400V336H512v64H128zm0-96V224H512l0 80H128z" /></svg>
                                  )}
                                  {accom && accom["HotelFeatures"] && accom["HotelFeatures"]["Tennis"] !== "no" && (
                                    <svg style={{ width: "20px", height: "20px", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M480 288c-50.1 0-93.6 28.8-114.6 70.8L132.9 126.3l.6-.6 60.1-60.1c87.5-87.5 229.3-87.5 316.8 0c67.1 67.1 82.7 166.3 46.8 248.3C535.8 297.6 509 288 480 288zM113.3 151.9L354.1 392.7c-1.4 7.5-2.1 15.3-2.1 23.3c0 23.2 6.2 44.9 16.9 63.7c-3 .2-6.1 .3-9.2 .3H357c-33.9 0-66.5-13.5-90.5-37.5l-9.8-9.8c-13.1-13.1-34.6-12.4-46.8 1.7L152.2 501c-5.8 6.7-14.2 10.7-23 11s-17.5-3.1-23.8-9.4l-32-32c-6.3-6.3-9.7-14.9-9.4-23.8s4.3-17.2 11-23l66.6-57.7c14-12.2 14.8-33.7 1.7-46.8l-9.8-9.8c-24-24-37.5-56.6-37.5-90.5v-2.7c0-22.8 6.1-44.9 17.3-64.3zM480 320a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" /></svg>
                                  )}
                                  {accom && accom["HotelFeatures"] && accom["HotelFeatures"]["Gym"] !== "no" && (
                                    <svg style={{ width: "20px", height: "20px", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M96 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V224v64V448c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V384H64c-17.7 0-32-14.3-32-32V288c-17.7 0-32-14.3-32-32s14.3-32 32-32V160c0-17.7 14.3-32 32-32H96V64zm448 0v64h32c17.7 0 32 14.3 32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32v64c0 17.7-14.3 32-32 32H544v64c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32V288 224 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32zM416 224v64H224V224H416z" /></svg>
                                  )}
                                  {accom && accom["HotelFeatures"] && accom["HotelFeatures"]["Sauna"] !== "no" && (
                                    <svg style={{ width: "20px", height: "20px", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M80.8 136.5C104.9 93.8 152.6 64 209 64c16.9 0 33.1 2.7 48.2 7.7c16.8 5.5 34.9-3.6 40.4-20.4s-3.6-34.9-20.4-40.4C255.8 3.8 232.8 0 209 0C95.2 0 0 88 0 200c0 91.6 53.5 172.1 142.2 194.1c13.4 3.8 27.5 5.9 42.2 5.9c.7 0 1.4 0 2.1-.1c1.8 0 3.7 .1 5.5 .1l0 0c31.9 0 60.6-9.9 80.4-18.9c5.8-2.7 11.1-5.3 15.6-7.7c4.5 2.4 9.7 5.1 15.6 7.7c19.8 9 48.5 18.9 80.4 18.9c33 0 65.5-10.3 94.5-25.8c13.4 8.4 33.7 19.3 58.2 25c17.2 4 34.4-6.7 38.4-23.9s-6.7-34.4-23.9-38.4c-18.1-4.2-36.2-13.3-50.6-25.2c-11.1-9.5-27.3-10.1-39.2-1.7l0 0C439.4 325.2 410.9 336 384 336c-27.5 0-55-10.6-77.5-26.1c-11.1-7.9-25.9-7.9-37 0c-22.4 15.5-49.9 26.1-77.4 26.1c0 0-.1 0-.1 0c-12.4 0-24-1.5-34.9-4.3C121.6 320.2 96 287 96 248c0-48.5 39.5-88 88.4-88c13.5 0 26.1 3 37.5 8.3c16 7.5 35.1 .6 42.5-15.5s.6-35.1-15.5-42.5C229.3 101.1 207.4 96 184.4 96c-40 0-76.4 15.4-103.6 40.5zm252-18.1c-8.1 6-12.8 15.5-12.8 25.6V265c1.6 1 3.3 2 4.8 3.1c18.4 12.7 39.6 20.3 59.2 20.3c19 0 41.2-7.9 59.2-20.3c23.8-16.7 55.8-15.3 78.1 3.4c10.6 8.8 24.2 15.6 37.3 18.6c5.8 1.4 11.2 3.4 16.2 6.2c.7-2.7 1.1-5.5 1.1-8.4l-.4-144c0-10-4.7-19.4-12.7-25.5l-95.5-72c-11.4-8.6-27.1-8.6-38.5 0l-96 72zM384 448c-27.5 0-55-10.6-77.5-26.1c-11.1-7.9-25.9-7.9-37 0C247 437.4 219.5 448 192 448c-26.9 0-55.3-10.8-77.4-26.1l0 0c-11.9-8.5-28.1-7.8-39.2 1.7c-14.4 11.9-32.5 21-50.6 25.2c-17.2 4-27.9 21.2-23.9 38.4s21.2 27.9 38.4 23.9c24.5-5.7 44.9-16.5 58.2-25C126.5 501.7 159 512 192 512c31.9 0 60.6-9.9 80.4-18.9c5.8-2.7 11.1-5.3 15.6-7.7c4.5 2.4 9.7 5.1 15.6 7.7c19.8 9 48.5 18.9 80.4 18.9c33 0 65.5-10.3 94.5-25.8c13.4 8.4 33.7 19.3 58.2 25c17.2 4 34.4-6.7 38.4-23.9s-6.7-34.4-23.9-38.4c-18.1-4.2-36.2-13.3-50.6-25.2c-11.1-9.4-27.3-10.1-39.2-1.7l0 0C439.4 437.2 410.9 448 384 448z" /></svg>
                                  )}
                                </div>
                                <div className="d-price">
                                  {desc && desc["InternationalizedItem"][0]["ExtrasSummary"]["ObligatoryOrIncluded"]["Extra"] && desc["InternationalizedItem"][0]["ExtrasSummary"]["ObligatoryOrIncluded"]["Extra"][1] ? desc["InternationalizedItem"][0]["ExtrasSummary"]["ObligatoryOrIncluded"]["Extra"][1]["Name"] : "Undefined"}
                                  <span style={{ fontSize: "14px" }}>{desc && desc["InternationalizedItem"][0]["ExtrasSummary"]["ObligatoryOrIncluded"]["Extra"] && desc["InternationalizedItem"][0]["ExtrasSummary"]["ObligatoryOrIncluded"]["Extra"][1] ? desc["InternationalizedItem"][0]["ExtrasSummary"]["ObligatoryOrIncluded"]["Extra"][1]["Description"] : "Undefined"}
                                  </span>
                                  <div
                                    className="btn-main"
                                    onClick={() => {
                                      window.location.href =
                                        "/car-single?index=" + index;
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
                    }))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <BookingCardGroup />
      </div>
      {/* content close */}
      {/* <a href="#" id="back-to-top" /> */}
      {/* footer begin */}
      <footer
        id="colophon"
        className="site-footer footer-primary"
        style={{ backgroundColor: "white" }}
      >
        {/* <div className="top-footer">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-6">
                  <aside className="widget widget_text">
                    <h3 className="widget-title">About Travel</h3>
                    <div className="textwidget widget-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Ut elit tellus, luctus nec ullamcorper mattis, pulvinar
                      dapibus leo.
                    </div>
                    <div className="award-img">
                      <a href="#">
                        <img src="./images/logo6.png" alt="" />
                      </a>
                      <a href="#">
                        <img src="./images/logo2.png" alt="" />
                      </a>
                    </div>
                  </aside>
                </div>
                <div className="col-lg-3 col-md-6">
                  <aside className="widget widget_text">
                    <h3 className="widget-title">CONTACT INFORMATION</h3>
                    <div className="textwidget widget-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      <ul>
                        <li>
                          <a href="#">
                            <i className="fas fa-phone-alt"></i>
                            +01 (977) 2599 12
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fas fa-envelope"></i>
                            company@domain.com
                          </a>
                        </li>
                        <li>
                          <i className="fas fa-map-marker-alt"></i>
                          3146 Koontz, California
                        </li>
                      </ul>
                    </div>
                  </aside>
                </div>
                <div className="col-lg-3 col-md-6">
                  <aside className="widget widget_recent_post">
                    <h3 className="widget-title">Latest Post</h3>
                    <ul>
                      <li>
                        <h5>
                          <a href="#">
                            Life is a beautiful journey not a destination
                          </a>
                        </h5>
                        <div className="entry-meta">
                          <span className="post-on">
                            <a href="#">August 17, 2021</a>
                          </span>
                          <span className="comments-link">
                            <a href="#">No Comments</a>
                          </span>
                        </div>
                      </li>
                      <li>
                        <h5>
                          <a href="#">
                            Take only memories, leave only footprints
                          </a>
                        </h5>
                        <div className="entry-meta">
                          <span className="post-on">
                            <a href="#">August 17, 2021</a>
                          </span>
                          <span className="comments-link">
                            <a href="#">No Comments</a>
                          </span>
                        </div>
                      </li>
                    </ul>
                  </aside>
                </div>
                <div className="col-lg-3 col-md-6">
                  <aside className="widget widget_newslatter">
                    <h3 className="widget-title">SUBSCRIBE US</h3>
                    <div className="widget-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                    <form className="newslatter-form">
                      <input type="email" name="s" placeholder="Your Email.." />
                      <input type="submit" name="s" value="SUBSCRIBE NOW" />
                    </form>
                  </aside>
                </div>
              </div>
            </div>
          </div> */}
        <div className="top-footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <aside
                  className="widget widget_text"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    padding: "0px",
                    height: "100%",
                  }}
                >
                  {/* <h3 className="widget-title">About Travel</h3> */}
                  <div className="">
                    <a href="#">
                      <img
                        src="./images/GLOOVE_marca_tagline_COL.png"
                        alt=""
                        style={{ width: "100%", height: "auto" }}
                      />
                    </a>
                  </div>
                  <div
                    className="textwidget widget-text"
                    style={{
                      marginTop: "20px",
                      fontSize: "20px",
                      textAlign: "center",
                      padding: "0px",
                      color: "#156B7A",
                    }}
                  >
                    GESTIONAMOS TUS VIVIENDAS TURÍSTICAS CON EL MEJOR SERVICIO Y
                    TECNOLOGÍA DEL MERCADO
                  </div>
                </aside>
              </div>
              <div className="col-lg-4 col-md-6">
                <aside className="widget widget_text">
                  {/* <h3 className="widget-title">CONTACT INFORMATION</h3> */}
                  <div className="textwidget widget-text">
                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. */}
                    <ul>
                      <li
                        style={{
                          textAlign: "center",
                          fontSize: "16px",
                          lineHeight: "30px",
                        }}
                      >
                        <a href="#" style={{ color: "#156B7A" }}>
                          Centro de ayuda
                        </a>
                      </li>
                      <li
                        style={{
                          textAlign: "center",
                          fontSize: "16px",
                          lineHeight: "30px",
                        }}
                      >
                        <a href="#" style={{ color: "#156B7A" }}>
                          Quienes somos
                        </a>
                      </li>
                      <li
                        style={{
                          textAlign: "center",
                          fontSize: "16px",
                          lineHeight: "30px",
                        }}
                      >
                        <a href="#" style={{ color: "#156B7A" }}>
                          Preguntas frecuentes
                        </a>
                      </li>
                      <li
                        style={{
                          textAlign: "center",
                          fontSize: "16px",
                          lineHeight: "30px",
                        }}
                      >
                        <a href="#" style={{ color: "#156B7A" }}>
                          Trabaja con nosotros
                        </a>
                      </li>
                      <li
                        style={{
                          textAlign: "center",
                          fontSize: "16px",
                          lineHeight: "30px",
                        }}
                      >
                        <a href="#" style={{ color: "#156B7A" }}>
                          Nuestro Blog
                        </a>
                      </li>
                      <li
                        style={{
                          textAlign: "center",
                          fontSize: "16px",
                          lineHeight: "30px",
                        }}
                      >
                        <a href="#" style={{ color: "#156B7A" }}>
                          Noticias
                        </a>
                      </li>
                      <li
                        style={{
                          textAlign: "center",
                          fontSize: "16px",
                          lineHeight: "30px",
                        }}
                      >
                        <a href="#" style={{ color: "#156B7A" }}>
                          CONTACTANOS
                        </a>
                      </li>
                    </ul>
                  </div>
                </aside>
              </div>
              <div className="col-lg-4 col-md-6">
                <aside className="widget widget_recent_post">
                  <h3
                    className=""
                    style={{ textAlign: "center", color: "#156B7A" }}
                  >
                    SIGUENOS EN:
                  </h3>
                  <ul>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        border: "0px",
                        padding: "0px",
                      }}
                    >
                      {/* <h5>
                          <a href="#">
                            Life is a beautiful journey not a destination
                          </a>
                        </h5>
                        <div className="entry-meta">
                          <span className="post-on">
                            <a href="#">August 17, 2021</a>
                          </span>
                          <span className="comments-link">
                            <a href="#">No Comments</a>
                          </span>
                        </div> */}
                      <a href="https://www.facebook.com/profile.php?id=100090425376184" target="_blank">
                      <img
                        src="./images/happy (9).png"
                        alt=""
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "#156B7A",
                        }}
                      />
                      </a>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        border: "0px",
                        padding: "0px",
                      }}
                    >
                      <a href="https://www.linkedin.com/company/gloove-gestor-turistico/?viewAsMember=true" target="_blank">
                        <img
                          src="./images/happy (6).png"
                          alt=""
                          style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#156B7A",
                          }}
                        />
                      </a>
                    </li>
                    {/* <li
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        border: "0px",
                        padding: "0px",
                      }}
                    >
                      <img
                        src="./images/happy (7).png"
                        alt=""
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "#156B7A",
                        }}
                      />
                    </li> */}
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        border: "0px",
                        padding: "0px",
                      }}
                    >
                      <a href="https://api.whatsapp.com/message/WKHHAGYK4P4BB1?autoload=1&app_absent=0" target="_blank">
                        <img
                          src="./images/happy (8).png"
                          alt=""
                          style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#156B7A",
                          }}
                        />
                      </a>
                    </li>
                  </ul>
                </aside>
              </div>
            </div>
          </div>
        </div>
        <div className="buttom-footer">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-5">
                <div className="footer-menu">
                  <ul>
                    <li>
                      <a href="https://gloove.me/politica-de-privacidad/" target="_blank">Política de Privacidad</a>
                    </li>
                    <li>
                      <a href="#">Términos y condiciones</a>
                    </li>
                    <li>
                      <a href="#">FAQ</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-2 text-center">
                <div className="footer-logo">
                  <a href="#">
                    <img
                      src="./images/GLOOVE_marca_tagline_blanco.png"
                      alt=""
                    />
                  </a>
                </div>
              </div>
              <div className="col-md-5">
                <div className="copy-right text-right">
                  Copyright © 2024 Gloove. Todos los derechos reservados
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* footer close */}
    </div>
  );
}

export default Booking;
