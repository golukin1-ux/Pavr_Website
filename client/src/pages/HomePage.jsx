import { Helmet } from 'react-helmet-async';
import HeroSection          from '../components/home/HeroSection';
import ServicesOverview     from '../components/home/ServicesOverview';
import StatsSection         from '../components/home/StatsSection';
import IndustriesServed     from '../components/home/IndustriesServed';
import PartnershipsSection  from '../components/home/PartnershipsSection';
import CertificationsSection from '../components/home/CertificationsSection';
import TestimonialsSection  from '../components/home/TestimonialsSection';
import CTASection           from '../components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Pavr Tools & Technologies — Injection Molding & Battery Components, Gurugram</title>
        <meta name="description" content="India's trusted manufacturer for precision injection molding, mold manufacturing, mold repair, and battery component assemblies. ISO certified. Based in Gurugram, Haryana." />
      </Helmet>

      <HeroSection />
      <ServicesOverview />
      <StatsSection />
      <IndustriesServed />
      <PartnershipsSection />
      <CertificationsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
