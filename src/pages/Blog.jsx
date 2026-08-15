import { useMemo, useState } from "react";
import PageBanner from "../components/PageBanner.jsx";
import BlogCard from "../components/BlogCard.jsx";
import CtaBanner from "../components/CtaBanner.jsx";
import { blogs } from "../data/blogs.js";
import "./Blog.css";

export default function Blog() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(blogs.map((b) => b.category)))],
    []
  );
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? blogs : blogs.filter((b) => b.category === active);

  return (
    <>
      <PageBanner
        eyebrow="Legal Insights"
        title="Understanding the Law. Making Better Decisions."
        description="General guidance and commentary on legal topics that individuals and businesses commonly encounter."
        crumbs={[{ label: "Insights" }]}
      />

      <section className="section blog-page">
        <div className="container">
          <div className="blog-page__filters" role="tablist" aria-label="Filter insights by category">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active === cat}
                className={`blog-filter ${active === cat ? "blog-filter--active" : ""}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="blog-page__grid">
            {filtered.map((post, i) => (
              <BlogCard post={post} index={i} key={post.id} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Have a Question About Your Situation?"
        subheading="General articles only take you so far."
        text="For guidance specific to your circumstances, book a consultation with our team."
      />
    </>
  );
}
