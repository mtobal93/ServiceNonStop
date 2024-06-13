import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadACompany } from "../../redux/companies";
import CreateCompanyPage from "./CompanyForm";

const EditCompanyForm = () => {

  const { companyId } = useParams();
  const company = useSelector(state => state.companies[companyId])
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadACompany(companyId))
  }, [dispatch, companyId])

  if (!company) return (<>No Company Found</>)

  return (
    Object.keys(company).length > 1 && (
      <>
        <CreateCompanyPage
          company={company}
          formType="Update Company"
        />
      </>
    )
  )
}

export default EditCompanyForm;
