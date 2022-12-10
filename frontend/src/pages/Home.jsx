import axios from "axios";
import { useContext, useEffect, useState } from "react";
import colorType from "../assets/js/colorType";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import { AlertContext } from "../context/AlertContext";
import routes from "../routes/routes.js";
import ContactList from "../views/ContactList";
import NoContact from "../views/NoContact";

export default function Home() {
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
      .get(routes.api.contacts.latest)
      .then((res) => setData(res.data))
      .catch(() => setError("Failed loading contacts"))
      .finally(() => setIsLoading(false));
  }, []);

  function handleDelete(id) {
    axios
      .delete(`${routes.api.contacts.base}/${id}`)
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
      <h1>Home</h1>
      {isLoading ? (
        <Spinner />
      ) : error !== "" ? (
        <Alert type={colorType.danger}>{error}</Alert>
      ) : (
        <>
          <Alert type={flashMessage.type}>{flashMessage.message}</Alert>

          <div className="row justify-content-center align-items-center mt-3">
            {data.length === 0 ? (
              <NoContact />
            ) : (
              <ContactList
                contacts={data}
                onDeleteContact={handleDelete}
                customClass="col-md-4"
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
