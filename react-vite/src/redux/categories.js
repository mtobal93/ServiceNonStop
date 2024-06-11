const LOAD_CATEGORIES = "categories/load_categories";

const loadCategories = (categories) => ({
    type: LOAD_CATEGORIES,
    payload: categories,
});

export const getCategoriesThunk = (categories) => async (dispatch) => {
    const res = await fetch(`/api/categories`);

    if (res.ok) {
        const categories = await res.json();

        dispatch(loadCategories(categories));
    }
};

const categoriesReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_CATEGORIES: {
            const categoryState = {};
            action.categories.categories.forEach((category) => {
                categoryState[category.id] = category;
            });
            return categoryState;
        }

        default:
            return {...state}
    }
};


export default categoriesReducer