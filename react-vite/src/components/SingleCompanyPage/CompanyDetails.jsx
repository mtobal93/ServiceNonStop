import SingleCompanyReviews from "./SingleCompanyReviews";
import OpenModalButton from "../OpenModalButton";
import AddImageToCompany from "../AddImageToCompany/AddImageToCompany";
import { stdTimeFormat } from "../../utils";
import { useSelector } from "react-redux"
import LoginFormModal from "../LoginFormModal";
import CreateReviewPage from "../ReviewForms/CreateReviewPage";
// import CompanyMap from "./CompanyMap";

import ShareModal from "../ShareModal";

function CompanyDetails({ company, companyId, locationHoursSection, isMobile, isTablet }) {
    const sessionUser = useSelector(state => state.session.user)
    const reviews = Object.values(useSelector(state => state.reviews))
    const reviewerIds = reviews.map(review => review.user_id)

    const getDirections = () => {
        return (<a href="https://www.google.com/maps/dir/?api=1&destination=31251+Lily+St+Union+City+CA+94587" />)
    }
    getDirections

    return (
        <div className="businessDetails">
            <div className="businessDetailsButtons">
                <div>
                    <span className="businessDetails_writeAReview">
                        {!sessionUser &&
                            <OpenModalButton
                                buttonText={<>
                                    <i className="fa-solid fa-hammer" /> Write a review</>}
                                modalComponent={<LoginFormModal />}
                            />
                        }
                        {sessionUser && sessionUser.id !== company.owner_id && !reviewerIds.includes(sessionUser.id) &&
                            <OpenModalButton
                                buttonText={<>
                                    <i className="fa-solid fa-hammer" /> Write a review</>}
                                modalComponent={<CreateReviewPage propsCompanyId={companyId} modalLoad={true} />}
                            />
                        }</span>
                    <span className="bizDeetsButton">{!sessionUser &&
                        <OpenModalButton
                            buttonText={<>
                                <i className="fa-solid fa-camera" /> Add photo</>}
                            modalComponent={<LoginFormModal />}
                        />
                    }
                        {sessionUser &&
                            <OpenModalButton
                                buttonText={<>
                                    <i className="fa-solid fa-camera" /> Add photo</>}
                                modalComponent={<AddImageToCompany companyId={companyId} company={company} />}
                            />
                        }</span>
                    <span className="bizDeetsButton">
                        <OpenModalButton
                            buttonText={<>
                                <i className="fa-solid fa-arrow-up-from-bracket" /> Share</>}
                            modalComponent={<ShareModal company={company} />}
                        />
                    </span>
                </div>
                
            </div>
            {(isTablet || isMobile) && (<div className="bizContactMobile">
                {company.website &&
                    <div>
                        <div className="businessWebsiteContainer">
                            <a href={company.website} target="_blank" rel="noopener noreferrer">
                                <div className="businessContactIcon"><i className="fa-solid fa-arrow-up-right-from-square"></i></div>
                                <div>Website</div>
                            </a>
                        </div>
                    </div>
                }
                {company.phone &&
                    <div>
                        <div className="businessPhoneContainer">
                            <a href={`tel:{company.phone}`} target="_blank" rel="noopener noreferrer">
                                <div className="businessContactIcon"><i className="fa-solid fa-phone-volume"></i></div>
                                <div>Call</div>
                            </a>
                        </div>
                    </div>
                }
                {
                    company.city &&
                    <div>
                        {company.address && company.city ? (
                            <div className="businessAddressContainer">
                                <a href={`https://www.google.com/maps/dir/?api=1&destination=${company.address}+${company.city}+${company.state}+${company.zip_code}`} target="_blank" rel="noopener noreferrer">
                                    <div className="businessContactIcon">
                                        <i className="fa-solid fa-diamond-turn-right"></i>
                                    </div>
                                    <div>Directions</div>
                                </a>
                            </div>
                        ) : (
                            <div className="businessAddressContainer">
                                <a href={`https://www.google.com/maps/dir/?api=1&destination=${company.city}+${company.state}+${company.zip_code}`} target="_blank" rel="noopener noreferrer">
                                    <div className="businessContactIcon">
                                        <i className="fa-solid fa-diamond-turn-right"></i>
                                    </div>
                                    <div>Directions</div>
                                </a>
                            </div>
                        )}
                    </div>
                }
            </div >
            )}
            <hr />
            <div>
                <h3>About this Company</h3>
                <span className="review-text">{company.description}</span>
            </div>
            <hr ref={locationHoursSection} />
            <div>
                <h3>Location & Hours</h3>
                <div className="locationHoursContainer">
                    <div className="locationHours">
                        {/* <div className="businessMap"><CompanyMap company={company} /></div> */}
                        <div className="businessMap"></div>
                        <div className="businessDetailsLocation">
                            <div className="businessAddress">
                                <div>{company.address}</div>
                                <div>{company.city}, {company.state} {company.zip_code}</div>
                            </div>
                            <div>
                                {company.address && company.city ? (
                                    <span className="bizDeetsButton"><button><a href={`https://www.google.com/maps/dir/?api=1&destination=${company.address}+${company.city}+${company.state}+${company.zip_code}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#1f2f44" }}>Get Directions</a></button></span>
                                ) : (
                                    <span className="bizDeetsButton"><button><a href={`https://www.google.com/maps/dir/?api=1&destination=${company.city}+${company.state}+${company.zip_code}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#1f2f44" }}>Get Directions</a></button></span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="businessDetailsHours">{company.set_hours === "yes" &&
                        company.hours && (
                            <div className="hours">
                                <span style={{ paddingRight: "10px" }}>Mon</span>
                                <span>{stdTimeFormat(company.hours.mon_open)}</span>
                                <span>-</span>
                                <span>{stdTimeFormat(company.hours.mon_close)}</span>

                                <span>Tues</span>
                                <span>{stdTimeFormat(company.hours.tues_open)}</span>
                                <span>-</span>
                                <span>{stdTimeFormat(company.hours.tues_close)}</span>

                                <span>Wed</span>
                                <span>{stdTimeFormat(company.hours.wed_open)}</span>
                                <span>-</span>
                                <span>{stdTimeFormat(company.hours.wed_close)}</span>

                                <span>Thu</span>
                                <span>{stdTimeFormat(company.hours.thu_open)}</span>
                                <span>-</span>
                                <span>{stdTimeFormat(company.hours.thu_close)}</span>

                                <span>Fri</span>
                                <span>{stdTimeFormat(company.hours.fri_open)}</span>
                                <span>-</span>
                                <span>{stdTimeFormat(company.hours.fri_close)}</span>

                                <span>Sat</span>
                                <span>{stdTimeFormat(company.hours.sat_open)}</span>
                                <span>-</span>
                                <span>{stdTimeFormat(company.hours.sat_close)}</span>

                                <span>Sun</span>
                                <span>{stdTimeFormat(company.hours.sun_open)}</span>
                                <span>-</span>
                                <span>{stdTimeFormat(company.hours.sun_close)}</span>
                            </div>
                        )
                    }
                    </div>
                </div>
                <hr />
            
                <h3>Reviews</h3>
                {sessionUser?.id !== company.owner_id && company.reviews.num_reviews == 0 ? (
                    <div>Be the first to review!</div>
                ) : (
                    <SingleCompanyReviews company={company} companyId={companyId} sessionUser={sessionUser} />
                )}
                <br />
            </div>
        </div >
    )
}

export default CompanyDetails
