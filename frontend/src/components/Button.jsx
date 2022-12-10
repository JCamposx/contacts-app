import { Link } from "react-router-dom";

export default function Button({ to, type, link, customClass, children }) {
  return (
    <>
      {link ? (
        <Link to={to} className={`btn btn-${type} ${customClass}`}>
          {children}
        </Link>
      ) : (
        <button className={`btn btn-${type} ${customClass}`}>
          {children}
        </button>
      )}
    </>
  );
}
