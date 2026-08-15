import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import PageBanner from "../components/PageBanner.jsx";
import CtaBanner from "../components/CtaBanner.jsx";
import BlogCard from "../components/BlogCard.jsx";
import Button from "../components/Button.jsx";
import { blogs, getBlogById } from "../data/blogs.js";
import "./BlogDetails.css";

export default function BlogDetails() {
  const { postId } = useParams();
  const post = getBlogById(postId);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Oracle Legal Consultancy`;
    }
  }, [post]);

  if (!post) {
    return (
      <>
        <PageBanner eyebrow="Legal Insights" title="Article Not Found" crumbs={[{ label: "Insights", to: "/insights" }]} />
        <section className="section">
          <div className="container service-missing">
            <p>We couldn&rsquo;t find the article you were looking for.</p>
            <Button to="/insights" variant="primary">
              View All Insights
            </Button>
          </div>
        </section>
      </>
    );
  }

  const related = blogs.filter((b) => b.id !== post.id).slice(0, 3);

  return (
    <>
      <PageBanner
        eyebrow={post.category}
        title={post.title}
        description={post.date}
        crumbs={[{ label: "Insights", to: "/insights" }, { label: post.title }]}
      />

      <section className="section blog-detail">
        <div className="container blog-detail__grid">
          <motion.article
            className="blog-detail__main"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="blog-detail__image doc-frame">
              <img src={post.image} alt={post.title} />
            </div>
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            <p className="blog-detail__disclaimer">
              This article is provided for general informational purposes and does
              not constitute legal advice. For guidance on a specific matter, please
              book a consultation with our team.
            </p>
            <Link to="/insights" className="btn-text blog-detail__back">
              <FiArrowLeft aria-hidden="true" /> Back to All Insights
            </Link>
          </motion.article>

          <aside className="blog-detail__sidebar">
            <div className="blog-detail__sidebar-cta">
              <h4>Discuss This Topic</h4>
              <p>Speak with our team about how this might apply to your situation.</p>
              <Button to="/consultation" variant="outline" className="blog-detail__sidebar-btn">
                Book a Consultation
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--tight related-insights">
        <div className="container">
          <h3 className="related-insights__heading">More Insights</h3>
          <div className="related-insights__grid">
            {related.map((p, i) => (
              <BlogCard post={p} index={i} key={p.id} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
