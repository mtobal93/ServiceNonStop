import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState, useEffect } from "react";
import { getUserReviewsThunk } from "../../redux/users";
import { updateReviewThunk } from "../../redux/reviews";

function UpdateReviewModal({ userReview, reviewId, userId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const reviewData = userReview;
    const [review, setReview] = useState(reviewData?.review);
    const [stars, setStars] = useState(reviewData?.stars);
    const [hover, setHover] = useState(reviewData?.hover);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        let errObj = {};
        if (!review) errObj.review = "Review is required.";
        if (review && review.length < 20)
            errObj.review =
                "Reviews must be at least 100 characters in length.";
        if (review && review.length > 2000)
            errObj.review =
                "Reviews must be 2000 characters in length at most.";
        if (!stars) errObj.stars = "Service Non Stop is required.";
        setErrors(errObj);
    }, [review, stars]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const reviewData = {
            review,
            stars,
        };

        try {
            await dispatch(updateReviewThunk(reviewId, reviewData));
            await dispatch(getUserReviewsThunk(userId));
            closeModal();
        } catch (error) {
            console.error("Error updating review:", error);
        }
    };

    return (
        <>
            <h1>Update Your Review</h1>
            <form onSubmit={handleSubmit}>
                <div className="review-fields">
                    <div id="paws-and-descriptions">
                        <div className="stars-container">
                            {[...Array(5)].map((star, index) => {
                                index += 1;
                                return (
                                    <div
                                        key={index}
                                        className={
                                            index <= (hover || stars)
                                                ? " paws-filled"
                                                : " paws-unfilled"
                                        }
                                        onClick={() => {
                                            setStars(index);
                                        }}
                                        onMouseEnter={() => setHover(index)}
                                        onMouseLeave={() => setHover(stars)}
                                        onDoubleClick={() => {
                                            setStars(0);
                                            setHover(0);
                                        }}
                                    >
                                        <span>
                                            <i className="fa-solid fa-tool" />
                                        </span>
                                        &nbsp;
                                    </div>
                                );
                            })}
                            <div className="descriptions-container">
                                {hover == 0 && <span>Select your rating</span>}
                                {hover == 1 && <span>Stay Away</span>}
                                {hover == 2 && <span>Not So Good</span>}
                                {hover == 3 && <span>Okay</span>}
                                {hover == 4 && <span>Good Work</span>}
                                {hover == 5 && (<span>Great and Recommendable</span>)}
                            </div>
                        </div>
                    </div>
                    <textarea
                        id="review-input"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Review must be least 20 characters, but no more than 2,000 characters."
                        name="review"
                    />
                </div>
                <div className="errorsContainer">
                    {errors.stars && (
                        <span className="errors">{errors.stars}</span>
                    )}
                    &nbsp;
                    {errors.review && (
                        <span className="errors">{errors.review}</span>
                    )}
                </div>
                <p>
                    <button
                        type="submit"
                        disabled={!!Object.values(errors).length}
                    >
                        Update Review
                    </button>
                </p>
            </form>
        </>
    );
}

export default UpdateReviewModal;
