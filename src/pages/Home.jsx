import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiLock,
  FiBookOpen,
  FiUsers,
  FiMessageSquare,
  FiArrowRight,
} from "react-icons/fi";
import Button from "../components/Button.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import BlogCard from "../components/BlogCard.jsx";
import CtaBanner from "../components/CtaBanner.jsx";
import { services } from "../data/services.js";
import { blogs } from "../data/blogs.js";
import { processSteps } from "../data/process.js";
import "./Home.css";

const TRUST_FEATURES = [
  {
    icon: FiLock,
    title: "Confidentiality",
    text: "Your legal matters are handled with discretion and professionalism.",
  },
  {
    icon: FiBookOpen,
    title: "Legal Expertise",
    text: "Focused guidance across important areas of law.",
  },
  {
    icon: FiUsers,
    title: "Client Focus",
    text: "Every matter begins with understanding the client's specific needs.",
  },
  {
    icon: FiMessageSquare,
    title: "Clear Communication",
    text: "Complex legal matters explained in a simple and understandable manner.",
  },
];

const WHY_FEATURES = [
  {
    number: "01",
    title: "Client First",
    text: "Every legal matter begins with understanding the client's objectives and concerns.",
  },
  {
    number: "02",
    title: "Clear Communication",
    text: "We explain legal matters in straightforward and understandable language.",
  },
  {
    number: "03",
    title: "Strategic Approach",
    text: "We evaluate circumstances carefully and identify practical legal options.",
  },
  {
    number: "04",
    title: "Professional & Confidential",
    text: "Client information and legal matters are handled with appropriate confidentiality.",
  },
];

const PROCESS_STEPS = processSteps;

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1800&auto=format&fit=crop"
            alt=""
          />
          <div className="hero__overlay" />
        </div>
        <div className="container hero__inner">
          <motion.div
            className="hero__content"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow">Trusted Legal Guidance</span>
            <h1 className="hero__title">
              Protecting Your Rights.
              <br />
              Strengthening Your Future.
            </h1>
            <p className="hero__desc">
              Professional legal consultancy and advisory services designed to help
              individuals, businesses and organizations navigate complex legal matters
              with clarity and confidence.
            </p>
            <div className="hero__actions">
              <Button to="/consultation" variant="primary">
                Book a Consultation
              </Button>
              <Button to="/services" variant="outline">
                Explore Our Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST */}
      <section className="section trust">
        <div className="container">
          <SectionHeading
            centered
            title="Professional Legal Solutions Built Around Your Needs"
          />
          <div className="trust__grid">
            {TRUST_FEATURES.map((f, i) => (
              <motion.div
                className="trust-card"
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="trust-card__icon">
                  <f.icon aria-hidden="true" />
                </span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section className="section section--tight practice">
        <div className="container">
          <SectionHeading
            centered
            eyebrow="Our Practice Areas"
            title="Comprehensive Legal Solutions for Every Need"
          />
          <div className="practice__grid">
            {services.map((s, i) => (
              <ServiceCard service={s} index={i} key={s.id} />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section about-split">
        <div className="container about-split__grid">
          <motion.div
            className="about-split__image doc-frame"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=1200&auto=format&fit=crop"
              alt="Legal consultant reviewing documents at a desk"
            />
          </motion.div>
          <motion.div
            className="about-split__content"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <span className="eyebrow">About Oracle Legal Consultancy</span>
            <h2>Legal Counsel. Strategic Thinking. Client-Centered Solutions.</h2>
            <p>
              Oracle Legal Consultancy provides professional legal guidance designed
              around the specific circumstances of every client. Our approach combines
              careful legal analysis, practical thinking and clear communication to
              help clients understand their options and make informed decisions.
            </p>
            <Link to="/about" className="btn-text">
              Discover Our Approach <FiArrowRight aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section section--navy why">
        <div className="container">
          <SectionHeading centered eyebrow="Why Clients Choose Us" title="Considered Guidance, Every Step of the Way" />
          <div className="why__grid">
            {WHY_FEATURES.map((f, i) => (
              <motion.div
                className="why-card"
                key={f.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="why-card__number">{f.number}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section process">
        <div className="container">
          <SectionHeading centered eyebrow="How It Works" title="A Clear Path From Concern to Resolution" />
          <div className="process__row">
            {PROCESS_STEPS.map((s, i) => (
              <motion.div
                className="process-step"
                key={s.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="process-step__number">{s.number}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                {i < PROCESS_STEPS.length - 1 && (
                  <span className="process-step__line" aria-hidden="true" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBanner />

      {/* INSIGHTS */}
      <section className="section section--tight insights-teaser">
        <div className="container">
          <SectionHeading
            centered
            eyebrow="Legal Insights"
            title="Understanding the Law. Making Better Decisions."
          />
          <div className="insights-teaser__grid">
            {blogs.slice(0, 3).map((post, i) => (
              <BlogCard post={post} index={i} key={post.id} />
            ))}
          </div>
          <div className="insights-teaser__more">
            <Link to="/insights" className="btn-text">
              View All Insights <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
