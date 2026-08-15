import { motion } from "framer-motion";
import { FiLinkedin } from "react-icons/fi";
import "./TeamCard.css";

export default function TeamCard({ member, index = 0 }) {
  return (
    <motion.article
      className="team-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="team-card__image-wrap">
        <img src={member.image} alt={`Portrait placeholder for ${member.name}`} loading="lazy" />
        <a
          href={member.linkedin}
          className="team-card__linkedin"
          aria-label={`${member.name} on LinkedIn`}
        >
          <FiLinkedin aria-hidden="true" />
        </a>
      </div>
      <div className="team-card__body">
        <h3>{member.name}</h3>
        <span className="team-card__role">{member.role}</span>
        <span className="team-card__focus">{member.focus}</span>
        <p>{member.bio}</p>
      </div>
    </motion.article>
  );
}
