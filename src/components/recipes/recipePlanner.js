const ceilDiv = (need, yieldCount) => {
    if (yieldCount <= 0)
        return 0;
    return Math.ceil(need / yieldCount);
};

const addBucketQty = (bucket, id, name, qty, extra = {}) => {
    if (!bucket[id]) {
        bucket[id] = {
            id,
            name,
            qty: 0,
            ...extra,
        };
    }
    bucket[id].qty += qty;
};

let sourceKinds = {};

const buildSourceKinds = ( items = {} ) => {
    sourceKinds = {};
    for (const item of Object.values(items)) {
        const source = item?.source;
        if (!source || sourceKinds[source])
            continue;

        if (source === "vendor")
            sourceKinds[source] = "buy";
        else if (source === "gather")
            sourceKinds[source] = "gather";
        else
            sourceKinds[source] = "other";
    }

    return sourceKinds;
};

const initRecipePlanner = (data) => {
    buildSourceKinds(data?.items);
};

export const getItemSection = (item) => {
    const isCraftable = Array.isArray(item?.ingredients) && item.ingredients.length > 0;
    if (isCraftable)
        return "make";
    return sourceKinds[item?.source] ?? "gather";
}

const consumeOwned = (owned, id, neededQty) => {
    const available = owned[id] ?? 0;
    const used = Math.min(available, neededQty);

    owned[id] = available - used;
    return neededQty - used;
};

export const buildRecipePlan = (recipeId, quantity, data, owned = {}) => {
    if (!Object.keys(sourceKinds).length)
        initRecipePlanner(data);

    const { items = {} } = data;
    const remainingOwned = { ...owned };

    const totals = {
        make: {},
        gather: {},
        buy: {},
        other: {},
    };

    const visitRecipe = (id, neededQty) => {
        const recipe = items[id];
        if (!recipe)
            return null;

        const netNeeded = consumeOwned(remainingOwned, id, neededQty);
        if (netNeeded <= 0) {
            return {
                id,
                name: recipe.name,
                neededQty,
                ownedUsed: neededQty,
                netNeeded: 0,
                outputQty: recipe.yield ?? 1,
                craftsNeeded: 0,
                totalProduced: 0,
                ingredients: [],
            };
        }

        const outputQty = recipe.yield ?? 1;
        const craftsNeeded = ceilDiv(netNeeded, outputQty);
        const totalProduced = craftsNeeded * outputQty;

        addBucketQty(totals.make, id, recipe.name, craftsNeeded, {
            outputQty,
            totalProduced,
            neededQty: 0,
            totalNeededQty: 0,
        });

        totals.make[id].neededQty += netNeeded;
        totals.make[id].totalNeededQty += neededQty;

        const ingredients = (recipe.ingredients ?? []).map((ingredient) => {
            const ingredientNeeded = ingredient.qty * craftsNeeded;
            const childRecipe = items[ingredient.id];
            const isCraftable = childRecipe && Array.isArray(childRecipe.ingredients) && childRecipe.ingredients.length > 0;

            if (isCraftable) {
                const childNode = visitRecipe(ingredient.id, ingredientNeeded);

                return {
                    id: ingredient.id,
                    name: childRecipe.name,
                    qty: ingredientNeeded,
                    kind: "make",
                    node: childNode,
                };
            }

            const item = items[ingredient.id];
            const itemName = item?.name ?? ingredient.id;
            const leafKind = getItemSection(item);
            // const leafKind = getLeafKind(item);
            const leafNetNeeded = consumeOwned(remainingOwned, ingredient.id, ingredientNeeded);

            if (leafNetNeeded > 0) {
                addBucketQty(
                    totals[leafKind],
                    ingredient.id,
                    itemName,
                    leafNetNeeded,
                    item?.cost != null ? { cost: item.cost } : {}
                );
            }

            return {
                id: ingredient.id,
                name: itemName,
                qty: ingredientNeeded,
                netQty: leafNetNeeded,
                kind: leafKind,
            };
        });

        return {
            id,
            name: recipe.name,
            neededQty,
            ownedUsed: neededQty - netNeeded,
            netNeeded,
            outputQty,
            craftsNeeded,
            totalProduced,
            ingredients,
        };
    };

    const root = visitRecipe(recipeId, quantity);

    return {
        root,
        totals,
        remainingOwned,
    };
};