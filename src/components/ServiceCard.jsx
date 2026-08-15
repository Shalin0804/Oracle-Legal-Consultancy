import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiUsers,
  FiHome,
  FiFileText,
  FiEdit3,
} from "react-icons/fi";
import { BsHandThumbsUp } from "react-icons/bs";
import { FaBalanceScale } from "react-icons/fa";
import { GiGavel } from "react-icons/gi";

const ICONS = {
  briefcase: FiBriefcase,
  scale: FaBalanceScale,
  gavel: GiGavel,
  home: FiHome,
  users: FiUsers,
  handshake: BsHandThumbsUp,
  contract: FiFileText,
  signature: FiEdit3,
};

export default function ServiceCard({ service, index = 0 }) {
  const Icon = ICONS[service.icon] || FiFileText;

  return (
    <motion.article
      className="service-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="service-card__top">
        <span className="service-card__number">{service.number}</span>
        <span className="service-card__icon">
          <Icon aria-hidden="true" />
        </span>
      </div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.short}</p>
      <Link to={`/services/${service.id}`} className="btn-text service-card__link">
        Learn More <span aria-hidden="true">&rarr;</span>
      </Link>
    </motion.article>
  );
}
