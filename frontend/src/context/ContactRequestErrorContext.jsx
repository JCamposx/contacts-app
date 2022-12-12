import { createContext, useState } from "react";

export const ContactRequestErrorContext = createContext();

export function ContactRequestErrorContextProvider(props) {
  const [requestError, setRequestError] = useState({
    name: "",
    description: "",
    phone_number: "",
  });

  function handleRequestErrors(errors) {
    setRequestError({
      name: errors.name ? errors.name[0] : "",
      description: errors.description ? errors.description[0] : "",
      phone_number: errors.phone_number ? errors.phone_number[0] : "",
    });
  }

  return (
    <ContactRequestErrorContext.Provider
      value={{ requestError, handleRequestErrors }}
    >
      {props.children}
    </ContactRequestErrorContext.Provider>
  );
}
