import { NavLink } from "react-router-dom";
import Card from "../components/Card";
import { routes } from "../routes/routes";

export default function NoContact() {
  return (
    <div className="col-md-6 mb-3 text-center">
      {console.log(routes.contacts.create)}
      <Card>
        <p className="card-text">You don't have any contact</p>
        <NavLink to={routes.contacts.create} style={{ textDecoration: "none" }}>
          Add one!
        </NavLink>
      </Card>
    </div>
  );
}
