import colorType from "@/assets/js/colorType";
import { AlertContext } from "@/context/AlertContext";
import { AuthContext } from "@/context/AuthContext";
import { ContactRequestErrorContext } from "@/context/ContactRequestErrorContext";
import { routes, url } from "@/routes/routes";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useContact() {
  const [data, setData] = useState([]);
  const [contact, setContact] = useState({
    name: "",
    description: "",
    phone_number: "",
  });
  const [error, setError] = useState("");
  const [alert, setAlert] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);
  const { requestError, handleRequestErrors } = useContext(
    ContactRequestErrorContext
  );

  const navigate = useNavigate();

  function getAllContacts() {
    axios
      .get(routes.api.contacts.index, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setData(res.data))
      .catch(() => {
        setError("Failed loading contacts");
        showAlert();
      })
      .finally(() => setIsLoading(false));
  }

  function getLatestContacts() {
    axios
      .get(routes.api.contacts.latest, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setData(res.data))
      .catch(() => {
        setError("Failed loading contacts");
        showAlert();
      })
      .finally(() => setIsLoading(false));
  }

  function getContact(id) {
    axios
      .get(url(routes.api.contacts.show, { id }), {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setContact({
          name: res.data.name,
          description: res.data.description,
          phone_number: res.data.phone_number,
        });
      })
      .catch((e) => {
        const message = "Failed loading contact";
        const arrStatus = {
          404: "Contact not found",
          500: `${message}: server error`,
        };

        const status = e.response.status;

        arrStatus[status] ? setError(arrStatus[status]) : setError(message);
        showAlert();
      });
  }

  function storeContact(contact) {
    axios
      .post(routes.api.contacts.store, contact, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(() => {
        localStorage.setItem("flashMessage", "Contact created successfully");
        navigate(routes.home);
      })
      .catch((e) => {
        handleRequestErrors(e.response.data.errors);
      });
  }

  function updateContact(id) {
    axios
      .put(url(routes.api.contacts.update, { id }), contact, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(() => {
        localStorage.setItem(
          "flashMessage",
          `Contact ${contact.name} updated successfully`
        );
        navigate(-1);
      })
      .catch((e) => {
        handleRequestErrors(e.response.data.errors);
      });
  }

  function deleteContact(id) {
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

  return {
    data,
    contact,
    setContact,
    error,
    alert,
    setAlert,
    isLoading,
    requestError,
    handleRequestErrors,
    getAllContacts,
    getLatestContacts,
    getContact,
    storeContact,
    updateContact,
    deleteContact,
  };
}
