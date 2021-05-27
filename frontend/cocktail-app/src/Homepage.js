import React, { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import CocktailApi from "./cocktailApi";
import { Link } from "react-router-dom";
import DrinkCard from "./DrinkCard";
import PostCard from "./PostCard";
import "./Homepage.css";
import BackendApi from "./backendApi";

const Homepage = () => {
  const [randDrinks, setRandDrinks] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(true);
  const [drinkLoading, setDrinkLoading] = useState(true);

  const { errors } = useContext(UserContext);
  useEffect(() => {
    async function getDrinks() {
      setDrinkLoading(true);
      let res = await CocktailApi.getRandomDrinks();
      setRandDrinks(res);
      setDrinkLoading(false);
    }
    getDrinks();
  }, []);

  useEffect(() => {
    async function getPosts() {
      setPostLoading(true);
      let res = await BackendApi.getAllPosts();
      setPosts(res);
      setPostLoading(false);
    }
    getPosts();
  }, []);
  return (
    <div className="mt-0">
      <div className="background">
        <div className="Homepage-header d-flex align-items-center flex-column">
          <div className="m-auto Homepage-headerText">Cocktail Search</div>
          <div className="m-auto Homepage-headerBody">
            <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link>{" "}
            to create posts and share recipes! Browse other's posts, search for
            recipes, or filter by ingredients!
          </div>
        </div>
      </div>
      {errors ? (
        <>
          {errors.map((err) => (
            <div className="error">err</div>
          ))}
        </>
      ) : null}
      <div className="wrap mx-auto">
        <div className="row mx-auto w-100">
          <div className="col-lg-4 text-center white p-0">
            {drinkLoading ? (
              <h1>Loading . . . </h1>
            ) : (
              <>
                <h1>Random Recipes</h1>
                {randDrinks.map((item) => {
                  return <DrinkCard data={item} key={item.idDrink}></DrinkCard>;
                })}
              </>
            )}
          </div>

          <div className="col-lg-8 text-center white middle-border p-0">
            {postLoading ? (
              <h1>Loading . . .</h1>
            ) : (
              <>
                <h1>Posts</h1>
                {posts.map((post, idx) => {
                  return <PostCard post={post} key={idx}></PostCard>;
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
