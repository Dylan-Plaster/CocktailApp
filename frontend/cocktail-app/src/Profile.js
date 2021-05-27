import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import { useHistory, Redirect } from "react-router-dom";
import { Form, FormGroup } from "reactstrap";

import "./Form.css";

const Profile = ({ updateUser }) => {
  const { currUser, token } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: currUser ? currUser.username : "",
    password: "",
  });
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fData) => ({ ...fData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();

    delete formData.password;
    let err = await updateUser(currUser.username, formData, token);
    if (err) {
      alert(err);
    } else {
      history.push("/");
    }
  };

  if (!currUser) return <Redirect to="/"></Redirect>;
  return (
    <div className="ProfileEdit Form">
      <Form onSubmit={handleSubmit}>
        <h1 className="header">Edit your username:</h1>

        <FormGroup className="pl-3">
          <label htmlFor="username">New Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          ></input>
        </FormGroup>
        <FormGroup>
          <label htmlFor="password">Confirm password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
          ></input>
        </FormGroup>

        <button type="submit" className="submitBtn">
          Submit
        </button>
      </Form>
    </div>
  );
};

export default Profile;
