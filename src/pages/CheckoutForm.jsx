import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CheckoutForm = () => {
  const { state } = useLocation();
  const {
    id,
    adults,
    children,
    pickupDate,
    returnDate,
    cartItems = [],
  } = state || {};

  const [formData, setFormData] = useState({
    clientName: "",
    clientSurname: "",
    clientDni: "",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",
    clientCity: "",
    clientPostcode: "",
    clientCountry: "",
    clientLocality: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    // Validación de campos
    for (const key in formData) {
      if (!formData[key]?.trim()) {
        setError(`Por favor, rellena el campo: ${key}`);
        setLoading(false);
        return;
      }
    }

    // Formateo fechas
    const arrival_date = pickupDate
      ? new Date(pickupDate).toISOString().split("T")[0]
      : "";
    const departure_date = returnDate
      ? new Date(returnDate).toISOString().split("T")[0]
      : "";

    // Construcción del body según set-booking
    const params = {
      arrival_date,
      departure_date,
      accommodation_id: id,
      adults_number: adults,
      children_number: children,
      client_name: formData.clientName,
      client_surname: formData.clientSurname,
      client_dni: formData.clientDni,
      client_address: formData.clientAddress,
      client_locality: formData.clientLocality,
      client_postcode: formData.clientPostcode,
      client_city: formData.clientCity,
      client_country: formData.clientCountry,
      client_iso_country_code: "ES",
      client_phone: formData.clientPhone,
      client_phone2: "-",
      client_email: formData.clientEmail,
      client_fax: "-",
      client_language: "ES",
    };

    try {
      await axios.post(
        "https://gloove-api-avantio.onrender.com/set-booking",
        params
      );
      setSuccessMessage("Reserva confirmada con éxito.");
    } catch (err) {
      console.error(err);
      setError("Hubo un error al procesar la reserva. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal * 1.21;

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '50px' }}>
      <div className="row">
        <div className="col-md-7">
          <h2>Detalles del Cliente</h2>
          <hr/>
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="row">
              {/* Fila 1 */}
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="clientName">Nombre*</label>
                <input
                  id="clientName"
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="clientSurname">Apellido*</label>
                <input
                  id="clientSurname"
                  type="text"
                  name="clientSurname"
                  value={formData.clientSurname}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              {/* Fila 2 */}
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="clientDni">DNI*</label>
                <input
                  id="clientDni"
                  type="text"
                  name="clientDni"
                  value={formData.clientDni}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="clientEmail">Email*</label>
                <input
                  id="clientEmail"
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              {/* Fila 3 */}
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="clientPhone">Teléfono*</label>
                <input
                  id="clientPhone"
                  type="text"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="clientAddress">Dirección*</label>
                <input
                  id="clientAddress"
                  type="text"
                  name="clientAddress"
                  value={formData.clientAddress}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              {/* Fila 4 */}
              <div className="form-group col-md-4 mb-3">
                <label htmlFor="clientLocality">Localidad*</label>
                <input
                  id="clientLocality"
                  type="text"
                  name="clientLocality"
                  value={formData.clientLocality}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-4 mb-3">
                <label htmlFor="clientCity">Ciudad*</label>
                <input
                  id="clientCity"
                  type="text"
                  name="clientCity"
                  value={formData.clientCity}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-4 mb-3">
                <label htmlFor="clientPostcode">Código Postal*</label>
                <input
                  id="clientPostcode"
                  type="text"
                  name="clientPostcode"
                  value={formData.clientPostcode}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              {/* Fila 5 */}
              <div className="form-group col-md-12 mb-3">
                <label htmlFor="clientCountry">País*</label>
                <input
                  id="clientCountry"
                  type="text"
                  name="clientCountry"
                  value={formData.clientCountry}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn-main btn-fullwidth mt-3"
              disabled={loading}
              style={{ backgroundColor: '#156B7A', color: 'white' }}
            >
              {loading ? "Procesando..." : "Confirmar Reserva"}
            </button>
          </form>
        </div>

        <div className="col-md-5">
          <div className="order-summary" style={{ position: 'sticky', top: '100px' }}>
            <h3>Resumen de tu compra</h3>
            {cartItems.map(item => (
              <div key={item.cartId} className="summary-row">
                <span>{item.name} x {item.quantity}</span>
                <span>{(item.price * item.quantity).toFixed(2)} €</span>
              </div>
            ))}
            <hr/>
            <div className="summary-row total">
              <span>Total (Impuestos Incl.)</span>
              <span>{total.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;