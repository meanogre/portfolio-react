const RecipeSelectionPanel = ({
    tiers,
    tierId,
    tierRecipes,
    recipeId,
    recipes,
    quantity,
    onTierChange,
    onRecipeChange,
    onQuantityChange,
}) => {
    return (
        <section className="recipePanel">
            <h3>Recipes</h3>
                <div className="recipeField">
                    <label htmlFor="recipe-tier">Tier</label>
                    <select
                        id="recipe-tier"
                        className="recipeInput"
                        value={tierId}
                        onChange={(e) => onTierChange(e.target.value)}
                    >
                        <option value="">Select Tier</option>
                        {tiers.map(tier => (
                            <option key={tier.id} value={tier.id}>
                                {tier.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="recipeField">
                    <label htmlFor="recipe-select">Recipe</label>
                    <select
                        id="recipe-select"
                        className="recipeInput"
                        value={recipeId}
                        onChange={(e) => onRecipeChange(e.target.value)}
                        disabled={!tierId}
                    >
                        <option value="">Select Recipe</option>

                        {tierRecipes.map((id) => {
                            const recipe = recipes[id];

                            return (
                                <option key={id} value={id}>
                                    {recipe.name}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="recipeField">
                    <label htmlFor="recipe-quantity">Quantity</label>
                    <input
                        id="recipe-quantity"
                        className="recipeInput"
                        type="number"
                        min="1"
                        value={quantity}
                        disabled={!recipeId}
                        onChange={(e) => onQuantityChange(Number(e.target.value) || 1)}
                    />
                </div>
        </section>
    );
};

export default RecipeSelectionPanel;
