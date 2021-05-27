import React, { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";

import CocktailApi from "./cocktailApi";
import { useParams, Redirect, useHistory } from "react-router-dom";
import { Form, FormGroup } from "reactstrap";
import DrinkCard from "./DrinkCard";
import "./NewPostForm.css";

const NewPostForm = ({ newPost }) => {
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: "", body: "" });
  const [error, setError] = useState(null);
  const { currUser } = useContext(UserContext);
  const { recipe_id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getDrink() {
      let res = await CocktailApi.getDrink(recipe_id);
      setDrink(res);
      setLoading(false);
    }
    setLoading(true);
    getDrink();
  }, [recipe_id]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    async function handleNewPost() {
      let data = { ...formData, recipe_id: +recipe_id };
      let err = await newPost(data);
      e.target.reset();
      if (err) {
        setError(err);
      } else {
        history.push(`/users/${currUser.username}`);
      }
    }
    handleNewPost();
  };

  if (!currUser) return <Redirect path="/login"></Redirect>;
  return (
    <>
      {loading ? (
        <h1>Loading . . .</h1>
      ) : (
        <div className="container-md">
          {error ? <div className="error">{error}</div> : null}
          <h1>New Post:</h1>
          <div className="row">
            <div className="col-md-6">
              <DrinkCard data={drink}></DrinkCard>
            </div>
            <div className="col-md-6 ">
              <Form onSubmit={handleSubmit} className="mx-auto">
                <div className="d-flex flex-column">
                  <label htmlFor="title">Post Title:</label>
                  <input
                    className="titleInput"
                    type="text"
                    name="title"
                    onChange={handleChange}
                  ></input>
                </div>
                <FormGroup>
                  <label htmlFor="title">Post Body:</label>
                  <textarea
                    className="text-area"
                    name="body"
                    onChange={handleChange}
                  ></textarea>
                </FormGroup>

                <button className="submitBtn" type="submit">
                  Submit
                </button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewPostForm;
