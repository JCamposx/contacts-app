import colorType from "@/assets/js/colorType";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import { AlertContext } from "@/context/AlertContext";
import { useContact } from "@/hooks/useContact";
import { useFlashMessage } from "@/hooks/useFlashMessage";
import ContactList from "@/views/ContactList";
import NoContact from "@/views/NoContact";
import { useContext, useEffect } from "react";

export default function Index() {
  const { showAlert, hideAlert } = useContext(AlertContext);

  const {
    data,
    error,
    alert,
    setAlert,
    isLoading,
    getLatestContacts,
    deleteContact,
  } = useContact();

  const [flashMessage] = useFlashMessage();

  useEffect(() => {
    hideAlert();
    getLatestContacts();
  }, []);

  useEffect(() => {
    if (flashMessage.type) {
      setAlert({ type: flashMessage.type, message: flashMessage.message });
      showAlert();
    }
  }, [flashMessage]);

  return (
    <>
      <h1>Contacts</h1>
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
                onDeleteContact={deleteContact}
                customClass="col-md-6"
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
