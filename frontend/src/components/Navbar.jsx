import { AuthContext } from "@/context/AuthContext";
import { routes } from "@/routes/routes";
import axios from "axios";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleLogout() {
    axios
      .post(
        routes.api.auth.logout,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then(() => {
        localStorage.removeItem("user");
        setUser(null);
        navigate(routes.auth.login);
      })
      .catch((e) => console.log(e));
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
      <div className="container">
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
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to={routes.contacts.index}>
                    My contacts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={routes.contacts.create}>
                    New contact
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" onClick={handleLogout}>
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to={routes.auth.login}>
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={routes.auth.register}>
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
