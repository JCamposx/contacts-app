import { createContext, useState } from "react";

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
