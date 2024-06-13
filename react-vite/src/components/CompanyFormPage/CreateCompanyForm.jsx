import CreateCompanyPage from "./CompanyForm"

const CreateCompanyForm = () => {
  const newCompany = {
    address: '',
    city: '',
    state: '',
    zip_code: '',
    name: '',
    description: '',
    price: '',
    email: '',
    website: '',
    phone: '',
    category_id: '',
    set_hours: '',
    mon_open: '',
    mon_close: '',
    tue_open: '',
    tue_close: '',
    wed_open: '',
    wed_close: '',
    thu_open: '',
    thu_close: '',
    fri_open: '',
    fri_close: '',
    sat_open: '',
    sat_close: '',
    sun_open: '',
    sun_close: ''
  }
  return (
    <CreateCompanyPage
      company={newCompany}
      formType="Create Company"
    />
  )
}

export default CreateCompanyForm;
