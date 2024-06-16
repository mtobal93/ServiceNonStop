import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getCompanies } from "../../redux/search";
import PlacesSearch from "./PlacesSearch";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [category_id, setCategory_id] = useState("");
    const [isPredictionSelected, setIsPredictionSelected] = useState(false);
    const [isInputTyped, setIsInputTyped] = useState(false); // State variable for tracking input typing

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentLocation = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(currentLocation.search);
        const queryFromParams = params.get("search_query");
        const locationFromParams = params.get("location");
        const categoryFromParams = params.get("category");

        if (queryFromParams) {
            setSearchQuery(queryFromParams);
        } else {
            setSearchQuery("");
        }

        if (categoryFromParams) {
            setCategory_id(categoryFromParams);
        } else {
            setCategory_id("");
        }

        if (locationFromParams) {
            setLocation(locationFromParams);
        } else {
            setLocation("");
        }
    }, [currentLocation]);

    // const handleLocationSelect = (selectedLocation) => {
    //     setLocation(selectedLocation);
    //     const queryParams = new URLSearchParams();
    //     queryParams.append("location", selectedLocation);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isInputTyped && !isPredictionSelected) {
            alert("Please select a location from the dropdown.");
            return;
        }

        setIsSubmitted(true); // Signal that form has been submitted
        setTimeout(() => setIsSubmitted(false), 0); // Reset the signal immediately after

        const queryParams = new URLSearchParams();
        const categoryFromParams = queryParams.get("category");

        const lowercase_query = searchQuery.toLowerCase();

        if (
            lowercase_query === "construction" ||
            lowercase_query === "carpenters" ||
            lowercase_query === "building" ||
            "builder"
        ) {
            queryParams.append("category", 1);
        }
        if (
            lowercase_query === "electrician" ||
            lowercase_query === "electric" ||
            lowercase_query === "lineman" ||
            lowercase_query === "electricity"
        ) {
            queryParams.append("category", 2);
        }
        if (
            lowercase_query === "landscaper" ||
            lowercase_query === "gardener" ||
            lowercase_query === "weeder" ||
            lowercase_query === "florist"
        ) {
            queryParams.append("category", 3);
        }
        if (
            lowercase_query === "masonry" ||
            lowercase_query === "cement" ||
            lowercase_query === "brickwork" ||
            lowercase_query === "stonework" ||
            lowercase_query === "sidewalk" ||
            lowercase_query === "ashlar"
        ) {
            queryParams.append("category", 4);
        }
        if (
            lowercase_query === "painter" ||
            lowercase_query === "interior design" ||
            lowercase_query === "home improvement" ||
            lowercase_query === "house painting"
        ) {
            queryParams.append("category", 5);
        }
        if (
            lowercase_query === "plumber" ||
            lowercase_query === "piping" ||
            lowercase_query === "sink" ||
            lowercase_query === "toilet"
        ) {
            queryParams.append("category", 6);
        }
        if (
            lowercase_query === "hvac" ||
            lowercase_query === "refrigeration" ||
            lowercase_query === "air conditioning" ||
            lowercase_query === "heat" ||
            lowercase_query === "venting" ||
            lowercase_query === "filter" ||
            lowercase_query === "cooling" ||
            lowercase_query === "refrigerant" ||
            lowercase_query === "hvac_r"
        ) {
            queryParams.append("category", 7);
        }
        if (lowercase_query === "other") {
            queryParams.append("category", 8);
        }

        if (!searchQuery && !location && !category_id)
            dispatch(getCompanies(searchQuery, location, {}, 1, 10)).then(
                () => {
                    navigate("/search");
                }
            );

        if (searchQuery) queryParams.append("search_query", searchQuery);
        if (location && isInputTyped) queryParams.append("location", location);
        const queryString = queryParams.toString();
        const url = `/search?${queryString}`;

        if (categoryFromParams) {
            dispatch(
                getCompanies(
                    searchQuery,
                    location,
                    `category=${category_id}`,
                    1,
                    10
                )
            ).then(() => {
                navigate(url);
                setSearchQuery("");
                setLocation("");
                setCategory_id("");
            });
        } else {
            dispatch(getCompanies(searchQuery, location, {}, 1, 10)).then(
                () => {
                    navigate(url);
                    setSearchQuery("");
                    setLocation("");
                }
            );
        }
    };

    return (
        <div className="searchForm">
            <form className="formNav" onSubmit={handleSubmit}>
                <input
                    id="searchQuery"
                    type="text"
                    value={searchQuery}
                    placeholder="Search"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* <PlacesSearch
                    onLocationSelect={handleLocationSelect}
                    location={location}
                    isSubmitted={isSubmitted}
                    setIsPredictionSelected={setIsPredictionSelected}
                    setIsInputTyped={setIsInputTyped}
                /> */}

                <button id="search" type="submit">
                    <i
                        className="fa-solid fa-magnifying-glass"
                        style={{ color: "#5f5ba8", fontSize: "large" }}
                    />
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
