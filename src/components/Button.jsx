import { Link } from "react-router-dom";

/**
 * Reusable button/link. Renders a <Link> when `to` is provided,
 * otherwise a native <button>.
 */
export default function Button({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
  ...rest
}) {
  const classes = `btn btn-${variant} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  );
}
