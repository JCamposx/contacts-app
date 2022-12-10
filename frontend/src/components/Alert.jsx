import { useContext } from "react";
import { AlertContext } from "../context/AlertContext";

export default function Alert({ type, children }) {
  const { alert, hideAlert } = useContext(AlertContext);

  return (
    <>
      {alert && (
        <div
          className={`alert alert-${type} alert-dismissible fade show`}
          role="alert"
        >
          {children}
          <button onClick={hideAlert} className="btn-close"></button>
        </div>
      )}
    </>
  );
}
