import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/Card";

export default function Index() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    axios.get(API_URL + "contacts").then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <h1>Contacts</h1>
      <div className="mt-3 row justify-content-center">
        {data.map((contact) => {
          return (
            <div key={contact.id} className="col-md-4 d-flex">
              <Card
                name={contact.name}
                description={contact.description}
                phone_number={contact.phone_number}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}