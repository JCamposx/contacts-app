import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import colorType from "../../assets/js/colorType";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import Form from "../../components/Form";
import FormControl from "../../components/FormControl";
import { AlertContext } from "../../context/AlertContext";
import { routes, url } from "../../routes/routes";

export default function Edit() {
  const [contact, setContact] = useState({
    name: "",
    description: "",
    phone_number: "",
  });
  const [error, setError] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    axios
      .get(url(routes.api.contacts.show, { id }))
      .then((res) => {
        setContact({
          name: res.data.name,
          description: res.data.description,
          phone_number: res.data.phone_number,
        });
      })
      .catch(() => {
        setError("Failed loading contact");
        showAlert();
      });
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
      .put(url(routes.api.contacts.update, { id }), contact)
      .then(() => {
        localStorage.setItem(
          "flashMessage",
          `Contact ${contact.name} updated successfully`
        );
        navigate(-1);
      })
      .catch(() => {
        setError("Failed updating contact");
        showAlert();
      });
  }

  return (
    <>
      <h1>Edit contact</h1>

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
