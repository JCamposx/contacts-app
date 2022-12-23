import colorType from "@/assets/js/colorType";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import { AlertContext } from "@/context/AlertContext";
import { AuthContext } from "@/context/AuthContext";
import { useFetchContacts } from "@/hooks/useFetchContacts";
import { routes, url } from "@/routes/routes";
import ContactList from "@/views/ContactList";
import NoContact from "@/views/NoContact";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useFlashMessage } from "../hooks/useFlashMessage";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({});

  const { user } = useContext(AuthContext);
  const { showAlert, hideAlert } = useContext(AlertContext);

  const [data, setData, error] = useFetchContacts(routes.api.contacts.latest, {
    onError: () => showAlert(),
    onFinal: () => setIsLoading(false),
  });

  const [flashMessage] = useFlashMessage();

  useEffect(() => {
    hideAlert();
  }, []);

  useEffect(() => {
    if (flashMessage.type) {
      setAlert({ type: flashMessage.type, message: flashMessage.message });
      showAlert();
    }
  }, [flashMessage]);

  function handleDelete(id) {
    axios
      .delete(url(routes.api.contacts.delete, { id }), {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(() => {
        setData(data.filter((item) => item.id !== id));
        setAlert({
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
          <Alert type={alert.type}>{alert.message}</Alert>

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
