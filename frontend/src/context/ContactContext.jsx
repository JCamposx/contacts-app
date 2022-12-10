import axios from "axios";
import { createContext, useState } from "react";
import routes from "../routes/routes";

export const ContactContext = createContext();

export function ContactContextProvider(props) {
  const [contact, setContact] = useState({
    name: "",
    description: "",
    phone_number: "",
  });

  return (
    <div>
      <ContactContext.Provider value={{ contact, setContact }}>
        {props.children}
      </ContactContext.Provider>
    </div>
  );
}
