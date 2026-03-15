const RecipeFavoritesPanel = ({
    favoriteRecipes,
    onOpenFavorite,
    onRemoveFavorite,
}) => {
    return (
        <section className="recipePanel">
            <h3>Favorites</h3>
            {favoriteRecipes.length ? (
                <ul className="recipeList">
                    {favoriteRecipes.map((recipe) => (
                        <li key={recipe.id} className="recipeListItem recipeFavoriteItem">
                            <button
                                type="button"
                                className="recipeFavoriteRemove"
                                onClick={() => onRemoveFavorite(recipe.id)}
                                aria-label={`Remove ${recipe.name} from favorites`}
                                title="Remove favorite"
                            >
                                ×
                            </button>

                            <button
                                type="button"
                                className="recipeFavoriteLink"
                                onClick={() => onOpenFavorite(recipe)}
                            >
                                {recipe.name}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No favorites yet.</p>
            )}
        </section>
    );
};

export default RecipeFavoritesPanel;