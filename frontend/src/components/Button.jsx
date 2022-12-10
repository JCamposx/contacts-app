import { Link } from "react-router-dom";

export default function Button({ to, type, submit, customClass, children }) {
  return (
    <>
      {submit ? (
        <button className={`btn btn-${type} ${customClass}`} type="submit">
          {children}
        </button>
      ) : (
        <Link to={to} className={`btn btn-${type} ${customClass}`}>
          {children}
        </Link>
      )}
    </>
  );
}
