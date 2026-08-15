import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./BlogCard.css";

export default function BlogCard({ post, index = 0 }) {
  return (
    <motion.article
      className="blog-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/insights/${post.id}`} className="blog-card__image-link">
        <img src={post.image} alt={post.title} loading="lazy" />
      </Link>
      <div className="blog-card__body">
        <div className="blog-card__meta">
          <span className="blog-card__category">{post.category}</span>
          <span className="blog-card__date">{post.date}</span>
        </div>
        <h3>
          <Link to={`/insights/${post.id}`}>{post.title}</Link>
        </h3>
        <p>{post.excerpt}</p>
        <Link to={`/insights/${post.id}`} className="btn-text">
          Read Article <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </motion.article>
  );
}
