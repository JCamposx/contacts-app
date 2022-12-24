import colorType from "@/assets/js/colorType";
import { AlertContext } from "@/context/AlertContext";
import { AuthContext } from "@/context/AuthContext";
import { routes, url } from "@/routes/routes";
import axios from "axios";
import { useContext, useState } from "react";

export function useContact() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);

  function getAllContacts() {
    axios
      .get(routes.api.contacts.index, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setData(res.data))
      .catch(() => setError("Failed loading contacts"))
      .finally(() => setIsLoading(false));
  }

  function getLatestContacts() {
    axios
      .get(routes.api.contacts.latest, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setData(res.data))
      .catch(() => setError("Failed loading contacts"))
      .finally(() => setIsLoading(false));
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
    error,
    alert,
    setAlert,
    isLoading,
    getAllContacts,
    getLatestContacts,
    deleteContact,
  };
}
