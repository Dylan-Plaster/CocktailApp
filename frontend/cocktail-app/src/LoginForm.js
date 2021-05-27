import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import { useHistory, Redirect } from "react-router-dom";
import { Form, FormGroup } from "reactstrap";
import "./Form.css";

const LoginForm = ({ login }) => {
  const { currUser } = useContext(UserContext);
  const history = useHistory();

  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({ username: "", password: "" });
  if (currUser) {
    return <Redirect to="/"></Redirect>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    async function handleLogin() {
      let err = await login(formData);
      e.target.reset();
      if (err) {
        // alert(err);
        setError(err);
      } else {
        history.push("/");
      }
    }

    handleLogin();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fData) => ({ ...fData, [name]: value }));
  };

  return (
    <>
      {error ? <div className="error">{error}</div> : null}
      <div className="Form">
        <Form onSubmit={handleSubmit}>
          <h1 className="header">Log In:</h1>
          <div className="fieldContainer">
            <FormGroup>
              <label for="username">Username</label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
              ></input>
            </FormGroup>
            <FormGroup>
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
              ></input>
            </FormGroup>
          </div>
          <button type="submit" className="submitBtn">
            Submit
          </button>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;
