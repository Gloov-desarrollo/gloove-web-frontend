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
        <div className="tour-page-container">
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
