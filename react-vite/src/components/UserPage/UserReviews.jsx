import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserThunk, getUserReviewsThunk } from "../../redux/users";
import ManageReviewButton from "./ManageReviewsButton";
import { getDate } from "../../utils";
import './UserReviews.css'


function UserReviews() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const sessionUser = useSelector(state => (
        state.session.user ? state.session.user : null
    ))

    const viewedUser = useSelector(state => (
        state.users ? state.users[userId] : null
    ))

    let viewedUserReviews = useSelector(state => (
        state.users.userReviewsState ? state.users.userReviewsState.userReviews : null
    ))

    const hasAtLeastOneReview = function () {
        if (viewedUserReviews != null) {
            if (!viewedUserReviews.length <= 0) {
                return true
            } else { return 'No Reviews' }
        } else { return null }
    }


    useEffect(() => {
        const runDispatches = async () => {
            await dispatch(getUserThunk(parseInt(userId))).then(() =>
                dispatch(getUserReviewsThunk(parseInt(userId)))
            );
        };
        runDispatches();
    }, [dispatch, userId, sessionUser, viewedUser.num_reviews])

    let reviewsArr;
    if (viewedUserReviews) {
        reviewsArr = viewedUserReviews.map((user_review) => {
            return Object.values(user_review)[0]
        })
    }

    const reviewStars = (numStars) => {
        let toolsFilled = [];
        let toolsNotFilled = []

        for (let i = 0; i < numStars; i++) {
            toolsFilled.push(<span className="paws-filled"><i className="fa-solid fa-hammer"></i> </span>)
        }

        let remaining_paws = 5 - toolsFilled.length

        for (let i = 0; i < remaining_paws; i++) {
            toolsNotFilled.push(<span className="paws-unfilled"><i className="fa-solid fa-hammer"></i> </span>)
        }

        return [toolsFilled, toolsNotFilled]
    }

    return (
        <>
            <h2>Reviews</h2>
            <div>
                {viewedUserReviews && hasAtLeastOneReview() == 'No Reviews' &&
                    (<h4>This user has not written any reviews!</h4>)
                }
                {viewedUserReviews && hasAtLeastOneReview() && (
                    reviewsArr.map(user_review => (
                        <div key={user_review.id} id="reviews-container">
                            <div className="review-card" onClick={() => navigate(`/companies/${user_review.company.company[0].id}`)}>
                                <div className="biz-review-content">
                                    <div className="business-content" >
                                        <div className="business-image">
                                            <img className="formatImage" src={user_review.company.company[0].company_images[0].image_url} alt="" />
                                        </div>
                                        <h4 className="biz-name">{user_review.company.company[0].name}</h4>
                                        <p className="biz-category">{user_review.company.company[0].category.name}</p>
                                        <p className="biz-location">{user_review.company.company[0].city}, {user_review.company.company[0].state}</p>
                                    </div>
                                    <div className="review-content">
                                        <div className="paw-and-date">
                                            <span className="pawBlock">{reviewStars(user_review.stars)} &nbsp;&nbsp;{getDate(user_review.created_at)}</span>
                                        </div>
                                        <p className="review-text">{user_review.review}</p>
                                        <div className="reviewImagesWrapper">{user_review.images.length > 0 && user_review.images.map(image =>
                                        (
                                            <span key={image.id} className="reviewImagesContainer">
                                                <img
                                                    className="reviewImages"
                                                    src={image.image_url} /></span>
                                        ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {(sessionUser && (sessionUser.id == userId) &&
                                <div className="manage-button">
                                    <ManageReviewButton review={user_review} userId={userId} />
                                </div>
                            )}
                        </div>
                    ))

                )}
            </div>
        </>
    )
}

export default UserReviews;
