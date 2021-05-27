import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { Form, FormGroup } from "reactstrap";
import "./Form.css";

const SignupForm = ({ signup }) => {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    async function handleSignup() {
      let err = await signup(formData);
      e.target.reset();
      if (err) {
        setError(err);
      } else {
        history.push("/");
      }
    }
    handleSignup();
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  return (
    <>
      {error ? <div className="error">{error}</div> : null}
      <div className="Form">
        <Form onSubmit={handleSubmit}>
          <h1 className="header">Create an account:</h1>
          <div className="fieldContainer">
            <FormGroup>
              <label for="username">Username</label>
              <input
                type="text"
                className="myinput"
                name="username"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label for="password">Password</label>
              <input
                type="password"
                className="myinput"
                name="password"
                onChange={handleChange}
              />
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

export default SignupForm;
