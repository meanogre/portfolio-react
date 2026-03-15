import LOTRO_RECIPE_DATA from "./recipesData.js";
import {useEffect, useMemo, useState} from "react";
import {buildRecipePlan} from "./recipePlanner.js";
import "./recipes.css";
import RecipeSelectionPanel from "./RecipeSelectionPanel.jsx";
import RecipeFavoritesPanel from "./RecipeFavoritesPanel.jsx";
import RecipePlannerPanel from "./RecipePlannerPanel.jsx";

const FAVORITES_KEY = "lotro-recipe-favorites";
const loadFavorites = () => {
    try {
        const raw = localStorage.getItem(FAVORITES_KEY);
        if (!raw)
            return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const Recipes = () => {
    const {tiers, recipesByTier, items: recipes} = LOTRO_RECIPE_DATA;

    const [tierId, setTierId] = useState("");
    const [recipeId, setRecipeId] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [ownedItems, setOwnedItems] = useState({});
    const [displayMakeEntries, setDisplayMakeEntries] = useState({});
    const [favorites, setFavorites] = useState(() => loadFavorites());

    useEffect(() => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const tierRecipes = tierId ? recipesByTier[tierId] ?? [] : [];
    const selectedRecipe = recipeId ? recipes[recipeId] : null;
    const plan = recipeId
        ? buildRecipePlan(recipeId, quantity, LOTRO_RECIPE_DATA, ownedItems)
        : null;

    const makeEntries = plan ? Object.values(plan.totals.make) : [];
    const displayedMakeEntries = [
        ...makeEntries,
        ...Object.values(displayMakeEntries).filter(
            (saved) =>
                saved.id !== recipeId &&
                !makeEntries.some((entry) => entry.id === saved.id)
        )
        .map((saved) => ({
            ...saved,
            qty: 0,
            neededQty: 0,
        })),
    ];

    const toggleFavorite = (id) => {
        if (!id)
            return;
        setFavorites((prev) =>
            prev.includes(id)
                ? prev.filter((entry) => entry !== id)
                : [...prev, id]
        );
    };

    const isFavorite = recipeId ? favorites.includes(recipeId) : false;

    const favoriteRecipes = useMemo(() => {
        return favorites
            .map((id) => recipes[id])
            .filter(Boolean)
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [favorites, recipes]);

    return (
        <div className="recipePlanner">
            <aside className="recipeSidebar">
                <RecipeSelectionPanel
                    tiers={tiers}
                    tierId={tierId}
                    tierRecipes={tierRecipes}
                    recipeId={recipeId}
                    recipes={recipes}
                    quantity={quantity}
                    onTierChange={(newTierId) => {
                        setTierId(newTierId);
                        setRecipeId("");
                        setOwnedItems({});
                        setDisplayMakeEntries({});
                        setQuantity(1);
                    }}
                    onRecipeChange={(newRecipeId) => {
                        setRecipeId(newRecipeId);
                        setOwnedItems({});
                        setDisplayMakeEntries({});
                        setQuantity(1);
                    }}
                    onQuantityChange={(newQuantity) => {
                        setQuantity(newQuantity);
                    }}
                />

                <RecipeFavoritesPanel
                    favoriteRecipes={favoriteRecipes}
                    onOpenFavorite={(recipe) => {
                        setTierId(String(recipe.tier));
                        setRecipeId(recipe.id);
                        setOwnedItems({});
                        setDisplayMakeEntries({});
                        setQuantity(1);
                    }}
                    onRemoveFavorite={(id) => {
                        setFavorites((prev) => prev.filter((entry) => entry !== id));
                    }}
                />
            </aside>

            <section className="recipeMain">
                <RecipePlannerPanel
                    quantity={quantity}
                    selectedRecipe={selectedRecipe}
                    plan={plan}
                    isFavorite={isFavorite}
                    onToggleFavorite={() => toggleFavorite(recipeId)}
                    displayedMakeEntries={displayedMakeEntries}
                    ownedItems={ownedItems}
                    setOwnedItems={setOwnedItems}
                    setDisplayMakeEntries={setDisplayMakeEntries}
                    recipeId={recipeId}
                />
            </section>

        </div>
    );
};

export default Recipes;