import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}) {
  return (
    <motion.div
      className={`section-heading ${centered ? "centered" : ""}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {eyebrow && (
        <span className={`eyebrow ${centered ? "eyebrow--center" : ""}`}>
          {eyebrow}
        </span>
      )}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </motion.div>
  );
}
