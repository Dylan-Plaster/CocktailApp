import React, { useState, useEffect } from "react";
import CocktailApi from "./cocktailApi";
import DrinkCard from "./DrinkCard";

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [drinks, setDrinks] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function search() {
      let res = await CocktailApi.search(keyword);
      setDrinks(res);
      setLoading(false);
    }
    if (keyword !== "") {
      setLoading(true);
      search();
    }
  }, [submitted]);

  const handleChange = (evt) => {
    const { value } = evt.target;

    setKeyword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted((s) => !s);
  };

  return (
    <>
      <div className="container-md">
        <h1>Search for recipes!</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" className="mt-3" onChange={handleChange}></input>
        </form>
        {loading ? (
          <h1>Loading . . .</h1>
        ) : drinks ? (
          <div className="w-75 mx-auto">
            {drinks.map((drink, idx) => (
              <DrinkCard data={drink} key={idx}></DrinkCard>
            ))}
          </div>
        ) : (
          <h2>No Results</h2>
        )}
      </div>
    </>
  );
};

export default SearchPage;
