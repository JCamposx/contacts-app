import axios from "axios";
import { useEffect, useState } from "react";
import FlashMessage from "react-flash-message";
import { NavLink } from "react-router-dom";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Spinner from "../../components/Spinner";
import routes from "../../routes/routes.js";

export default function Index() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [flashMessage, setFlashMessage] = useState({
    message: "",
    status: false,
  });

  useEffect(() => {
    if (localStorage.getItem("flashMessage")) {
      setFlashMessage({
        message: localStorage.getItem("flashMessage"),
        status: true,
      });
      localStorage.removeItem("flashMessage");
    }

    axios
      .get(routes.contacts._)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setError("Failed loading contacts");
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1>Contacts</h1>
      {isLoading ? (
        <Spinner />
      ) : error !== "" ? (
        <Alert type="danger">{error}</Alert>
      ) : (
        <>
          {flashMessage.status ? (
            <FlashMessage duration={3000} persistOnHover={true}>
              <Alert type="info">{flashMessage.message}</Alert>
            </FlashMessage>
          ) : (
            <></>
          )}
          <div className="row justify-content-center align-items-center mt-3">
            {data.length === 0 ? (
              <div className="col-md-6 mb-3">
                <Card>
                  <p className="card-text">You don't have any contact</p>
                  <NavLink
                    to={routes.contacts.create}
                    style={{ textDecoration: "none" }}
                  >
                    Add one!
                  </NavLink>
                </Card>
              </div>
            ) : (
              data.map((contact) => {
                return (
                  <div key={contact.id} className="col-md-4 mb-3">
                    <Card title={contact.name} customClass="text-center">
                      <p className="card-text">{contact.description}</p>
                      <p className="card-text">{contact.phone_number}</p>
                      <div>
                        <Button to="#" type="primary" customClass="me-2">
                          Edit
                        </Button>
                        <Button to="#" type="danger">
                          Delete
                        </Button>
                      </div>
                    </Card>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </>
  );
}
