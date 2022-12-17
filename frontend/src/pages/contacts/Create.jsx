import colorType from "@/assets/js/colorType";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import Form from "@/components/Form";
import FormControl from "@/components/FormControl";
import { AlertContext } from "@/context/AlertContext";
import { AuthContext } from "@/context/AuthContext";
import { ContactContext } from "@/context/ContactContext";
import { ContactRequestErrorContext } from "@/context/ContactRequestErrorContext";
import { routes } from "@/routes/routes";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [error, setError] = useState("");

  const { user } = useContext(AuthContext);
  const { contact, setContact } = useContext(ContactContext);
  const { hideAlert } = useContext(AlertContext);
  const { requestError, handleRequestErrors } = useContext(
    ContactRequestErrorContext
  );

  const navigate = useNavigate();

  useEffect(() => {
    hideAlert();
    handleRequestErrors({});
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
      .post(routes.api.contacts.store, contact, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(() => {
        localStorage.setItem("flashMessage", "Contact created successfully");
        navigate(routes.home);
      })
      .catch((e) => {
        handleRequestErrors(e.response.data.errors);
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
          errorMessage={requestError.name}
        />

        <FormControl
          id="description"
          label="Description"
          inputType="text"
          inputValue={contact.description}
          onInputChange={handleChange}
          errorMessage={requestError.description}
        />

        <FormControl
          id="phone_number"
          label="Phone number"
          inputType="text"
          inputValue={contact.phone_number}
          onInputChange={handleChange}
          errorMessage={requestError.phone_number}
        />

        <Button type={colorType.primary} customClass="mt-2">
          Submit
        </Button>
      </Form>
    </>
  );
}
