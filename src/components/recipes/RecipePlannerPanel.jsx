import RecipePlanSection from "./RecipePlanSection.jsx";
import RecipeSteps from "./RecipeSteps.jsx";

const RecipePlannerPanel = ({
    quantity,
    selectedRecipe,
    plan,
    isFavorite,
    onToggleFavorite,
    displayedMakeEntries,
    ownedItems,
    setOwnedItems,
    setDisplayMakeEntries,
    recipeId,
}) => {
    return (
        <section className="recipePanel">
            <h3>Planner</h3>

            {selectedRecipe && plan ? (
                <>
                    <div className="recipePlannerHeader">
                        <p>
                            Planning <b>{quantity}</b> of <b>{selectedRecipe.name}</b>
                        </p>

                        <button
                            type="button"
                            className="recipeFavoriteButton"
                            onClick={onToggleFavorite}
                        >
                            {isFavorite ? "★ Favorited" : "☆ Add Favorite"}
                        </button>
                    </div>

                    <RecipePlanSection
                        title="Make"
                        entries={displayedMakeEntries}
                        ownedItems={ownedItems}
                        setOwnedItems={setOwnedItems}
                        setDisplayMakeEntries={setDisplayMakeEntries}
                        hideOwnedForId={recipeId}
                        showOwned
                        tone="make"
                        renderEntryText={(entry) => (
                            <>
                                {entry.name}: {entry.totalNeededQty} needed ({entry.qty} craft{entry.qty === 1 ? "" : "s"})
                            </>
                        )}
                    />

                    <RecipePlanSection
                        title="Gather"
                        entries={Object.values(plan.totals.gather)}
                        ownedItems={ownedItems}
                        setOwnedItems={setOwnedItems}
                        tone="gather"
                        renderEntryText={(entry) => (
                            <>
                                {entry.name}: {entry.qty}
                            </>
                        )}
                    />

                    <RecipePlanSection
                        title="Buy"
                        entries={Object.values(plan.totals.buy)}
                        ownedItems={ownedItems}
                        setOwnedItems={setOwnedItems}
                        tone="buy"
                        renderEntryText={(entry) => (
                            <>
                                {entry.name}: {entry.qty}
                            </>
                        )}
                    />

                    <RecipePlanSection
                        title="Other Profession"
                        entries={Object.values(plan.totals.other)}
                        ownedItems={ownedItems}
                        setOwnedItems={setOwnedItems}
                        tone="other"
                        renderEntryText={(entry) => (
                            <>
                                {entry.name}: {entry.qty}
                            </>
                        )}
                    />

                    <RecipeSteps root={plan.root} />
                    {/*<pre>{JSON.stringify(plan, null, 2)}</pre>*/}
                </>
            ) : (
                <p>Select a recipe to begin.</p>
            )}
        </section>
    );
};

export default RecipePlannerPanel;