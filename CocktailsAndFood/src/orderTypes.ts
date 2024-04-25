export type Meal = {
    _id: string;
    title: string;
    imageUrl: string;
    description: string;
    price: number;
    ingredients: Ingredient[];
};

export type Ingredient = {
    Name: string;
    IsIncluded: boolean;
};

export type Cocktail = {
    CocktailName: string;
    CocktailId: string;
    Description: string;
    Price: number;
    ImgUrl: string;
};

export type Extra = {
    Id: number;
    Name: string;
    Price: number;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Order = {
    OrderId: number;
    Meal: Meal;
    Cocktail?: Cocktail;
    Protein?: Extra;
    Side?: Extra;
};

export interface DrinkDetailsResponse {
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

export const mapDrinkDetailsWithCocktail = (response: DrinkDetailsResponse) => {
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
        Description: [
            "This is",
            drink.strAlcoholic[0].toLowerCase() === "a" ? "an" : "a",
            drink.strAlcoholic,
            drink.strCategory,
            "with the ingredients",
            ...ingredients.map((ingredient, index) =>
                index === ingredients.length - 2
                    ? ingredient + " and"
                    : index !== ingredients.length - 1
                    ? ingredient + ","
                    : ingredient + "."
            ),
            "It is served in a",
            drink.strGlass + ".",
        ].join(" "),
        Price: getDrinkPrice(drink.idDrink),
        ImgUrl: drink.strDrinkThumb,
    };
    return cocktail;
};

const getDrinkPrice = (drinkId: string) => {
    switch (drinkId) {
        case "11000":
            return 85;
        case "11002":
            return 105;
        case "11007":
            return 95;
        case "178369":
            return 120;
        case "12572":
            return 100;
        case "15801":
            return 110;
        case "11938":
            return 90;
        case "13847":
            return 115;
        case "11410":
            return 125;
        case "12198":
            return 80;
        case "11422":
            return 130;
        case "13731":
            return 100;
        case "12690":
            return 85;
        default:
            return 125;
    }
};
