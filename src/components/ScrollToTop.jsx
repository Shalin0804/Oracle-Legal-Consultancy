import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls to the top of the page on route change, or to the element
 *  matching the URL hash (e.g. /about#vision) when one is present. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      // Wait a tick for the new page's content to mount before measuring.
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        window.scrollTo({ top: 0, left: 0 });
      }, 60);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, hash]);

  return null;
}
