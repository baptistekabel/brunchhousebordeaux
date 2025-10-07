import React from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import MenuSection from '../components/Menu/MenuSection';
import CreativeBrunch from '../components/CreativeBrunch/CreativeBrunch';
import LocationSection from '../components/Location/LocationSection';
import ReservationSection from '../components/Reservation/ReservationSection';
import TestimonialsSection from '../components/Testimonials/TestimonialsSection';
import Footer from '../components/Footer/Footer';
import Banner from '../components/Banner/Banner';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { i18n } = useTranslation();

  const banners = {
    fr: [
      { text: "SAVEURS & CRÉATIVITÉ •", variant: "green" },
      { text: "BRUNCH CRÉATIF •", variant: "rose" },
      { text: "QUARTIER GARE SAINT-JEAN •", variant: "beige" },
      { text: "RÉSERVEZ & SAVOUREZ •", variant: "green" },
      { text: "MERCI POUR VOS SOURIRES •", variant: "beige" }
    ],
    en: [
      { text: "FLAVORS & CREATIVITY •", variant: "green" },
      { text: "CREATIVE BRUNCH •", variant: "rose" },
      { text: "GARE SAINT-JEAN DISTRICT •", variant: "beige" },
      { text: "BOOK & ENJOY •", variant: "green" },
      { text: "THANK YOU FOR YOUR SMILES •", variant: "beige" }
    ],
    es: [
      { text: "SABORES & CREATIVIDAD •", variant: "green" },
      { text: "BRUNCH CREATIVO •", variant: "rose" },
      { text: "BARRIO GARE SAINT-JEAN •", variant: "beige" },
      { text: "RESERVA & DISFRUTA •", variant: "green" },
      { text: "GRACIAS POR VUESTRAS SONRISAS •", variant: "beige" }
    ]
  };

  const currentBanners = banners[i18n.language] || banners.fr;

  return (
    <>
      <Header />
      <Hero />
      <Banner text={currentBanners[0].text} variant={currentBanners[0].variant} delay={0.1} />
      <MenuSection />
      <Banner text={currentBanners[1].text} variant={currentBanners[1].variant} delay={0.2} />
      <CreativeBrunch />
      <Banner text={currentBanners[2].text} variant={currentBanners[2].variant} delay={0.1} />
      <LocationSection />
      <Banner text={currentBanners[3].text} variant={currentBanners[3].variant} delay={0.2} />
      <ReservationSection />
      <Banner text={currentBanners[4].text} variant={currentBanners[4].variant} delay={0.1} />
      <TestimonialsSection />
      <Footer />
    </>
  );
};

export default HomePage;