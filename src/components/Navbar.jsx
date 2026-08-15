import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import Button from "./Button.jsx";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Our Team", to: "/team" },
  { label: "Insights", to: "/insights" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
  { label: "Vision", to: "/vision" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={`navbar ${scrolled ? "navbar--solid" : "navbar--transparent"}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" aria-label="Oracle Legal Consultancy home">
          {/* <span className="navbar__logo-mark">ORACLE</span> */}
          {/* <span className="navbar__logo-sub">Legal Consultancy</span> */}
          <img src="src\assets\logo white.png" alt="" />
        </Link>

        <nav className="navbar__links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `navbar__link ${isActive ? "navbar__link--active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <Button to="/consultation" variant="primary" className="navbar__cta">
            Book Consultation
          </Button>
          <button
            type="button"
            className="navbar__hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.nav
              className="navbar__mobile-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Mobile"
            >
              <button
                type="button"
                className="navbar__mobile-close"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <FiX />
              </button>

              <ul className="navbar__mobile-list">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      className={({ isActive }) =>
                        `navbar__mobile-link ${
                          isActive ? "navbar__mobile-link--active" : ""
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <Button to="/consultation" variant="primary" className="navbar__mobile-cta">
                Book Consultation
              </Button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
