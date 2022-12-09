import axios from "axios";
import { useEffect, useState } from "react";
import ContactCard from "./ContactCard";

export default function ContactList() {
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
              <ContactCard
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
