const LOAD_COMPANIES = 'search/LOAD_COMPANIES';
const CLEAR_COMPANIES = 'search/CLEAR_COMPANIES';
const SET_PAGINATION = 'search/SET_PAGINATION';

const loadCompanies = (companies) => ({
    type: LOAD_COMPANIES,
    companies
});

const setPagination = (pagination) => ({
    type: SET_PAGINATION,
    pagination
});

export const clearCompanies = () => ({
    type: CLEAR_COMPANIES
});

// THUNKS
export const getCompanies = (searchQuery, location, filters, page = 1, perPage = 10) => async (dispatch) => {

    let url ='/api/search';
    const queryParams = [];

    if (searchQuery) {
        queryParams.push(`search_query=${searchQuery}`);
    }
    if (location) {
        queryParams.push(`location=${location}`);
    }

    if (filters) {
        let filtered = Object.values(filters)
        queryParams.push(filtered.join(''))

    }

    queryParams.push(`page=${page}`);
    queryParams.push(`per_page=${perPage}`);

    if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
    }
    

    const response = await fetch(url)

    if (response.ok) {
        const data = await response.json();
        dispatch(loadCompanies(data.companies));
        dispatch(setPagination({
            total: data.total,
            pages: data.pages,
            currentPage: data.current_page,
            perPage: data.per_page
        }));

    } else {
        const errors = await response.json();
        return errors;
    }
}


const initialState = {
    companies: {},
    pagination: {
        total: 0,
        pages: 0,
        currentPage: 1,
        perPage: 10
    }
};

// REDUCER
const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_COMPANIES: {
            const newState = { ...state, companies: {} };
            action.companies.forEach((company) => {
                newState.companies[company.id] = company;
            });
            return newState;
        }
        case CLEAR_COMPANIES: {
            return { ...state, companies: {} }
        }
        case SET_PAGINATION: {
            return { ...state, pagination: action.pagination };
        }
        default:
            return state;
    }
};

export default searchReducer;

