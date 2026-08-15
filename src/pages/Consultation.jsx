import { useState } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import PageBanner from "../components/PageBanner.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { services } from "../data/services.js";
import { processSteps } from "../data/process.js";
import "./Consultation.css";

const TIME_SLOTS = ["Morning (10 AM - 1 PM)", "Afternoon (1 PM - 4 PM)", "Evening (4 PM - 7 PM)"];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  service: "",
  mode: "In-Person",
  timeSlot: "",
  message: "",
};

export default function Consultation() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your full name.";
    if (!form.phone.trim()) next.phone = "Please enter a phone number.";
    else if (!/^[+\d][\d\s-]{7,15}$/.test(form.phone.trim()))
      next.phone = "Please enter a valid phone number.";
    if (!form.email.trim()) next.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!form.service) next.service = "Please select a practice area.";
    if (!form.timeSlot) next.timeSlot = "Please select a preferred time.";
    if (!form.message.trim()) next.message = "Please share a brief outline of your matter.";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSubmitted(true);
      setForm(initialForm);
    }
  };

  return (
    <>
      <PageBanner
        eyebrow="Book a Consultation"
        title="Schedule Your Legal Consultation"
        description="Share a few details about your situation and preferred timing, and our team will confirm your consultation."
        crumbs={[{ label: "Consultation" }]}
      />

      <section className="section section--tight consultation-process">
        <div className="container">
          <SectionHeading centered eyebrow="How It Works" title="What Happens Next" />
          <div className="consultation-process__row">
            {processSteps.map((s, i) => (
              <motion.div
                className="consultation-process__step"
                key={s.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span>{s.number}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section consultation-page">
        <div className="container consultation-page__wrap">
          <motion.div
            className="consultation-form-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {submitted ? (
              <div className="contact-form__success">
                <FiCheckCircle aria-hidden="true" />
                <h3>Consultation Requested</h3>
                <p>
                  Thank you. We have received your request and will confirm your
                  consultation slot shortly during working hours.
                </p>
                <button type="button" className="btn btn-outline" onClick={() => setSubmitted(false)}>
                  Book Another Consultation
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form__row">
                  <div className="field">
                    <label htmlFor="c-name">Full Name</label>
                    <input
                      id="c-name"
                      type="text"
                      value={form.name}
                      onChange={update("name")}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <span className="field__error">{errors.name}</span>}
                  </div>
                  <div className="field">
                    <label htmlFor="c-phone">Phone Number</label>
                    <input
                      id="c-phone"
                      type="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && <span className="field__error">{errors.phone}</span>}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="c-email">Email</label>
                  <input
                    id="c-email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <span className="field__error">{errors.email}</span>}
                </div>

                <div className="contact-form__row">
                  <div className="field">
                    <label htmlFor="c-service">Service / Practice Area</label>
                    <select
                      id="c-service"
                      value={form.service}
                      onChange={update("service")}
                      aria-invalid={!!errors.service}
                    >
                      <option value="">Select a practice area</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                    </select>
                    {errors.service && <span className="field__error">{errors.service}</span>}
                  </div>
                  <div className="field">
                    <label htmlFor="c-mode">Consultation Mode</label>
                    <select id="c-mode" value={form.mode} onChange={update("mode")}>
                      <option value="In-Person">In-Person</option>
                      <option value="Online">Online</option>
                      <option value="Phone">Phone Call</option>
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="c-time">Preferred Time</label>
                  <select
                    id="c-time"
                    value={form.timeSlot}
                    onChange={update("timeSlot")}
                    aria-invalid={!!errors.timeSlot}
                  >
                    <option value="">Select a preferred time</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {errors.timeSlot && <span className="field__error">{errors.timeSlot}</span>}
                </div>

                <div className="field">
                  <label htmlFor="c-message">Briefly Describe Your Matter</label>
                  <textarea
                    id="c-message"
                    rows={5}
                    value={form.message}
                    onChange={update("message")}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <span className="field__error">{errors.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary contact-form__submit">
                  Schedule Consultation
                </button>
                <p className="contact-form__disclaimer">
                  Submitting this form does not create an advisor-client relationship.
                  Consultation charges, where applicable, are discussed and confirmed
                  before any engagement begins.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
