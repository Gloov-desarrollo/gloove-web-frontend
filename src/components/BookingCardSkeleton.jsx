
import React from 'react';
import './../assets/css/booking/NewBooking.css';

const BookingCardSkeleton = () => {
  return (
    <div className="col-lg-6 mb-4">
      <div className="de-item booking-card h-100">
        <div className="skeleton skeleton-img"></div>
        <div className="card-body d-flex flex-column">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-button"></div>
        </div>
      </div>
    </div>
  );
};

export default BookingCardSkeleton;
