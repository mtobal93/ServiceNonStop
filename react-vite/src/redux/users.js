const LOAD_USER = "users/load_user"
const LOAD_USER_IMAGES = "users/load_user_images"
const LOAD_USER_REVIEWS = "users/load_user_reviews"
const DELETE_USER_REVIEW = "users/delete_user_review"

export const loadUser = (user) => (
    {
        type: LOAD_USER,
        payload: user
    }
)

export const loadUserImages = ( userImages ) => (
    {
        type: LOAD_USER_IMAGES,
        payload: userImages
    }
)

export const loadUserReviews = ( userReviews ) => (
    {
        type: LOAD_USER_REVIEWS,
        payload: userReviews
    }
)

export const removeUserReview = ( reviewId ) => (
    {
        type: DELETE_USER_REVIEW,
        payload: reviewId
    }
)

//! Thunk

export const getUserThunk = ( userId ) => async ( dispatch ) => {
    const res = await fetch(`/api/users/${userId}`,)

    if (!res.ok) {
        return res
    } else if (res.ok ){
        const user = await res.json();
        dispatch(loadUser(user));
        return user
    }
}

export const getUserImagesThunk = ( userId ) => async ( dispatch ) => {
    const res = await fetch(`/api/users/${userId}/images/all`)

    if(!res.ok) {
        return res
    } else if (res.ok) {
        const userImages = await res.json()
        dispatch(loadUserImages(userImages))
        return userImages
    }
}

export const getUserReviewsThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/${id}/reviews`)

    if (!res.ok) {
        return res;
    } else if (res.ok) {
        const userReviews = await res.json()

        dispatch(loadUserReviews(userReviews))
        return userReviews
    }
}

export const deleteUserReviewThunk = (reviewId) => async ( dispatch ) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })

    if (!res.ok) {
        return res
    } else if (res.ok) {
        dispatch(removeUserReview(reviewId))
    }
}

//! Reducer

const userReducer = (state = {}, action ) => {
    switch(action.type) {
        case LOAD_USER: {
            return {...state, [action.user.id]: action.user}
        }
        case LOAD_USER_IMAGES: {
            return {...state, [action.user['images'].id]: action.userImages}
        }
        case LOAD_USER_REVIEWS: {
            const userReviewsState = {"userReviews": []}
            userReviewsState['userReviews'] = action.userReviews
            return {...state, userReviewsState}
        }
        
        default:
            return {...state}
    }
}

export default userReducer;