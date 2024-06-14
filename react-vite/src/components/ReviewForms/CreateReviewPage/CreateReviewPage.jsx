import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { createNewReviewThunk, createImageThunk, getCompanyReviewsThunk } from "../../../redux/reviews";
import { loadACompany } from "../../../redux/companies";
import OpenModalButton from "../../OpenModalButton";
import LoginFormModal from '../../LoginFormModal';
import "../ReviewForm.css"
import { useModal } from "../../../context/Modal";



function CreateReviewPage({ companyId: propCompanyId, modalLoad }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const { companyId: paramsCompanyId } = useParams();
    const companyId = propCompanyId || paramsCompanyId
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [hover, setHover] = useState(0);
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const sessionUser = useSelector(state => state.session.user);
  
    const handleSubmit = async (e) => {

        e.preventDefault();

        setErrors({})

        const reviewData = {
            review,
            stars
        }

        // console.log("reviewData:", reviewData)

        let newlyCreatedReview = await dispatch(createNewReviewThunk(reviewData, companyId))
        // console.log("newlyCreatedReview: ", newlyCreatedReview)

        if (newlyCreatedReview.status == 403) {
            // console.log("")
            setErrors({ 'statusCode': 403, 'message': 'forbidden' });
        }

        if (newlyCreatedReview.errors) {
            // console.log("")
            setErrors(newlyCreatedReview.errors);
        }

        if (newlyCreatedReview && newlyCreatedReview.id) {
            // console.log("successful review submission");

            if (image != null) {


                const formData = new FormData();
                formData.append("image", image);
                let currentUserId;
                if (sessionUser) currentUserId = sessionUser.id
                if (!sessionUser) currentUserId = null
                formData.append("uploaded_by_id", currentUserId);
                formData.append("imageable_id", newlyCreatedReview.id);
                formData.append("imageable_type", "review"); 

                setImageLoading(true);

                dispatch(createImageThunk(formData)).then(() => {
                    dispatch(loadACompany(companyId))
                        .then(dispatch(getCompanyReviewsThunk(companyId)))

                        .then(() => closeModal())
                }).catch((error) => {
                    console.error("Error uploading image: ", error);
                    setImageLoading(false);
                })
            }
            else {

                dispatch(loadACompany(companyId))
                    .then(dispatch(getCompanyReviewsThunk(companyId)))
                    .then(() => closeModal())
            }
        }

    }

    useEffect(() => {
        let errObj = {}
        if (!review) errObj.review = "Review is required."
        if (review && review.length < 100) errObj.review = "Reviews must be at least 85 characters in length.";
        if (review && review.length > 2000) errObj.review = "Reviews must be 2000 characters in length at most.";
        if (!stars) errObj.stars = "Service Non Stop rating is required."
        setErrors(errObj);


    }, [review, stars])


    const companyPageURL = "/companies/" + companyId


    return (
        <div className={modalLoad ? "loginSignupModals" : "page"}>
            {errors.message != 'forbidden' && <form onSubmit={handleSubmit} encType="multipart/form-data">
                <h1>Inform us about it!</h1>

                <div className="reviewForm">
                    <div className="review-fields">
                        <div id="paws-and-descriptions">
                            <div className='stars-container'>
                                {[...Array(5)].map((star, index) => {
                                    index += 1;
                                    return (
                                        <div
                                            key={index}
                                            className={index <= (hover || stars) ? " paws-filled" : " paws-unfilled"}
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
                                            <span><i className="fa-solid fa-hammer" /></span>&nbsp;
                                        </div>
                                    )
                                })}
                                <div className="descriptions-container">
                                    {hover == 0 && <span>Select your rating</span>}
                                    {hover == 1 && <span>Stay Away</span>}
                                    {hover == 2 && <span>Not So Good</span>}
                                    {hover == 3 && <span>Okay</span>}
                                    {hover == 4 && <span>Good Work</span>}
                                    {hover == 5 && <span>Great and Recommendable</span>}
                                </div>
                            </div>
                        </div>
                        <textarea
                            id="review-input"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Write your review here. It must be least 100 characters, but no more than 2,000 characters."
                            name="review"
                        />
                    </div>
                    <div className="errorsContainer">
                        {errors.stars && <span className="errors">{errors.stars}</span>}&nbsp;
                        {errors.review && <span className="errors">{errors.review}</span>}
                    </div>
                    <div>
                        <h2>Attach Photos</h2>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        {(imageLoading) && <p>Loading...</p>}
                    </div>
                    <p>
                        {sessionUser && <button type="submit" disabled={!!Object.values(errors).length}>Create Review</button>}
                        {!sessionUser && <OpenModalButton
                            buttonText="Post Review"
                            modalComponent={<LoginFormModal />}
                        />}
                    </p>
                </div>
            </form>
            }
            {
                errors.message == 'forbidden' &&
                <div className='custom-error-page'>
                    <h1>Bad dog!</h1>

                    <NavLink to={companyPageURL}>You do not have this access to this action. Return to the companies page by clicking here.</NavLink> <br />
                    <img src="../../../images/icons/poop.png" alt="dog pooping on chair" />
                </div>
            }
            
        </div>
    )
}


export default CreateReviewPage
