import axios from "axios";
import { useContext } from "react";
import Button from "../../components/Button";
import Form from "../../components/Form";
import FormControl from "../../components/FormControl";
import { ContactContext } from "../../context/ContactContext";
import routes from "../../routes/routes";
import { redirect, useNavigate } from "react-router-dom";

export default function Create() {
  const { contact, setContact } = useContext(ContactContext);

  const navigate = useNavigate();

  function handleChange(e) {
    setContact({
      ...contact,
      [e.target.id]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(contact);
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(routes.contacts._, contact)
      .then((res) => {
        console.log(res.data)
        navigate(routes.home)
      })
      .catch((e) => console.log(e));
  }

  return (
    <>
      <h1>New contact</h1>

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

        <Button type="primary" customClass="mt-2" submit={true}>
          Submit
        </Button>
      </Form>
    </>
  );
}
