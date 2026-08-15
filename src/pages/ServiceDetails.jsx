import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import PageBanner from "../components/PageBanner.jsx";
import CtaBanner from "../components/CtaBanner.jsx";
import Button from "../components/Button.jsx";
import { services, getServiceById } from "../data/services.js";
import "./ServiceDetails.css";

export default function ServiceDetails() {
  const { serviceId } = useParams();
  const service = getServiceById(serviceId);

  useEffect(() => {
    if (service) {
      document.title = `${service.title} | Oracle Legal Consultancy`;
    }
  }, [service]);

  if (!service) {
    return (
      <>
        <PageBanner eyebrow="Practice Areas" title="Service Not Found" crumbs={[{ label: "Services", to: "/services" }]} />
        <section className="section">
          <div className="container service-missing">
            <p>We couldn&rsquo;t find the practice area you were looking for.</p>
            <Button to="/services" variant="primary">
              View All Services
            </Button>
          </div>
        </section>
      </>
    );
  }

  const otherServices = services.filter((s) => s.id !== service.id);

  return (
    <>
      <PageBanner
        eyebrow={`Practice Area ${service.number}`}
        title={service.title}
        description={service.short}
        crumbs={[{ label: "Services", to: "/services" }, { label: service.title }]}
      />

      <section className="section service-detail">
        <div className="container service-detail__grid">
          <motion.div
            className="service-detail__main"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow">Overview</span>
            <h2>{service.title}</h2>
            <p className="service-detail__summary">{service.summary}</p>

            <h3 className="service-detail__subhead">What This Covers</h3>
            <ul className="service-detail__list">
              {service.coverage.map((item) => (
                <li key={item}>
                  <FiCheck aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="service-detail__note">
              Every matter is different. Specific guidance is provided only after
              understanding the particular facts and circumstances of your situation
              &mdash; the information above is general in nature and does not
              constitute legal advice.
            </p>

            <Button to="/consultation" variant="primary">
              Discuss This Matter
            </Button>
          </motion.div>

          <aside className="service-detail__sidebar">
            <div className="service-detail__sidebar-card">
              <h4>Other Practice Areas</h4>
              <ul>
                {otherServices.map((s) => (
                  <li key={s.id}>
                    <Link to={`/services/${s.id}`}>
                      <span>{s.title}</span>
                      <FiArrowRight aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="service-detail__sidebar-cta">
              <h4>Have a Question?</h4>
              <p>Speak with our team to understand your options.</p>
              <Button to="/contact" variant="outline" className="service-detail__sidebar-btn">
                Contact Us
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
