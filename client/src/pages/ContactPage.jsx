import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import ContactForm from '../components/contact/ContactForm';

const offices = [
  {
    title: 'Manufacturing Plant & HQ',
    address: 'Plot No. 12B, Sector 7B, Reliance MET City,\nSondhi, Jhajjar – 124103, Haryana, India',
    phone: '+91 74287 66242',
    email: 'pavrtoolsandtechnologies@gmail.com',
    hours: 'Mon–Sat: 8:00 AM – 7:00 PM',
  },
];

function InfoItem({ icon: Icon, label, value, href }) {
  const content = href
    ? <a href={href} className="text-stone-600 hover:text-copper-500 text-sm transition-colors">{value}</a>
    : <p className="text-stone-600 text-sm whitespace-pre-line">{value}</p>;
  return (
    <div className="flex gap-3">
      <div className="w-9 h-9 rounded-md bg-copper-50 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon size={15} className="text-copper-500" />
      </div>
      <div>
        <p className="text-stone-400 text-xs font-mono uppercase tracking-wider mb-0.5">{label}</p>
        {content}
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us — Pavr Tools & Technologies</title>
        <meta name="description" content="Contact Pavr for injection molding, mold manufacturing, mold repair, or battery component inquiries." />
      </Helmet>

      {/* Hero */}
      <section className="pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 lg:pb-32 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <span className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-copper-400 mb-6">
              <span className="w-8 h-px bg-copper-500" />
              Get in Touch
            </span>
            <h1 className="font-display text-4xl md:text-5xl text-white mb-5">Contact Us</h1>
            <p className="text-stone-400 text-lg max-w-2xl leading-relaxed">
              Ready to start your project? Our engineers respond within 24 hours. We offer free DFM reviews for new inquiries.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 bg-white border border-stone-200 rounded-xl p-7 md:p-10"
            >
              <h2 className="font-display text-2xl text-stone-700 mb-2">Send us a message</h2>
              <p className="text-stone-400 text-sm mb-8">Fill in the details and our team will get back to you shortly.</p>
              <ContactForm />
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 space-y-5"
            >
              {offices.map((office) => (
                <div key={office.title} className="bg-white border border-stone-200 rounded-xl p-6">
                  <h3 className="text-stone-700 font-semibold mb-5">{office.title}</h3>
                  <div className="space-y-4">
                    <InfoItem icon={MapPin} label="Address"  value={office.address} />
                    <InfoItem icon={Phone}  label="Phone"    value={office.phone}   href={`tel:${office.phone}`} />
                    <InfoItem icon={Mail}   label="Email"    value={office.email}   href={`mailto:${office.email}`} />
                    <InfoItem icon={Clock}  label="Hours"    value={office.hours} />
                  </div>
                </div>
              ))}

              {/* WhatsApp */}
              <a
                href="https://wa.me/917428766242"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-5 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 rounded-xl transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <MessageCircle size={18} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-stone-700 font-semibold text-sm">Chat on WhatsApp</p>
                  <p className="text-stone-400 text-xs">Quick responses during business hours</p>
                </div>
              </a>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 rounded-xl overflow-hidden border border-stone-200 h-80"
          >
            <iframe
              title="Pavr Tools & Technologies Location"
              src="https://maps.google.com/maps?q=28.504361,76.782337&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
          {/* Map link fallback */}
          <div className="mt-3 text-center">
            <a
              href="https://maps.google.com/?q=28.504361,76.782337"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-copper-500 text-sm hover:text-copper-600 transition-colors font-medium"
            >
              <MapPin size={13} />
              Plot No. 12B, Sector 7B, Reliance MET City, Sondhi, Jhajjar – 124103 · Open in Google Maps →
            </a>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/917428766242"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} className="text-white" />
      </a>
    </>
  );
}
