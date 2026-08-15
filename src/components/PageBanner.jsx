import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./PageBanner.css";

export default function PageBanner({ eyebrow, title, description, crumbs = [] }) {
  return (
    <section className="page-banner">
      <div className="container page-banner__inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
          {description && <p className="page-banner__desc">{description}</p>}
          {crumbs.length > 0 && (
            <nav className="page-banner__crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              {crumbs.map((c) => (
                <span key={c.label}>
                  <span aria-hidden="true"> / </span>
                  {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
                </span>
              ))}
            </nav>
          )}
        </motion.div>
      </div>
    </section>
  );
}
