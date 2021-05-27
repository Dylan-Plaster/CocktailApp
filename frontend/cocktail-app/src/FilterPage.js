import React, { useState, useEffect } from "react";
import CocktailApi from "./cocktailApi";
import DrinkCard from "./DrinkCard";
import Ingredient from "./Ingredient";
import "./FilterPage.css";

const FilterPage = () => {
  const [drinks, setDrinks] = useState([]);
  const [results, setResults] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [iloading, setILoading] = useState(true);
  const [dloading, setDLoading] = useState(true);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    async function getIngredients() {
      let ires = await CocktailApi.listIngredients();

      setIngredients(ires);

      setILoading(false);
    }

    getIngredients();
  }, []);

  useEffect(() => {
    async function getDrinkData() {
      if (!results || results.length === 0) {
        setDrinks([]);
        setDLoading(false);
        return;
      }
      for (let d of results) {
        let res = await CocktailApi.getDrink(d.idDrink);
        setDrinks((state) => {
          let temp = [...state];
          temp.push(res);
          return temp;
        });
        setDLoading(false);
      }
    }

    setDLoading(true);
    getDrinkData();
  }, [results]);

  const handleClick = (e) => {
    if (filters.includes(e.target.innerText)) {
      setFilters((state) => {
        let filterArr = [...state];
        let idx = filters.indexOf(e.target.innerText);
        filterArr.splice(idx, 1);
        return filterArr;
      });
    } else {
      setFilters((state) => {
        let filterArr = [...state];
        filterArr.push(e.target.innerText);
        return filterArr;
      });
    }
  };

  const handleFilterClick = async (e) => {
    e.preventDefault();
    setDrinks([]);
    let res = await filterRecipes(filters);
    if (res === "None Found") {
      setResults(null);
    } else {
      setResults(res);
    }
    setDLoading(false);
  };

  async function filterRecipes(filterArr) {
    let res = await CocktailApi.filterIngredients(filterArr);
    return res;
  }

  return (
    <>
      {iloading ? (
        <h1>Loading . . . </h1>
      ) : (
        <div className="row">
          <div className="col-xs-12 col-lg-7 d-flex flex-wrap justify-content-center">
            <h2 className="w-100 my-5 Filter-iHeader">
              Select ingredients to filter recipes! Click ingredients to add or
              remove
            </h2>
            <div className="w-100 d-flex flex-wrap justify-content-center">
              {filters ? (
                <div className="d-flex flex-column w-100 justify-content-center">
                  <div className="d-flex flex-wrap justify-content-center">
                    {filters.map((f, idx) => (
                      <Ingredient
                        handleClick={handleClick}
                        key={idx}
                        iName={f}
                      ></Ingredient>
                    ))}
                  </div>
                  <button className="filterBtn" onClick={handleFilterClick}>
                    Filter Recipes
                  </button>
                </div>
              ) : null}
            </div>
            <hr />
            {ingredients.map((i, idx) => (
              <Ingredient
                key={idx}
                iName={i.strIngredient1}
                handleClick={handleClick}
              ></Ingredient>
            ))}
          </div>
          <div className="col-xs-12 col-lg-5">
            <h1 className="my-5 resultHeader">Results:</h1>
            {drinks.length ? (
              <>
                {dloading ? (
                  <h1>Loading . . . </h1>
                ) : (
                  <>
                    {drinks.map((drink, idx) => {
                      return <DrinkCard data={drink}></DrinkCard>;
                    })}
                  </>
                )}
              </>
            ) : (
              <h3>No results. Add/change filters to see recipes</h3>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPage;
