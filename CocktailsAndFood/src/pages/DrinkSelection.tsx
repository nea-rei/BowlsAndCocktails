import { useEffect, useState } from "react";
import StandardButton from "../components/StandardButton";
import {
    Cocktail,
    DrinkDetailsResponse,
    mapDrinkDetailsWithCocktail,
} from "../orderTypes";
import { Navigate, useNavigate } from "react-router-dom";
import { ActionType, useOrderContext } from "../context/Context";
import StandardHeader from "../layout_components/StandardHeader";
import BigWhiteBox from "../layout_components/BigWhiteBox";
import BigWhiteBoxSection from "../layout_components/BigWhiteBoxSection";
import BigWhiteBoxDivider from "../layout_components/BigWhiteBoxDivider";

export const DrinkSelection = () => {
    const { currentOrder, dispatch, isOrdersEmpty } = useOrderContext();

    if (isOrdersEmpty) return <Navigate to="/menu" />;

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

        dispatch({
            type: ActionType.UPDATE_ORDER,
            payload: updatedOrder,
        });
        navigate("/checkout");
    };

    return (
        <>
            <StandardHeader
                head={"Din cocktailrekommendation"}
                subHead="Låt dig inspireras av vårt förslag eller valj att skapa din egen unika smakresa genom att byta ut rekommendationen mot en annan cocktail från vår meny."
            />
            {formattedDrink && (
                <BigWhiteBox>
                    <BigWhiteBoxSection>
                        <div className="w-full flex flex-col-reverse gap-10 items-center md:flex-row justify-between">
                            <img
                                className="h-52 md:rounded-[25px]"
                                src={formattedDrink.ImgUrl}
                            />
                            <div>
                                <h3>{formattedDrink.CocktailName}</h3>
                                <p className="font-semibold mt-2 mb-4">
                                    {formattedDrink.Price.toFixed(2)} kr
                                </p>
                                <p>{formattedDrink.Description}</p>
                            </div>
                        </div>
                    </BigWhiteBoxSection>

                    <BigWhiteBoxDivider />

                    <BigWhiteBoxSection>
                        <div className="w-full flex flex-col-reverse gap-4 items-center md:flex-row justify-between">
                            <StandardButton to={"/detail"}>
                                Tillbaka
                            </StandardButton>
                            <StandardButton to={"/drinklist"}>
                                Välj egen cocktail
                            </StandardButton>
                            <StandardButton onClick={handleClick} yellow>
                                Acceptera förslag
                            </StandardButton>
                        </div>
                    </BigWhiteBoxSection>
                </BigWhiteBox>
            )}
        </>
    );
};
