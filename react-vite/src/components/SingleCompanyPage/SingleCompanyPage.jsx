import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadACompanyThunk } from "../../redux/companies";
import { useEffect, useRef, useState } from "react";
import './SingleCompany.css';
import CompanyDetails from "./CompanyDetails";
import CompanyContactCard from "./CompanyContactCard";
import ImagesModal from "../ImagesModal/ImagesModal";
import OpenModalButton from "../OpenModalButton";
import { getTodaysHours } from "../../utils";
// import { fetchGeocode } from '../../redux/maps';


function SingleCompanyPage() {
    const { companyId } = useParams();
    const dispatch = useDispatch();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
    const [isTablet, setIsTablet] = useState(window.innerWidth >= 481 && window.innerWidth <= 768);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 769);

    const company = useSelector(state => (
        state.companies[companyId]
    ))


    useEffect(() => {
        const runDispatches = async () => {
            dispatch(loadACompanyThunk(companyId));
        };
        runDispatches();
    }, [dispatch, companyId])



    const handleResize = () => {
        setIsMobile(window.innerWidth <= 480);
        setIsTablet(window.innerWidth >= 481 && window.innerWidth <= 768);
        setIsDesktop(window.innerWidth >= 769);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    }, []);

    const reviewStars = (numStars) => {
        let toolsFilled = [];
        let toolsNotFilled = []

        for (let i = 0; i < parseInt(numStars); i++) {
            toolsFilled.push(<span className="paws-filled"><i className="fa-solid fa-paw"></i> </span>)
        }

        let remaining_paws = 5 - numStars
        let remainder = numStars - parseInt(numStars)

        if (remainder > 0.3 && remainder < 0.79) {
            toolsNotFilled.push(<span className="paws-half-span"><img className="paws-half" src='../../images/half-paw.png' /></span>)
        } else if (remainder > 0.79) {
            toolsFilled.push(<span className="paws-filled"><i className="fa-solid fa-paw"></i> </span>)
        }

        if (toolsNotFilled.length === 0) {
            for (let i = 0; i < (5 - toolsFilled.length); i++) {
                toolsNotFilled.push(<span className="paws-unfilled"><i className="fa-solid fa-hammer"></i> </span>)
            }
        } else {
            for (let i = 0; i < parseInt(remaining_paws); i++) {
                toolsNotFilled.push(<span className="paws-unfilled"><i className="fa-solid fa-hammer"></i> </span>)
            }
        }


        return [toolsFilled, toolsNotFilled]
    }

    const totalImages = (companyImages, reviewImages) => {
        if (companyImages && reviewImages) {
            return companyImages.length + reviewImages.length;
        }
        else if (companyImages && !reviewImages) {
            return companyImages.length;
        }
        else if (reviewImages && !companyImages) {
            return reviewImages;
        }
    }

    const reviewAvg = (avg) => {
        let int = +(avg)
        let five = 5.0
        if (int >= 4.75) {
            return five.toFixed(1)
        }
        if (int !== null) {
            return int.toFixed(1);
        } else {
            return int
        }
    }

    const locationHoursSection = useRef(null)

    const scrollTo = (section) => {
        window.scrollTo({
            top: section.current.offsetTop,
            behavior: "smooth",
        });
    };



    return (company && company.company_images &&
        <>
            <div className="businessPhotoHeader">
                {company.company_images?.[0] ? (
                    <img src={company.company_images?.[0]?.image_url
                    }
                        className="businessPhotoHeaderImg" />
                ) : (
                    <img src='../../images/default_business.jpeg'
                        className="businessPhotoHeaderImg" />
                )}

                <div className="businessHeader">
                    <div>
                        <h1>{company.name}</h1>

                        {company.reviews?.num_reviews === 0 &&
                            <p className="businessReviews_first">
                                <span className="paws-unfilled"><i className="fa-solid fa-hammer" /></span>&nbsp; Be the first to review!
                            </p>
                        }
                        {company.reviews?.num_reviews > 1 &&
                            <p className="businessReviews">
                                <div className="pawBlock">
                                    {company.reviews.avg_stars &&
                                        reviewStars(company.reviews.avg_stars)}</div>
                                &nbsp;&nbsp; {company.reviews.avg_stars && reviewAvg(company.reviews.avg_stars)}
                                &nbsp;({company.reviews.num_reviews} reviews)
                            </p>
                        }
                        {company.reviews?.num_reviews === 1 &&
                            <p className="businessReviews">
                                <span className="pawBlock">
                                    {company.reviews.avg_stars &&
                                        reviewStars(company.reviews.avg_stars)}</span>
                                &nbsp;&nbsp; {company.reviews.avg_stars && reviewAvg(company.reviews.avg_stars)}
                                &nbsp;({company.reviews.num_reviews} review)
                            </p>
                        }

                        {!company.price ? (

                            <p className="priceSubcat">{company.category?.name}
                            </p>
                        ) : (
                            <p className="priceSubcat">{company.price} &nbsp;&#183;&nbsp; {company.category?.name}
                            </p>
                        )
                        }

                        <div className="currHours">
                            {company.set_hours === "yes" && getTodaysHours(company) &&
                                <span className="currHoursSection">
                                    <span>
                                        <span style={{
                                            color: "#0BDA51"
                                        }}>Open Today&nbsp;&nbsp;</span>{getTodaysHours(company).open} - {getTodaysHours(company).close}&nbsp;&nbsp;
                                    </span>
                                    <span className="seeHours" onClick={() => scrollTo(locationHoursSection)}>See hours</span>
                                </span>
                            }
                            {company.set_hours === "yes" && !getTodaysHours(company) &&
                                <span className="currHoursSection">
                                    <span style={{
                                        color: "#FF474C"
                                    }}>Closed Today&nbsp;</span> <span className="seeHours" onClick={() => scrollTo(locationHoursSection)}>See hours</span>
                                </span>
                            }

                        </div>
                    </div>
                    <div className="seeAllPhotosSection">
                        <div className="seeAllPhotos">
                            {company.company_images && totalImages(company.company_images, company.review_images) === 1 ? (
                                <OpenModalButton
                                    buttonText="See 1 photo"
                                    modalComponent={<ImagesModal companyId={companyId} modalLoad={true} />}
                                />
                            ) : (<OpenModalButton
                                buttonText={`See all ${totalImages(company.company_images, company.review_images)} photos`}
                                modalComponent={<ImagesModal companyId={companyId} modalLoad={true} />}
                            />)
                            }
                        </div>
                    </div>
                </div>
            </div >
            <div className="businessContainer">
                <CompanyDetails company={company} companyId={companyId} locationHoursSection={locationHoursSection} isMobile={isMobile} isTablet={isTablet} />
                {isDesktop && <CompanyContactCard company={company} isDesktop={isDesktop} />}
            </div>
        </>
    )
}

export default SingleCompanyPage
