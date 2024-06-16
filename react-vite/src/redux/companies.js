const LOAD_A_COMPANY = 'companies/LOAD_A_COMPANY'
const CREATE_COMPANY = 'companies/CREATE_COMPANY'
const CREATE_COMPANY_IMAGES = 'companies/CREATE_COMPANY_IMAGES'
const UPDATE_COMPANY = 'companies/UPDATE_COMPANY'
const LOAD_CURR_COMPANIES = 'companies/LOAD_CURR_COMPANIES'
const DELETE_COMPANIES = 'companies/DELETE_COMPANIES'
const LOAD_ALL_COMPANIES = 'companies/LOAD_ALL_COMPANIES'

export const loadCurrCompanies = (companies) => ({
    type: LOAD_CURR_COMPANIES,
    companies
})

export const loadACompany = (company) => ({
    type: LOAD_A_COMPANY,
    company
})

export const createCompany = (company) => ({
    type: CREATE_COMPANY,
    company
})

export const createCompanyImages = (post) => ({
    type: CREATE_COMPANY_IMAGES,
    post
})

export const updateCompany = (company) => ({
    type: UPDATE_COMPANY,
    company
})

export const deleteCompany = (companyId) => ({
    type: DELETE_COMPANIES,
    companyId
})
export const loadAllCompanies = (companies) => ({
    type: LOAD_ALL_COMPANIES,
    companies

})

// THUNK

export const loadACompanyThunk = (companyId) => async (dispatch) => {
    const response = await fetch(`/api/companies/${companyId}`)

    if (response.ok) {
        const company = await response.json();
        dispatch(loadACompany(company))
        return company
    }
}

export const createCompanyThunk = (company) => async (dispatch) => {
    const response = await fetch('/api/companies/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(company)
    })

    if (response.ok) {
        const newCompany = await response.json();
        dispatch(createCompany(newCompany));
        return newCompany
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const createCompanyImageThunk = (post) => async (dispatch) => {
    const response = await fetch(`/api/images/`, {
        method: "POST",
        body: post
    });

    if (response.ok) {
        const resPost = await response.json();
        dispatch(createCompanyImages(resPost));
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const updateCompanyThunk = (company) => async (dispatch) => {
    const response = await fetch(`/api/companies/${company.id}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(company)
    });
    if (response.ok) {
        const updatedComp = await response.json();
        dispatch(updateCompany(updatedComp));
        return updatedComp;
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const loadCurrCompaniesThunk = () => async (dispatch) => {
    const response = await fetch(`/api/companies/current`)

    if (response.ok) {
        const companies = await response.json();
        dispatch(loadCurrCompanies(companies))
        return companies
    } else {
        const errors = await response.json()
        return errors;
    }
}

export const deleteCompanyThunk = (companyId) => async (dispatch) => {
    const response = await fetch(`/api/companies/${companyId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(deleteCompany(companyId));
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const loadAllCompaniesThunk = () => async (dispatch) => {
    const response = await fetch('/api/companies')

    if (response.ok) {
        const companies = await response.json();
        dispatch(loadAllCompanies(companies))
        return companies
    } else {
        const errors = await response.json();
        return errors;
    }
}

// REDUCER

const companiesReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_A_COMPANY: {
            const companyState = {}
            action.company.company.forEach(company => {
                companyState[company.id] = company
            })
            return companyState
        }
        case LOAD_ALL_COMPANIES: {
            const companyState = { ...state }
            action.companies.companies.forEach(company => {
                companyState[company.id] = company;
            })
            return companyState
        }
        case CREATE_COMPANY: {
            const companyState = {}
            companyState[action.company.id] = action.company
            return companyState
        }
        case CREATE_COMPANY_IMAGES: {
            const imageState = { "images": [] }
            imageState["images"] = [action.post.image]
            return imageState
        }
        case LOAD_CURR_COMPANIES: {
            const companyState = {}
            action.companies.companies.forEach(company => {
                companyState[company.id] = company;
            })
            return companyState
        }
        case DELETE_COMPANIES: {
            const newState = { ...state }
            delete newState[action.companyId]
            return newState
        }
        default:
            return { ...state }
    }
}

export default companiesReducer;
