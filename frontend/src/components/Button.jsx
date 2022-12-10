import { NavLink } from "react-router-dom";

export default function Button({ to, type, submit, children }) {
  return (
    <>
      {submit ? (
        <button className={`ms-1 me-1 btn btn-${type}`} type="submit">
          {children}
        </button>
      ) : (
        <NavLink to={to} className={`ms-1 me-1 btn btn-${type}`}>
          {children}
        </NavLink>
      )}
    </>
  );
}
