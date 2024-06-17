import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCompanies } from "../../redux/search";

function CategoriesComponent() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [category, setCategory] = useState("");

    const handleCategories = (categoryId) => {
        const queryParams = new URLSearchParams();
        queryParams.append("category", categoryId);
        const queryString = queryParams.toString();
        const url = `/search?${queryString}`;

        dispatch(getCompanies("", "", `category=${categoryId}`)).then(() => {
            navigate(url);
            setCategory("");
        });
    };

    return (
        <>
            <h1 className="categoriesHeader">Let One of Us Help You</h1>

            <div className="categoryContainer">
                
                <div onClick={() => handleCategories(1)}>
                    <Link
                        value={category}
                        onClick={(e) => setCategory(e.target.value)}
                    >
                        <img
                            className="categoryDots"
                            src="/images/icons/construction.png"
                        />
                    </Link>
                    <span className="categoryStuff">Construction</span>
                </div>


                <div onClick={() => handleCategories(2)}>
                    <Link
                        value={category}
                        onClick={(e) => setCategory(e.target.value)}
                    >
                        <img
                            className="categoryDots"
                            src="/images/icons/electrician.png"
                        />
                    </Link>
                    <span className="categoryStuff">Electrician</span>
                </div>

            
                <div onClick={() => handleCategories(3)}>
                    <Link
                        value={category}
                        onClick={(e) => setCategory(e.target.value)}
                    >
                        <img
                            className="categoryDots"
                            src="/images/icons/landscaper.png"
                        />
                    </Link>
                    <span className="categoryStuff">Landscaper</span>
                </div>


                <div onClick={() => handleCategories(4)}>
                    <Link
                        value={category}
                        onClick={(e) => setCategory(e.target.value)}
                    >
                        <img
                            className="categoryDots"
                            src="/images/icons/masonry.png"
                        />
                    </Link>
                    <span className="categoryStuff">Masonry</span>
                </div>


                <div onClick={() => handleCategories(5)}>
                    <Link
                        value={category}
                        onClick={(e) => setCategory(e.target.value)}
                    >
                        <img
                            className="categoryDots"
                            src="/images/icons/painter.png"
                        />
                    </Link>
                    <span className="categoryStuff">Painter</span>
                </div>


                <div onClick={() => handleCategories(6)}>
                    <Link
                        value={category}
                        onClick={(e) => setCategory(e.target.value)}
                    >
                        <img
                            className="categoryDots"
                            src="/images/icons/plumber.png"
                        />
                    </Link>
                    <span className="categoryStuff">Plumber</span>
                </div>


                <div onClick={() => handleCategories(7)}>
                    <Link
                        value={category}
                        onClick={(e) => setCategory(e.target.value)}
                    >
                        <img
                            className="categoryDots"
                            src="/images/icons/hvac_r.png"
                        />
                    </Link>
                    <span className="categoryStuff">HVAC & Refrigeration</span>
                </div>


                <div onClick={() => handleCategories(8)}>
                    <Link
                        value={category}
                        onClick={(e) => setCategory(e.target.value)}
                    >
                        <img
                            className="categoryDots"
                            src="/images/icons/other.png"
                        />
                    </Link>
                    <span className="categoryStuff">Other</span>
                </div>
            </div>
        </>
    );
}

export default CategoriesComponent