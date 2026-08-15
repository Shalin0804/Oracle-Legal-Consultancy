import { motion } from "framer-motion";
import { FiSearch, FiCompass, FiFileText, FiLifeBuoy } from "react-icons/fi";
import PageBanner from "../components/PageBanner.jsx";
import CtaBanner from "../components/CtaBanner.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import "./About.css";

const APPROACH_STEPS = [
  {
    icon: FiSearch,
    title: "Understand",
    text: "We start by listening carefully to the facts and objectives behind a matter, before forming a view on the appropriate direction.",
  },
  {
    icon: FiCompass,
    title: "Advise",
    text: "We set out the realistic legal options available, explained in plain language, so a client can make an informed decision.",
  },
  {
    icon: FiFileText,
    title: "Structure",
    text: "Where documentation or formal steps are required, we prepare and structure them carefully to reflect the client's position.",
  },
  {
    icon: FiLifeBuoy,
    title: "Support",
    text: "We remain available as a matter progresses, so a client is never left without guidance at an important step.",
  },
];

export default function About() {
  return (
    <>
      <PageBanner
        eyebrow="About Us"
        title="Legal Guidance Rooted in Clarity"
        description="A closer look at Oracle Legal Consultancy and the approach we bring to every client relationship."
        crumbs={[{ label: "About" }]}
      />

      <section className="section about-intro">
        <div className="container about-intro__grid">
          <motion.div
            className="about-intro__image doc-frame"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop"
              alt="Modern legal office interior"
            />
          </motion.div>
          <motion.div
            className="about-intro__content"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <span className="eyebrow">Who We Are</span>
            <h2>Legal Counsel. Strategic Thinking. Client-Centered Solutions.</h2>
            <p>
              Oracle Legal Consultancy provides professional legal guidance designed
              around the specific circumstances of every client. Our approach combines
              careful legal analysis, practical thinking and clear communication to
              help clients understand their options and make informed decisions.
            </p>
            <p>
              We work with individuals, businesses and organizations across a range of
              legal matters, from routine documentation to more complex disputes.
              In every engagement, our focus stays on giving clients a clear
              understanding of where they stand and what their options are.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="approach" className="section section--tight approach">
        <div className="container">
          <SectionHeading
            centered
            eyebrow="Our Approach"
            title="How We Work With Clients"
            description="A considered process designed to keep clients informed from the first conversation to the resolution of a matter."
          />
          <div className="approach__list">
            {APPROACH_STEPS.map((step, i) => (
              <motion.div
                className="approach-row"
                key={step.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="approach-row__index">0{i + 1}</span>
                <span className="approach-row__icon">
                  <step.icon aria-hidden="true" />
                </span>
                <div className="approach-row__body">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Want to Know More?"
        subheading="We're glad to answer your questions."
        text="Reach out to discuss your matter, or book a consultation to speak with our team directly."
      />
    </>
  );
}
