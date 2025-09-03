import React from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import MenuSection from '../components/Menu/MenuSection';
import CreativeBrunch from '../components/CreativeBrunch/CreativeBrunch';
import LocationSection from '../components/Location/LocationSection';
import ReservationSection from '../components/Reservation/ReservationSection';
import ValuesSection from '../components/Values/ValuesSection';
import TestimonialsSection from '../components/Testimonials/TestimonialsSection';
import Footer from '../components/Footer/Footer';

const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <MenuSection />
      <CreativeBrunch />
      <LocationSection />
      <ReservationSection />
      <ValuesSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
};

export default HomePage;