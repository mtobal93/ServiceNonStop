import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteReviewThunk } from "../../../redux/reviews";
import { getCompanyReviewsThunk } from "../../../redux/reviews";
import { loadACompanyThunk } from "../../../redux/companies";

function DeleteReviewModal({ reviewId, companyId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await dispatch(deleteReviewThunk(reviewId))
            await (dispatch(getCompanyReviewsThunk(companyId)))
            await dispatch(loadACompanyThunk(companyId))
            closeModal();

        } catch (error) {
            console.error("Error updating review:", error);
        }
    }
    return (
        <div className="deleteModal">
            <h1>Confirm Delete</h1>
            <span>Are you sure you want to delete this review?</span>
            <button style={{ marginTop: "10px" }} onClick={handleDelete}>Yes, I&apos;m Sure (Delete Permanently)</button>
            <button style={{ backgroundColor: "#c3cddf", color: "#768c9f", marginTop: "10px" }} onClick={closeModal}>No! (Keep My Review)</button>
        </div>
    )
}

export default DeleteReviewModal
