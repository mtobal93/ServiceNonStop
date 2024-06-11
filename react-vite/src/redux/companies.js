const LOAD_ALL_COMPANIES = 'companies/load_all_companies'
const LOAD_A_COMPANY = 'companies/load_a_company'
const LOAD_CURR_COMPANIES = 'companies/load_curr_companies'
const CREATE_COMPANY = 'companies/create_company'
const CREATE_COMPANY_IMAGES = 'companies/create_company_images'
const UPDATE_COMPANY = 'companies/update_company'
const DELETE_COMPANY = 'companies/delete_company'

export const loadAllCompanies = ( companies ) => (
    {
        type: LOAD_ALL_COMPANIES,
        companies
    }
)

export const loadACompany = ( company ) => (
    {
        type: LOAD_A_COMPANY,
        company
    }
)

export const loadCurrCompanies = ( companies ) => (
    {
        type: LOAD_CURR_COMPANIES,
        companies
    }
)

export const createCompany = ( newCompany ) => (
    {
        type: CREATE_COMPANY,
        newCompany
    }
)

export const createCompanyImages = ( post ) => (
    {
        type: CREATE_COMPANY_IMAGES,
        post
    }
)

export const updateTheCompany = ( updatedCompany ) => (
    {
        type: UPDATE_COMPANY,
        updatedCompany
    }
)

export const deleteCompany = ( companyId ) => (
    {
        type: DELETE_COMPANY,
        companyId
    }
)

//! THUNKS

export const loadAllCompaniesThunk = () => async ( dispatch ) => {
    const res = await fetch('/api/companies')

    if (!res.ok) {
        const errors = await res.json()
        return errors
    } else if ( res.ok ) {
        const companies = await res.json()
        dispatch(loadAllCompanies(companies))
        return companies
    }
}

export const loadACompanyThunk = ( companyId ) => async ( dispatch ) => {
    const res = await fetch(`/api/companies/${companyId}`)

    if ( !res.ok ) {
        const errors = await res.json()
        return errors
    } else if ( res.ok ) {
        const company = await res.json()
        dispatch(loadACompany(company))
        return company
    }
}

export const loadCurrCompaniesThunk = () => async ( dispatch ) => {
    const res = await fetch('/api/companies/current')

    if ( !res.ok ) {
        const errors = await res.json()
        return errors
    } else if ( res.ok ) {
        const companies = await res.json()
        dispatch(loadCurrCompanies(companies))
        return companies
    }
}

export const createCompanyThunk = ( company ) => async ( dispatch ) => {
    const res = await fetch(`/api/companies/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify( company )
    })

    if ( !res.ok ) {
        const errors = await res.json()
        return errors
    } else if ( res.ok ) {
        const newCompany = await res.json()
        dispatch(createCompany(newCompany))
        return newCompany
    }
}

export const createCompanyImage = (post) => async (dispatch) => {
    const res = await fetch(`/api/images/`, {
        method: "POST",
        body: post
    });


    if (res.ok) {
        const post = await res.json();
        dispatch(createCompanyImages(post));

    } else {
        console.log("There was an error making your post!")
    }
};

export const updateCompanyThunk = ( company ) => async ( dispatch ) => {
    const res = await fetch(`/api/companies/${company.id}/edit`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify( company )
    })

    if ( !res.ok ) {
        const errors = await res.json()
        return errors
    } else if ( res.ok ) {
        const updatedCompany = await res.json()
        dispatch(updateTheCompany(updatedCompany))

        return updatedCompany
    }
} 

export const deleteCompanyThunk = ( companyId ) => async ( dispatch ) => {
    const res = await fetch(`/api/companies/${companyId}`, {
        method: "DELETE"
    })

    if ( !res.ok ) {
        const errors = await res.json()
        return errors
    } else if ( res.ok ) {
        dispatch(deleteCompany(companyId))
    }
}

//! REDUCER

const companiesReducer = ( state = {}, action) => {
    switch (action.type) {
        case LOAD_ALL_COMPANIES: {
            const companiesState = {...state}
            action.companies.companies.forEach(company => {
                companiesState[company.id] = company;
            })
            return companiesState
        }
        case LOAD_A_COMPANY: {
            const companyState = {}
            action.company.company.forEach(company => {
                companyState[company.id] = company
            })
            return companyState
        }
        case LOAD_CURR_COMPANIES: {
            const companiesState = {}
            action.companies.companies.forEach(company => {
                companiesState[company.id] = company;
            })
            return companiesState
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
        case DELETE_COMPANY: {
            const newState = { ...state }
            delete newState[action.companyId]
            return newState
        }
        default:
            return { ...state }
    }
}

export default companiesReducer;