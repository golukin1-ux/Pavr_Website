import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../../utils/api';

const services = [
  { value: 'general-inquiry',    label: 'General Inquiry' },
  { value: 'injection-molding',  label: 'Injection Moulding' },
  { value: 'mold-manufacturing', label: 'Mould Manufacturing' },
  { value: 'battery-components', label: 'Battery Components' },
];

const initialForm = { name: '', email: '', phone: '', company: '', service: 'general-inquiry', message: '' };

// `children` is a render prop: it receives the ids this field owns so the
// control can point at its own label, hint and error message.
function Field({ id, label, required, error, hint, children }) {
  const errorId = `${id}-error`;
  const hintId  = `${id}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-stone-600 mb-1.5">
        {label}{' '}
        {required && (
          <span className="text-copper-600" aria-hidden="true">*</span>
        )}
        {required && <span className="sr-only">(required)</span>}
      </label>
      {children({ id, describedBy, invalid: Boolean(error) })}
      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            key="error"
            id={errorId}
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-red-500 text-xs mt-1.5"
          >
            {error}
          </motion.p>
        ) : hint ? (
          <p key="hint" id={hintId} className="text-stone-500 text-xs mt-1.5">{hint}</p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function ContactForm() {
  const [form, setForm]     = useState(initialForm);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const formRef    = useRef(null);
  const successRef = useRef(null);

  const inputClass = (field) =>
    `w-full bg-stone-50 border ${
      errors[field] ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-stone-200 focus:border-copper-500 focus:ring-copper-500/10'
    } focus:ring-2 rounded-lg px-4 py-3 text-stone-700 placeholder-stone-300 text-sm outline-none transition-all duration-200`;

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name = 'Name is required';
    if (!form.email.trim())   e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim()) return; // only validate filled fields on blur
    const partial = {};
    if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) partial.email = 'Enter a valid email';
    if (name === 'message' && value.trim().length < 10) partial.message = 'Message must be at least 10 characters';
    if (Object.keys(partial).length) setErrors(er => ({ ...er, ...partial }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      // Send focus to the first field that failed — otherwise a keyboard or
      // screen-reader user gets no indication the submit did anything.
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus('loading');
    try {
      await api.post('/contact', form);
      setStatus('success');
      setForm(initialForm);
    } catch {
      setStatus('error');
    }
  };

  // Move focus to the confirmation so the outcome is announced, not just drawn.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          ref={successRef}
          tabIndex={-1}
          role="status"
          className="flex flex-col items-center justify-center py-16 text-center outline-none"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
            className="w-14 h-14 rounded-full bg-sage-50 flex items-center justify-center mb-5"
          >
            <CheckCircle size={28} className="text-sage-500" />
          </motion.div>
          <h3 className="font-display text-xl text-stone-700 mb-2">Message Sent</h3>
          <p className="text-stone-500 mb-6">Thank you for reaching out. Our team will respond within 24 hours.</p>
          <button
            onClick={() => setStatus(null)}
            className="text-copper-600 text-sm font-medium hover:text-copper-600 transition-colors underline underline-offset-4"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          aria-busy={status === 'loading'}
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field id="contact-name" label="Full Name" required error={errors.name}>
              {({ id, describedBy, invalid }) => (
                <input
                  id={id} name="name" value={form.name} onChange={handleChange} onBlur={handleBlur}
                  placeholder="Rajesh Kumar" className={inputClass('name')}
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={invalid || undefined}
                  aria-describedby={describedBy}
                />
              )}
            </Field>
            <Field id="contact-email" label="Email Address" required error={errors.email} hint="We'll reply within 24 hours">
              {({ id, describedBy, invalid }) => (
                <input
                  id={id} name="email" type="email" value={form.email} onChange={handleChange} onBlur={handleBlur}
                  placeholder="rajesh@company.com" className={inputClass('email')}
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={invalid || undefined}
                  aria-describedby={describedBy}
                />
              )}
            </Field>
            <Field id="contact-phone" label="Phone Number" hint="Optional — for urgent follow-ups">
              {({ id, describedBy }) => (
                <input
                  id={id} name="phone" value={form.phone} onChange={handleChange}
                  placeholder="+91 98765 43210" className={inputClass('phone')}
                  autoComplete="tel" type="tel"
                  aria-describedby={describedBy}
                />
              )}
            </Field>
            <Field id="contact-company" label="Company Name">
              {({ id, describedBy }) => (
                <input
                  id={id} name="company" value={form.company} onChange={handleChange}
                  placeholder="Your Company Pvt Ltd" className={inputClass('company')}
                  autoComplete="organization"
                  aria-describedby={describedBy}
                />
              )}
            </Field>
          </div>

          <Field id="contact-service" label="Service of Interest" hint="Select the service closest to your requirement">
            {({ id, describedBy }) => (
              <select
                id={id} name="service" value={form.service} onChange={handleChange}
                className={`${inputClass('service')} cursor-pointer`}
                aria-describedby={describedBy}
              >
                {services.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            )}
          </Field>

          <Field id="contact-message" label="Message" required error={errors.message} hint="Include materials, quantities, and timeline if known">
            {({ id, describedBy, invalid }) => (
              <textarea
                id={id} name="message" value={form.message} onChange={handleChange} onBlur={handleBlur}
                placeholder="Tell us about your project — materials, quantities, timeline..."
                rows={5} className={`${inputClass('message')} resize-none`}
                aria-required="true"
                aria-invalid={invalid || undefined}
                aria-describedby={describedBy}
              />
            )}
          </Field>

          <AnimatePresence>
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                role="alert"
                className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
              >
                <AlertCircle size={15} />
                Failed to send. Please try again or call us directly.
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={status === 'loading'}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-copper-600 hover:bg-copper-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-[15px] rounded-lg transition-colors duration-200"
          >
            {status === 'loading' ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending…
              </>
            ) : (
              <><Send size={15} /> Talk to Our Expert</>
            )}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
