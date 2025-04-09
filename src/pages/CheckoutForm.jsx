import React, { useEffect, useState } from "react";
import Footer from "components/Footer";
import Header from "components/Header";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CheckoutForm = () => {
  const { state } = useLocation();
  const { id, accommodation, adults, children, pickupDate, pickupTime, returnDate, returnTime } = state;

  useEffect(() => {
    console.log("Accommodation ID: ", id);
    console.log("Accommodation", accommodation);
  }, [accommodation]);
  
  const [formData, setFormData] = useState({
    arrivalDate: pickupDate,
    departureDate: returnDate,
    accommodationId: id,
    adultsNumber: adults,
    clientName: "",
    clientSurname: "",
    clientDni: "",
    clientAddress: "",
    clientLocality: "",
    clientPostcode: "",
    clientCity: "",
    clientCountry: "",
    clientIsoCountryCode: "ES",
    clientPhone: "",
    clientPhone2: "",
    clientEmail: "",
    clientFax: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    // Formateamos las fechas al formato "YYYY-MM-DD"
    const formattedArrivalDate = formData.arrivalDate
      ? new Date(formData.arrivalDate).toISOString().split("T")[0]
      : "";
    const formattedDepartureDate = formData.departureDate
      ? new Date(formData.departureDate).toISOString().split("T")[0]
      : "";

    // Actualizamos el body para enviar las llaves según lo requiere la API
    const params = {
        arrival_date: formattedArrivalDate,
        departure_date: formattedDepartureDate,
        accommodation_id: id,
        adults_number: formData.adultsNumber,
        client_name: formData.clientName,
        client_surname: formData.clientSurname,
        client_dni: formData.clientDni,
        client_address: formData.clientAddress,
        client_locality: formData.clientLocality,
        client_postcode: formData.clientPostcode,
        client_city: formData.clientCity,
        client_country: formData.clientCountry,
        client_iso_country_code: formData.clientIsoCountryCode,
        client_phone: formData.clientPhone,
        client_phone2: formData.clientPhone2 || "-",
        client_email: formData.clientEmail,
        client_fax: formData.clientFax || "-",
        client_language: "ES",
    };

    console.log("Body a enviar", params);

    // Descomentar para enviar la reserva a la API
    try {
      console.log("Llega aca ", params)
      const response = await axios.post("http://localhost:5001/set-booking", params);
      // setSuccessMessage("Reserva confirmada con éxito.");
      console.log(response.data);
    } catch (err) {
      setError("Hubo un error al procesar la reserva. Intenta nuevamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-form">
      <Header />
      <div className="container">
        <h2>Confirmar Reserva</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <form onSubmit={handleSubmit} className="booking-form">
          {/* Contenedor principal en dos columnas */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {/* Columna Izquierda: Información de la Reserva (solo lectura) */}
            <fieldset className="reservation-info">
              <legend style={{ paddingBottom: "20px" }}>Información de la Reserva</legend>
              <div className="form-group">
                <label htmlFor="accommodationName">Alojamiento:</label>
                <input
                  id="accommodationName"
                  type="text"
                  value={accommodation.name}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="adults">Adultos:</label>
                <input id="adults" type="number" value={adults} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="children">Niños:</label>
                <input id="children" type="number" value={children} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="pickupDateTime">Ingreso:</label>
                <input
                  id="pickupDateTime"
                  type="text"
                  value={`${pickupDate ? new Date(pickupDate).toLocaleString() : ""} ${pickupTime}`}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="returnDateTime">Salida:</label>
                <input
                  id="returnDateTime"
                  type="text"
                  value={`${returnDate ? new Date(returnDate).toLocaleString() : ""} ${returnTime}`}
                  readOnly
                />
              </div>
            </fieldset>

            {/* Columna Derecha: Información del Cliente */}
            <fieldset className="client-info">
              <legend style={{ paddingBottom: "20px" }}>Información del Cliente</legend>
              <div className="form-group">
                <label htmlFor="clientName">Nombre:</label>
                <input
                  id="clientName"
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="clientSurname">Apellido:</label>
                <input
                  id="clientSurname"
                  type="text"
                  name="clientSurname"
                  value={formData.clientSurname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="clientDni">DNI:</label>
                <input
                  id="clientDni"
                  type="text"
                  name="clientDni"
                  value={formData.clientDni}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="clientAddress">Dirección:</label>
                <input
                  id="clientAddress"
                  type="text"
                  name="clientAddress"
                  value={formData.clientAddress}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="clientLocality">Localidad:</label>
                <input
                  id="clientLocality"
                  type="text"
                  name="clientLocality"
                  value={formData.clientLocality}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="clientPostcode">Código Postal:</label>
                <input
                  id="clientPostcode"
                  type="text"
                  name="clientPostcode"
                  value={formData.clientPostcode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="clientCity">Ciudad:</label>
                <input
                  id="clientCity"
                  type="text"
                  name="clientCity"
                  value={formData.clientCity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="clientCountry">País:</label>
                <input
                  id="clientCountry"
                  type="text"
                  name="clientCountry"
                  value={formData.clientCountry}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="clientPhone">Teléfono:</label>
                <input
                  id="clientPhone"
                  type="text"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="clientPhone2">Teléfono 2 (opcional):</label>
                <input
                  id="clientPhone2"
                  type="text"
                  name="clientPhone2"
                  value={formData.clientPhone2}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="clientEmail">Email:</label>
                <input
                  id="clientEmail"
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  required
                />
              </div>
            </fieldset>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Confirmar Reserva"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutForm;
