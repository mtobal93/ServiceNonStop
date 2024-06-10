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

export const getUser = ( userId ) => async ( dispatch ) => {
    const res = await fetch(`api/users/${userId}`,)

    if (!res.ok) {
        return res
    } else if (res.ok ){
        const user = await res.json();
        dispatch(loadUser(user));
        return user
    }
}

export const getUserImages = ( userId ) => async ( dispatch ) => {
    const res = await fetch(`api/users/${userId}/images/all`)

    if(!res.ok) {
        return res
    } else if (res.ok) {
        const userImages = await res.json()
        dispatch(loadUserImages(userImages))
        return userImages
    }
}