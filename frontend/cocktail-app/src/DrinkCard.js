import React, { useContext } from "react";
import UserContext from "./UserContext";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import "./DrinkCard.css";

const DrinkCard = (data) => {
  const { currUser } = useContext(UserContext);
  const getIngredientsContent = () => {
    let response = [];
    for (let i = 1; i < 16; i++) {
      if (data.data[`strIngredient${i}`] !== null) {
        response.push(
          <li key={i}>
            {data.data[`strMeasure${i}`]} {data.data[`strIngredient${i}`]}
          </li>
        );
      }
    }

    return response;
  };
  return (
    // <div>
    <Card className="DrinkCard p-0">
      <CardImg
        className="DrinkCard-img"
        top
        src={
          data.data.strDrinkThumb
            ? data.data.strDrinkThumb
            : "https://images.vexels.com/media/users/3/156834/isolated/preview/7001ac7e95729ee662f2af03243f9af2-martini-cocktail-flat-icon-by-vexels.png"
        }
        alt="Drink image"
      />
      <CardBody className="p-0">
        <CardTitle tag="h3">{data.data.strDrink}</CardTitle>
        {/* <CardSubtitle tag="h6" className="mb-2 text-muted">
          Card subtitle
        </CardSubtitle> */}

        {/* <CardText> */}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xs-12  mt-3 DrinkCard-ingredients">
              <h5 className="DrinkCard-ingredientsHeader">Ingredients:</h5>
              {getIngredientsContent()}
            </div>

            <div className="col-xs-12 mt-3">
              Instructions: {data.data.strInstructions}
            </div>
            <div className="mt-3">
              {currUser ? (
                <Link
                  className="whiteLink"
                  to={`/posts/new/${data.data.idDrink}`}
                >
                  Share!
                </Link>
              ) : (
                <span>
                  <Link className="whiteLink" to="/login">
                    Login
                  </Link>{" "}
                  to share!
                </span>
              )}
            </div>
          </div>
        </div>
        {/* </CardText> */}
        {/* <Button>Button</Button> */}
      </CardBody>
    </Card>
    // // </div>
    // <div className="DrinkCard">
    //   <div className="row">
    //     <div className="col-5">
    //       <img
    //         className="DrinkCard-img"
    //         src={
    //           data.data.strDrinkThumb
    //             ? data.data.strDrinkThumb
    //             : "https://images.vexels.com/media/users/3/156834/isolated/preview/7001ac7e95729ee662f2af03243f9af2-martini-cocktail-flat-icon-by-vexels.png"
    //         }
    //         alt="Drink Image"
    //       ></img>
    //     </div>
    //     <div className="col-7">
    //       <h2>{data.data.strDrink}</h2>
    //       <div className="container">
    //         <div className="row justify-content-center">
    //           <div className="col-xs-12 col-lg-6 mt-3 DrinkCard-ingredients">
    //             <h5 className="DrinkCard-ingredientsHeader">Ingredients:</h5>
    //             {getIngredientsContent()}
    //           </div>

    //           <div className="col-xs-12 col-lg-6 mt-3">
    //             Instructions: {data.data.strInstructions}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default DrinkCard;
