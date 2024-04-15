import { useEffect, useState } from "react";
import { CocktailCard } from "../components/CocktailCard";
import { Cocktail, Order } from "../orderTypes";
import { useNavigate } from "react-router-dom";
import { CartModifiers } from "../App";
import StandardLinkButton from "../components/StandardLinkButton";

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

export const DrinkSelection = ({
  currentOrder,
  updateOrder,
}: {
  currentOrder: Order;
  updateOrder: CartModifiers["updateOrder"];
}) => {
  const navigate = useNavigate();
  const [formattedDrink, setFormattedDrink] = useState<Cocktail | undefined>(
    undefined
  );
  const [cocktailId] = useState(() => {
    switch (currentOrder.Protein?.Id) {
      case 1:
        return "11410";
      case 2:
        return "12198";
      case 3:
        return "11422";
      case 4:
        return "13731";
      case 5:
        return "12690";
      default:
        break;
    }
  });

  useEffect(() => {
    const getCocktails = async () => {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`
      );
      const data: DrinkDetailsResponse = await response.json();
      setFormattedDrink(mapDrinkDetailsWithCocktail(data));
    };
    getCocktails();
  }, [cocktailId]);

  const handleClick = () => {
    const updatedOrder = {
      ...currentOrder,
      Cocktail: formattedDrink,
    };

    updateOrder(updatedOrder);
    navigate("/checkout");
  };
  // <CocktailCard cocktail={formattedDrink} />
  return (
    <>
      <div className="main-wrapper">
        <div className="px-8 md:px-0 text-center flex flex-col gap-5 mb-[50px]">
          <h2>Din cocktailrekommendation</h2>
          <p className="text-lg">
            Låt dig inspireras av vårt förslag eller valj att skapa din egen
            unika smakresa genom att byta ut rekommendationen mot en annan
            cocktail från vår meny.
          </p>
        </div>

        {formattedDrink && (
          <div className="w-full md:rounded-[25px] overflow-hidden bg-white shadow-custom-big">
            <div className="w-full flex flex-col-reverse gap-4 items-center md:flex-row justify-between p-8">
              <img
                className="h-[350px] w-full object-fit md:rounded-[25px]"
                src={formattedDrink.ImgUrl}
              />
              <div>
                <h2>{formattedDrink.CocktailName}</h2>
                <p className="font-semibold my-[15px]">
                  {formattedDrink.Price.toFixed(2)} kr
                </p>
                <p>{formattedDrink.Description}</p>
              </div>
            </div>

            <hr className="border-neutral-300 border-t" />

            <div className="w-full flex flex-col-reverse gap-4 items-center md:flex-row justify-between p-8">
              <StandardLinkButton to={"/drinklist"}>
                Gå till drinkmenyn
              </StandardLinkButton>
              <button onClick={handleClick} className="border-yellow-400 hover:border-yellow-300 bg-yellow-400 hover:bg-yellow-300 border-2 rounded-full p-3 text-sm font-semibold text-center w-[290px]">
                Acceptera förslag
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
