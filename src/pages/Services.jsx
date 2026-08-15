import PageBanner from "../components/PageBanner.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import CtaBanner from "../components/CtaBanner.jsx";
import { services } from "../data/services.js";
import "./Services.css";

export default function Services() {
  return (
    <>
      <PageBanner
        eyebrow="Practice Areas"
        title="Our Legal Services"
        description="Comprehensive legal solutions covering the matters individuals and businesses most commonly need guidance on."
        crumbs={[{ label: "Services" }]}
      />

      <section className="section services-page">
        <div className="container">
          <SectionHeading
            centered
            eyebrow="Practice Areas"
            title="Comprehensive Legal Solutions for Every Need"
            description="Each area below reflects a distinct field of practice. Select one to learn more about how we can help with a specific matter."
          />
          <div className="services-page__grid">
            {services.map((s, i) => (
              <ServiceCard service={s} index={i} key={s.id} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Not Sure Which Service You Need?"
        subheading="We can help you work that out."
        text="Share a brief outline of your situation and we will point you toward the right starting point."
      />
    </>
  );
}
