import React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from "pages/Home";
import About from "pages/About";
import Tour from "pages/Tour";
import TourCart from "pages/TourCart";
import TourBooking from "pages/TourBooking";
import TourConfirm from "pages/TourConfirm";
import NotFound from "pages/NotFound";
import Layout from "layout/Layout";
import Landing from 'pages/Landing';
import Booking from 'pages/Booking';
import CheckoutForm from 'pages/CheckoutForm';
import AccommodationDetails from 'pages/AccommodationDetails';
import ShoppingCart from 'pages/ShoppingCart';
import PaymentPage from 'pages/PaymentPage';
import ExperienceDetails from 'pages/ExperienceDetails';
import InvestmentPage from 'pages/InvestmentPage';
import PropertyDetailsPage from 'pages/PropertyDetailsPage';
import ContactPage from 'pages/Contact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="tour" element={<Tour />} />
        <Route path="tour-cart" element={<TourCart />} />
        <Route path="booking" element={<Booking />} />
        <Route path="checkout" element={<CheckoutForm />} />
        <Route path="accommodation/:id" element={<AccommodationDetails />} />
        <Route path="experience/:id" element={<ExperienceDetails />} />
        <Route path="investment" element={<InvestmentPage />} />
        <Route path="investment/:id" element={<PropertyDetailsPage />} />
        <Route path="tour-booking" element={<TourBooking />} />
        <Route path="tour-confirm" element={<TourConfirm />} />
        <Route path="cart" element={<ShoppingCart />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
