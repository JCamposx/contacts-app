import { Link } from "react-router-dom";

export default function Button({
  to,
  type,
  link,
  customClass,
  onClick,
  children,
}) {
  return (
    <>
      {link ? (
        <Link to={to} className={`btn btn-${type} ${customClass}`}>
          {children}
        </Link>
      ) : (
        <button className={`btn btn-${type} ${customClass}`} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
}
