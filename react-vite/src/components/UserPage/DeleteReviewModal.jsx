import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteUserReviewThunk, getUserReviewsThunk } from "../../redux/users";

function DeleteReviewModal({ reviewId, userId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = (e) => {
        e.preventDefault();

        const runDispatches = async () => {
            await dispatch(deleteUserReviewThunk(parseInt(reviewId))).then(() =>
                dispatch(getUserReviewsThunk(parseInt(userId))).then(()=> closeModal())
            );
            };
            runDispatches();
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
