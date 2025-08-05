import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { experienceCategories } from '../mock-data/experiences';
import './../assets/css/booking/Tour.css';

const ExperienceCard = ({ experience }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/experience/${experience.id}`);
    };

    return (
        <div className="experience-card" onClick={handleClick}>
            <img src={experience.image} alt={experience.title} />
            <div className="overlay">
                <h4>{experience.title}</h4>
            </div>
        </div>
    );
};

const ExperienceRow = ({ category, experiences }) => {
    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 1200 }, items: 4 },
        desktop: { breakpoint: { max: 1200, min: 992 }, items: 3 },
        tablet: { breakpoint: { max: 992, min: 576 }, items: 2 },
        mobile: { breakpoint: { max: 576, min: 0 }, items: 1 },
    };

    return (
        <div className="experience-row">
            <h2>{category}</h2>
            <Carousel responsive={responsive} infinite={false} slidesToSlide={1}>
                {experiences.map(exp => (
                    <ExperienceCard key={exp.id} experience={exp} />
                ))}
            </Carousel>
        </div>
    );
};

function Tour() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(experienceCategories);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredData(experienceCategories);
        } else {
            const lowercasedFilter = searchTerm.toLowerCase();
            const filtered = experienceCategories.map(category => {
                const filteredExperiences = category.experiences.filter(exp =>
                    exp.title.toLowerCase().includes(lowercasedFilter)
                );
                return { ...category, experiences: filteredExperiences };
            }).filter(category => category.experiences.length > 0);
            
            setFilteredData(filtered);
        }
    }, [searchTerm]);

  return (
    <div className="home">
      {/* <div id="siteLoader" className="site-loader">
         <div className="preloader-content">
            <img src="./images/loader1.gif" alt="" />
         </div>
      </div> */}
      <div id="page" className="full-page">
        <Header />
        <main id="content" className="site-main" style={{ padding: "0px" }}>
          {/* <!-- Home slider html start brightstar --> */}
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
                        <h2
                          className="banner-title"
                        >
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
                        <h2
                          className="banner-title"
                        >
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
                className="gloove-social-networks"
                style={{
                  position: "absolute",
                  transform: "translate(-50%, -50%)",
                  top: "50%",
                  right: "0%",
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
          {/* <!-- slider html start --> */}
          {/* <!-- Home search field html start --> */}
          <div
            className="trip-search-section shape-search-section"
            style={{ padding: "0px" }}
          >
            <div className="slider-shape" style={{marginTop: "-110px"}}></div>
            <div className="container">
                <div className="tour-header">
                    <h1>Descubre Experiencias Únicas</h1>
                    <div className="search-bar-container">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Busca una experiencia (ej. Kayak, Tapas, Masaje...)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {filteredData.length > 0 ? (
                    filteredData.map((category, index) => (
                        <ExperienceRow
                            key={index}
                            category={category.category}
                            experiences={category.experiences}
                        />
                    ))
                ) : (
                    <div className="text-center">
                        <p>No se encontraron experiencias para "{searchTerm}".</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Tour;
