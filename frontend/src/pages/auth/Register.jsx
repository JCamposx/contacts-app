import colorType from "@/assets/js/colorType";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import Form from "@/components/Form";
import FormControl from "@/components/FormControl";
import { AlertContext } from "@/context/AlertContext";
import { AuthContext } from "@/context/AuthContext";
import { routes } from "@/routes/routes";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [credentialError, setCredentialError] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [alertError, setAlertError] = useState({
    type: "",
    message: "",
  });

  const { setUser } = useContext(AuthContext);
  const { hideAlert, showAlert } = useContext(AlertContext);

  const navigate = useNavigate();

  useEffect(() => {
    hideAlert();
  }, []);

  useEffect(() => {
    setCredentialError({ ...credentialError, name: "" });
  }, [credentials.name]);

  useEffect(() => {
    setCredentialError({ ...credentialError, email: "" });
  }, [credentials.email]);

  useEffect(() => {
    setCredentialError({ ...credentialError, password: "" });
  }, [credentials.password, credentials.password_confirmation]);

  function handleChange(e) {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(routes.api.auth.register, credentials)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("flashMessage", "User registered successfully");
        navigate(routes.home);
      })
      .catch((e) => {
        if (!e.response.data) {
          setAlertError({
            type: "danger",
            message: "Failed register: server error",
          });
          showAlert();
          return;
        }

        if (e.response.data.errors) {
          const errors = e.response.data.errors;
          setCredentialError({
            name: errors.name ? errors.name[0] : "",
            email: errors.email ? errors.email[0] : "",
            password: errors.password ? errors.password[0] : "",
          });
          return;
        }
      });
  }

  return (
    <>
      <h1>Register</h1>

      <Alert type={alertError.type}>{alertError.message}</Alert>

      <Form onSubmit={handleSubmit}>
        <FormControl
          id="name"
          label="Name"
          inputType="text"
          inputValue={credentials.name}
          onInputChange={handleChange}
          errorMessage={credentialError.name}
        />

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

        <FormControl
          id="password_confirmation"
          label="Confirm password"
          inputType="password"
          inputValue={credentials.password_confirmation}
          onInputChange={handleChange}
          errorMessage={credentialError.password}
        />

        <div className="d-flex justify-content-between align-items-center">
          <Button type={colorType.primary} customClass="mt-2">
            Submit
          </Button>

          <Link to={routes.auth.login} className="text-decoration-none">
            Go to Login
          </Link>
        </div>
      </Form>
    </>
  );
}
