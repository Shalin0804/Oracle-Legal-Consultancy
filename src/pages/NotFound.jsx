import Button from "../components/Button.jsx";
import "./NotFound.css";

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="container notfound__inner">
        <span className="eyebrow">Error 404</span>
        <h1>Page Not Found</h1>
        <p>The page you are looking for may have been moved or no longer exists.</p>
        <Button to="/" variant="primary">
          Return to Home
        </Button>
      </div>
    </section>
  );
}
