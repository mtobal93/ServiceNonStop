const LOAD_IMAGES = "images/LOAD_IMAGES";
const DELETE_IMAGE = "images/DELETE_IMAGE";

export const loadImages = (image) => ({
    type: LOAD_IMAGES,
    image,
});

export const removeImage = (imageId) => ({
    type: DELETE_IMAGE,
    imageId,
});

export const getImagesByCompany = (companyId) => async (dispatch) => {
    const response = await fetch(`/api/companies/${companyId}/images`);


    if (response.ok) {
        const images = await response.json();
        dispatch(loadImages(images));
        return images;
    }
};

export const deleteImage = (imageId) => async (dispatch) => {
    const response = await fetch(`/api/images/${imageId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(removeImage(imageId));
    } else {
        const errors = await response.json();
        return errors;
    }
};

const imagesReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_IMAGES: {
            return {
                ...state,
                [action.image.images.company_id]: action.image,
            };
        }
        case DELETE_IMAGE: {
            const newState = { ...state };
            delete newState[action.imageId];
            return newState;
        }
        default:
            return { ...state };
    }
};

export default imagesReducer;
