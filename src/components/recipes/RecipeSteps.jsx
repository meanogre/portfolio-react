const RecipeStepsNode = ({node}) => {
    if (!node || (node.netNeeded ?? 0) <= 0)
        return null;

    return (
        <li className="recipeStepNode">
            <div className="recipeStepLine">
                Make <b>{node.name}</b>: {node.netNeeded} needed
                {" "}({node.craftsNeeded} craft{node.craftsNeeded === 1 ? "" : "s"})
                {node.outputQty > 1 ? <> , yields {node.outputQty} each</> : null}
            </div>

            {node.ingredients?.length ? (
                <ul className="recipeStepChildren">
                    {node.ingredients.map((ingredient) => {
                        if (ingredient.kind === "make" && ingredient.node) {
                            return (
                                <RecipeStepsNode
                                    key={ingredient.id}
                                    node={ingredient.node}
                                />
                            );
                        }

                        if ((ingredient.netQty ?? ingredient.qty ?? 0) <= 0)
                            return null;

                        return (
                            <li key={ingredient.id} className="recipeStepLeaf">
                                {ingredient.name}: {ingredient.netQty ?? ingredient.qty}
                                {" "}({ingredient.kind})
                            </li>
                        );
                    })}
                </ul>
            ) : null}
        </li>
    );
};

const RecipeSteps = ({root}) => {
    if (!root)
        return null;

    return (
        <section className="recipeStepsCard">
            <div className="recipeListHeader">
                <h4 className="recipeListTitle">Crafting Steps</h4>
            </div>

            <ul className="recipeStepsTree">
                <RecipeStepsNode node={root} />
            </ul>
        </section>
    );
};

export default RecipeSteps;