import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CheckCircle, Award, Target, Eye, Heart } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import CTASection from '../components/home/CTASection';
import { team } from '../data/team';
import { certifications } from '../data/certifications';

const milestones = [
  { year: '2010', title: 'Founded', desc: 'As AVR Tools and Technologies established in Gurugram with a focus on precision injection mold manufacturing — the foundation of what is today Pavr Tools & Technologies.' },
  { year: '2012', title: 'ISO 9001 Certified', desc: 'Achieved ISO 9001:2008 certification, marking our commitment to quality management systems.' },
  { year: '2015', title: 'Expanded Production', desc: 'Doubled production capacity with 15 new injection molding machines and 3 production lines.' },
  { year: '2018', title: 'Battery Division Launch', desc: 'Launched dedicated battery component manufacturing division, entering the EV and energy storage market.' },
  { year: '2020', title: 'New Plant Setup', desc: 'Set up a new manufacturing plant in Sarai Alawardi, Gurugram (Gurgaon), Haryana — 122017, expanding production capacity.' },
  { year: '2025', title: 'Relocation & Rebrand', desc: 'Relocated the entire operation to Reliance MET City, Jhajjar and officially rebranded as Pavr Tools & Technologies Private Limited.' },
  { year: '2026', title: 'IATF Certification', desc: 'Pursuing IATF 16949 certification to qualify for global automotive OEM supply chains — a key milestone ahead.' },
];

const values = [
  { icon: Target,      title: 'Precision First',    desc: 'We hold ourselves to tolerances other manufacturers avoid. Every part ships to spec, every time.' },
  { icon: Heart,       title: 'Customer Obsessed',  desc: "DFM reviews, 24-hour repair turnarounds, and engineers on call — we're invested in your success." },
  { icon: CheckCircle, title: 'Quality Certified',  desc: "ISO 9001, IATF 16949, and UL compliance aren't checkboxes — they're operating standards." },
];

const accentMap = {
  'from-blue-600 to-blue-800':     'bg-blue-50 text-blue-600',
  'from-amber-600 to-orange-700':  'bg-amber-50 text-amber-600',
  'from-green-600 to-green-800':   'bg-emerald-50 text-emerald-600',
  'from-purple-600 to-purple-800': 'bg-violet-50 text-violet-600',
};

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us — Pavr Tools & Technologies</title>
        <meta name="description" content="Originally founded in 2010 as AVR Tools and Technologies in Gurugram, now Pavr Tools & Technologies. Learn about our story, team, and commitment to quality." />
      </Helmet>

      {/* Hero */}
      <section className="pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 lg:pb-32 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <span className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-copper-400 mb-6">
              <span className="w-8 h-px bg-copper-500" />
              Our Story
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-5 max-w-3xl leading-[1.05]">About Pavr</h1>
            <p className="text-stone-400 text-lg max-w-2xl leading-relaxed">
              Originally founded in 2010 as AVR Tools and Technologies in Gurugram, Haryana — we rebranded to Pavr Tools & Technologies as we grew from a focused mold shop into a full-scale manufacturing operation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Who We Are" title="Purpose-driven manufacturing" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            {[
              { icon: Target, title: 'Our Mission',  text: "To deliver precision-engineered components and innovative battery solutions that power India's manufacturing and clean energy transformation." },
              { icon: Eye,    title: 'Our Vision',   text: 'To be the most trusted name in advanced manufacturing — where cutting-edge battery technology meets world-class injection molding expertise.' },
              { icon: Heart,  title: 'Our Values',   text: "Precision. Accountability. Innovation. Customer obsession. We build long-term partnerships, not transactional vendor relationships." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 bg-stone-50 rounded-lg border border-stone-200 hover:border-copper-300 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-lg bg-copper-50 flex items-center justify-center mb-5">
                  <item.icon size={20} className="text-copper-500" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl text-stone-700 mb-3">{item.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-4 p-5 rounded-lg bg-stone-50 border border-stone-100"
              >
                <div className="w-9 h-9 rounded-md bg-sage-50 flex items-center justify-center flex-shrink-0">
                  <val.icon size={16} className="text-sage-500" />
                </div>
                <div>
                  <p className="text-stone-700 font-semibold text-sm mb-1">{val.title}</p>
                  <p className="text-stone-400 text-sm leading-relaxed">{val.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-20 lg:py-24 bg-stone-50">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Our Journey" title="From AVR to Pavr — built on precision since 2010" />

          <div className="relative">
            <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-stone-200 -translate-x-px" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className={`flex gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-12 md:pl-0`}>
                    <div className="bg-white border border-stone-200 rounded-lg p-6 hover:border-copper-300 hover:shadow-card transition-all duration-300">
                      <span className="font-mono text-sm text-copper-500 font-medium">{m.year}</span>
                      <h3 className="font-display text-lg text-stone-700 mt-1 mb-2">{m.title}</h3>
                      <p className="text-stone-400 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-[19px] md:left-1/2 w-3 h-3 rounded-full bg-copper-500 border-[3px] border-stone-50 -translate-x-1/2 flex-shrink-0 z-10" />
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Leadership Team" title="The people behind Pavr" subtitle="Our team combines decades of manufacturing experience with a passion for precision engineering." />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="p-6 bg-stone-50 border border-stone-200 hover:border-copper-300 rounded-lg transition-all duration-300 hover:shadow-card"
              >
                <div className="w-12 h-12 rounded-lg bg-copper-500 flex items-center justify-center text-white font-display text-lg mb-4">
                  {member.initials}
                </div>
                <h3 className="text-stone-700 font-semibold">{member.name}</h3>
                <p className="text-copper-500 text-sm font-medium mb-2">{member.title}</p>
                <p className="text-stone-400 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 sm:py-20 lg:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Quality Standards" title="Certifications & compliance" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {certifications.map((cert, i) => {
              const accent = accentMap[cert.color] || 'bg-stone-100 text-stone-600';
              return (
                <motion.div
                  key={cert.code}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-6 bg-white border border-stone-200 rounded-lg hover:border-copper-300 hover:shadow-card transition-all duration-300 text-center"
                >
                  <div className={`w-14 h-14 rounded-xl ${accent} flex items-center justify-center mx-auto mb-4`}>
                    <Award size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-mono text-sm text-copper-600 font-medium mb-1">{cert.code}</h3>
                  <p className="font-display text-lg text-stone-700 mb-2">{cert.title}</p>
                  <p className="text-stone-400 text-sm leading-relaxed">{cert.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
