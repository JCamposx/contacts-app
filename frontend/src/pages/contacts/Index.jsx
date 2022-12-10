import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Spinner from "../../components/Spinner";
import { AlertContext } from "../../context/AlertContext";
import routes from "../../routes/routes.js";
import colorType from "../../assets/js/colorType";

export default function Index() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [flashMessage, setFlashMessage] = useState({
    type: "",
    message: "",
  });

  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    if (localStorage.getItem("flashMessage")) {
      setFlashMessage({
        type: colorType.info,
        message: localStorage.getItem("flashMessage"),
      });
      showAlert();
      localStorage.removeItem("flashMessage");
    }

    axios
      .get(routes.contacts.base)
      .then((res) => setData(res.data))
      .catch(() => setError("Failed loading contacts"))
      .finally(() => setIsLoading(false));
  }, []);

  function handleDelete(id) {
    axios
      .delete(`${routes.contacts.base}/${id}`)
      .then(() => {
        setData(data.filter((item) => item.id !== id));
        setFlashMessage({
          type: colorType.danger,
          message: "Contact deleted successfully",
        });
        showAlert();
      })
      .catch((e) => console.log(e));
  }

  return (
    <>
      <h1>Contacts</h1>
      {isLoading ? (
        <Spinner />
      ) : error !== "" ? (
        <Alert type={colorType.danger}>{error}</Alert>
      ) : (
        <>
          <Alert type={flashMessage.type}>{flashMessage.message}</Alert>

          <div className="row justify-content-center align-items-center mt-3">
            {data.length === 0 ? (
              <div className="col-md-6 mb-3 text-center">
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
                        <Button
                          link={true}
                          to="#"
                          type={colorType.primary}
                          customClass="me-2"
                        >
                          Edit
                        </Button>
                        <Button
                          type={colorType.danger}
                          onClick={() => handleDelete(contact.id)}
                        >
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
