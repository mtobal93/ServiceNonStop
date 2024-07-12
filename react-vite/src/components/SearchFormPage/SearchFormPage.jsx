import { useDispatch, useSelector } from "react-redux";
import { getCompanies } from "../../redux/search";
import "./SearchForm.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FilterComponent from "./FilterComponent";
import { getTodaysHours } from "../../utils";
import { useEffect, useState } from "react";

function SearchFormPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    const search_query = searchParams.get("search_query");
    const searchLoc = searchParams.get("location");
    const price = searchParams.get("price");
    const rating = searchParams.get("rating");

    const queryParams = new URLSearchParams();
    if (category) queryParams.append("category", category);
    if (price) queryParams.append("price", price);
    if (rating) queryParams.append("rating", rating);
    const filter = queryParams.toString();

    const companies = Object.values(
        useSelector((state) => state.search.companies)
    );
    const { total, pages, currentPage, perPage } = useSelector(
        (state) => state.search.pagination
    );

    const [page, setPage] = useState(1);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
    const [isTablet, setIsTablet] = useState(
        window.innerWidth <= 768 && window.innerWidth >= 481
    );
    const [loading, setLoading] = useState(false);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 480);
        setIsTablet(window.innerWidth <= 768 && window.innerWidth >= 481);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const starReviews = (numStars) => {
        let filledStars = [];
        let emptyStars = [];

        for (let i = 0; i < parseInt(numStars); i++) {
            filledStars.push(
                <span className="paws-filled" style={{ fontSize: "small" }}>
                    <i className="fa-solid fa-hammer" />
                    &nbsp;
                </span>
            );
        }

        let empty = 5 - numStars;
        let remainder = numStars - parseInt(numStars);

        if (remainder > 0.3 && remainder < 0.79) {
            emptyStars.push(
                <span className="paws-half-span">
                    <img
                        className="paws-half-biz"
                        src="../../images/half-hammer.png"
                    />
                </span>
            );
        } else if (remainder > 0.79) {
            filledStars.push(
                <span className="paws-filled" style={{ fontSize: "small" }}>
                    <i className="fa-solid fa-hammer" />
                    &nbsp;
                </span>
            );
        }

        if (emptyStars.length === 0) {
            for (let i = 0; i < 5 - filledStars.length; i++) {
                emptyStars.push(
                    <span
                        className="paws-unfilled"
                        style={{ fontSize: "small" }}
                    >
                        <i className="fa-solid fa-hammer" />
                        &nbsp;
                    </span>
                );
            }
        } else {
            for (let i = 0; i < parseInt(empty); i++) {
                emptyStars.push(
                    <span
                        className="paws-unfilled"
                        style={{ fontSize: "small" }}
                    >
                        <i className="fa-solid fa-hammer" />
                        &nbsp;
                    </span>
                );
            }
        }

        return [filledStars, emptyStars];
    };

    const starsToFixed = (stars) => {
        let int = +stars;
        if (int >= 1) {
            return int.toFixed(1);
        } else {
            return false;
        }
    };

    const reviewsExists = (review) => {
        if (review === 1) {
            return "(" + review + " " + "review" + ")";
        }
        if (review >= 1) {
            return "(" + review + " " + "reviews" + ")";
        }
        return false;
    };

    const reviewTextSubstr = (text) => {
        if (text.length > 85) {
            return text.substring(0, 85) + "...";
        } else {
            return text;
        }
    };

    useEffect(() => {
        const fetchAndSetLoading = () => {
            setLoading(true);
            dispatch(
                getCompanies(search_query, searchLoc, filter, page, perPage)
            )
                .then(() => setTimeout(() => setLoading(false), 2))
                .catch((error) => {
                    console.error(error);
                });
        };

        window.scrollTo(0, 0); // Scroll to top
        fetchAndSetLoading();
    }, [dispatch, page, perPage, filter, search_query, searchLoc]);

    useEffect(() => {
        if (companies.length === 0) setLoading(false);
    }, [companies]);
    // Reset page state when search query or filters change
    useEffect(() => {
        setPage(1);
    }, [search_query, filter, searchLoc, category]);

    const handleFilterChange = (filters) => {
        setPage(1);
        setLoading(true);
        dispatch(getCompanies(search_query, searchLoc, filters, page, perPage))
            .then(() =>
                setTimeout(() => {
                    setLoading(false);
                }, 2)
            )
            .catch((error) => {
                return error;
            });
        const url = `/search?${filters}`;
        navigate(url);
    };

    const handleNextPage = (e) => {
        e.preventDefault();
        const nextPage = currentPage + 1;
        if (nextPage <= pages) {
            setPage(nextPage);
            setLoading(true);
            dispatch(
                getCompanies(search_query, searchLoc, filter, nextPage, perPage)
            ).then(() =>
                setTimeout(() => {
                    setLoading(false);
                }, 2)
            );
            window.scrollTo(0, 0); // Scroll to top
        }
    };

    const handlePrevPage = (e) => {
        e.preventDefault();
        const prevPage = currentPage - 1;
        if (prevPage >= 1) {
            setPage(prevPage);
            setLoading(true);
            dispatch(
                getCompanies(search_query, searchLoc, filter, prevPage, perPage)
            ).then(() =>
                setTimeout(() => {
                    setLoading(false);
                }, 2)
            );
            window.scrollTo(0, 0); // Scroll to top
        }
    };

    return (
        <>
            <div className="searchPage">
                {loading ? (
                    <div className="loader"></div>
                ) : companies.length === 0 ? (
                    <>
                        
                        <FilterComponent
                            onFilterChange={handleFilterChange}
                            isMobile={isMobile}
                            isTablet={isTablet}
                        />
                        
                        <span className="noBiz">
                        <h1 className="result-word">Results: </h1>
                            
                            No results found.
                            <img src="/images/icons/no_result.png" />
                        </span>
                    </>
                ) : (
                    <>
                        {/* {total === 1 ? (
                            <h1>
                                {total} Service Non Stop Result{" "}
                                {search_query && (
                                    <span>
                                        for &quot;{search_query}&quot;&nbsp;
                                    </span>
                                )}{" "}
                                {searchLoc && <span>in {searchLoc}</span>}
                            </h1>
                        ) : (
                            <h1>
                                {total} Service Non Stop Results{" "}
                                {search_query && (
                                    <span>
                                        for &quot;{search_query}&quot;&nbsp;
                                    </span>
                                )}{" "}
                                {searchLoc && <span>in {searchLoc}</span>}
                            </h1>
                        )} */}

                        <FilterComponent
                            onFilterChange={handleFilterChange}
                            isMobile={isMobile}
                            isTablet={isTablet}
                        />
                        <h1 className="result">Results: </h1>
                        {companies &&
                            companies.map((company, index) => (
                                <div className="card" key={company.id}>
                                    <Link
                                        className="businessCards"
                                        style={{ textDecoration: "none" }}
                                        to={`/companies/${company.id}`}
                                    >
                                        <span className="businessesImageWrapper">
                                            {company.images?.[0] ? (
                                                <img
                                                    className="businessesImage"
                                                    src={company.images[0]}
                                                    alt={company.name}
                                                />
                                            ) : (
                                                <img
                                                    className="businessesImage"
                                                    src="../../images/default_business.jpeg"
                                                    alt={company.name}
                                                />
                                            )}
                                        </span>

                                        <>
                                            <span className="businessDeets">
                                                <h2>
                                                    {(currentPage - 1) *
                                                        perPage +
                                                        index +
                                                        1}
                                                    .&nbsp;{company.name}
                                                </h2>

                                                {!company.price ? (
                                                    <p className="priceSubcat">
                                                        {company.category?.name}
                                                    </p>
                                                ) : (
                                                    <p className="priceSubcat">
                                                        {company.avg_stars ? (
                                                            company.num_reviews &&
                                                            reviewsExists(
                                                                company.num_reviews
                                                            ) && (
                                                                <span className="searchStars">
                                                                    {company?.avg_stars &&
                                                                        starReviews(
                                                                            company.avg_stars
                                                                        )}
                                                                    &nbsp;
                                                                    {company?.avg_stars &&
                                                                        starsToFixed(
                                                                            company.avg_stars
                                                                        )}
                                                                    &nbsp;
                                                                    {company.num_reviews >=
                                                                        1 &&
                                                                        reviewsExists(
                                                                            company.num_reviews
                                                                        )}
                                                                </span>
                                                            )
                                                        ) : (
                                                            <span>
                                                                <span
                                                                    className="paws-unfilled"
                                                                    style={{
                                                                        fontSize:
                                                                            "small",
                                                                    }}
                                                                >
                                                                    <i className="fa-solid fa-hammer" />
                                                                </span>
                                                                &nbsp;&nbsp;Be
                                                                the first to
                                                                review!
                                                            </span>
                                                        )}
                                                        {/* {company.price}{" "} */}
                                                        &nbsp;&#183;&nbsp;{" "}
                                                        {company.category?.name}
                                                    </p>
                                                )}

                                                {/* {company.avg_stars &&
                                                    company.num_reviews &&
                                                    reviewsExists(
                                                        company.num_reviews
                                                    ) && (
                                                        <span className="searchStars">
                                                            {company?.avg_stars &&
                                                                starReviews(
                                                                    company.avg_stars
                                                                )}
                                                            &nbsp;
                                                            {company?.avg_stars &&
                                                                starsToFixed(
                                                                    company.avg_stars
                                                                )}
                                                            &nbsp;
                                                            {company.num_reviews >=
                                                                1 &&
                                                                reviewsExists(
                                                                    company.num_reviews
                                                                )}
                                                        </span>
                                                    )} */}

                                                {getTodaysHours(company) && (
                                                    <span className="todayHours">
                                                        <span
                                                            style={{
                                                                fontWeight:
                                                                    "600",
                                                            }}
                                                        >
                                                            Today&apos;s Hours:
                                                        </span>{" "}
                                                        {
                                                            getTodaysHours(
                                                                company
                                                            ).open
                                                        }{" "}
                                                        -{" "}
                                                        {
                                                            getTodaysHours(
                                                                company
                                                            ).close
                                                        }
                                                    </span>
                                                )}

                                                <span>
                                                    <span
                                                        style={{
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        Location:
                                                    </span>
                                                    &nbsp;{company.city},{" "}
                                                    {company.state}
                                                </span>

                                                {/* <span className="review-text-wrapper">
                                                    {company.recent_review_text ? (
                                                        <div className="recent-review-text">
                                                            <i className="fa-regular fa-message fa-flip-horizontal" />
                                                            &nbsp;&nbsp;
                                                            {company.recent_review_text &&
                                                                reviewTextSubstr(
                                                                    company.recent_review_text
                                                                )}
                                                        </div>
                                                    ) : (
                                                        <span>
                                                            <span
                                                                className="paws-unfilled"
                                                                style={{
                                                                    fontSize:
                                                                        "medium",
                                                                }}
                                                            >
                                                                <i className="fa-solid fa-hammer" />
                                                            </span>
                                                            &nbsp;&nbsp;Be the
                                                            first to review!
                                                        </span>
                                                    )}
                                                </span> */}
                                            </span>
                                        </>
                                    </Link>
                                    <hr className="line-breaks" />
                                </div>
                            ))}
                        {!loading && (
                            <div className="pagination">
                                {currentPage !== 1 && (
                                    <button
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </button>
                                )}
                                <span>
                                    &nbsp;&nbsp;Page {currentPage} of {pages}
                                    &nbsp;&nbsp;
                                </span>
                                {currentPage !== pages && (
                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === pages}
                                    >
                                        Next
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default SearchFormPage;
