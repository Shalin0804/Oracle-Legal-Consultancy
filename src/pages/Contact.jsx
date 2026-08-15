import { useState } from "react";
import { FiPhone, FiMail, FiMapPin, FiClock, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import PageBanner from "../components/PageBanner.jsx";
import { services } from "../data/services.js";
import "./Contact.css";

const CONTACT_METHODS = ["Phone", "Email", "WhatsApp"];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  service: "",
  contactMethod: "Phone",
  message: "",
};

export default function Contact() {
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
    if (!form.message.trim()) next.message = "Please share a brief message.";
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
        eyebrow="Contact Us"
        title="Get In Touch"
        description="Have a legal question? We're here to understand your concern and help you identify the appropriate next step."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="section contact-page">
        <div className="container contact-page__grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow">Get In Touch</span>
            <h2>We&rsquo;re Here to Help</h2>
            <p className="contact-info__desc">
              Have a legal question? We&rsquo;re here to understand your concern and
              help you identify the appropriate next step.
            </p>

            <ul className="contact-info__list">
              <li>
                <span className="contact-info__icon"><FiPhone aria-hidden="true" /></span>
                <div>
                  <span className="contact-info__label">Phone</span>
                  <a href="tel:+91XXXXXXXXXX">+91 XXXXX XXXXX</a>
                </div>
              </li>
              <li>
                <span className="contact-info__icon"><FiMail aria-hidden="true" /></span>
                <div>
                  <span className="contact-info__label">Email</span>
                  <a href="mailto:info@oraclelegal.com">info@oraclelegal.com</a>
                </div>
              </li>
              <li>
                <span className="contact-info__icon"><FiMapPin aria-hidden="true" /></span>
                <div>
                  <span className="contact-info__label">Location</span>
                  <span>India</span>
                </div>
              </li>
              <li>
                <span className="contact-info__icon"><FiClock aria-hidden="true" /></span>
                <div>
                  <span className="contact-info__label">Working Hours</span>
                  <span>Monday &ndash; Saturday, 10:00 AM &ndash; 7:00 PM</span>
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            {submitted ? (
              <div className="contact-form__success">
                <FiCheckCircle aria-hidden="true" />
                <h3>Request Received</h3>
                <p>
                  Thank you for reaching out. Our team will get back to you during
                  working hours using your preferred contact method.
                </p>
                <button type="button" className="btn btn-outline" onClick={() => setSubmitted(false)}>
                  Send Another Request
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form__row">
                  <div className="field">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={update("name")}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && <span className="field__error" id="name-error">{errors.name}</span>}
                  </div>
                  <div className="field">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone && <span className="field__error" id="phone-error">{errors.phone}</span>}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && <span className="field__error" id="email-error">{errors.email}</span>}
                </div>

                <div className="contact-form__row">
                  <div className="field">
                    <label htmlFor="service">Service / Practice Area</label>
                    <select
                      id="service"
                      value={form.service}
                      onChange={update("service")}
                      aria-invalid={!!errors.service}
                      aria-describedby={errors.service ? "service-error" : undefined}
                    >
                      <option value="">Select a practice area</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                    </select>
                    {errors.service && <span className="field__error" id="service-error">{errors.service}</span>}
                  </div>
                  <div className="field">
                    <label htmlFor="contactMethod">Preferred Contact Method</label>
                    <select id="contactMethod" value={form.contactMethod} onChange={update("contactMethod")}>
                      {CONTACT_METHODS.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={update("message")}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && <span className="field__error" id="message-error">{errors.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary contact-form__submit">
                  Request Consultation
                </button>
                <p className="contact-form__disclaimer">
                  Submitting this form does not create an advisor-client relationship.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
