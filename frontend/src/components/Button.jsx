import { NavLink } from "react-router-dom";

export default function Button({ to, type, children }) {
  return (
    <NavLink to={to} className={"ms-1 me-1 btn btn-" + type}>
      {children}
    </NavLink>
  );
}
