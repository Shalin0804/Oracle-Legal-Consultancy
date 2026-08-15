import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiClock,
  FiMessageSquare,
  FiStar,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { animate, createScope } from "animejs";

import { getVisionMessages } from "../lib/visionStore.js";
import "./Vision.css";

export default function Vision() {
  const root = useRef(null);
  const animeScope = useRef(null);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
   * ---------------------------------------------------------
   * LOAD OWNER MESSAGES
   * ---------------------------------------------------------
   */
  useEffect(() => {
    let mounted = true;

    async function loadMessages() {
      try {
        setLoading(true);
        setError("");

        const data = await getVisionMessages();

        if (mounted) {
          setMessages(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Vision API error:", err);

        if (mounted) {
          setError(
            "Unable to load the latest vision messages. Please try again."
          );
          setMessages([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadMessages();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * ANIME.JS
   * ---------------------------------------------------------
   */
  useEffect(() => {
    if (!root.current) return;

    animeScope.current = createScope({
      root,
      mediaQueries: {
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
    }).add((self) => {
      const reduceMotion = self.matches.reduceMotion;

      /*
       * Hero entrance
       */
      if (!reduceMotion) {
        animate(".vision-orbit", {
          rotate: 360,
          duration: 18000,
          loop: true,
          ease: "linear",
        });

        animate(".vision-orbit-inner", {
          rotate: -360,
          duration: 12000,
          loop: true,
          ease: "linear",
        });

        animate(".vision-glow", {
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.65, 0.35],
          duration: 3000,
          loop: true,
          ease: "inOut(2)",
        });

        animate(".vision-dot", {
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
          duration: 1800,
          loop: true,
          ease: "inOut(2)",
        });

        animate(".vision-message-card", {
          translateY: [25, 0],
          opacity: [0, 1],
          delay: 200,
          duration: 900,
          ease: "out(4)",
        });
      }

      /*
       * Floating decorative elements
       */
      if (!reduceMotion) {
        animate(".vision-floating", {
          translateY: [-8, 8],
          duration: 2200,
          loop: true,
          alternate: true,
          ease: "inOut(2)",
        });
      }
    });

    return () => {
      if (animeScope.current) {
        animeScope.current.revert();
        animeScope.current = null;
      }
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * MESSAGE CARD ANIMATION
   * ---------------------------------------------------------
   */
  const handleCardEnter = (event) => {
    const card = event.currentTarget;

    animate(card, {
      translateY: -6,
      scale: 1.01,
      duration: 350,
      ease: "out(3)",
    });
  };

  const handleCardLeave = (event) => {
    const card = event.currentTarget;

    animate(card, {
      translateY: 0,
      scale: 1,
      duration: 450,
      ease: "out(3)",
    });
  };

  /*
   * ---------------------------------------------------------
   * DATE FORMATTER
   * ---------------------------------------------------------
   */
  const formatDate = (date) => {
    if (!date) return "";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "";
    }

    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <main ref={root} className="vision-page">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="vision-hero">
        <div className="vision-orbit" aria-hidden="true" />
        <div className="vision-orbit-inner" aria-hidden="true" />
        <div className="vision-glow" aria-hidden="true" />
        <div className="vision-dot" aria-hidden="true" />

        <div className="container vision-hero-container">
          <motion.div
            className="vision-hero-content"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">OUR VISION</span>

            <h1>
              Building a Future
              <span> Driven by Trust &amp; Excellence</span>
            </h1>

            <p>
              Discover the vision and thoughts shared by the leadership of
              Oracle Legal Consultancy.
            </p>

            <div className="vision-hero-meta">
              <span>
                <FiMessageSquare />
                Owner's Messages
              </span>

              <span>
                <FiClock />
                Updated Regularly
              </span>
            </div>
          </motion.div>

          <div className="vision-floating">
            <FiStar />
          </div>
        </div>
      </section>

      {/* =====================================================
          OWNER MESSAGES
      ====================================================== */}
      <section className="vision-messages section-padding">
        <div className="container">
          <div className="section-heading center">
            <span className="section-label">FROM OUR LEADERSHIP</span>

            <h2>
              Our Vision,
              <span> In Their Words</span>
            </h2>

            <p>
              Every message published by the leadership of Oracle Legal
              Consultancy is preserved here as part of our journey.
            </p>
          </div>

          {loading && (
            <div className="vision-loading">
              <div className="vision-loader" />
              <p>Loading vision messages...</p>
            </div>
          )}

          {!loading && error && (
            <div className="vision-error">
              <h3>Unable to load messages</h3>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && messages.length === 0 && (
            <div className="vision-empty">
              <div className="vision-empty-icon">
                <FiMessageSquare />
              </div>

              <h3>No messages published yet</h3>

              <p>
                The website owner has not published a vision message yet.
              </p>
            </div>
          )}

          {!loading && !error && messages.length > 0 && (
            <div className="vision-message-list">
              {messages.map((message, index) => {
                const publishedDate =
                  message.createdAt || message.created_at || message.created;

                return (
                  <motion.article
                    key={message.id}
                    className={`vision-message-card ${index === 0 ? "vision-message-card--latest" : ""}`}
                    initial={{ opacity: 0, y: 45 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{
                      duration: 0.7,
                      delay: Math.min(index * 0.08, 0.35),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onMouseEnter={handleCardEnter}
                    onMouseLeave={handleCardLeave}
                  >
                    <div className="vision-message-card__glow" aria-hidden="true" />

                    <div className="vision-message-topline">
                      <div className="vision-message-index">
                        <span>{String(messages.length - index).padStart(2, "0")}</span>
                        <i />
                      </div>

                      <div className="vision-message-badge">
                        {index === 0 ? "Latest Message" : "Vision Journal"}
                      </div>
                    </div>

                    <div className="vision-message-main">
                      <div className="vision-message-quote" aria-hidden="true">
                        “
                      </div>

                      <div className="vision-message-content">
                        <div className="vision-message-meta">
                          <span className="vision-message-date">
                            <FiClock />
                            {formatDate(publishedDate) || "Published recently"}
                          </span>
                          <span className="vision-message-meta-dot" />
                          <span>Oracle Legal Consultancy</span>
                        </div>

                        {message.heading && <h3>{message.heading}</h3>}

                        <div className="vision-message-body">
                          {String(message.body || "")
                            .split("\n")
                            .filter((paragraph) => paragraph.trim())
                            .map((paragraph, paragraphIndex) => (
                              <p key={paragraphIndex}>{paragraph}</p>
                            ))}
                        </div>

                        <div className="vision-message-signature">
                          <span className="vision-message-signature-line" />
                          <span>Leadership • Oracle Legal Consultancy</span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          FUTURE SECTION
      ====================================================== */}
      <section className="future-section section-padding">
        <div className="container">
          <div className="future-card">
            <div>
              <span className="section-label">LOOKING AHEAD</span>

              <h2>
                Building the Future of
                <span> Modern Legal Consultancy</span>
              </h2>

              <p>
                We believe legal consultancy should be more than simply
                responding to problems. It should help individuals,
                entrepreneurs and businesses make confident decisions about
                the future.
              </p>

              <p>
                Through professional knowledge, ethical practice, technology
                and meaningful client relationships, Oracle Legal Consultancy
                aims to continuously raise the standard of legal service.
              </p>
            </div>

            <div className="future-icon">
              <span className="future-icon-ring">
                <FiArrowRight />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="vision-cta section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">LET'S MOVE FORWARD</span>

            <h2>
              Your Future Deserves
              <br />
              the Right Legal Strategy.
            </h2>

            <p>
              Speak with our team and discover how we can help you navigate
              your legal journey with confidence.
            </p>

            <Link to="/contact" className="vision-btn">
              Start a Conversation
              <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}