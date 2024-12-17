import React, { useEffect, useState, useRef } from "react";
import "react-multi-carousel/lib/styles.css";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "./../assets/css/booking/bootstrap.min.css";
import "./../assets/css/booking/mdb.min.css";
import "./../assets/css/booking/plugins.css";
import "./../assets/css/booking/style.css";
import "./../assets/css/booking/coloring.css";
import "./../assets/css/booking/colors/scheme-01.css";
import Header from "components/Header";
import BookingMenu from "components/BookingMenu";
import BookingCardGroup from "components/BookingCardGroup";
import GoogleMapReact from 'google-map-react';
import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel"


function CarSingle() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [accommodation, setAccommodation] = useState(null);
  const [description, setDescription] = useState(null);
  const [services, setServices] = useState(null);
  const [adaptedURI, setAdaptedURI] = useState("");
  const [company, setCompany] = useState("");
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [localBookingMenu, setLocalBookingMenu] = useState();
  const pickupDateRef = useRef(null);
  const returnDateRef = useRef(null);
  const pickupTimeRef = useRef(null);
  const returnTimeRef = useRef(null);
  const [multiDataValue, setMultiDateValue] = useState(new Date());


  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const [value, setValue] = useState([
    new DateObject().setDay(20),
    new DateObject().add(2, 7).setDay(15),
  ]);

  const handleDatePicker = () => { };

  useEffect(() => {
    let bookingMenu = localStorage.getItem("booking")
      ? JSON.parse(localStorage.getItem("booking"))
      : [];
    setLocalBookingMenu(bookingMenu);
    const index = params.get("index");
    setAccommodation(JSON.parse(localStorage.getItem("accom"))[index]);
    setDescription(JSON.parse(localStorage.getItem("desc"))[index]);
    try {
      setAdaptedURI(
        JSON.parse(localStorage.getItem("desc"))[index].Pictures.Picture[0]
          .AdaptedURI
      );
      setCompany(
        JSON.parse(localStorage.getItem("accom"))[index] &&
        JSON.parse(localStorage.getItem("accom"))[index]["AccommodationName"]
      );
    } catch (err) { }
  }, []);

  const handleBookNowClick = () => {
    const price = 265;
    const pickupDate = pickupDateRef.current.value;
    const returnDate = returnDateRef.current.value;
    const pickupTime = pickupTimeRef.current.value;
    const returnTime = returnTimeRef.current.value;
    if (
      adults === "" ||
      children === "" ||
      pickupTime === "Select time" ||
      returnTime === "Select time"
    ) {
      toast.error("Complete todos los archivos.");
    } else {
      const bookingData = {
        adaptedURI,
        company,
        price,
        adults,
        children,
        pickupDate: pickupDate + " " + pickupTime,
        returnDate: returnDate + " " + returnTime,
      };

      let bookingMenu = localStorage.getItem("booking")
        ? JSON.parse(localStorage.getItem("booking"))
        : [];

      let updatedBookingList = [];

      // Check if bookingMenu exists
      if (bookingMenu) {
        // Replace existing booking with the same adaptedURI or add the new one
        const isExisting = bookingMenu.some(
          (item) => item.adaptedURI === bookingData.adaptedURI
        );
        if (isExisting) {
          // Map through the array and replace the item with the same adaptedURI
          updatedBookingList = bookingMenu.map((item) =>
            item.adaptedURI === bookingData.adaptedURI ? bookingData : item
          );
        } else {
          // If there's no match, just add the new booking data to the list
          updatedBookingList = [...bookingMenu, bookingData];
        }
      } else {
        // If bookingMenu doesn't exist, start a new array with bookingData
        updatedBookingList = [bookingData];
      }

      // Update local storage with the new or modified booking list
      localStorage.setItem("booking", JSON.stringify(updatedBookingList));
      setLocalBookingMenu(updatedBookingList);
      toast.success("Agregado exitosamente a la cesta del carrito.");
    }
  };
  const handleClearList = (value) => {
    if (value === -1) {
      setLocalBookingMenu([]);
      localStorage.setItem("booking", "");
      toast.success("Se agregó la lista de reservas con éxito.");
    } else {
      setLocalBookingMenu([
        ...localBookingMenu.slice(0, value),
        ...localBookingMenu.slice(value + 1, localBookingMenu.length),
      ]);
      localStorage.setItem(
        "booking",
        JSON.stringify([
          ...localBookingMenu.slice(0, value),
          ...localBookingMenu.slice(value + 1, localBookingMenu.length),
        ])
      );
      toast.warning("Elemento de reserva eliminado correctamente.");
    }
  };
  useEffect(() => {
    if (localBookingMenu)
      if (localBookingMenu.length === 0) {
        toast.info(
          "Por favor agregue a su carrito de compras y haga una reserva."
        );
      }
  }, [localBookingMenu]);

  const defaultProps = {
    center: {
      lat: accommodation && accommodation["LocalizationData"]["GoogleMaps"] ? Object.entries(accommodation["LocalizationData"]["GoogleMaps"]["Latitude"]) : null,
      lng: accommodation && accommodation["LocalizationData"]["GoogleMaps"] ? Object.entries(accommodation["LocalizationData"]["GoogleMaps"]["Longitude"]) : null,
    },
    zoom: accommodation && accommodation["LocalizationData"]["GoogleMaps"] ? Object.entries(accommodation["LocalizationData"]["GoogleMaps"]["Zoom"]) : null
  };

  return (
    <div id="wrapper">
      {/* page preloader begin */}
      <div id="de-preloader" />
      {/* page preloader close */}
      {/* header begin */}
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
              <a href="#">
                <img
                  src="./images/happy (9).png"
                  alt=""
                  style={{
                    width: "70px",
                    height: "70px",
                  }}
                ></img>
              </a>
              <a href="#">
                <img
                  src="./images/happy (6).png"
                  alt=""
                  style={{
                    width: "70px",
                    height: "70px",
                  }}
                ></img>
              </a>
              <a href="#">
                <img
                  src="./images/happy (7).png"
                  alt=""
                  style={{
                    width: "70px",
                    height: "70px",
                  }}
                ></img>
              </a>
              <a href="#">
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
        </div>
        <section id="section-car-details" style={{ position: "relative" }}>
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-6">
                <div id="slider-carousel" className="owl-carousel">
                  {description &&
                    description["Pictures"] &&
                    description["Pictures"]["Picture"] &&
                    description["Pictures"]["Picture"].length > 0 ? (
                    description["Pictures"]["Picture"].map((item) => (
                      <div className="item" key={item.id}>
                        <img id={item.id} src={item["AdaptedURI"]} alt="" />
                      </div>
                    ))
                  ) : (
                    <div className="item">
                      <img src={""} alt="image is not existed" />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-3">
                <h3>{accommodation && accommodation["AccommodationName"]}</h3>
                <p>

                  <div dangerouslySetInnerHTML={{ __html: description && description["InternationalizedItem"][0]["Description"] }} />
                </p>
                <div className="spacer-10" />
                <h4>{accommodation && accommodation["Features"]["Distribution"] && (accommodation["Features"]["Distribution"]["Bedrooms"] || accommodation["Features"]["Distribution"]["DoubleBeds"] || accommodation["Features"]["Distribution"]["IndividualBeds"] || accommodation["Features"]["Distribution"]["Toilets"]) ? "Especificaciones" : ""}</h4>
                <div className="de-spec">
                  <div className="d-row">
                    {accommodation && accommodation["Features"]["Distribution"] && accommodation["Features"]["Distribution"]["Bedrooms"] && (<span className="d-title"> Bedrooms</span>)}
                    {accommodation && accommodation["Features"]["Distribution"] && accommodation["Features"]["Distribution"]["Bedrooms"] && (<span className="d-value"> {accommodation["Features"]["Distribution"]["Bedrooms"]} Bedrooms</span>)}
                  </div>
                  <div className="d-row">
                    {accommodation && accommodation["Features"]["Distribution"] && accommodation["Features"]["Distribution"]["DoubleBeds"] && (<span className="d-title">DoubleBeds</span>)}
                    {accommodation && accommodation["Features"]["Distribution"] && accommodation["Features"]["Distribution"]["DoubleBeds"] && (<span className="d-value"> {accommodation["Features"]["Distribution"]["DoubleBeds"]} DoubleBeds </span>)}
                  </div>
                  <div className="d-row">
                    {accommodation && accommodation["Features"]["Distribution"] && accommodation["Features"]["Distribution"]["Toilets"] && (<span className="d-title"> Toilets</span>)}
                    {accommodation && accommodation["Features"]["Distribution"] && accommodation["Features"]["Distribution"]["Toilets"] && (<span className="d-value"> {accommodation["Features"]["Distribution"]["Toilets"]} Toilets </span>)}
                  </div>
                  <div className="d-row">
                    {accommodation && accommodation["Features"]["Distribution"] && accommodation["Features"]["Distribution"]["IndividualBeds"] && (<span className="d-title"> IndividualBeds</span>)}
                    {accommodation && accommodation["Features"]["Distribution"] && accommodation["Features"]["Distribution"]["IndividualBeds"] && (<span className="d-value"> {accommodation["Features"]["Distribution"]["IndividualBeds"]} IndividualBeds</span>)}
                  </div>
                </div>
                <div className="spacer-single" />
                {accommodation && accommodation["Features"]["HouseCharacteristics"]["Kitchen"] && accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["KitchenClass"] && (<h4> Cocina independiente (Inducción)</h4>)}
                <ul className="ul-style-2" style={{ marginBottom: "10px" }}>
                  {accommodation && accommodation["Features"]["HouseCharacteristics"]["Kitchen"] && accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["KitchenClass"] && (<li>{accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["KitchenClass"]} </li>)}
                  {accommodation && accommodation["Features"]["HouseCharacteristics"]["Kitchen"] && accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["KitchenType"] && (<li>{accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["KitchenType"]} </li>)}
                  {accommodation && accommodation["Features"]["HouseCharacteristics"]["Kitchen"] && accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["Fridge"] && (<li>{accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["Fridge"]} </li>)}
                  {accommodation && accommodation["Features"]["HouseCharacteristics"]["Kitchen"] && accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["Freezer"] && (<li>{accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["Freezer"]} </li>)}
                  {accommodation && accommodation["Features"]["HouseCharacteristics"]["Kitchen"] && accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["WashingMachine"] && (<li>{accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["WashingMachine"]} </li>)}
                  {accommodation && accommodation["Features"]["HouseCharacteristics"]["Kitchen"] && accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["Dishwasher"] && (<li>{accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["Dishwasher"]} </li>)}
                  {accommodation && accommodation["Features"]["HouseCharacteristics"]["Kitchen"] && accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["Dryer"] && (<li>{accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["Dryer"]} </li>)}
                  {accommodation && accommodation["Features"]["HouseCharacteristics"]["Kitchen"] && accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["CoffeeMachine"] && (<li>{accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["CoffeeMachine"]} </li>)}
                  {accommodation && accommodation["Features"]["HouseCharacteristics"]["Kitchen"] && accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["Fryer"] && (<li>{accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["Fryer"]} </li>)}
                  {accommodation && accommodation["Features"]["HouseCharacteristics"]["Kitchen"] && accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["Toaster"] && (<li>{accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["Toaster"]} </li>)}
                  {accommodation && accommodation["Features"]["HouseCharacteristics"]["Kitchen"] && accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["TableWare"] && (<li>{accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["TableWare"]} </li>)}
                  {accommodation && accommodation["Features"]["HouseCharacteristics"]["Kitchen"] && accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["KitchenUtensils"] && (<li>{accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["KitchenUtensils"]} </li>)}
                  {accommodation && accommodation["Features"]["HouseCharacteristics"]["Kitchen"] && accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["Microwave"] && (<li>{accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["Microwave"]} </li>)}
                  {accommodation && accommodation["Features"]["HouseCharacteristics"]["Kitchen"] && accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["Oven"] && (<li>{accommodation["Features"]["HouseCharacteristics"]["Kitchen"]["Oven"]} </li>)}
                </ul>
                {accommodation && accommodation["Features"]["Distribution"] && accommodation["Features"]["Distribution"]["BathroomWithBathtub"] && (<h4> Baños</h4>)}
                <ul className="ul-style-2">
                  {accommodation && accommodation["Features"]["Distribution"] && accommodation["Features"]["Distribution"]["BathroomWithBathtub"] && (<li> {accommodation["Features"]["Distribution"]["BathroomWithBathtub"]} with Bathtub</li>)}
                  {accommodation && accommodation["Features"]["Distribution"] && accommodation["Features"]["Distribution"]["BathroomWithShower"] && (<li> {accommodation["Features"]["Distribution"]["BathroomWithShower"]} with Shower</li>)}
                </ul>
              </div>
              <div className="col-lg-3">
                <div className="de-price text-center">
                  {description && description["InternationalizedItem"][0]["ExtrasSummary"]["ObligatoryOrIncluded"]["Extra"] && description["InternationalizedItem"][0]["ExtrasSummary"]["ObligatoryOrIncluded"]["Extra"][1] ? description["InternationalizedItem"][0]["ExtrasSummary"]["ObligatoryOrIncluded"]["Extra"][1]["Name"] : "Undefined"}
                  <h4>{description && description["InternationalizedItem"][0]["ExtrasSummary"]["ObligatoryOrIncluded"]["Extra"] && description["InternationalizedItem"][0]["ExtrasSummary"]["ObligatoryOrIncluded"]["Extra"][1] ? description["InternationalizedItem"][0]["ExtrasSummary"]["ObligatoryOrIncluded"]["Extra"][1]["Description"] : "Undefined"}</h4>
                </div>
                <div className="spacer-30" />
                <div className="de-box mb25">
                  <div name="contactForm" id="contact_form" method="post">
                    {/* <h4>Desde $265</h4> */}
                    <div className="spacer-20" />
                    <div className="row">
                      <div className="col-lg-12 mb20">
                        <h5>Adults</h5>
                        <input
                          type="text"
                          name="PickupLocation"
                          // onFocus="geolocate()"
                          placeholder="Cantidad de adultos"
                          id="autocomplete"
                          autoComplete="off"
                          className="form-control"
                          value={adults}
                          onChange={(e) => setAdults(e.target.value)}
                        />
                        <div className="jls-address-preview jls-address-preview--hidden">
                          <div className="jls-address-preview__header"></div>
                        </div>
                      </div>
                      <div className="col-lg-12 mb20">
                        <h5>Children</h5>
                        <input
                          type="text"
                          name="DropoffLocation"
                          // onFocus="geolocate()"
                          placeholder="Cantida de nińos"
                          id="autocomplete2"
                          autoComplete="off"
                          className="form-control"
                          value={children}
                          onChange={(e) => setChildren(e.target.value)}
                        />
                        <div className="jls-address-preview jls-address-preview--hidden">
                          <div className="jls-address-preview__header"></div>
                        </div>
                      </div>
                      <div className="col-lg-12 mb20">
                        <h5>Fecha &amp; Hora de ingreso</h5>
                        <div className="date-time-field">
                          <input
                            type="text"
                            id="date-picker"
                            name="Pick Up Date"
                            defaultValue=""
                            ref={pickupDateRef}
                            onChange={handleDatePicker}
                          />
                          <select
                            name="Pick Up Time"
                            id="pickup-time"
                            ref={pickupTimeRef}
                          >
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
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12 mb20">
                        <h5>Fecha &amp; Hora de salida</h5>
                        <div className="date-time-field">
                          <input
                            type="text"
                            id="date-picker-2"
                            name="Collection Date"
                            defaultValue=""
                            ref={returnDateRef}
                          />
                          <select
                            name="Collection Time"
                            id="collection-time"
                            ref={returnTimeRef}
                          >
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
                          </select>
                        </div>
                      </div>
                    </div>
                    <button
                      // type="submit"
                      id="send_message"
                      // defaultValue="Book Now"
                      className="btn-main btn-fullwidth"
                      style={{ backgroundColor: "#156B7A" }}
                      onClick={handleBookNowClick}
                    >
                      Añadir a mi reserva
                    </button>
                    <div className="clearfix" />
                  </div>
                </div>
                <div className="de-box">
                  <h4>Share</h4>
                  <div className="de-color-icons">
                    <span>
                      <i className="fa fa-twitter fa-lg" />
                    </span>
                    <span>
                      <i className="fa fa-facebook fa-lg" />
                    </span>
                    <span>
                      <i className="fa fa-reddit fa-lg" />
                    </span>
                    <span>
                      <i className="fa fa-linkedin fa-lg" />
                    </span>
                    <span>
                      <i className="fa fa-pinterest fa-lg" />
                    </span>
                    <span>
                      <i className="fa fa-stumbleupon fa-lg" />
                    </span>
                    <span>
                      <i className="fa fa-delicious fa-lg" />
                    </span>
                    <span>
                      <i className="fa fa-envelope fa-lg" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              position: "fixed",
              width: "fit-content",
              height: "fit-content",
              bottom: "0px",
              right: "20px",
              backgroundColor: "initial",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              zIndex: "999999",
            }}
          >
            <BookingMenu
              localBookingMenu={localBookingMenu}
              handleClearList={handleClearList}
            />
          </div>
        </section>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", width: "50%", marginLeft: "18%", borderTop: "1px solid #ddd" }}>
          <h3 style={{ width: "50%", float: "left", marginTop: "20px" }}>Características más destacadas</h3>
          <div style={{ margin: "auto", display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: "20px" }}>
            {accommodation && accommodation["Features"]["ExtrasAndServices"]["SpecialServices"] && (Object.values(accommodation["Features"]["ExtrasAndServices"]["SpecialServices"]["SpecialService"]).map((item) => {
              if (item.Type) return (
                <span style={{ marginLeft: "20px" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" style={{width:"15px", float:"left", color:"green", marginRight:"7px", paddingTop:"3px"}} viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                  <p style={{ float: "left" }}>{item.Type}</p>
                </span>
              )
            }))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", width: "50%", marginLeft: "18%", borderTop: "1px solid #ddd" }}>
          <h3 style={{ width: "50%", float: "left", marginTop: "20px" }}>Distribución de dormitorios</h3>
          <div style={{ margin: "auto", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", marginTop: "20px" }}>
            {accommodation && accommodation["Features"]["Distribution"] && (Object.entries(accommodation["Features"]["Distribution"]).map((item) => {
              if (item && typeof (item[1]) === 'number') return (
                <span style={{marginLeft:"20px"}}>
                  <p style={{ float: "left" }}>{item[1]} &emsp;</p>
                  <p style={{ float: "left" }}>{item[0]}</p>
                </span>
              )
            }))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", width: "50%", marginLeft: "18%", borderTop: "1px solid #ddd" }}>
          <h3 style={{ width: "50%", float: "left", marginTop: "20px" }}>Servicios obligatorios o incluidos</h3>
          <div style={{ margin: "auto", display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: "20px" }}>
            {accommodation && accommodation["Features"]["HouseCharacteristics"] && (Object.entries(accommodation["Features"]["HouseCharacteristics"]).map((item) => {
              if (item && item[1] == true) return (
                <span style={{ marginLeft: "20px", display:"flex", flexDirection:"row" }}>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" style={{width:"15px", float:"left", color:"green", marginRight:"7px"}} viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg> */}
                  <p style={{ float: "left" }}>{item[0]} &emsp;</p>
                  {/* <p style={{ float: "left" }}>{item[1]}</p> */}
                </span>
              )
              // console.log("first--------------", item[1]==true);
            }))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", width: "50%", marginLeft: "18%", borderTop: "1px solid #ddd" }}>
          <h3 style={{ width: "50%", float: "left", marginTop: "20px" }}>Servicios opcionales</h3>
          <div style={{ margin: "auto", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", marginTop: "20px" }}>
            {accommodation && accommodation["Features"]["ExtrasAndServices"]["SpecialServices"] && (Object.values(accommodation["Features"]["ExtrasAndServices"]["SpecialServices"]["SpecialService"]).map((item) => {
              if (item["Application"] == "OPCIONAL" && item.Type) return (
                <span style={{ marginLeft: "20px" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" style={{width:"15px", float:"left", color:"green", marginRight:"7px", paddingTop:"3px"}} viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                  <p style={{ float: "left" }}>{item.Type}</p>
                </span>
              )
            }))}
          </div>
        </div>

        <div style={{ display: "flex", marginBottom:"20px", flexDirection: "column", justifyContent: "space-evenly", width: "50%", marginLeft: "18%", borderTop: "1px solid #ddd" }}>
          <h3 style={{ width: "50%", float: "left", marginTop: "20px" }}>Organiza tu horario</h3>
          <div style={{marginLeft:"20px", margin: "auto", display: "flex", flexDirection: "row", width: "100%", marginTop: "20px" }}>
            <div style={{
              display: "flex", flexDirection: "column", backgroundColor: "#ddd", width: "48%", textAlign: "center"
            }}>
              <p style={{ padding: "15px 50px 0px 50px" }}>Horario de entrada</p>
              <p style={{ color: "black", padding: "0px 50px 0px 50px" }}>Todos los días de 16:00 a 0:00</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", backgroundColor: "#ddd", width: "48%", borderLeft: "1px solid #ccc", textAlign: "center" }}>
              <p style={{ padding: "15px 50px 0px 50px" }}>Horario de salida</p>
              <p style={{ color: "black", padding: "0px 50px 0px 50px" }}>Antes de las 11:00</p>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px", justifyContent: "space-evenly", width: "50%", marginLeft: "18%", borderTop: "1px solid #ddd" }}>
          <h3 style={{ width: "50%", float: "left", marginTop: "20px" }}>Fianza (reembolsable)</h3>
          <div style={{ marginLeft:"20px", display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: "20px", marginBottom: "20px" }}>
            {/* {description && description["InternationalizedItem"] && (Object.values(description["InternationalizedItem"]).map((item) => {
              // if (item["Application"] == "OPCIONAL" && item.Type) return (
              //   <span>
              //     <svg style={{ width: "20px", height: "20px", marginRight: "10px", float: "left" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M88 216c81.7 10.2 273.7 102.3 304 232H0c99.5-8.1 184.5-137 88-232zm32-152c32.3 35.6 47.7 83.9 46.4 133.6C249.3 231.3 373.7 321.3 400 448h96C455.3 231.9 222.8 79.5 120 64z" /></svg>
              //     <p style={{ float: "left" }}>{item.Type}</p>
              //   </span>
              // )
              console.log("++++++++++++++", item["ExtrasSummary"]["ObligatoryOrIncluded"]["Extra"][2]["Description"][5]);
            }))} */}
            {description && description["InternationalizedItem"][0]["ExtrasSummary"]["ObligatoryOrIncluded"]["Extra"] && description["InternationalizedItem"][0]["ExtrasSummary"]["ObligatoryOrIncluded"]["Extra"][1] ? description["InternationalizedItem"][0]["ExtrasSummary"]["ObligatoryOrIncluded"]["Extra"][1]["Description"] : "Undefined"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", width: "50%", marginLeft: "18%", borderTop: "1px solid #ddd" }}>
          <h3 style={{ width: "50%", float: "left", marginTop: "20px" }}>Observaciones</h3>
          <div style={{ marginLeft: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", marginTop: "20px" }}>
            <p>- Este alquiler no acepta los grupos de jóvenes (Hasta 18 años)</p>
            <p>- No se permite fumar</p>
            <p>- En este alojamiento están admitidos los animales, salvo los de raza peligrosa. Admite animales de peso menor que 5Kg. - Alojamiento accesible.</p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", width: "50%", marginLeft: "18%", borderTop: "1px solid #ddd" }}>
          <h3 style={{ width: "50%", float: "left", marginTop: "20px" }}>Condiciones de reserva</h3>
          <div style={{ marginLeft: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", marginTop: "20px" }}>
            <p>Introduce las fechas para ver las políticas de cancelación</p>
          </div>
        </div>

        {/* <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", width: "50%", marginLeft: "18%", borderTop: "1px solid #ddd" }}>
          <h3 style={{ width: "50%", float: "left", marginTop: "20px" }}>Mapa y distancias</h3>
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
            </GoogleMapReact>
          </div>
        </div> */}

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", width: "50%", marginLeft: "18%", borderTop: "1px solid #ddd" }}>
          <h3 style={{ width: "50%",  float: "left", marginTop: "20px" }}>Calendario de disponibilidad</h3>
          {/* <DatePicker value={multiDataValue} multiple="true" onChange={setMultiDateValue} onlyMonthPicker sort
            plugins={[
              <DatePanel />
            ]} /> */}
          <Calendar
            value={value}
            onChange={setValue}
            style={{ marginLeft: "20px", marginBottom: "20px" }}
            range
            sort
            numberOfMonths={6}
            highlightToday={false}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", width: "50%", marginLeft: "18%", borderTop: "1px solid #ddd" }}>
          <h3 style={{ width: "50%", float: "left", marginTop: "20px" }}>Tarifas</h3>
          <div style={{ marginLeft: "20px", padding: "10px", border: "1px solid #ddd", backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", marginTop: "20px" }}>
            <div style={{ borderBottom: "2px solid #ccc", padding: "10px" }}><b>Fechas</b>&emsp;Precio(Semana) IVA Incluido</div>
            <div style={{ display: "flex", width: "100%", gap: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #ccc", padding: "10px", width: "50%" }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ border: "1px solid #19dc8d", color: '#19dc8d', padding: "5px 15px", borderRadius: "20px" }}>21/04/2024</div>
                  <div style={{ border: "1px solid #19dc8d", color: '#19dc8d', padding: "5px 15px", borderRadius: "20px" }}>09/05/2024</div>
                </div>
                <div><span style={{ fontWeight: "bold" }}>336$</span></div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #ccc", padding: "10px", width: "50%" }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ border: "1px solid #19dc8d", color: '#19dc8d', padding: "5px 15px", borderRadius: "20px" }}>21/04/2024</div>
                  <div style={{ border: "1px solid #19dc8d", color: '#19dc8d', padding: "5px 15px", borderRadius: "20px" }}>09/05/2024</div>
                </div>
                <div><span style={{ fontWeight: "bold" }}>336$</span></div>
              </div>
            </div>
          </div>
        </div>

        {/*brightstar booking*/}
        <BookingCardGroup />
      </div>
      {/* content close */}
      <a href="#" id="back-to-top" />
      {/* footer begin */}
      <footer
        id="colophon"
        className="site-footer footer-primary"
        style={{ backgroundColor: "white" }}
      >
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
                      <img
                        src="./images/happy (9).png"
                        alt=""
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "#156B7A",
                        }}
                      />
                    </li>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        border: "0px",
                        padding: "0px",
                      }}
                    >
                      <img
                        src="./images/happy (6).png"
                        alt=""
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "#156B7A",
                        }}
                      />
                    </li>
                    <li
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
                    </li>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        border: "0px",
                        padding: "0px",
                      }}
                    >
                      <img
                        src="./images/happy (8).png"
                        alt=""
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "#156B7A",
                        }}
                      />
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
      {/* footer close */}
    </div>
  );
}

export default CarSingle;
