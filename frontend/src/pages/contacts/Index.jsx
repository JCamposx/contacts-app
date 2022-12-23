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

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [flashMessage, setFlashMessage] = useState({
    type: "",
    message: "",
  });

  const { showAlert, hideAlert } = useContext(AlertContext);
  const { user } = useContext(AuthContext);

  const [data, setData, error] = useFetchContacts(routes.api.contacts.index, {
    onError: () => showAlert(),
    onFinal: () => setIsLoading(false),
  });

  useEffect(() => {
    hideAlert();

    if (localStorage.getItem("flashMessage")) {
      setFlashMessage({
        type: colorType.info,
        message: localStorage.getItem("flashMessage"),
      });
      showAlert();
      localStorage.removeItem("flashMessage");
    }
  }, []);

  function handleDelete(id) {
    axios
      .delete(url(routes.api.contacts.delete, { id }), {
        headers: { Authorization: `Bearer ${user.token}` },
      })
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
              <NoContact />
            ) : (
              <ContactList
                contacts={data}
                onDeleteContact={handleDelete}
                customClass="col-md-6"
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
