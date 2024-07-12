import SingleCompanyReviews from "./SingleCompanyReviews";
import OpenModalButton from "../OpenModalButton";
import AddImageToCompany from "../AddImageToCompany/AddImageToCompany";
import { stdTimeFormat } from "../../utils";
import { useSelector } from "react-redux";
import LoginFormModal from "../LoginFormModal";
import CreateReviewPage from "../ReviewForms/CreateReviewPage";

import CompanyContactCard from "./CompanyContactCard";
// import CompanyMap from "./CompanyMap";

import ShareModal from "../ShareModal";
import { useState } from "react";

function CompanyDetails({
    company,
    companyId,
    locationHoursSection,
    isMobile,
    isTablet,
}) {
    const sessionUser = useSelector((state) => state.session.user);
    const reviews = Object.values(useSelector((state) => state.reviews));
    const reviewerIds = reviews.map((review) => review.user_id);
    const [isDesktop, setIsDesktop] = useState(true);

    const getDirections = () => {
        return (
            <a href="https://www.google.com/maps/dir/?api=1&destination=31251+Lily+St+Union+City+CA+94587" />
        );
    };
    getDirections;

    return (
        <div className="businessDetails">
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
                                <div>
                                    {company.city}, {company.state}{" "}
                                    {company.zip_code}
                                </div>
                            </div>
                            <div>
                                {company.address && company.city ? (
                                    <span className="bizDeetsButton">
                                        <button>
                                            <a
                                                href={`https://www.google.com/maps/dir/?api=1&destination=${company.address}+${company.city}+${company.state}+${company.zip_code}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    textDecoration: "none",
                                                    color: "#1f2f44",
                                                }}
                                            >
                                                Get Directions
                                            </a>
                                        </button>
                                    </span>
                                ) : (
                                    <span className="bizDeetsButton">
                                        <button>
                                            <a
                                                href={`https://www.google.com/maps/dir/?api=1&destination=${company.city}+${company.state}+${company.zip_code}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    textDecoration: "none",
                                                    color: "#1f2f44",
                                                }}
                                            >
                                                Get Directions
                                            </a>
                                        </button>
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="businessDetailsHours">
                        {company.set_hours === "yes" && company.hours && (
                            <div className="hours">
                                <span style={{ paddingRight: "10px" }}>
                                    Mon
                                </span>
                                <span>
                                    {stdTimeFormat(company.hours.mon_open)}
                                </span>
                                <span>-</span>
                                <span>
                                    {stdTimeFormat(company.hours.mon_close)}
                                </span>

                                <span>Tues</span>
                                <span>
                                    {stdTimeFormat(company.hours.tues_open)}
                                </span>
                                <span>-</span>
                                <span>
                                    {stdTimeFormat(company.hours.tues_close)}
                                </span>

                                <span>Wed</span>
                                <span>
                                    {stdTimeFormat(company.hours.wed_open)}
                                </span>
                                <span>-</span>
                                <span>
                                    {stdTimeFormat(company.hours.wed_close)}
                                </span>

                                <span>Thu</span>
                                <span>
                                    {stdTimeFormat(company.hours.thu_open)}
                                </span>
                                <span>-</span>
                                <span>
                                    {stdTimeFormat(company.hours.thu_close)}
                                </span>

                                <span>Fri</span>
                                <span>
                                    {stdTimeFormat(company.hours.fri_open)}
                                </span>
                                <span>-</span>
                                <span>
                                    {stdTimeFormat(company.hours.fri_close)}
                                </span>

                                <span>Sat</span>
                                <span>
                                    {stdTimeFormat(company.hours.sat_open)}
                                </span>
                                <span>-</span>
                                <span>
                                    {stdTimeFormat(company.hours.sat_close)}
                                </span>

                                <span>Sun</span>
                                <span>
                                    {stdTimeFormat(company.hours.sun_open)}
                                </span>
                                <span>-</span>
                                <span>
                                    {stdTimeFormat(company.hours.sun_close)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <hr />

                <div className="compDetailsIcons">
                    <CompanyContactCard
                        company={company}
                        isDesktop={isDesktop}
                    />
                </div>

                <hr />

                <div className="businessDetailsButtons">
                    <div>
                        <h1 className="result-word">Reviews:</h1>

                        <span className="businessDetails_writeAReview">
                            {!sessionUser && (
                                <OpenModalButton
                                    buttonText={
                                        <>
                                            <i className="fa-solid fa-hammer" />{" "}
                                            Write a review
                                        </>
                                    }
                                    modalComponent={<LoginFormModal />}
                                />
                            )}
                            {sessionUser &&
                                sessionUser.id !== company.owner_id &&
                                !reviewerIds.includes(sessionUser.id) && (
                                    <OpenModalButton
                                        buttonText={
                                            <>
                                                <i className="fa-solid fa-hammer" />{" "}
                                                Write a review
                                            </>
                                        }
                                        modalComponent={
                                            <CreateReviewPage
                                                propsCompanyId={companyId}
                                                modalLoad={true}
                                            />
                                        }
                                    />
                                )}
                        </span>
                    </div>
                </div>
                {sessionUser?.id !== company.owner_id &&
                company.reviews.num_reviews == 0 ? (
                    <div>Be the first to review!</div>
                ) : (
                    <div>
                        <SingleCompanyReviews
                            company={company}
                            companyId={companyId}
                            sessionUser={sessionUser}
                        />
                    </div>
                )}
                <br />
            </div>
        </div>
    );
}

export default CompanyDetails;
