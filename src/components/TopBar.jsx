import { useEffect, useState } from "react";
import { FiPhone, FiMail, FiClock, FiLock } from "react-icons/fi";
import "./TopBar.css";

export default function TopBar() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const onScroll = () => setCollapsed(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`topbar ${collapsed ? "topbar--collapsed" : ""}`}>
      <div className="container topbar__inner">
        <div className="topbar__group">
          <a href="tel:+91XXXXXXXXXX" className="topbar__item">
            <FiPhone aria-hidden="true" />
            <span>+91 XXXXX XXXXX</span>
          </a>
          <a href="mailto:info@oraclelegal.com" className="topbar__item">
            <FiMail aria-hidden="true" />
            <span>info@oraclelegal.com</span>
          </a>
          <span className="topbar__item topbar__item--hours">
            <FiClock aria-hidden="true" />
            <span>Mon &ndash; Sat | 10:00 AM &ndash; 7:00 PM</span>
          </span>
        </div>
        <div className="topbar__confidential">
          <FiLock aria-hidden="true" />
          <span>Confidential Legal Consultation</span>
        </div>
      </div>
    </div>
  );
}
