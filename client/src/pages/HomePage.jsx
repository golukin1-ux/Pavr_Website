import { Helmet } from 'react-helmet-async';
import HeroSection           from '../components/home/HeroSection';
import ServicesOverview      from '../components/home/ServicesOverview';
import CertificationsSection from '../components/home/CertificationsSection';
import StatsSection          from '../components/home/StatsSection';
import IndustriesServed      from '../components/home/IndustriesServed';
import PartnershipsSection   from '../components/home/PartnershipsSection';
import CTASection            from '../components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Pavr Tools & Technologies — Precision Injection Molding & Mold Manufacturing</title>
        <meta name="description" content="Precision molds and molded components, built in-house since 2009. Integrated tooling, scheduled supply. Serving battery, automotive, medical, and clean-energy manufacturers from Jhajjar, Haryana." />
      </Helmet>

      {/* Hero — capability + craft statement */}
      <HeroSection />

      {/* Partners / clients — social proof immediately after hero */}
      <PartnershipsSection />

      {/* Three capabilities */}
      <ServicesOverview />

      {/* Proof strip — certifications */}
      <CertificationsSection />

      {/* Experience stats */}
      <StatsSection />

      {/* Industries as capability depth */}
      <IndustriesServed />

      {/* Single CTA */}
      <CTASection />
    </>
  );
}
