const RecipePlanSection = ({
    title,
    entries,
    ownedItems,
    setOwnedItems,
    setDisplayMakeEntries = null,
    hideOwnedForId = null,
    showOwned = false,
    renderEntryText,
    tone = "default",
}) => {
    return (
        <section className={`recipeListCard recipeListCard--${tone}`}>
            <div className="recipeListHeader">
                <h4 className="recipeListTitle">{title}</h4>
                <span className="recipeListCount">{entries.length}</span>
            </div>

            {entries.length ? (
                <ul className="recipeList">
                    {entries.map((entry) => (
                        <li key={entry.id} className="recipeListItem">
                            {showOwned && entry.id !== hideOwnedForId ? (
                                <div className="recipeMakeRow">
                                    <div className="recipeListText">
                                        {renderEntryText(entry)}
                                    </div>

                                    <div className="recipeOwnedRow">
                                        <label className="recipeOwnedLabel">
                                            <span>On hand:</span>
                                            <input
                                                className="recipeOwnedInput"
                                                type="number"
                                                min="0"
                                                value={ownedItems[entry.id] ?? 0}
                                                onChange={(e) => {
                                                    setOwnedItems((prev) => ({
                                                        ...prev,
                                                        [entry.id]: Number(e.target.value) || 0,
                                                    }));

                                                    if (setDisplayMakeEntries) {
                                                        setDisplayMakeEntries((prev) => ({
                                                            ...prev,
                                                            [entry.id]: entry,
                                                        }));
                                                    }
                                                }}
                                            />
                                        </label>

                                        <span className="recipeStillNeed">
                                            Still need: {entry.neededQty ?? entry.qty ?? 0}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="recipeListText">
                                    {renderEntryText(entry)}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="recipeListEmpty">None</p>
            )}
        </section>
    );
};

export default RecipePlanSection;