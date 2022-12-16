import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import colorType from "../../assets/js/colorType";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import Form from "../../components/Form";
import FormControl from "../../components/FormControl";
import { AlertContext } from "../../context/AlertContext";
import { AuthContext } from "../../context/AuthContext";
import { routes } from "../../routes/routes";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [credentialError, setCredentialError] = useState({
    email: "",
    password: "",
  });
  const [alertError, setAlertError] = useState({
    type: "",
    message: "",
  });

  const { setUser } = useContext(AuthContext);
  const { showAlert, hideAlert } = useContext(AlertContext);

  const navigate = useNavigate();

  useEffect(() => {
    hideAlert();
  }, []);

  useEffect(() => {
    setCredentialError({ ...credentialError, email: "" });
  }, [credentials.email]);

  useEffect(() => {
    setCredentialError({ ...credentialError, password: "" });
  }, [credentials.password]);

  function handleChange(e) {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(routes.api.auth.login, credentials)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("flashMessage", "Login successfully");
        navigate(routes.home);
      })
      .catch((e) => {
        if (!e.response.data) {
          setAlertError({
            type: "danger",
            message: "Failed login: server error",
          });
          showAlert();
          return;
        }

        if (e.response.data.errors) {
          const errors = e.response.data.errors;
          setCredentialError({
            email: errors.email ? errors.email[0] : "",
            password: errors.password ? errors.password[0] : "",
          });
          return;
        }

        if (e.response.data.message) {
          setCredentialError({});
          setAlertError({
            type: "danger",
            message: e.response.data.message,
          });
          showAlert();
          return;
        }
      });
  }

  return (
    <>
      <h1>Login</h1>

      <Alert type={alertError.type}>{alertError.message}</Alert>

      <Form onSubmit={handleSubmit}>
        <FormControl
          id="email"
          label="Email"
          inputType="text"
          inputValue={credentials.email}
          onInputChange={handleChange}
          errorMessage={credentialError.email}
        />

        <FormControl
          id="password"
          label="Password"
          inputType="password"
          inputValue={credentials.password}
          onInputChange={handleChange}
          errorMessage={credentialError.password}
        />

        <Button type={colorType.primary} customClass="mt-2">
          Submit
        </Button>
      </Form>
    </>
  );
}
