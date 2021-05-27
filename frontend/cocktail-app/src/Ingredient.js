import React from "react";

import "./Ingredient.css";

const Ingredient = ({ iName, handleClick }) => {
  return (
    <div className="Ingredient" onClick={handleClick}>
      <>{iName}</>
    </div>
  );
};

export default Ingredient;
