const LOAD_COMPANIES = 'search/LOAD_COMPANIES'
const CLEAR_COMPANIES = 'search/CLEAR_COMPANIES'

const loadCompanies = (companies) => ({
    type: LOAD_COMPANIES,
    companies
})

export const clearCompanies = () => ({
    type: CLEAR_COMPANIES
})

// THUNKS
export const fetchBusinesses = (filters = {}) => async (dispatch) => {

    let url ='/api/search/';
    const queryParams = [];


    if (filters) {
        let filtered = Object.values(filters)
        queryParams.push(filtered.join(''))
    }

    if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
    }

    const response = await fetch(url)

    if (response.ok) {
        const companies = await response.json();
        dispatch(loadCompanies(companies))

    } else {
        const errors = await response.json();
        return errors;
    }
}

export const searchBarCompanies = (searchQuery, location) => async (dispatch) => {
    let url ='/api/search/';
    const queryParams = [];

    if (searchQuery) {
        queryParams.push(`search_query=${searchQuery}`);
    }
    if (location) {
        queryParams.push(`location=${location}`);
    }
    if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
    }


    const response = await fetch(url)

    if (response.ok) {

        const companies = await response.json();
        dispatch(loadCompanies(companies))
        return companies
    } else {
        const errors = await response.json();
        return errors;
    }
}

// REDUCER
const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_COMPANIES: {
            const newState = {};
            action.companies.companies.forEach((company) => {
                newState[company.id] = company;
            });
            return newState;
        }
        case CLEAR_COMPANIES: {
            return {}
        }
        default:
            return state;
    }
};

export default searchReducer;
