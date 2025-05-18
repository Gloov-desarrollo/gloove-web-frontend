import React, { useEffect, useRef, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./../assets/css/booking/bootstrap.min.css";
import "./../assets/css/booking/mdb.min.css";
import "./../assets/css/booking/plugins.css";
import "./../assets/css/booking/style.css";
import "./../assets/css/booking/coloring.css";
import "./../assets/css/booking/colors/scheme-01.css";
import { getAccomodations } from "apis/apis";

function BookingCardGroup() {
  const navigate = useNavigate();
  const [accommodations, setAccommodations] = useState(null);
  const carouselRef = useRef(null);

  // Función para obtener la lista de propiedades mínimas y luego sus detalles
  const fetchAccommodations = async () => {
    try {
      // Primero obtenemos la lista de propiedades (se asume que retorna al menos un campo "id")
      const listResponse = await getAccomodations();
      const list = listResponse.data; // Array con propiedades mínimas

      // Para cada propiedad, obtenemos los detalles usando el endpoint detallado
      const detailedList = await Promise.all(
        list.map(item =>
          axios
            .get(`https://gloove-api-avantio-4gf3.onrender.com/accommodations-add/${item.id}`)
            .then(res => res.data)
            .catch(err => {
              console.error("Error fetching detail for id", item.id, err);
              return null;
            })
        )
      );
      // Filtrar las propiedades que se pudieron obtener correctamente
      setAccommodations(detailedList.filter(item => item !== null));
    } catch (err) {
      console.error("Error fetching accommodations:", err);
    }
  };

  useEffect(() => {
    fetchAccommodations();
  }, []);

  // Funciones para navegar en el Carousel
  const goToPrevSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.previous();
    }
  };

  const goToNextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const responsive2 = {
    desktop: {
      breakpoint: { max: 3000, min: 2180 },
      items: 5,
      slidesToSlide: 1,
    },
    laptop1: {
      breakpoint: { max: 2180, min: 1780 },
      items: 4,
      slidesToSlide: 1,
    },
    laptop2: {
      breakpoint: { max: 1780, min: 1380 },
      items: 3,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 1380, min: 980 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile1: {
      breakpoint: { max: 980, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <section
      id="section-cards"
      style={{
        margin: "auto",
        height: "fit-content",
        position: "relative",
      }}
    >
      <button
        onClick={goToPrevSlide}
        style={{
          position: "absolute",
          transform: "translate(0%, -50%) scaleY(1.5)",
          top: "50%",
          left: "-80px",
          borderRadius: "100px",
          width: "50px",
          height: "50px",
          backgroundColor: "initial",
          border: "0px",
          color: "white",
          fontSize: "50px",
        }}
      >
        <span className="custom-arrow" style={{ color: "#aaaaaa" }}>
          &#11164;
        </span>
      </button>
      <button
        onClick={goToNextSlide}
        style={{
          position: "absolute",
          transform: "translate(0%, -50%) scaleY(1.5)",
          top: "50%",
          right: "-80px",
          borderRadius: "100px",
          width: "50px",
          height: "50px",
          backgroundColor: "initial",
          border: "0px",
          color: "white",
          fontSize: "50px",
        }}
      >
        <span className="custom-arrow" style={{ color: "#aaaaaa" }}>
          &#11166;
        </span>
      </button>
      {accommodations ? (
        <Carousel
          responsive={responsive2}
          showDots={true}
          infinite={true}
          arrows={false}
          autoPlay={true}
          autoPlaySpeed={5000}
          dotListClass="custom-dot-list-style"
          slidesToSlide={1}
          ref={carouselRef}
          style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {accommodations.map((accom, index) => {
            // Extraer la descripción en español de la galería
            const descObj = accom.gallery?.data?.description;
            const descriptionHTML =
              descObj && Array.isArray(descObj)
                ? descObj.find((d) => d.language === "es_ES")?.text
                : "";
            return (
              <div
                key={accom.id} // Usar id como key única
                style={{
                  width: "350px",
                  height: "550px",
                  border: "1px solid black",
                  borderRadius: "10px",
                  padding: "20px 5px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#dddddd",
                  margin: "auto",
                }}
              >
                <img
                  src={
                    accom.gallery?.data?.images && accom.gallery.data.images.length > 0
                      ? accom.gallery.data.images[0].url
                      : ""
                  }
                  style={{
                    width: "100%",
                    height: "200px",
                    borderRadius: "10px",
                  }}
                  alt="card img"
                />
                <p
                  style={{
                    fontSize: "16px",
                    color: "#522D3C",
                    margin: "10px",
                    fontWeight: "1000",
                    letterSpacing: "1px",
                    lineHeight: "18px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {accom.data?.name || ""}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "95%",
                    gap: "16px",
                  }}
                >
                  {/* Para evitar nesting warnings, usamos un div en lugar de <p> */}
                  <div
                    dangerouslySetInnerHTML={{ __html: descriptionHTML }}
                    style={{
                      fontSize: "15px",
                      color: "black",
                      fontWeight: "600",
                      margin: "0px",
                      lineHeight: "20px",
                      width: "100%",
                      overflowY: "auto",
                      height: "100px",
                    }}
                  />
                </div>
                <div style={{ display: "flex", margin: "10px" }}>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "black",
                      margin: "2px 25px",
                      fontWeight: "600",
                    }}
                  >
                    View Details &gt;
                  </p>
                </div>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#156B7A",
                    margin: "0px 5px 10px",
                    fontWeight: "1000",
                  }}
                >
                  o cajea por 50 Gloove point
                </p>
                <button
                  onClick={() => navigate(`/car-single/${accom.id}`)}
                  style={{
                    width: "200px",
                    height: "50px",
                    backgroundColor: "#156B7A",
                    border: "0px",
                    borderRadius: "50px",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  AÑADIR A MI VIAJE
                </button>
              </div>
            );
          })}
        </Carousel>
      ) : (
        <div>Cargando propiedades...</div>
      )}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <button
          style={{
            width: "210px",
            height: "35px",
            margin: "20px",
            border: "3px solid #156B7A",
            borderRadius: "50px",
            backgroundColor: "#dddddd",
            color: "#156B7A",
            fontWeight: "900",
          }}
        >
          IR A EXPERIENCIAS
        </button>
      </div>
    </section>
  );
}

export default BookingCardGroup;