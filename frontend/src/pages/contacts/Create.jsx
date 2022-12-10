import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import colorType from "../../assets/js/colorType";
import Button from "../../components/Button";
import Form from "../../components/Form";
import FormControl from "../../components/FormControl";
import { ContactContext } from "../../context/ContactContext";
import routes from "../../routes/routes";

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
        localStorage.setItem("flashMessage", "Contact created successfully");
        navigate(routes.home);
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

        <Button type={colorType.primary} customClass="mt-2">
          Submit
        </Button>
      </Form>
    </>
  );
}
