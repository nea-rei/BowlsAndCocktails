import { useEffect, useState } from "react";
import { CartModifiers } from "../App";
import { Cocktail, Order } from "../orderTypes";
import { useNavigate } from "react-router-dom";

interface DrinkDetailsResponse {
  drinks: {
    idDrink: string;
    strDrink: string;
    strAlcoholic: string;
    strDrinkThumb: string;
    strIngredient1: string;
    strIngredient2: string;
    strIngredient3: string;
    strIngredient4: string;
    strIngredient5: string;
    strIngredient6: string;
    strIngredient7: string;
    strIngredient8: string;
    strIngredient9: string;
    strIngredient10: string;
    strIngredient11: string;
    strIngredient12: string;
    strIngredient13: string;
    strIngredient14: string;
    strIngredient15: string;
    strCategory: string;
    strGlass: string;
  }[];
}

const mapDrinkDetailsWithCocktail = (response: DrinkDetailsResponse) => {
  const drink = response.drinks[0];
  const ingredients = [
    drink.strIngredient1,
    drink.strIngredient2,
    drink.strIngredient3,
    drink.strIngredient4,
    drink.strIngredient5,
    drink.strIngredient6,
    drink.strIngredient7,
    drink.strIngredient8,
    drink.strIngredient9,
    drink.strIngredient10,
    drink.strIngredient11,
    drink.strIngredient12,
    drink.strIngredient13,
    drink.strIngredient14,
    drink.strIngredient15,
  ].filter((i) => typeof i === "string");

  const cocktail: Cocktail = {
    CocktailName: drink.strDrink,
    CocktailId: drink.idDrink,
    Description: `This is a ${drink.strAlcoholic} ${
      drink.strCategory
    } with the ingredients 
    ${ingredients.join(", ")}. It is served in a ${drink.strGlass}.`,
    Price: 125,
    ImgUrl: drink.strDrinkThumb,
  };
  return cocktail;
};


export const DrinkCard = ({ drinkId, currentOrder, updateOrder }:
   { drinkId: String,
     currentOrder: Order;
     updateOrder: CartModifiers["updateOrder"]; }) => {
  const [formattedDrink, setFormattedDrink] = useState<Cocktail | undefined>(
    undefined
  );

  const navigate = useNavigate();
  
  useEffect(() => {
    const getCocktails = async () => {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
      );
      const data: DrinkDetailsResponse = await response.json();
      setFormattedDrink(mapDrinkDetailsWithCocktail(data));
    };
    getCocktails();
  }, [drinkId]);
  /*
  useEffect(() => {
    const getCocktails = async () => {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
      );
      console.log("API response:", response);
      const data: DrinkDetailsResponse = await response.json();
      setFormattedDrink(mapDrinkDetailsWithCocktail((data)));
      console.log("data:", data);
    };
    getCocktails();
  }, [drinkId]);
*/
  
  const handleClick = () => {
    const updatedOrder = {
      ...currentOrder,
      Cocktail: formattedDrink,
    };

    updateOrder(updatedOrder);
    navigate("/checkout");
  };

  return <> 
    <div>
    <img src={formattedDrink?.ImgUrl} />
      <h2>{formattedDrink?.CocktailName}</h2>
      <p>
        <strong>{formattedDrink?.Price} KR</strong>
      </p>
      <button onClick={(handleClick)}>Välj</button>
    </div>
  </>;
};