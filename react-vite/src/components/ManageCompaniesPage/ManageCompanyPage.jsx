import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCurrCompaniesThunk } from "../../redux/companies";
import { Link } from "react-router-dom";
import "./ManageCompany.css"
import ManageCompanyButton from "./ManageCompanyButton";
import { getTodaysHours } from "../../utils";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";

function ManageCompanyPage() {

  const dispatch = useDispatch();

  const companies = Object.values(useSelector(state => state.companies))

  const sessionUser = Object.values(useSelector(state => state.session.user ? state.session.user : []))


  useEffect(() => {
    dispatch(loadCurrCompaniesThunk())
  }, [dispatch])



  const starReviews = (numStars) => {

    let filledStars = []
    let emptyStars = []


    for (let i = 0; i < parseInt(numStars); i++) {
      filledStars.push(<span className='paws-filled' style={{ fontSize: "large" }}><i className="fa-solid fa-paw" />&nbsp;</span>)
    }

    let empty = 5 - numStars
    let remainder = numStars - parseInt(numStars)


    if (remainder > 0.3 && remainder < 0.79) {
      emptyStars.push(<span className="paws-half-span"><img className="paws-half-biz" src='../../images/half-paw.png' /></span>)
    } else if (remainder > 0.79) {
      filledStars.push(<span className='paws-filled' style={{ fontSize: "large" }}><i className="fa-solid fa-paw" />&nbsp;</span>)
    }

    if (emptyStars.length === 0) {
      for (let i = 0; i < (5 - filledStars.length); i++) {
        emptyStars.push(<span className='paws-unfilled' style={{ fontSize: "large" }}><i className="fa-solid fa-paw" />&nbsp;</span>)
      }
    } else {
      for (let i = 0; i < parseInt(empty); i++) {
        emptyStars.push(<span className='paws-unfilled' style={{ fontSize: "large" }}><i className="fa-solid fa-paw" />&nbsp;</span>)
      }
    }

    return [filledStars, emptyStars]
  }

  const starsToFixed = (stars) => {
    let int = +(stars)
    if (int >= 1) {
      return int.toFixed(1)
    } else {
      return false
    }
  }


  const reviewsExists = (review) => {
    if (review === 1) {
      return '(' + review + ' ' + 'review' + ')'
    }
    if (review >= 1) {
      return '(' + review + ' ' + 'reviews' + ')'
    }
    return false
  }

  const descriptionTextSubstr = (text) => {
    if (text.length > 85) {
      return text.substring(0, 85) + "..."
    } else {
      return text
    }
  }

  return (
    <div className="manBizPage">
      <h1>Your Companies on Service Non Stop</h1>
      {sessionUser.length === 0 ? (
        <span className="login-prompt">
          <OpenModalMenuItem
            itemText={<span className="modalLink">Log in</span>}
            modalComponent={<LoginFormModal />}
          />
          &nbsp;to view this page.
          <img src="/images/icons/tearcouch.png" />
        </span>
      ) : (
        companies && companies.length > 0 ? (
          companies.map((company, index) => (
            <div key={company.id} className="bizandbutton">
              <Link style={{ textDecoration: "none" }} className="manBizCards" to={`/companies/${company.id}`}>
                <span className="businessesImageWrapper">

                  {company.image ? (
                    <img className="businessesImage" src={company.image} alt={company.name} />
                  ) : (
                    <img className="businessesImage" src='../../images/default_business.jpeg' alt={company.name} />
                  )}

                </span>
                <span className="businessDeets">
                  <h2>{index + 1}.&nbsp;{company.name}</h2>
                  {company.avg_stars && company.num_reviews && reviewsExists(company.num_reviews) && (
                    <span className="searchStars">
                      {company?.avg_stars && starReviews(company.avg_stars)}
                      &nbsp;{company?.avg_stars && starsToFixed(company.avg_stars)}
                      &nbsp;{company.num_reviews >= 1 && reviewsExists(company.num_reviews)}
                    </span>
                  )}
                  {!company.price ? (

                    <p className="priceSubcat">{company.category?.name}
                    </p>
                  ) : (
                    <p className="priceSubcat">{company.price} &nbsp;&#183;&nbsp; {company.category?.name}
                    </p>
                  )
                  }
                  {getTodaysHours(company) && (
                    <span className="todayHours">
                      <span style={{ fontWeight: '600' }}>Today&apos;s Hours:</span> {getTodaysHours(company).open} - {getTodaysHours(company).close}
                    </span>
                  )}
                  <span className="recent-review-text">{company.description && descriptionTextSubstr(company.description)}</span>
                </span>
              </Link>
              <div className="manbutton">
                <ManageCompanyButton company={company} />
              </div>
            </div>
          ))
        ) : (
          <div className='no-biz'>
            <div>It looks like you don&apos;t have any companies listed on The Paw.</div>
            &nbsp;
            <Link to={'/companies/new'}>Add your company to Service Non Stop!</Link>
          </div>
        )
      )}
    </div>
  )
}

export default ManageCompanyPage
