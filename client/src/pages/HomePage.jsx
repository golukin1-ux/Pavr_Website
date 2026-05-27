import { Helmet } from 'react-helmet-async';
import HeroSection           from '../components/home/HeroSection';
import ServicesOverview      from '../components/home/ServicesOverview';
import MidCTASection         from '../components/home/MidCTASection';
import WhyPavrSection        from '../components/home/WhyPavrSection';
import ProcessFlowSection    from '../components/home/ProcessFlowSection';
import CertificationsSection from '../components/home/CertificationsSection';
import StatsSection          from '../components/home/StatsSection';
import IndustriesServed      from '../components/home/IndustriesServed';
import AboutSummary          from '../components/home/AboutSummary';
import PartnershipsSection   from '../components/home/PartnershipsSection';
import CTASection            from '../components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Pavr Tools & Technologies — Precision Injection Moulding & Mould Manufacturing</title>
        <meta name="description" content="Precision moulds and moulded components, built in-house since 2009. Helping manufacturers reduce cost, improve quality, and scale production from Jhajjar, Haryana." />
      </Helmet>

      {/* Hero — top-of-funnel: positioning + value hook */}
      <HeroSection />

      {/* Partners / clients — social proof immediately after hero */}
      <PartnershipsSection />

      {/* Solutions block — what we do, mapped to client benefits */}
      <ServicesOverview />

      {/* Mid-funnel CTA — after the user understands what we do */}
      <MidCTASection />

      {/* Why PAVR — 4 pillars */}
      <WhyPavrSection />

      {/* Process Flow — DFM → Delivery */}
      <ProcessFlowSection />

      {/* Results & Numbers — hard data */}
      <StatsSection />

      {/* Industries as capability depth */}
      <IndustriesServed />

      {/* Homepage About block — who we are + journey */}
      <AboutSummary />

      {/* Proof strip — certifications */}
      <CertificationsSection />

      {/* Bottom CTA — decision-time */}
      <CTASection />
    </>
  );
}
