import { Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import ServiceDetails from "./pages/ServiceDetails.jsx";
import Team from "./pages/Team.jsx";
import Blog from "./pages/Blog.jsx";
import BlogDetails from "./pages/BlogDetails.jsx";
import FAQ from "./pages/FAQ.jsx";
import Contact from "./pages/Contact.jsx";
import Consultation from "./pages/Consultation.jsx";
import Admin from "./pages/Admin.jsx";
import Vision from "./pages/Vision.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <header className="site-header">
        <TopBar />
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ServiceDetails />} />
          <Route path="/team" element={<Team />} />
          <Route path="/insights" element={<Blog />} />
          <Route path="/insights/:postId" element={<BlogDetails />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
