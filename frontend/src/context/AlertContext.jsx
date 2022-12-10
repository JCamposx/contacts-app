import { createContext, useState } from "react";

export const AlertContext = createContext();

export function AlertContextProvider(props) {
  const [alert, setAlert] = useState(false);

  function showAlert() {
    setAlert(true);
  }

  function hideAlert() {
    setAlert(false);
  }

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
}
