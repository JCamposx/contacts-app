import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export function useFetchContacts(
  route,
  { onSuccess = null, onError = null, onFinal = null }
) {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(route, { headers: { Authorization: `Bearer ${user.token}` } })
      .then((res) => {
        setData(res.data);
        onSuccess && onSuccess(res);
      })
      .catch((e) => {
        setError("Failed loading contacts");
        onError && onError(e);
      })
      .finally(() => onFinal && onFinal());
  }, []);

  return [data, setData, error];
}
