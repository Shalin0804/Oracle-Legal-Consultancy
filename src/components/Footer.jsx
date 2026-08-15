import { Link } from "react-router-dom";
import { FiPhone, FiMail, FiMapPin, FiLinkedin, FiInstagram, FiFacebook } from "react-icons/fi";
import "./Footer.css";

const FOOTER_SERVICES = [
  { label: "Corporate Law", id: "corporate-business-law" },
  { label: "Civil Law", id: "civil-law" },
  { label: "Criminal Law", id: "criminal-law" },
  { label: "Property Law", id: "property-law" },
  { label: "Family Law", id: "family-law" },
  { label: "Employment Law", id: "employment-labour-law" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span className="footer__logo-mark">ORACLE</span>
            <span className="footer__logo-sub">Legal Consultancy</span>
          </Link>
          <p>
            Professional legal consultancy and advisory services for individuals,
            businesses and organizations.
          </p>
          <div className="footer__socials">
            <a href="#" aria-label="LinkedIn"><FiLinkedin aria-hidden="true" /></a>
            <a href="#" aria-label="Instagram"><FiInstagram aria-hidden="true" /></a>
            <a href="#" aria-label="Facebook"><FiFacebook aria-hidden="true" /></a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/team">Our Team</Link></li>
            <li><Link to="/about#approach">Our Approach</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Services</h4>
          <ul>
            {FOOTER_SERVICES.map(({ label, id }) => (
              <li key={id}>
                <Link to={`/services/${id}`}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/insights">Insights</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/consultation">Consultation</Link></li>
          </ul>
        </div>

        <div className="footer__col footer__col--contact">
          <h4>Contact</h4>
          <ul>
            <li className="footer__contact-item">
              <FiPhone aria-hidden="true" />
              <span>+91 XXXXX XXXXX</span>
            </li>
            <li className="footer__contact-item">
              <FiMail aria-hidden="true" />
              <span>info@oraclelegal.com</span>
            </li>
            <li className="footer__contact-item">
              <FiMapPin aria-hidden="true" />
              <span>India</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__disclaimer container">
        <p>
          Information provided on this website is for general informational purposes and
          does not constitute legal advice. No formal advisor-client relationship is
          established through this website, and a formal professional relationship should
          be established before relying on legal guidance for a specific matter.
        </p>
      </div>

      <div className="container footer__bottom">
        <p>&copy; {year} Oracle Legal Consultancy. All Rights Reserved.</p>
        <div className="footer__legal-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms &amp; Conditions</a>
          <a href="#disclaimer">Disclaimer</a>
          <Link to="/admin" className="footer__admin-link">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
