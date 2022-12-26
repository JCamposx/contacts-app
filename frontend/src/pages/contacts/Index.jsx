import colorType from "@/assets/js/colorType";
import Alert from "@/components/Alert";
import Input from "@/components/Input";
import Spinner from "@/components/Spinner";
import { AlertContext } from "@/context/AlertContext";
import { useContact } from "@/hooks/useContact";
import { useFlashMessage } from "@/hooks/useFlashMessage";
import ContactList from "@/views/ContactList";
import NoContact from "@/views/NoContact";
import { useContext, useEffect, useState } from "react";

export default function Index() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  const { showAlert, hideAlert } = useContext(AlertContext);

  const {
    data,
    error,
    alert,
    setAlert,
    isLoading,
    getAllContacts,
    deleteContact,
  } = useContact();

  const [flashMessage] = useFlashMessage();

  useEffect(() => {
    hideAlert();
    getAllContacts();
  }, []);

  useEffect(() => {
    if (flashMessage.type) {
      setAlert({ type: flashMessage.type, message: flashMessage.message });
      showAlert();
    }
  }, [flashMessage]);

  useEffect(() => {
    setContacts([...data]);
  }, [data]);

  useEffect(() => {
    setContacts(
      data.filter((contact) => contact.name.toLowerCase().includes(search))
    );
  }, [search]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Contacts</h1>
        <div className="col-5">
          <Input
            placeholder="Search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
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
                contacts={contacts}
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
