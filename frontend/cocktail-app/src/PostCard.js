import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import BackendApi from "./backendApi";
import CocktailApi from "./cocktailApi";
import DrinkCard from "./DrinkCard";

import "./PostCard.css";

const PostCard = ({ post }) => {
  const [recipe, setRecipe] = useState(null);
  const [user, setUser] = useState(null);
  const [recipeLoading, setRecipeLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);

  const history = useHistory();
  useEffect(() => {
    async function getRecipe() {
      setRecipeLoading(true);
      let res = await CocktailApi.getDrink(post.recipe_id);

      setRecipe(res);
      setRecipeLoading(false);
    }
    getRecipe();
  }, [setRecipe, setRecipeLoading, post.recipe_id]);

  useEffect(() => {
    async function getUser() {
      setUserLoading(true);
      let res = await BackendApi.getUserById(post.user_id);
      setUser(res);
      setUserLoading(false);
    }
    getUser();
  }, [setUserLoading, post.user_id]);

  //   const getIngredientsContent = () => {
  //     let response = [];
  //     for (let i = 1; i < 16; i++) {
  //       if (data.data[`strIngredient${i}`] !== null) {
  //         response.push(
  //           <li key={i}>
  //             {data.data[`strMeasure${i}`]} {data.data[`strIngredient${i}`]}
  //           </li>
  //         );
  //       }
  //     }

  return (
    <Card
      className="PostCard"
      onClick={(e) => {
        // history.location.pathname;

        if (e.target.className !== "link") {
          history.replace(`/posts/${post.id}`);
        } else {
          e.preventDefault();
        }
      }}
    >
      <CardBody>
        {/* <CardTitle tag="h1">{post.post.title}</CardTitle> */}
        {recipeLoading ? (
          <h1>Loading . . .</h1>
        ) : (
          <>
            <div className="row">
              <div className="col-6 p-0">
                <DrinkCard data={recipe}></DrinkCard>
              </div>
              <div className="col-6 p-0 d-flex flex-column">
                <h1 className="PostCard-title">{post.title}</h1>
                {userLoading ? null : (
                  <h3 className="PostCard-subtitle">
                    <Link className="link" to={`/users/${user.username}`}>
                      by {user.username}
                    </Link>
                  </h3>
                )}
                <p className="PostCard-body">{post.body}</p>
              </div>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default PostCard;
