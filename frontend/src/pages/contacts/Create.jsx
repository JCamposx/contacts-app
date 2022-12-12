import axios from "axios";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import colorType from "../../assets/js/colorType";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import Form from "../../components/Form";
import FormControl from "../../components/FormControl";
import { AlertContext } from "../../context/AlertContext";
import { ContactContext } from "../../context/ContactContext";
import { routes } from "../../routes/routes";

export default function Create() {
  const [error, setError] = useState("");

  const { contact, setContact } = useContext(ContactContext);
  const { showAlert, hideAlert } = useContext(AlertContext);

  const navigate = useNavigate();

  useEffect(() => {
    hideAlert();
  }, []);

  function handleChange(e) {
    setContact({
      ...contact,
      [e.target.id]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(routes.api.contacts.store, contact)
      .then(() => {
        localStorage.setItem("flashMessage", "Contact created successfully");
        navigate(routes.home);
      })
      .catch(() => {
        setError("Failed storing new contact");
        showAlert();
      });
  }

  return (
    <>
      <h1>New contact</h1>

      <Alert type={colorType.danger}>{error}</Alert>

      <Form onSubmit={handleSubmit}>
        <FormControl
          id="name"
          label="Name"
          inputType="text"
          inputValue={contact.name}
          onInputChange={handleChange}
        />

        <FormControl
          id="description"
          label="Description"
          inputType="text"
          inputValue={contact.description}
          onInputChange={handleChange}
        />

        <FormControl
          id="phone_number"
          label="Phone number"
          inputType="text"
          inputValue={contact.phone_number}
          onInputChange={handleChange}
        />

        <Button type={colorType.primary} customClass="mt-2">
          Submit
        </Button>
      </Form>
    </>
  );
}
