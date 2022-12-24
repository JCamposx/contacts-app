import colorType from "@/assets/js/colorType";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import Form from "@/components/Form";
import FormControl from "@/components/FormControl";
import { AlertContext } from "@/context/AlertContext";
import { useContact } from "@/hooks/useContact";
import { useContext, useEffect } from "react";

export default function Create() {
  const { hideAlert } = useContext(AlertContext);

  const {
    contact,
    setContact,
    error,
    storeContact,
    requestError,
    handleRequestErrors,
  } = useContact();

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
    storeContact(contact);
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
