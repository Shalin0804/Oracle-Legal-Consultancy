import { motion } from "framer-motion";
import Button from "./Button.jsx";
import "./CtaBanner.css";

export default function CtaBanner({
  title = "Have a Legal Concern?",
  subheading = "Let\u2019s discuss your situation.",
  text = "Speak with our legal consultancy team and understand the appropriate next steps for your matter.",
  buttonLabel = "Schedule a Consultation",
  buttonTo = "/consultation",
}) {
  return (
    <section className="cta">
      <div className="container cta__inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2>{title}</h2>
          {subheading && <p className="cta__subheading">{subheading}</p>}
          <p className="cta__text">{text}</p>
          <Button to={buttonTo} variant="primary">
            {buttonLabel}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
