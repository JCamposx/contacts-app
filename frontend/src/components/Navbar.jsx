import { NavLink } from "react-router-dom";
import routes from "../routes/routes";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to={routes.home}>
          <img
            src="/images/logo.png"
            alt="Logo"
            width="24"
            height="24"
            className="d-inline-block"
            style={{ marginInlineEnd: "5px" }}
          />
          Contacts App
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to={routes.contacts.base}>
                My contacts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={routes.contacts.create}>
                New contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
